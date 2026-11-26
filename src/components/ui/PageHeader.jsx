export default function PageHeader({ title, intro, children }) {
  return (
    <div className="border-b border-ligne bg-brume">
      <div className="container py-10 md:py-14">
        {children}
        <h1 className="font-titre text-[32px] font-bold tracking-titre md:text-5xl">{title}</h1>
        {intro && <p className="mt-3 max-w-2xl text-cendre">{intro}</p>}
      </div>
    </div>
  )
}
