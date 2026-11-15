import pdf from '../assets/ui/pdf-0.svg'
import folder from '../assets/ui/carpeta-small.svg'
import './StartMenu.css'

export default function StartMenu({ onAction }) {
  const items = [
    ['manual', 'Mis documentos', pdf],
    ['panel', 'Panel de control', folder],
    ['creditos', 'Créditos', folder],
    ['juego', 'The Stanley Parable ↗', folder],
  ]
  return (
    <nav className="start" aria-label="Menú Inicio" onClick={(e) => e.stopPropagation()}>
      <div className="start__band" aria-hidden>
        <span>
          Wingows <b>2002</b>
        </span>
      </div>
      <ul className="start__list">
        {items.map(([id, label, icon]) => (
          <li key={id}>
            <button onClick={() => onAction(id)}>
              <img src={icon} alt="" />
              {label}
            </button>
          </li>
        ))}
        <li className="start__divider" role="separator" />
        <li>
          <button onClick={() => onAction('apagar')}>
            <span className="start__power" aria-hidden>⏻</span>
            Apagar el equipo…
          </button>
        </li>
      </ul>
    </nav>
  )
}
