import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import FormField from '../components/ui/FormField'
import Button from '../components/ui/Button'
import Alert from '../components/ui/Alert'
import { useForm } from '../hooks/useForm'
import { registerRules } from '../utils/validation'
import { usePageTitle } from '../hooks/usePageTitle'

const initialValues = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', terms: false }

export default function Register() {
  usePageTitle('Créer un compte')
  const [createdFor, setCreatedFor] = useState(null)
  const { fieldProps, values, errors, handleChange, handleSubmit } = useForm(initialValues, registerRules, (formValues) =>
    setCreatedFor(formValues.firstName),
  )

  if (createdFor) {
    return (
      <>
        <PageHeader title="Créer un compte" />
        <div className="container max-w-md py-12">
          <Alert title={`Bienvenue ${createdFor} !`}>
            Ton inscription est prête à être enregistrée. La création réelle du compte sera reliée au back-end.
          </Alert>
          <Button to="/" variant="secondary" className="mt-6">Retour à l'accueil</Button>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHeader title="Créer un compte" intro="Retrouve tes commandes, gère ta Box et reçois chaque matin la tenue du jour." />
      <div className="container max-w-lg py-10 md:py-14">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Prénom" autoComplete="given-name" {...fieldProps('firstName')} />
            <FormField label="Nom" autoComplete="family-name" {...fieldProps('lastName')} />
          </div>
          <FormField label="Adresse e-mail" type="email" autoComplete="email" {...fieldProps('email')} />
          <div>
            <FormField label="Mot de passe" type="password" autoComplete="new-password" {...fieldProps('password')} />
            {!errors.password && (
              <p className="mt-1.5 text-sm text-cendre">12 caractères minimum, avec une majuscule, une minuscule et un chiffre.</p>
            )}
          </div>
          <FormField label="Confirmer le mot de passe" type="password" autoComplete="new-password" {...fieldProps('confirmPassword')} />

          <div>
            <label className="flex items-start gap-3 text-sm">
              <input
                id="terms"
                type="checkbox"
                name="terms"
                checked={values.terms}
                onChange={handleChange}
                aria-invalid={errors.terms ? 'true' : undefined}
                aria-describedby={errors.terms ? 'terms-erreur' : undefined}
                className="mt-0.5 h-[18px] w-[18px] accent-lave"
              />
              <span>
                J'accepte les <Link to="/cgv" className="underline">conditions générales</Link> et la{' '}
                <Link to="/confidentialite" className="underline">politique de confidentialité</Link>.
              </span>
            </label>
            {errors.terms && <p id="terms-erreur" className="mt-1.5 text-sm text-[#B42318]">{errors.terms}</p>}
          </div>

          <Button type="submit" className="w-full">Créer mon compte</Button>
        </form>
        <p className="mt-6 text-center text-sm text-cendre">
          Déjà inscrit ? <Link to="/connexion" className="font-semibold text-lave underline">Se connecter</Link>
        </p>
      </div>
    </>
  )
}
