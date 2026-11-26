import { useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import FormField from '../components/ui/FormField'
import Button from '../components/ui/Button'
import Alert from '../components/ui/Alert'
import { useForm } from '../hooks/useForm'
import { contactRules } from '../utils/validation'
import { usePageTitle } from '../hooks/usePageTitle'

const contactDetails = [
  { icon: Mail, label: 'contact@fitbox.fr' },
  { icon: Phone, label: '01 23 45 67 89, du lundi au vendredi de 9 h à 18 h' },
  { icon: MapPin, label: '12 rue des Sports, 75011 Paris' },
]

export default function Contact() {
  usePageTitle('Contact')
  const [sentTo, setSentTo] = useState(null)
  const { fieldProps, handleSubmit } = useForm(
    { name: '', email: '', subject: 'commande', message: '' },
    contactRules,
    (values, { reset }) => {
      setSentTo(values.email)
      reset()
    },
  )

  return (
    <>
      <PageHeader title="Contact" intro="Une question sur une commande, une taille ou la Box ? Notre équipe te répond sous 24 h ouvrées." />

      <div className="container grid gap-12 py-10 md:grid-cols-[1fr_320px] md:py-14">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {sentTo && (
            <Alert title="Message envoyé">Nous te répondrons à l'adresse {sentTo}.</Alert>
          )}
          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Nom" autoComplete="name" {...fieldProps('name')} />
            <FormField label="Adresse e-mail" type="email" autoComplete="email" {...fieldProps('email')} />
          </div>
          <FormField label="Sujet" as="select" {...fieldProps('subject')}>
            <option value="commande">Ma commande</option>
            <option value="box">La Box</option>
            <option value="produit">Un produit</option>
            <option value="autre">Autre</option>
          </FormField>
          <FormField label="Message" as="textarea" rows={6} {...fieldProps('message')} />
          <Button type="submit">Envoyer le message</Button>
        </form>

        <aside className="rounded-carte bg-basalte p-6 text-white">
          <h2 className="font-titre text-xl font-semibold">Nous joindre</h2>
          <ul className="mt-5 space-y-4 text-sm text-cendre-clair">
            {contactDetails.map(({ icon: Icon, label }) => (
              <li key={label} className="flex gap-3">
                <Icon size={18} className="mt-0.5 shrink-0 text-cendre-clair" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  )
}
