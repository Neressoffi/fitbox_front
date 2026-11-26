import { Star } from 'lucide-react'

export default function Rating({ value, count }) {
  const rounded = Math.round(value)

  return (
    <div className="flex items-center gap-1.5">
      <span className="sr-only">Note : {value.toString().replace('.', ',')} sur 5</span>
      <span className="flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={star <= rounded ? 'fill-basalte text-basalte' : 'text-cendre-clair'}
          />
        ))}
      </span>
      {count !== undefined && <span className="text-xs text-cendre">({count})</span>}
    </div>
  )
}
