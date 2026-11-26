import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-lave text-white hover:bg-lave-hover',
  dark: 'bg-basalte text-white hover:bg-ardoise',
  secondary: 'border border-basalte text-basalte hover:bg-brume',
  light: 'border border-white text-white hover:bg-white/10',
  disabled: 'bg-ligne text-cendre cursor-not-allowed',
}

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-bouton px-5 py-3 text-[15px] font-semibold transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-lave-clair'

export default function Button({ to, href, variant = 'primary', className = '', children, ...props }) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
