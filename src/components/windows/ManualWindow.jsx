import { useRef } from 'react'
import Window from '../Window'
import { useSeen } from '../useSeen'
import './ManualWindow.css'

// Contenido y posiciones tomados del frame "Átomo / Manual de empleado" (1153 × 1999).
const RULES = [483, 754, 1081, 1426, 1790]

export default function ManualWindow({ onClueSeen, clueFound, ...win }) {
  const bodyRef = useRef(null)
  const clueRef = useRef(null)
  useSeen(bodyRef, clueRef, onClueSeen, !clueFound)

  return (
    <Window {...win} variant="doc" title="Manual del empleado" x={143} y={51} w={1153} h={900} bodyRef={bodyRef}>
      <article className="doc manual">
        <h1 className="doc__title" style={{ top: 74 }}>MANUAL DEL EMPLEADO</h1>
        <p className="doc__subtitle" style={{ top: 119 }}>Departamento de Recursos Humanos</p>
        <div className="doc__bar" style={{ top: 171, width: 965 }} />

        <p style={{ top: 230 }}>
          ¡Felicitaciones! Ha sido seleccionado para formar parte de una organización comprometida con la
          excelencia, la productividad y el cumplimiento de sus objetivos.
        </p>
        <p style={{ top: 305 }}>
          Este manual contiene toda la información necesaria para garantizar una experiencia laboral
          satisfactoria. Le recomendamos leerlo atentamente. No hacerlo podría generar inconvenientes que
          preferimos no detallar
        </p>

        <h2 className="doc__h" style={{ top: 442 }}><span className="num">1.</span>HORARIO LABORAL</h2>
        <p style={{ top: 521 }}>
          La jornada comienza a las 9:00 y finaliza a las 17:00. Se espera que todos los empleados se
          encuentren en sus puestos de trabajo al inicio de la jornada.
        </p>
        <p style={{ top: 588 }}>
          Si llega antes de las 9:00, espere en su escritorio. Si llega después de las 9:00, no se preocupe.
          Nadie parece haber notado la diferencia.
        </p>

        <h2 className="doc__h" style={{ top: 711 }}><span className="num">2.</span>SU PUESTO DE TRABAJO</h2>
        <p style={{ top: 790 }}>
          Cada empleado dispone de un escritorio, una computadora y todos los elementos necesarios para
          desarrollar sus funciones.
        </p>
        <div className="manual__block" style={{ top: 857 }}>
          <p>
            Por favor, no modifique la distribución de la oficina. Los escritorios han sido colocados
            siguiendo un criterio cuidadosamente estudiado por profesionales que ya no trabajan aquí.
          </p>
          <p>
            No intercambie su escritorio con otro empleado. No pregunte por qué algunos escritorios
            permanecen vacíos.
          </p>
        </div>

        <h2 className="doc__h" style={{ top: 1030 }}><span className="num">3.</span>NORMAS DE CONVIVENCIA</h2>
        <div className="manual__block manual__block--tight" style={{ top: 1110 }}>
          <p>Para mantener un ambiente laboral saludable, solicitamos:</p>
          <ul>
            <li>Saludar cordialmente a sus compañeros.</li>
            <li>Mantener el orden de los espacios comunes.</li>
            <li>Evitar conversaciones innecesarias.</li>
            <li>No ingresar en oficinas que no le hayan sido asignadas.</li>
            <li>No responder a voces provenientes de habitaciones vacías.</li>
          </ul>
          <p>Recuerde: somos un equipo. Aunque no siempre podamos verlo.</p>
        </div>

        <h2 className="doc__h" style={{ top: 1372, left: 92 }}><span className="num">4.</span>USO DE LA COMPUTADORA</h2>
        <div className="manual__block" style={{ top: 1475 }}>
          <p>Su computadora es una herramienta de trabajo. Utilícela exclusivamente para las tareas asignadas.</p>
          <p>No intente acceder a archivos de otros empleados. No abra documentos marcados como CONFIDENCIAL.</p>
          <p>Si encuentra archivos que no recuerda haber creado, no los elimine. Es posible que sean importantes para alguien.</p>
          <p>
            En caso de que su computadora reproduzca una grabación sin que usted haya dado la orden,
            comuníquese con el departamento de Sistemas. Si no obtiene respuesta, vuelva a intentarlo.
          </p>
        </div>

        <h2 className="doc__h" style={{ top: 1725 }}>
          <span className="num">5.</span>UN ÚLTIMO <span className="clue" ref={clueRef}>ME</span>NSAJE
        </h2>
        <div className="manual__block" style={{ top: 1825 }}>
          <p>En nuestra empresa creemos que cada empleado es una pieza indispensable de un mecanismo mucho más grande.</p>
          <p>Su trabajo importa. Su presencia importa. Y, sobre todo, su permanencia importa.</p>
          <p>Esperamos que disfrute de su estadía con nosotros.</p>
        </div>

        {RULES.map((top) => (
          <div key={top} className="doc__rule" style={{ top, left: 92, width: 970 }} />
        ))}
      </article>
    </Window>
  )
}
