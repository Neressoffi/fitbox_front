import { Link } from 'react-router-dom'

export default function Logo({ light = false }) {
  return (
    <Link
      to="/"
      className={`flex items-center gap-2 font-titre text-[22px] font-bold tracking-titre ${light ? 'text-white' : 'text-basalte'}`}
    >
      <span className="grid h-8 w-8 place-items-center rounded-bouton bg-lave" aria-hidden="true">
        <svg viewBox="0 0 32 32" className="h-5 w-5">
          <path d="M10 9h13M10 9v14M10 16h9" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      </span>
      FitBox
    </Link>
  )
}
