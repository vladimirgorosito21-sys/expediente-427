import wingowsLogo from '../assets/desktop/wingows-logo.svg'
import folderTaskbar from '../assets/desktop/folder-taskbar.svg'
import sepTall from '../assets/desktop/taskbar-sep-tall.svg'
import sep from '../assets/desktop/taskbar-sep.svg'
import volume from '../assets/desktop/volume.svg'
import noInternet from '../assets/desktop/no-internet.svg'
import './Taskbar.css'

// "Barra de tareas" del diseño (0, 963) 1440 × 61
export default function Taskbar({ tasks, activeId, onTask, startOpen, onStart, onFolder, onTray, onShowDesktop }) {
  return (
    <footer className="taskbar">
      <button
        className={`taskbar__start ${startOpen ? 'is-open' : ''}`}
        onClick={(e) => {
          e.stopPropagation()
          onStart()
        }}
        aria-label="Menú Inicio de Wingows"
        aria-expanded={startOpen}
      >
        <img src={wingowsLogo} alt="" width="42" height="42" />
      </button>
      <img className="taskbar__sep-tall" src={sepTall} alt="" />
      <button className="taskbar__folder" onClick={onFolder} aria-label="Abrir explorador: Cámaras">
        <img src={folderTaskbar} alt="" />
      </button>

      <div className="taskbar__tasks">
        {tasks.map((t) => (
          <button
            key={t.id}
            className={`task ${activeId === t.id && !t.minimized ? 'is-active' : ''}`}
            onClick={() => onTask(t.id)}
            title={t.title}
          >
            <img src={t.icon} alt="" />
            <span>{t.title}</span>
          </button>
        ))}
      </div>

      <img className="taskbar__sep" style={{ left: 1158 }} src={sep} alt="" />
      <button className="taskbar__tray" style={{ left: 1181, top: 20 }} onClick={() => onTray('volume')} aria-label="Volumen">
        <img src={volume} alt="" width="23" height="23" />
      </button>
      <button className="taskbar__tray" style={{ left: 1221, top: 22 }} onClick={() => onTray('network')} aria-label="Estado de red: sin conexión">
        <img src={noInternet} alt="" width="20" height="20" />
      </button>
      <img className="taskbar__sep" style={{ left: 1264 }} src={sep} alt="" />
      <button className="taskbar__clock" onClick={() => onTray('clock')} aria-label="Reloj: 24:00, 02/11/2002">
        <span className="taskbar__time">24:00</span>
        <span className="taskbar__date">02/11/2002</span>
      </button>
      <button className="taskbar__show" onClick={onShowDesktop} aria-label="Mostrar escritorio" title="Mostrar escritorio" />
    </footer>
  )
}
