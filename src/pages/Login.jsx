import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import FormField from '../components/ui/FormField'
import Button from '../components/ui/Button'
import Alert from '../components/ui/Alert'
import { useForm } from '../hooks/useForm'
import { loginRules } from '../utils/validation'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Login() {
  usePageTitle('Connexion')
  const [submitted, setSubmitted] = useState(false)
  const { fieldProps, handleSubmit } = useForm({ email: '', password: '' }, loginRules, () => setSubmitted(true))

  return (
    <>
      <PageHeader title="Connexion" />
      <div className="container max-w-md py-10 md:py-14">
        {submitted ? (
          <Alert title="Formulaire valide">La connexion sera active dès la mise en service du back-end.</Alert>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <FormField label="Adresse e-mail" type="email" autoComplete="email" {...fieldProps('email')} />
            <FormField label="Mot de passe" type="password" autoComplete="current-password" {...fieldProps('password')} />
            <Button type="submit" className="w-full">Se connecter</Button>
          </form>
        )}
        <p className="mt-6 text-center text-sm text-cendre">
          Pas encore de compte ?{' '}
          <Link to="/inscription" className="font-semibold text-lave underline">Créer un compte</Link>
        </p>
      </div>
    </>
  )
}
