import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, ShoppingCart, User, X } from 'lucide-react'
import Logo from './Logo'
import { useCart } from '../../hooks/useCart'

const links = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/boutique', label: 'Boutique' },
  { to: '/la-box', label: 'La Box' },
  { to: '/contact', label: 'Contact' },
]

const iconButton =
  'relative grid h-11 w-11 place-items-center rounded-full text-basalte hover:bg-brume focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-lave-clair'

function navClass({ isActive }) {
  return `border-b-2 py-1 text-[15px] font-medium transition-colors ${
    isActive ? 'border-lave text-basalte' : 'border-transparent text-cendre hover:text-basalte'
  }`
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { count } = useCart()
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-ligne bg-white">
      <div className="container flex h-16 items-center justify-between">
        <Logo />

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex gap-8">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.end} className={navClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <Link to="/connexion" className={iconButton} aria-label="Mon compte">
            <User size={20} />
          </Link>
          <Link to="/panier" className={iconButton} aria-label={`Panier, ${count} article${count > 1 ? 's' : ''}`}>
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute right-1 top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-lave px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            className={`${iconButton} md:hidden`}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="menu-mobile" aria-label="Navigation mobile" className="border-t border-ligne md:hidden">
          <ul className="container flex flex-col py-2">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block py-3 text-base font-medium ${isActive ? 'text-lave' : 'text-basalte'}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
