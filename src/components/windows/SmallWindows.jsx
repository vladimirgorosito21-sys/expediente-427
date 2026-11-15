import { useState } from 'react'
import Window from '../Window'
import trashIcon from '../../assets/desktop/trash.svg'
import ieIcon from '../../assets/ui/interweb.svg'
import CreditsContent from '../CreditsContent'
import './SmallWindows.css'

const TRASH = [
  ['ideas_propias.txt', '0 KB', 'Nunca'],
  ['renuncia_borrador_v14.doc', '12 KB', '02/11/2002'],
  ['plano_oficina_ANTIGUO.bmp', '340 KB', '15/03/2002'],
  ['empleados_presentes.xls', '1 KB', '02/11/2002'],
  ['boton_de_ayuda.lnk', '—', 'Desconocida'],
]

export function PapeleraWindow({ onItem, ...win }) {
  return (
    <Window {...win} title="Papelera" icon={trashIcon} x={330} y={230} w={600} h={400}>
      <div className="small">
        <table className="trash">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tamaño</th>
              <th>Eliminado</th>
            </tr>
          </thead>
          <tbody>
            {TRASH.map(([n, s, d]) => (
              <tr key={n} tabIndex={0} onDoubleClick={onItem} onKeyDown={(e) => e.key === 'Enter' && onItem()}>
                <td>{n}</td>
                <td>{s}</td>
                <td>{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="small__status">5 objetos · Vaciar papelera: deshabilitado por el administrador</p>
      </div>
    </Window>
  )
}

export function InterwebWindow({ onRefresh, ...win }) {
  const [count, setCount] = useState(0)
  const refresh = () => {
    const n = count + 1
    setCount(n)
    if (n === 3) onRefresh?.()
  }
  return (
    <Window {...win} title="La Interweb" icon={ieIcon} x={250} y={110} w={860} h={600}>
      <div className="small web">
        <div className="web__bar">
          <span>◄ Atrás</span>
          <span>► Adelante</span>
          <button className="web__btn" onClick={refresh}>⟳ Actualizar</button>
          <span>⌂ Inicio</span>
        </div>
        <div className="web__address">
          <span>Dirección</span>
          <div className="web__field">http://www.afuera.com/</div>
        </div>
        <div className="web__page" key={count}>
          <h3>No se puede mostrar la página</h3>
          <p>La página que está buscando no está disponible. Puede deberse a que:</p>
          <ul>
            <li>Su empresa no pagó la interweb.</li>
            <li>El mundo exterior no figura en el manual del empleado.</li>
            <li>No hay nadie del otro lado.</li>
          </ul>
          <p>Intente lo siguiente:</p>
          <ul>
            <li>Haga clic en el botón <strong>Actualizar</strong>.</li>
            <li>Vuelva a intentarlo más tarde. (No vuelva más tarde).</li>
          </ul>
          <p className="web__code">Error 427: el empleado no tiene permiso para salir.{count > 0 && ` (Intentos: ${count})`}</p>
        </div>
      </div>
    </Window>
  )
}

export function CreditosWindow(win) {
  return (
    <Window {...win} title="Créditos" x={300} y={70} w={840} h={820}>
      <div className="small credits-win">
        <CreditsContent />
      </div>
    </Window>
  )
}
