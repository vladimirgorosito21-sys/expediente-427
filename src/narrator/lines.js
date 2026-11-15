// Todas las líneas del narrador. Tono: irónico, en tercera persona sobre Stanley,
// con algún comentario dirigido directamente a quien juega.

export const INTRO = [
  'Stanley se sentó frente a su computadora. La oficina seguía vacía, el café seguía frío y nadie le había dicho qué hacer. Así que Stanley hizo lo único que sabía hacer: mirar la pantalla y esperar instrucciones.',
  'Ahí estaban sus archivos de siempre. Y uno que no recordaba: «Expediente 427. Confidencial. No abrir bajo ninguna circunstancia». Stanley, que siempre obedece, decidió ignorarlo. Seguramente.',
  'Un detalle técnico, porque el narrador es generoso: los íconos se abren con doble clic. Y si Stanley se pierde, puede hacer clic en el narrador. El narrador siempre está disponible. Lamentablemente.',
]

export const OPEN = {
  expedienteFirst:
    'Por supuesto. Una advertencia en mayúsculas, y Stanley fue directo hacia ella. El archivo pide una clave, Stanley. Las claves existen precisamente para gente como usted.',
  expedienteAgain: [
    'De nuevo frente a la puerta cerrada. Stanley tiene una relación complicada con las puertas.',
    'El expediente sigue esperando. Con más paciencia que Stanley, evidentemente.',
    'Otra vez aquí. Si las pistas aparecieran por insistencia, Stanley ya habría terminado.',
  ],
  manual:
    'El manual del empleado. Cientos de reglas para no tener que pensar. Stanley lo leyó con atención, como quien busca su propio nombre en una lista.',
  informe:
    'El informe de personal. Rostros que Stanley veía todos los días y cuyos nombres nunca se molestó en aprender. En su defensa, ellos tampoco aprendieron el suyo.',
  camaras:
    'Las cámaras de seguridad. Stanley esperaba ver a alguien. A cualquiera. Lo que encontró fue algo mucho peor: orden absoluto.',
  papelera:
    'La papelera. Donde la empresa guarda lo que prefiere no recordar. Stanley no encontró nada útil, lo cual, pensándolo bien, también dice bastante de la empresa.',
  interweb:
    'La interweb. Una ventana al mundo exterior. Cerrada, claro. El mundo exterior no figura en el manual del empleado.',
  creditos:
    'Los créditos. Una lista de personas que sí tomaron decisiones. Stanley la miró con una mezcla de admiración y envidia.',
}

// Solo se dice una vez, cuando ya vio las dos pistas. No las nombra.
export const CLUES = {
  both: 'Stanley tuvo la incómoda sensación de que ya sabía algo que no debía saber. Para alguien acostumbrado a recibir instrucciones, era una sensación completamente nueva.',
}

export function hintFor({ me, once, unlocked }) {
  if (unlocked)
    return 'El expediente está abierto, Stanley. Ya no hay vuelta atrás. Bueno, siempre hay vuelta atrás. Pero no así.'
  if (me && once)
    return 'Stanley tenía todo lo que necesitaba. Simplemente no lo sabía todavía. Una situación con la que estaba muy familiarizado.'
  if (me || once)
    return 'Algo había quedado dando vueltas en la cabeza de Stanley. Pero una pieza suelta es solo eso: una pieza. Y en esta empresa nada viene solo.'
  return 'Stanley miró su escritorio esperando una señal. Las empresas tienen la costumbre de esconder lo importante donde nadie mira: en lo que nadie se toma el trabajo de leer.'
}

const WRONG = [
  'Incorrecto. El sistema registró el intento. El narrador también. Ambos estamos decepcionados.',
  'Tampoco. Las claves no se adivinan, Stanley. Aunque nadie lo diría viéndolo intentar.',
  'Stanley probó otra combinación. En algún lugar, una persona que lee los manuales completos sonrió con superioridad.',
  'El sistema rechazó la clave con la indiferencia de quien vio miles de intentos. Ninguno, curiosamente, prestó atención a los detalles.',
  'El expediente no se abre a fuerza de voluntad. Ni a fuerza de teclado.',
]

export function wrongLine(value, attempt) {
  const v = value.replace(/\s+/g, '').toUpperCase()
  if (!v) return 'Stanley presionó Enter sin escribir nada. Una estrategia audaz. Inútil, pero audaz.'
  if (v === '11ME')
    return 'Stanley sintió que estaba cerca. El narrador también lo sintió, y no le gustó nada. En esta empresa, sin embargo, las cosas tienen un orden.'
  if (v === '427')
    return '¿Su propio número? Stanley, la empresa jamás usaría algo tan predecible. Bueno, casi jamás.'
  if (v === '1234' || v === '0000' || v === 'CONTRASEÑA' || v === 'PASSWORD')
    return 'Una clave que usaría cualquiera. Y precisamente por eso, no.'
  if (v === 'STANLEY')
    return 'Stanley escribió su propio nombre. Un gesto conmovedor. Y completamente inútil.'
  return WRONG[attempt % WRONG.length]
}

export const CORRECT =
  'Contraseña correcta. Stanley sintió el pequeño orgullo de quien resuelve un acertijo. El narrador sintió algo muy distinto.'

export const FINAL_CHOICE =
  'Y así Stanley entendió que el silencio de la oficina no era una ausencia, sino una puerta abierta. Podía cerrar el expediente, volver a su silla y esperar la próxima instrucción. O podía, por primera vez, no esperar nada.'

export const CHAIR_LINE = [
  'Claro. Alguien tiene que presionar los botones. Stanley cerró el expediente, acomodó la silla y apoyó las manos sobre el teclado.',
  'La pantalla no dijo nada. Stanley esperó. Y esperó. Es, después de todo, lo que mejor sabe hacer.',
]

export const MISC = {
  watermark:
    'Wingows no está activado. Stanley tampoco, si somos honestos.',
  clock:
    'Las 24:00. Una hora que no existe, en un día que no termina. Stanley lleva un buen rato mirándola.',
  volume:
    'Stanley subió el volumen. El silencio de la oficina se escuchó todavía más fuerte.',
  network:
    'Sin conexión. Nadie paga la interweb. Nadie paga nada, en realidad. No queda nadie para pagar.',
  showDesktop:
    'Escritorio despejado. Ojalá todo fuera tan fácil de despejar.',
  music:
    'Música. Stanley nunca había escuchado música en horario laboral. Se sintió peligrosamente vivo.',
  cam427:
    'Oficina 427. Una persona detectada. Salude, Stanley. Ah, ya lo hizo. Siempre llega un segundo tarde a sus propias decisiones.',
  camPlace:
    'Stanley hizo clic en un acceso directo de la red. Nada. Todo lo que no es una cámara está, convenientemente, fuera de servicio.',
  trashItem:
    'Los archivos de la papelera no pueden abrirse. Como casi todo lo que la empresa decidió descartar.',
  refresh:
    'Stanley actualizó la página tres veces. La página, fiel a su puesto, siguió sin mostrar nada.',
  controlPanel:
    'El panel de control. Stanley no tiene permisos para controlar nada. Nunca los tuvo. Ese era, más o menos, el punto.',
  shutdownEarly:
    '¿Apagar la computadora? Huir es una opción, claro. Pero la oficina va a seguir vacía mañana. Y pasado. ¿Está seguro, Stanley?',
  logo:
    'Ese logo no es suyo, Stanley. Usted es un personaje dentro de él. Hay una diferencia.',
}
