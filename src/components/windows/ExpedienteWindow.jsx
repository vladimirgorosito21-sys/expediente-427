import { useRef } from 'react'
import Window from '../Window'
import { useSeen } from '../useSeen'
import './ExpedienteWindow.css'

export default function ExpedienteWindow({ onReachEnd, ...win }) {
  const bodyRef = useRef(null)
  const endRef = useRef(null)
  useSeen(bodyRef, endRef, onReachEnd)

  return (
    <Window {...win} variant="doc" title="Expediente 427" x={190} y={40} w={1060} h={905} bodyRef={bodyRef}>
      <article className="doc exp">
        <div className="exp__stamp" aria-hidden>CONFIDENCIAL</div>
        <h1 className="doc__title">EXPEDIENTE 427</h1>
        <p className="doc__subtitle">Clasificación: confidencial · Solo para el empleado 427 (que no debería estar leyendo esto)</p>
        <div className="doc__bar exp__bar" />

        <h2 className="doc__h"><span className="num">1.</span>RESUMEN DEL INCIDENTE</h2>
        <div className="doc__rule" />
        <p>
          El día 02/11/2002, a las 24:00 —una hora que técnicamente no existe—, el edificio registró la
          ausencia total de su personal. No hubo alarmas, ni evacuación, ni cajones vaciados. Las tazas
          seguían tibias. Las sillas, levemente giradas hacia la puerta.
        </p>

        <h2 className="doc__h"><span className="num">2.</span>TESTIMONIOS</h2>
        <div className="doc__rule" />
        <p>
          No se obtuvieron testimonios. Se obtuvieron, en cambio, 426 expedientes abiertos. Cada empleado,
          en algún momento de su jornada, encontró en su computadora un archivo con su propio número. Cada
          uno recibió la misma advertencia: no abrir bajo ninguna circunstancia.
        </p>
        <p>Cada uno lo abrió.</p>

        <h2 className="doc__h"><span className="num">3.</span>CONTENIDO DE LOS EXPEDIENTES</h2>
        <div className="doc__rule" />
        <p>
          Todos los expedientes contenían lo mismo: una lista detallada de cada cosa que el empleado había
          hecho porque alguien se lo había indicado. Horarios. Botones. Pasillos. Puertas a la izquierda.
          Reuniones sin tema. El expediente promedio tenía 3.000 páginas.
        </p>
        <p>Ninguno incluía una sola decisión propia.</p>

        <h2 className="doc__h"><span className="num">4.</span>CONCLUSIÓN DEL DEPARTAMENTO</h2>
        <div className="doc__rule" />
        <p>
          Los empleados no desaparecieron. Se fueron. Leyeron la lista, la cerraron y, por primera vez,
          caminaron hacia una puerta que nadie les había señalado. No sabemos adónde. La lista no lo dice.
        </p>
        <p>Esa es, precisamente, la cuestión.</p>

        <h2 className="doc__h"><span className="num">5.</span>NOTA SOBRE EL EMPLEADO 427</h2>
        <div className="doc__rule" />
        <p>
          El empleado 427 fue el último en abrir su expediente. Su lista es la más larga de todas. Durante
          años presionó los botones que la pantalla le pidió y eso, según todos nuestros indicadores, lo
          hizo feliz. O algo parecido a feliz. Algo que no hacía preguntas.
        </p>
        <p>
          Por eso, la pregunta que este documento debe hacerle no es dónde están los demás.
        </p>
        <p className="exp__last" ref={endRef}>
          Es por qué usted sigue aquí.
        </p>
        <p className="exp__sign">— Departamento de Recursos Humanos (lo que queda de él)</p>
      </article>
    </Window>
  )
}
