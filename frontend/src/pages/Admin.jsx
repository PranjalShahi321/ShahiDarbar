import { useEffect, useState } from "react"
import axios from "axios"

function Admin() {

  const [products, setProducts] = useState([])

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] =
    useState("")
  const [image, setImage] = useState(null)

  const [editingId, setEditingId] =
    useState(null)

  /* FETCH PRODUCTS */

  const fetchProducts = async () => {

    try {

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products`
      )

      setProducts(
        Array.isArray(data) ? data : []
      )

    } catch (error) {

      console.log(error)

    }

  }

  useEffect(() => {

    fetchProducts()

  }, [])

  /* IMAGE UPLOAD */

  const uploadImage = async () => {

    if (!image) return ""
  
    const formData = new FormData()
  
    formData.append("image", image)
  
    try {
  
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload`,
        formData
      )
  
      console.log(data)
  
      return data.imageUrl
  
    } catch (error) {
  
      console.log(error)
  
      return ""
  
    }
  
  }

  /* SUBMIT */

const handleSubmit = async (e) => {

  e.preventDefault()

  try {

    let imageUrl = ""

    if (image) {
      imageUrl = await uploadImage()
    }

    console.log("IMAGE URL:", imageUrl)

    const productData = {
      name,
      price,
      category,
      description,
      image: imageUrl,
    }

    console.log("PRODUCT DATA:", productData)

    if (editingId) {
      alert(JSON.stringify(productData))

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/products/${editingId}`,
        productData
      )

    } else {

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/products`,
        productData
      )

    }

    alert("Success")

    setName("")
    setPrice("")
    setCategory("")
    setDescription("")
    setImage(null)
    setEditingId(null)

    fetchProducts()

  } catch (error) {

    console.log(error)

    alert("Something Went Wrong")

  }

}

  /* DELETE */

  const deleteProduct = async (id) => {

    try {

      await axios.delete(

        `${import.meta.env.VITE_API_URL}/api/products/${id}`

      )

      alert("Product Deleted")

      fetchProducts()

    } catch (error) {

      console.log(error)

    }

  }

  /* EDIT */

  const editProduct = (product) => {

    setEditingId(product._id)

    setName(product.name)

    setPrice(product.price)

    setCategory(product.category)

    setDescription(product.description)

  }

  return (

    <div className="bg-gray-50 min-h-screen px-6 py-16">

      <div className="max-w-7xl mx-auto">

        {/* TITLE */}

        <h1 className="text-5xl font-bold text-green-700 mb-14">

          Admin Dashboard

        </h1>

        {/* FORM */}

        <div className="bg-white p-10 rounded-3xl shadow-lg mb-16">

          <h2 className="text-3xl font-bold mb-8">

            {editingId
              ? "Update Product"
              : "Add Product"}

          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >

            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="border p-4 rounded-2xl"
              required
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              className="border p-4 rounded-2xl"
              required
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="border p-4 rounded-2xl"
              required
            />

            <input
              type="file"
              onChange={(e) =>
                setImage(e.target.files[0])
              }
              className="border p-4 rounded-2xl"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="border p-4 rounded-2xl md:col-span-2"
              rows="5"
              required
            />

            <button
              type="submit"
              className="bg-green-600 text-white py-4 rounded-2xl text-xl font-bold hover:bg-green-700 md:col-span-2"
            >

              {editingId
                ? "Update Product"
                : "Add Product"}

            </button>

          </form>

        </div>

        {/* PRODUCTS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.map((product) => (

            <div
              key={product._id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg"
            >

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />

              <div className="p-6">

                <h2 className="text-2xl font-bold mb-3">

                  {product.name}

                </h2>

                <p className="text-green-700 text-2xl font-bold mb-3">

                  ₹{product.price}

                </p>

                <p className="text-gray-600 mb-5 line-clamp-2">

                  {product.description}

                </p>

                <div className="flex gap-4">

                  <button
                    onClick={() =>
                      editProduct(product)
                    }
                    className="flex-1 bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600"
                  >

                    Update

                  </button>

                  <button
                    onClick={() =>
                      deleteProduct(product._id)
                    }
                    className="flex-1 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600"
                  >

                    Delete

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  )
}

export default Admin