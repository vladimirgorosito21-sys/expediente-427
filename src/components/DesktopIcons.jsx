import { useRef } from 'react'
import carpeta from '../assets/ui/carpeta.svg'
import archivo427 from '../assets/ui/archivo-427.svg'
import skull from '../assets/desktop/skull.svg'
import pdf0 from '../assets/ui/pdf-0.svg'
import pdf1 from '../assets/ui/pdf-1.svg'
import pdf2 from '../assets/ui/pdf-2.svg'
import pdf3 from '../assets/ui/pdf-3.svg'
import pdfLine from '../assets/ui/pdf-line.svg'
import pdfLineShort from '../assets/ui/pdf-line-short.svg'
import trash from '../assets/desktop/trash.svg'
import interweb from '../assets/ui/interweb.svg'
import './DesktopIcons.css'

/* ---------- Átomos (del frame "Atomic") ---------- */

function AtomoCarpeta() {
  return (
    <span className="atom-carpeta">
      <img src={carpeta} alt="" />
    </span>
  )
}

function AtomoArchivo427() {
  return (
    <span className="atom-427">
      <img className="atom-427__doc" src={archivo427} alt="" />
      <img className="atom-427__skull" src={skull} alt="" />
    </span>
  )
}

function AtomoPdf() {
  return (
    <span className="atom-pdf">
      {[pdf0, pdf1, pdf2].map((src, i) => (
        <img key={i} className="atom-pdf__full" src={src} alt="" />
      ))}
      <img className="atom-pdf__fold" src={pdf3} alt="" />
      {[47.37, 55.26, 63.16, 71.05].map((t) => (
        <img key={t} className="atom-pdf__line" style={{ top: `${t}%` }} src={pdfLine} alt="" />
      ))}
      <img className="atom-pdf__line atom-pdf__line--short" src={pdfLineShort} alt="" />
      <span className="atom-pdf__ext">.pdf</span>
    </span>
  )
}

/* ---------- Molécula: ícono de escritorio ---------- */

function Icon({ id, label, box, iconBox, labelBox, children, selected, onSelect, onOpen }) {
  const lastPointer = useRef('mouse')
  return (
    <button
      className={`dicon ${selected ? 'is-selected' : ''}`}
      style={box}
      aria-label={typeof label === 'string' ? label : undefined}
      onPointerDown={(e) => {
        lastPointer.current = e.pointerType
      }}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(id)
        if (lastPointer.current === 'touch' || lastPointer.current === 'pen') onOpen(id)
      }}
      onDoubleClick={() => onOpen(id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onOpen(id)
      }}
    >
      <span className="dicon__icon" style={iconBox}>
        {children}
      </span>
      <span className="dicon__label" style={labelBox}>
        {label}
      </span>
    </button>
  )
}

// Posiciones de las instancias "Molécula" del frame Desktop - 2
export default function DesktopIcons({ selected, onSelect, onOpen }) {
  const common = { selected: null, onSelect, onOpen }
  const sel = (id) => ({ ...common, id, selected: selected === id })
  return (
    <>
      <Icon
        {...sel('camaras')}
        label="cámaras"
        box={{ left: 40, top: 75, width: 119, height: 90 }}
        iconBox={{ left: 28, top: 0, width: 64, height: 49 }}
        labelBox={{ top: 55 }}
      >
        <AtomoCarpeta />
      </Icon>

      <Icon
        {...sel('informe')}
        label={
          <>
            informe de
            <br />
            personal
          </>
        }
        box={{ left: 40, top: 176, width: 119, height: 90 }}
        iconBox={{ left: 28, top: 0, width: 64, height: 49 }}
        labelBox={{ top: 55 }}
      >
        <AtomoCarpeta />
      </Icon>

      <Icon
        {...sel('manual')}
        label={
          <>
            manual
            <br />
            del empleado
            <br />
            .pdf
          </>
        }
        box={{ left: 42, top: 284, width: 119, height: 95 }}
        iconBox={{ left: 26, top: 0, width: 64, height: 64 }}
        labelBox={{ top: 64 }}
      >
        <AtomoPdf />
      </Icon>

      <Icon
        {...sel('papelera')}
        label="Papelera"
        box={{ left: 42, top: 405, width: 103, height: 92 }}
        iconBox={{ left: 15, top: 0, width: 73, height: 73 }}
        labelBox={{ top: 77 }}
      >
        <img src={trash} alt="" width="73" height="73" />
      </Icon>

      <Icon
        {...sel('interweb')}
        label="La interweb"
        box={{ left: 41, top: 513, width: 103, height: 104 }}
        iconBox={{ left: 6, top: 0, width: 92, height: 92 }}
        labelBox={{ top: 89 }}
      >
        <img src={interweb} alt="" width="92" height="92" />
      </Icon>

      <Icon
        {...sel('expediente')}
        label={
          <>
            {' '}Expediente 427
            <br />
            Confidencial no abrir
            <br />
            bajo ninguna
            <br />
            circunstancia por favor
            <br />
            aunque su curiosidad
            <br />
            lo lleve a buscar pistas para poder abrirlo
          </>
        }
        box={{ left: 366, top: 75, width: 119, height: 94 }}
        iconBox={{ left: 28, top: 0, width: 64, height: 64 }}
        labelBox={{ top: 65, left: -40, right: -40 }}
      >
        <AtomoArchivo427 />
      </Icon>
    </>
  )
}
