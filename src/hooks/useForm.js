import { useState } from 'react'
import { validate } from '../utils/validation'

export function useForm(initialValues, rules, onValidSubmit) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target
    setValues((previous) => ({ ...previous, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: undefined }))
    }
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate(values, rules)
    setErrors(nextErrors)

    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus()
      return
    }
    onValidSubmit(values, { reset })
  }

  const fieldProps = (name) => ({
    name,
    value: values[name],
    onChange: handleChange,
    error: errors[name],
  })

  return { values, errors, handleChange, handleSubmit, fieldProps, reset }
}
