import { useEffect, useRef, useState } from 'react'
import './PasswordDialog.css'

// Frames "Desktop - 3" (pide la clave) y "Desktop - 7" (contraseña correcta).
export default function PasswordDialog({ onSubmit, onClose, success }) {
  const [value, setValue] = useState('')
  const [shake, setShake] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const submit = (e) => {
    e.preventDefault()
    if (success) return
    const ok = onSubmit(value)
    if (!ok) {
      setShake((s) => s + 1)
      setValue('')
      inputRef.current?.focus()
    }
  }

  return (
    <>
      <div className="dlg-overlay" onPointerDown={onClose} aria-hidden />
      <form
        key={shake}
        className={`dlg ${shake ? 'dlg--shake' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dlg-title"
        onSubmit={submit}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
      >
        <div className="dlg__bar" />
        <h2 id="dlg-title" className="dlg__title"> Expediente 427</h2>
        <button type="button" className="x-gold dlg__x" onClick={onClose} aria-label="Cerrar">
          X
        </button>
        <p className="dlg__msg">
          ¿Acaso el narrador no le dijo que este archivo
          <br />
          se encuentra prohibido?
        </p>
        <label className="dlg__label" htmlFor="dlg-input">
          inserte la clave
        </label>
        {success ? (
          <p className="dlg__ok" role="status">¡CONTRASEÑA CORRECTA! (ESO ES MALO)</p>
        ) : (
          <input
            id="dlg-input"
            ref={inputRef}
            className="dlg__input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            maxLength={24}
          />
        )}
      </form>
    </>
  )
}
