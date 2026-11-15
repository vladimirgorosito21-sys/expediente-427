import { useRef } from 'react'
import Window from '../Window'
import { useSeen } from '../useSeen'
import e427 from '../../assets/staff/empleado427.jpg'
import e081 from '../../assets/staff/empleado081.jpg'
import e026 from '../../assets/staff/empleado026.jpg'
import e112 from '../../assets/staff/empleado112.jpg'
import './InformeWindow.css'

// Posiciones del frame "Átomo / personal" (866 × 1354): fotos en x=78, campos en x=307.
const PEOPLE = [
  {
    top: 237,
    photo: e427,
    size: 173,
    id: 'N.º 427 · Stanley',
    role: 'Oficina 427',
    note: (clueRef) => (
      <>
        Recibe órdenes a través de su monitor y presiona los botones indicados, en el orden indicado.
        Nunca faltó. Nunca preguntó por qué. Calificación de desempeño:{' '}
        <strong className="clue" ref={clueRef}>11</strong> sobre 10. Nadie en la empresa cuestionó jamás esa cifra.
      </>
    ),
  },
  {
    top: 449,
    photo: e081,
    size: 174,
    id: 'N.º 081',
    role: 'Sala de reuniones B',
    note: () =>
      'Asiste puntualmente a todas las reuniones. No se registran reuniones desde marzo. Sigue asistiendo. Visto por última vez doblando a la izquierda en el pasillo principal, con una carpeta vacía.',
  },
  {
    top: 656,
    photo: e081,
    size: 174,
    id: 'N.º 081',
    role: 'Sala de reuniones B',
    note: () =>
      'Registro duplicado. El sistema insiste en que hay dos empleados 081. Recursos Humanos no pudo confirmar a ninguno de los dos. Se recomienda no preguntarles cuál es el original.',
  },
  {
    top: 862,
    photo: e026,
    size: 171,
    left: 80,
    id: 'N.º 026',
    role: 'Archivo',
    note: () =>
      'Clasificaba la correspondencia por color. Presentó su renuncia por escrito: una hoja en blanco, archivada correctamente en la carpeta «Otros».',
  },
  {
    top: 1069,
    photo: e112,
    size: 172,
    left: 80,
    id: 'N.º 112',
    role: 'Mantenimiento',
    note: () =>
      'Responsable de las puertas del edificio. Reportó que algunas se abrían solas. Fue reubicado del otro lado de una de ellas. La puerta sigue abierta.',
  },
]

export default function InformeWindow({ onClueSeen, clueFound, ...win }) {
  const bodyRef = useRef(null)
  const clueRef = useRef(null)
  useSeen(bodyRef, clueRef, onClueSeen, !clueFound)

  return (
    <Window {...win} variant="doc" title="Informe de personal" x={287} y={49} w={866} h={900} bodyRef={bodyRef}>
      <article className="doc informe">
        <h1 className="doc__title informe__title">INFORME DE PERSONAL</h1>
        <div className="informe__bar" />
        <p className="informe__meta">
          Departamento de Recursos Humanos · Actualizado: 02/11/2002 · Personal presente: 1
        </p>

        {PEOPLE.map((p, i) => (
          <section key={i} className="informe__row" style={{ top: p.top }} aria-label={p.id}>
            <img
              className="informe__photo"
              src={p.photo}
              alt={`Foto de legajo, empleado ${p.id}`}
              style={{ width: p.size, height: p.size, left: p.left ?? 78 }}
            />
            <div className="informe__chip" style={{ top: 0 }}>{p.id}</div>
            <div className="informe__chip" style={{ top: 37 }}>{p.role}</div>
            <p className="informe__note">{p.note(i === 0 ? clueRef : undefined)}</p>
          </section>
        ))}
      </article>
    </Window>
  )
}
