export const sortOptions = [
  { value: 'pertinence', label: 'Pertinence' },
  { value: 'prix-croissant', label: 'Prix croissant' },
  { value: 'prix-decroissant', label: 'Prix décroissant' },
  { value: 'note', label: 'Mieux notés' },
]

const sorters = {
  'prix-croissant': (a, b) => a.price - b.price,
  'prix-decroissant': (a, b) => b.price - a.price,
  note: (a, b) => b.rating - a.rating,
}

export function filterProducts(products, { categories = [], maxPrice, sort = 'pertinence' }) {
  const filtered = products.filter((product) => {
    const inCategory = categories.length === 0 || categories.includes(product.category)
    const inBudget = !maxPrice || product.price <= maxPrice
    return inCategory && inBudget
  })

  const sorter = sorters[sort]
  return sorter ? [...filtered].sort(sorter) : filtered
}
