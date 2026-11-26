import { getPasswordError, isValidEmail, registerRules, validate } from './validation'

describe('validation', () => {
  it('reconnaît une adresse e-mail valide', () => {
    expect(isValidEmail('maeva@fitbox.fr')).toBe(true)
    expect(isValidEmail('maeva@fitbox')).toBe(false)
  })

  it('exige un mot de passe robuste', () => {
    expect(getPasswordError('court')).toMatch(/12 caractères/)
    expect(getPasswordError('motdepasselong1')).toMatch(/majuscule/)
    expect(getPasswordError('MotDePasseSolide1')).toBeNull()
  })

  it('signale chaque champ manquant du formulaire d\'inscription', () => {
    const errors = validate(
      { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', terms: false },
      registerRules,
    )
    expect(Object.keys(errors)).toEqual(['firstName', 'lastName', 'email', 'password', 'terms'])
  })

  it('vérifie que les deux mots de passe sont identiques', () => {
    const errors = validate(
      { firstName: 'Ana', lastName: 'B', email: 'a@b.fr', password: 'MotDePasseSolide1', confirmPassword: 'Autre', terms: true },
      registerRules,
    )
    expect(errors).toEqual({ confirmPassword: 'Les deux mots de passe ne sont pas identiques.' })
  })
})
