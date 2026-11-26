import SectionHeading from '../ui/SectionHeading'
import Rating from '../ui/Rating'
import { reviews } from '../../data/reviews'

function initials(name) {
  return name
    .split(/[\s-]/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
}

export default function Testimonials() {
  return (
    <section aria-labelledby="avis-clients" className="bg-brume py-10 md:py-20">
      <div className="container">
        <SectionHeading id="avis-clients" eyebrow="Avis communauté" title="Ce qu'en disent nos clients" align="center" />
        <ul className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
          {reviews.map((review) => (
            <li key={review.id}>
              <figure className="h-full rounded-carte border border-ligne bg-white p-6">
                <figcaption className="mb-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-basalte text-sm font-semibold text-white" aria-hidden="true">
                    {initials(review.author)}
                  </span>
                  <div>
                    <p className="font-semibold">{review.author}</p>
                    <Rating value={review.rating} />
                  </div>
                </figcaption>
                <blockquote className="text-[15px] text-cendre">« {review.text} »</blockquote>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
