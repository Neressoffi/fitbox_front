import { Link } from 'react-router-dom'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from './SocialIcons'
import Logo from './Logo'

const columns = [
  {
    title: "L'univers FitBox",
    links: [
      { to: '/boutique', label: 'La boutique' },
      { to: '/la-box', label: 'La Box par abonnement' },
      { to: '/contact', label: 'Nous contacter' },
    ],
  },
  {
    title: 'Informations',
    links: [
      { to: '/mentions-legales', label: 'Mentions légales' },
      { to: '/confidentialite', label: 'Politique de confidentialité' },
      { to: '/cgv', label: 'CGV' },
    ],
  },
]

const socials = [
  { label: 'Instagram', icon: InstagramIcon },
  { label: 'Facebook', icon: FacebookIcon },
  { label: 'YouTube', icon: YoutubeIcon },
]

export default function Footer() {
  return (
    <footer className="bg-basalte text-white">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-xs text-sm text-cendre-clair">
            Vêtements techniques et matériel d'entraînement, avec une recommandation de tenue adaptée à la météo du jour.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-wide">{column.title}</h2>
            <ul className="space-y-2.5">
              {column.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-cendre-clair hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-ardoise">
        <div className="container flex flex-col gap-4 py-6 text-xs text-cendre-clair md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} FitBox · Site réalisé dans le cadre d'un projet de formation.</p>
          <ul className="flex gap-2">
            {socials.map(({ label, icon: Icon }) => (
              <li key={label}>
                <a
                  href="#"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-ardoise text-white hover:bg-ardoise"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
