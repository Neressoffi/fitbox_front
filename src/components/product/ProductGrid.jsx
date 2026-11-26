import ProductCard from './ProductCard'

export default function ProductGrid({ products, columns = 'lg:grid-cols-4' }) {
  return (
    <ul className={`grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:gap-6 ${columns}`}>
      {products.map((product) => (
        <li key={product.id} className="flex">
          <div className="h-full w-full">
            <ProductCard product={product} />
          </div>
        </li>
      ))}
    </ul>
  )
}
