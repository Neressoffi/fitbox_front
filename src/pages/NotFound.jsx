import Button from '../components/ui/Button'
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('Page introuvable')

  return (
    <div className="container py-24 text-center">
      <p className="font-titre text-6xl font-bold text-cendre-clair">404</p>
      <h1 className="mt-4 font-titre text-[32px] font-bold tracking-titre">Cette page n'existe pas.</h1>
      <p className="mt-2 text-cendre">Le lien est peut-être ancien, ou le produit n'est plus en vente.</p>
      <Button to="/" className="mt-8">Retour à l'accueil</Button>
    </div>
  )
}
