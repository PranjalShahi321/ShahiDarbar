import ProductCard from "./ProductCard"

const products = [
  {
    name: "Fresh Tomatoes",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337",
  },
  {
    name: "Organic Apples",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
  },
  {
    name: "Fresh Milk",
    price: 60,
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150",
  },
  {
    name: "Rice Bag",
    price: 850,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  },
]

function FeaturedProducts() {
  return (
    <section className="px-10 py-16 bg-green-50">

      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}

      </div>

    </section>
  )
}

export default FeaturedProducts