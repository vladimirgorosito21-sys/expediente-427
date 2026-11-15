import { LICENSE_URL } from '../links'
import './LicenseNote.css'

/** Mención de licencia visible: © 2026 Vladimir Gorosito · CC BY-SA 4.0 */
export default function LicenseNote({ className = '' }) {
  return (
    <p className={`license-note ${className}`}>
      <span aria-hidden className="license-note__badge">
        <span>cc</span>
        <span>by</span>
        <span>sa</span>
      </span>
      © 2026 Vladimir Gorosito ·{' '}
      <a href={LICENSE_URL} target="_blank" rel="noreferrer license">
        CC BY-SA 4.0
      </a>
    </p>
  )
}
