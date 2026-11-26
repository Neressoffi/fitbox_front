import { CheckCircle2 } from 'lucide-react'

export default function Alert({ title, children }) {
  return (
    <div role="status" className="flex gap-3 rounded-carte border border-ligne bg-brume p-5">
      <CheckCircle2 className="mt-0.5 shrink-0 text-[#1E6B3A]" aria-hidden="true" />
      <div>
        <p className="font-semibold">{title}</p>
        {children && <div className="mt-1 text-sm text-cendre">{children}</div>}
      </div>
    </div>
  )
}
