import { useEffect, useState } from "react"
import axios from "axios"

import ProductCard from "../components/ProductCard"

function Products() {

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const { data } = await axios.get(
          "http://localhost:5000/api/products"
        )

        setProducts(data)

      } catch (error) {

        console.log(error)

      }

    }

    fetchProducts()

  }, [])

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(
      search.toLowerCase()
    )
  )

  return (

    <div className="min-h-screen px-10 py-20 bg-green-50">

      <h1 className="text-5xl font-bold text-green-700 mb-12 text-center">
        All Products
      </h1>

      {/* Search */}

      <div className="flex justify-center mb-12">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-[500px] px-6 py-4 rounded-xl border border-green-300 outline-none focus:border-green-600 text-lg"
        />

      </div>

      {/* Products */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {filteredProducts.map((product) => (

          <ProductCard
            key={product._id}
            id={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
          />

        ))}

      </div>

    </div>

  )
}

export default Products