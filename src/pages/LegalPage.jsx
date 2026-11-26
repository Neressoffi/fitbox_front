import PageHeader from '../components/ui/PageHeader'
import { usePageTitle } from '../hooks/usePageTitle'

export default function LegalPage({ title, sections }) {
  usePageTitle(title)

  return (
    <>
      <PageHeader title={title} />
      <div className="container max-w-3xl space-y-8 py-10 md:py-14">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-titre text-xl font-semibold">{section.heading}</h2>
            <p className="mt-2 text-cendre">{section.text}</p>
          </section>
        ))}
      </div>
    </>
  )
}
