import { useCallback, useState } from 'react'
import Stage from './components/Stage'
import BootScreen from './components/BootScreen'
import Desktop from './components/Desktop'
import EndingScreen from './components/EndingScreen'
import { NarratorProvider } from './narrator/NarratorContext'

export default function App() {
  // ?escritorio en la URL salta la intro (útil para pruebas y presentaciones)
  const [phase, setPhase] = useState(() =>
    new URLSearchParams(window.location.search).has('escritorio') ? 'desktop' : 'boot',
  ) // boot → desktop → ending
  const [ending, setEnding] = useState(null)
  const [run, setRun] = useState(0)

  const finish = useCallback((kind) => {
    setEnding(kind)
    setPhase('ending')
  }, [])

  const restart = () => {
    setRun((r) => r + 1)
    setEnding(null)
    setPhase('desktop')
  }

  return (
    <Stage>
      {phase === 'boot' && <BootScreen onDone={() => setPhase('desktop')} />}
      {phase !== 'boot' && (
        <NarratorProvider key={run}>
          <Desktop onFinish={finish} inert={phase === 'ending'} />
        </NarratorProvider>
      )}
      {phase === 'ending' && <EndingScreen kind={ending} onRestart={restart} />}
    </Stage>
  )
}
