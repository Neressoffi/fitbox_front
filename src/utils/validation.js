const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const POSTAL_CODE_PATTERN = /^\d{5}$/

export function isValidEmail(value) {
  return EMAIL_PATTERN.test(value.trim())
}

export function getPasswordError(value) {
  if (value.length < 12) return 'Le mot de passe doit contenir au moins 12 caractères.'
  if (!/[A-Z]/.test(value)) return 'Ajoute au moins une majuscule.'
  if (!/[a-z]/.test(value)) return 'Ajoute au moins une minuscule.'
  if (!/\d/.test(value)) return 'Ajoute au moins un chiffre.'
  return null
}

const required = (label) => (value) => (value.trim() ? null : `${label} est obligatoire.`)

const email = (value) => {
  if (!value.trim()) return "L'adresse e-mail est obligatoire."
  return isValidEmail(value) ? null : "L'adresse e-mail n'est pas valide (exemple : nom@domaine.fr)."
}

export const registerRules = {
  firstName: required('Le prénom'),
  lastName: required('Le nom'),
  email,
  password: (value) => (value ? getPasswordError(value) : 'Le mot de passe est obligatoire.'),
  confirmPassword: (value, values) =>
    value === values.password ? null : 'Les deux mots de passe ne sont pas identiques.',
  terms: (value) => (value ? null : 'Tu dois accepter les conditions générales.'),
}

export const loginRules = {
  email,
  password: (value) => (value ? null : 'Le mot de passe est obligatoire.'),
}

export const contactRules = {
  name: required('Le nom'),
  email,
  message: (value) => (value.trim().length >= 10 ? null : 'Le message doit contenir au moins 10 caractères.'),
}

export const checkoutRules = {
  firstName: required('Le prénom'),
  lastName: required('Le nom'),
  email,
  address: required("L'adresse"),
  postalCode: (value) => (POSTAL_CODE_PATTERN.test(value.trim()) ? null : 'Le code postal doit contenir 5 chiffres.'),
  city: required('La ville'),
}

export function validate(values, rules) {
  return Object.entries(rules).reduce((errors, [field, rule]) => {
    const error = rule(values[field] ?? '', values)
    return error ? { ...errors, [field]: error } : errors
  }, {})
}
