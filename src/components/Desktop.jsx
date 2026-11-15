import { useCallback, useEffect, useRef, useState } from 'react'
import { useNarrator } from '../narrator/NarratorContext'
import Narrator from '../narrator/Narrator'
import * as L from '../narrator/lines'
import DesktopIcons from './DesktopIcons'
import Taskbar from './Taskbar'
import StartMenu from './StartMenu'
import WingampPlayer from './WingampPlayer'
import ManualWindow from './windows/ManualWindow'
import InformeWindow from './windows/InformeWindow'
import CamarasWindow from './windows/CamarasWindow'
import PasswordDialog from './windows/PasswordDialog'
import ExpedienteWindow from './windows/ExpedienteWindow'
import { PapeleraWindow, InterwebWindow, CreditosWindow } from './windows/SmallWindows'
import wallpaper from '../assets/desktop/wallpaper.jpg'
import logo from '../assets/desktop/stanley-logo.png'
import arrow from '../assets/desktop/arrow.svg'
import folderSmall from '../assets/ui/carpeta-small.svg'
import pdfIcon from '../assets/ui/pdf-0.svg'
import docIcon from '../assets/ui/archivo-427.svg'
import trashIcon from '../assets/desktop/trash.svg'
import ieIcon from '../assets/ui/interweb.svg'
import { STEAM_URL } from '../links'
import './Desktop.css'

const PASSWORD = 'ME11'
const IDLE_MS = 40000

const META = {
  camaras: { title: 'Cámaras', icon: folderSmall },
  informe: { title: 'Informe de personal', icon: folderSmall },
  manual: { title: 'Manual del empleado', icon: pdfIcon },
  expediente: { title: 'Expediente 427', icon: docIcon },
  papelera: { title: 'Papelera', icon: trashIcon },
  interweb: { title: 'La Interweb', icon: ieIcon },
  creditos: { title: 'Créditos', icon: folderSmall },
}

export default function Desktop({ onFinish, inert }) {
  const { say, msg } = useNarrator()
  const [wins, setWins] = useState({}) // id -> { z, minimized }
  const zTop = useRef(10)
  const [selected, setSelected] = useState(null)
  const [startOpen, setStartOpen] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [success, setSuccess] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [clues, setClues] = useState({ me: false, once: false })
  const attempts = useRef(0)
  const expAgain = useRef(0)
  const progress = useRef({ me: false, once: false, unlocked: false })
  progress.current = { ...clues, unlocked }

  /* ---------- Intro ---------- */
  useEffect(() => {
    const t = setTimeout(() => say({ pages: L.INTRO, once: 'intro' }), 700)
    return () => clearTimeout(t)
  }, [say])

  /* ---------- Pista automática si Stanley se queda quieto ---------- */
  const msgOpen = !!msg
  useEffect(() => {
    if (msgOpen || dialog || inert) return
    let t
    const reset = () => {
      clearTimeout(t)
      t = setTimeout(() => {
        if (!progress.current.unlocked) say(L.hintFor(progress.current))
      }, IDLE_MS)
    }
    reset()
    window.addEventListener('pointerdown', reset)
    window.addEventListener('keydown', reset)
    return () => {
      clearTimeout(t)
      window.removeEventListener('pointerdown', reset)
      window.removeEventListener('keydown', reset)
    }
  }, [msgOpen, dialog, inert, say])

  /* ---------- Ventanas ---------- */
  const open = useCallback((id) => {
    zTop.current += 1
    const z = zTop.current
    setWins((w) => ({ ...w, [id]: { z, minimized: false } }))
  }, [])
  const close = useCallback((id) => {
    setWins((w) => {
      const next = { ...w }
      delete next[id]
      return next
    })
  }, [])
  const focus = useCallback((id) => {
    setWins((w) => {
      if (!w[id] || w[id].z === zTop.current) return w
      zTop.current += 1
      return { ...w, [id]: { ...w[id], z: zTop.current } }
    })
  }, [])

  const openIds = Object.keys(wins)
  const activeId = openIds.filter((id) => !wins[id].minimized).sort((a, b) => wins[b].z - wins[a].z)[0]

  const onTask = (id) => {
    const w = wins[id]
    if (!w) return
    if (w.minimized) open(id)
    else if (id === activeId) setWins((all) => ({ ...all, [id]: { ...all[id], minimized: true } }))
    else focus(id)
  }

  const winProps = (id) => ({
    z: 100 + (wins[id]?.z ?? 0),
    minimized: wins[id]?.minimized,
    onFocus: () => focus(id),
    onClose: () => close(id),
  })

  /* ---------- Abrir íconos ---------- */
  const openIcon = (id) => {
    setStartOpen(false)
    if (id === 'expediente') {
      if (unlocked) {
        open('expediente')
        return
      }
      setDialog(true)
      if (!say({ text: L.OPEN.expedienteFirst, once: 'exp-first' })) {
        say(L.OPEN.expedienteAgain[expAgain.current++ % L.OPEN.expedienteAgain.length])
      }
      return
    }
    open(id)
    if (L.OPEN[id]) say({ text: L.OPEN[id], once: `open-${id}` })
  }

  /* ---------- Pistas ---------- */
  const found = useCallback(
    (key) => {
      setClues((c) => ({ ...c, [key]: true }))
      const other = key === 'me' ? 'once' : 'me'
      // El narrador no reacciona a cada pista (sería demasiado obvio); solo cuando ya vio ambas.
      if (progress.current[other]) say({ text: L.CLUES.both, once: 'clue-both' })
    },
    [say],
  )
  const foundMe = useCallback(() => found('me'), [found])
  const foundOnce = useCallback(() => found('once'), [found])

  /* ---------- Contraseña ---------- */
  const submitPassword = (value) => {
    const v = value.replace(/\s+/g, '').toUpperCase()
    if (v === PASSWORD) {
      setSuccess(true)
      say(L.CORRECT)
      setTimeout(() => {
        setDialog(false)
        setUnlocked(true)
        open('expediente')
      }, 2400)
      return true
    }
    say(L.wrongLine(value, attempts.current))
    attempts.current += 1
    return false
  }

  /* ---------- Final ---------- */
  const reachEnd = useCallback(() => {
    say({
      text: L.FINAL_CHOICE,
      once: 'final',
      choices: [
        {
          label: 'Volver a la silla',
          onSelect: () => say({ pages: L.CHAIR_LINE, onDone: () => onFinish('chair') }),
        },
        { label: 'Salir por la puerta', onSelect: () => onFinish('door') },
      ],
    })
  }, [say, onFinish])

  /* ---------- Menú Inicio y bandeja ---------- */
  const startAction = (id) => {
    setStartOpen(false)
    if (id === 'manual') openIcon('manual')
    else if (id === 'creditos') openIcon('creditos')
    else if (id === 'panel') say(L.MISC.controlPanel)
    else if (id === 'juego') window.open(STEAM_URL, '_blank', 'noopener')
    else if (id === 'apagar') {
      if (unlocked) {
        onFinish('door')
        return
      }
      say({
        text: L.MISC.shutdownEarly,
        choices: [
          { label: 'Apagar igual', onSelect: () => onFinish('quit') },
          { label: 'Quedarme', onSelect: () => say(L.hintFor(progress.current)) },
        ],
      })
    }
  }

  const showDesktop = () => {
    setWins((w) => Object.fromEntries(Object.entries(w).map(([k, v]) => [k, { ...v, minimized: true }])))
    say({ text: L.MISC.showDesktop, once: 'show-desktop' })
  }

  const tasks = [...openIds]
    .sort((a, b) => a.localeCompare(b))
    .map((id) => ({ id, ...META[id], minimized: wins[id].minimized }))

  const onFirstPlay = useCallback(() => say({ text: L.MISC.music, once: 'music' }), [say])

  return (
    <div
      className="desktop"
      inert={inert || undefined}
      onClick={() => {
        setSelected(null)
        setStartOpen(false)
      }}
    >
      {/* Fondo: imagen espejada horizontalmente, como en el diseño */}
      <img className="desktop__wall" src={wallpaper} alt="" />

      <button className="desktop__logo" onClick={() => say(L.MISC.logo)} aria-label="The Stanley Parable">
        <img src={logo} alt="The Stanley Parable" />
      </button>
      <p className="desktop__exp">EXPANSIÓN - EXPEDIENTE 427</p>

      <div className="desktop__here" aria-hidden>
        <span>Usted está aquí</span>
      </div>
      <img className="desktop__arrow" src={arrow} alt="" width="107.019" height="193.52" />

      <DesktopIcons selected={selected} onSelect={setSelected} onOpen={openIcon} />

      <WingampPlayer onFirstPlay={onFirstPlay} />

      {/* Ventanas */}
      {wins.camaras && (
        <CamarasWindow
          {...winProps('camaras')}
          onCam={(c) => c.id === '05' && say({ text: L.MISC.cam427, once: 'cam427' })}
          onPlace={() => say({ text: L.MISC.camPlace, once: 'cam-place' })}
        />
      )}
      {wins.informe && <InformeWindow {...winProps('informe')} onClueSeen={foundOnce} clueFound={clues.once} />}
      {wins.manual && <ManualWindow {...winProps('manual')} onClueSeen={foundMe} clueFound={clues.me} />}
      {wins.papelera && (
        <PapeleraWindow {...winProps('papelera')} onItem={() => say({ text: L.MISC.trashItem, once: 'trash-item' })} />
      )}
      {wins.interweb && (
        <InterwebWindow {...winProps('interweb')} onRefresh={() => say({ text: L.MISC.refresh, once: 'refresh' })} />
      )}
      {wins.creditos && <CreditosWindow {...winProps('creditos')} />}
      {wins.expediente && <ExpedienteWindow {...winProps('expediente')} onReachEnd={reachEnd} />}

      {/* Marca de agua: por encima del velo del diálogo, como en Desktop - 3 */}
      <button className={`desktop__watermark ${dialog ? 'is-over' : ''}`} onClick={() => say(L.MISC.watermark)}>
        <span className="desktop__wm-title">ACTIVAR WINGOWS</span>
        <span className="desktop__wm-sub">
          como puede ver, su empresa no pagó
          <br />
          la membresía mensual del sistema operativo
        </span>
      </button>

      {dialog && (
        <PasswordDialog
          success={success}
          onSubmit={submitPassword}
          onClose={() => !success && setDialog(false)}
        />
      )}

      {startOpen && <StartMenu onAction={startAction} />}
      <Taskbar
        tasks={tasks}
        activeId={activeId}
        onTask={onTask}
        startOpen={startOpen}
        onStart={() => setStartOpen((o) => !o)}
        onFolder={() => openIcon('camaras')}
        onTray={(k) => say(L.MISC[k])}
        onShowDesktop={showDesktop}
      />

      <Narrator onCharacterClick={() => say(L.hintFor(progress.current))} />
    </div>
  )
}
