import { INSTAGRAM_URL, INSTAGRAM_HANDLE, LICENSE_URL } from '../links'
import './CreditsContent.css'

const TEAM = [
  ['Vladimir Gorosito', 'Investigación'],
  ['Vladimir Gorosito', 'Guion y adaptación transmedia interactiva'],
  ['Vladimir Gorosito', 'Diseño de UX'],
  ['Vladimir Gorosito', 'Diseño UI y gráfico'],
  ['Vladimir Gorosito', 'Programación y maquetado web'],
]

export default function CreditsContent() {
  return (
    <div className="credits">
      <h3>The Stanley Parable · Expansión: Expediente 427</h3>
      <p>Expansión transmedia interactiva. Trabajo práctico académico, [cátedra / institución], 2026.</p>

      <h4>Equipo</h4>
      <ul>
        {TEAM.map(([n, r], i) => (
          <li key={i}>
            <strong>{n}</strong> — {r}
          </li>
        ))}
      </ul>

      <p>
        Seguí la expansión en Instagram:{' '}
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
          {INSTAGRAM_HANDLE} ↗
        </a>
      </p>

      <h4>Obra original</h4>
      <p>
        <em>The Stanley Parable</em> (2013) y <em>The Stanley Parable: Ultra Deluxe</em> (2022), creados por
        Davey Wreden y William Pugh (Galactic Cafe / Crows Crows Crows). El logotipo y el universo narrativo
        pertenecen a sus autores; se usan aquí con fines académicos, sin fines de lucro.{' '}
        <a href="https://store.steampowered.com/app/1703340/The_Stanley_Parable_Ultra_Deluxe/" target="_blank" rel="noreferrer">
          Conocé el juego ↗
        </a>
      </p>

      <h4>Recursos de terceros</h4>
      <ul>
        <li>Música: pista reproducida con el reproductor embebido de Spotify. Derechos de sus titulares.</li>
        <li>
          Íconos: Flat Color Icons (Icons8), Ionicons, OpenMoji (CC BY-SA 4.0), Fluent UI Emoji (Microsoft),
          coolicons, Boxicons, Hugeicons, selfh.st icons, AT Icons.
        </li>
        <li>Tipografías: Pixelify Sans, Play y Gochi Hand (SIL Open Font License, vía Google Fonts).</li>
        <li>Fotografías de legajo y fondo de pantalla: [completar fuente].</li>
        <li>Desarrollo web con asistencia de IA (Claude, Anthropic).</li>
      </ul>

      <h4>Licencia</h4>
      <p>
        © 2026 Vladimir Gorosito. Esta obra (contenido y código fuente) se publica bajo licencia{' '}
        <a href={LICENSE_URL} target="_blank" rel="noreferrer license">
          Creative Commons Atribución-CompartirIgual 4.0 (CC BY-SA 4.0)
        </a>
        . Los elementos de terceros conservan sus licencias originales.
      </p>
    </div>
  )
}
