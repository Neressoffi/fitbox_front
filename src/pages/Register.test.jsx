import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Register from './Register'
import { renderWithProviders } from '../test-utils'

describe('Register', () => {
  it('affiche les erreurs et place le focus sur le premier champ invalide', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Register />)

    await user.click(screen.getByRole('button', { name: 'Créer mon compte' }))

    expect(screen.getByText('Le prénom est obligatoire.')).toBeInTheDocument()
    expect(screen.getByLabelText('Prénom')).toHaveFocus()
    expect(screen.getByLabelText('Prénom')).toHaveAttribute('aria-invalid', 'true')
  })

  it('confirme l\'inscription quand le formulaire est valide', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Register />)

    await user.type(screen.getByLabelText('Prénom'), 'Maeva')
    await user.type(screen.getByLabelText('Nom'), 'Martin')
    await user.type(screen.getByLabelText('Adresse e-mail'), 'maeva@exemple.fr')
    await user.type(screen.getByLabelText('Mot de passe'), 'MotDePasseSolide1')
    await user.type(screen.getByLabelText('Confirmer le mot de passe'), 'MotDePasseSolide1')
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: 'Créer mon compte' }))

    expect(screen.getByText('Bienvenue Maeva !')).toBeInTheDocument()
  })
})
