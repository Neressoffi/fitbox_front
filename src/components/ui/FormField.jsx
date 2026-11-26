export default function FormField({ label, name, type = 'text', error, as = 'input', className = '', ...props }) {
  const Field = as
  const errorId = `${name}-erreur`

  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      <Field
        id={name}
        name={name}
        type={as === 'input' ? type : undefined}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-bouton border px-3 py-2.5 text-[15px] outline-none transition-colors focus:border-basalte focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-lave-clair ${
          error ? 'border-[#B42318]' : 'border-ligne'
        }`}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-[#B42318]">
          {error}
        </p>
      )}
    </div>
  )
}
