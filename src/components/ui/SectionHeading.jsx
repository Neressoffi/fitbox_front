export default function SectionHeading({ eyebrow, title, intro, id, align = 'left', dark = false }) {
  const alignment = align === 'center' ? 'text-center mx-auto' : ''

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p className={`mb-2 text-[13px] font-semibold uppercase tracking-wide ${dark ? 'text-cendre-clair' : 'text-cendre'}`}>
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="font-titre text-[26px] font-bold leading-tight tracking-titre md:text-[32px]">
        {title}
      </h2>
      {intro && <p className={`mt-3 ${dark ? 'text-cendre-clair' : 'text-cendre'}`}>{intro}</p>}
    </div>
  )
}
