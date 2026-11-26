import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import FormField from '../components/ui/FormField'
import Button from '../components/ui/Button'
import Alert from '../components/ui/Alert'
import { useCart } from '../hooks/useCart'
import { useForm } from '../hooks/useForm'
import { checkoutRules } from '../utils/validation'
import { formatPrice } from '../utils/formatPrice'
import { getShippingCost } from '../utils/shipping'
import { usePageTitle } from '../hooks/usePageTitle'

const initialValues = { firstName: '', lastName: '', email: '', address: '', postalCode: '', city: '', delivery: 'relais' }

export default function Checkout() {
  usePageTitle('Commande')
  const { items, subtotal, clearCart } = useCart()
  const [order, setOrder] = useState(null)
  const shipping = getShippingCost(subtotal)

  const { fieldProps, values, handleChange, handleSubmit } = useForm(initialValues, checkoutRules, (formValues) => {
    setOrder({ number: `FB-${Date.now().toString().slice(-6)}`, email: formValues.email, total: subtotal + shipping })
    clearCart()
  })

  if (order) {
    return (
      <>
        <PageHeader title="Merci pour ta commande" />
        <div className="container max-w-2xl py-12">
          <Alert title={`Commande ${order.number} enregistrée`}>
            Un récapitulatif de {formatPrice(order.total)} sera envoyé à {order.email}. Le paiement en ligne sera activé avec la mise en service du back-end.
          </Alert>
          <Button to="/boutique" variant="secondary" className="mt-6">Continuer mes achats</Button>
        </div>
      </>
    )
  }

  if (items.length === 0) return <Navigate to="/panier" replace />

  return (
    <>
      <PageHeader title="Livraison" intro="Encore une étape : indique où tu veux recevoir ta commande." />
      <div className="container grid gap-10 py-10 md:grid-cols-[1fr_340px] md:py-14">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Prénom" autoComplete="given-name" {...fieldProps('firstName')} />
            <FormField label="Nom" autoComplete="family-name" {...fieldProps('lastName')} />
          </div>
          <FormField label="Adresse e-mail" type="email" autoComplete="email" {...fieldProps('email')} />
          <FormField label="Adresse" autoComplete="street-address" {...fieldProps('address')} />
          <div className="grid gap-5 md:grid-cols-[160px_1fr]">
            <FormField label="Code postal" inputMode="numeric" autoComplete="postal-code" {...fieldProps('postalCode')} />
            <FormField label="Ville" autoComplete="address-level2" {...fieldProps('city')} />
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold">Mode de livraison</legend>
            {[
              { value: 'relais', label: 'Point relais (48 h)' },
              { value: 'domicile', label: 'À domicile (48 à 72 h)' },
            ].map((option) => (
              <label key={option.value} className="flex min-h-11 items-center gap-3">
                <input type="radio" name="delivery" value={option.value} checked={values.delivery === option.value} onChange={handleChange} className="h-[18px] w-[18px] accent-lave" />
                {option.label}
              </label>
            ))}
          </fieldset>

          <Button type="submit">Valider la commande · {formatPrice(subtotal + shipping)}</Button>
        </form>

        <aside className="h-fit rounded-carte border border-ligne p-6" aria-labelledby="resume-commande">
          <h2 id="resume-commande" className="font-titre text-xl font-semibold">Ta commande</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between gap-4">
                <span>{item.quantity} × {item.name}</span>
                <span className="tabular-nums">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex justify-between border-t border-ligne pt-3 font-bold">
            <span>Total</span>
            <span className="tabular-nums">{formatPrice(subtotal + shipping)}</span>
          </p>
        </aside>
      </div>
    </>
  )
}
