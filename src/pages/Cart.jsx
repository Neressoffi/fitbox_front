import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/formatPrice'
import { FREE_SHIPPING_THRESHOLD, getShippingCost } from '../utils/shipping'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Cart() {
  usePageTitle('Panier')
  const { items, subtotal, updateQuantity, removeItem } = useCart()
  const shipping = getShippingCost(subtotal)

  if (items.length === 0) {
    return (
      <>
        <PageHeader title="Ton panier" />
        <div className="container py-16 text-center">
          <p className="text-lg font-semibold">Ton panier est vide.</p>
          <p className="mt-2 text-cendre">Regarde la tenue du jour ou parcours la boutique.</p>
          <Button to="/boutique" className="mt-6">Voir la boutique</Button>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHeader title="Ton panier" />
      <div className="container grid gap-10 py-10 md:grid-cols-[1fr_340px] md:py-14">
        <ul className="divide-y divide-ligne border-y border-ligne">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4 py-5">
              <Link to={`/produit/${item.slug}`} className="w-20 shrink-0 overflow-hidden rounded-carte bg-brume md:w-24">
                <img src={item.image} alt={item.imageAlt} className="aspect-[4/5] w-full object-cover" />
              </Link>
              <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-semibold">
                    <Link to={`/produit/${item.slug}`} className="hover:underline">{item.name}</Link>
                  </h2>
                  <p className="text-sm text-cendre tabular-nums">{formatPrice(item.price)} l'unité</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-bouton border border-ligne" role="group" aria-label={`Quantité de ${item.name}`}>
                    <button type="button" className="grid h-11 w-11 place-items-center" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Retirer un article">
                      <Minus size={16} />
                    </button>
                    <span className="w-6 text-center font-semibold">{item.quantity}</span>
                    <button type="button" className="grid h-11 w-11 place-items-center" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Ajouter un article">
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="w-20 text-right font-bold tabular-nums">{formatPrice(item.price * item.quantity)}</p>
                  <button type="button" onClick={() => removeItem(item.id)} className="grid h-11 w-11 place-items-center rounded-full text-cendre hover:bg-brume hover:text-basalte" aria-label={`Supprimer ${item.name} du panier`}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-carte border border-ligne p-6" aria-labelledby="recapitulatif">
          <h2 id="recapitulatif" className="font-titre text-xl font-semibold">Récapitulatif</h2>
          <dl className="mt-5 space-y-3 text-[15px]">
            <div className="flex justify-between">
              <dt>Sous-total</dt>
              <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Livraison</dt>
              <dd className="tabular-nums">{shipping === 0 ? 'Offerte' : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-ligne pt-3 text-lg font-bold">
              <dt>Total</dt>
              <dd className="tabular-nums">{formatPrice(subtotal + shipping)}</dd>
            </div>
          </dl>
          {shipping > 0 && (
            <p className="mt-3 text-sm text-cendre">
              Plus que {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} pour la livraison gratuite.
            </p>
          )}
          <Button to="/commande" className="mt-6 w-full">Passer la commande</Button>
        </aside>
      </div>
    </>
  )
}
