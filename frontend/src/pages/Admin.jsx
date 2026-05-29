import axios from "axios"
import { useEffect, useState, useRef } from "react"
import toast from "react-hot-toast"

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
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const formRef = useRef(null)
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
    setLoading(true)
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
      setLoading(false)
      toast.success(
        editingId
          ? "Product Updated"
          : "Product Added"
      )

      setName("")
      setPrice("")
      setCategory("")
      setDescription("")
      setImage(null)
      setEditingId(null)

      fetchProducts()

    } catch (error) {

      console.log(error)

      toast.error("Something Went Wrong")

      setLoading(false)


    }

  }

  /* DELETE */

  const deleteProduct = async (id) => {

    try {

      await axios.delete(

        `${import.meta.env.VITE_API_URL}/api/products/${id}`

      )

      toast.success("Product Deleted")

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

    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })

  }

  return (

    <div className="bg-gray-50 min-h-screen px-6 py-16">

      <div className="max-w-7xl mx-auto">

        {/* TITLE */}

        <h1 className="text-5xl font-bold text-green-700 mb-14">

          Admin Dashboard

        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-3xl shadow">
            <h3 className="text-gray-500">
              📦 Products
            </h3>
            <p className="text-4xl font-bold text-green-600">
              {products.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow">
            <h3 className="text-gray-500">
              📂 Categories
            </h3>            <p className="text-4xl font-bold text-blue-600">
              {[...new Set(products.map(p => p.category))].length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow">
            <h3 className="text-gray-500">
              🟢 Status
            </h3>            <p className="text-3xl font-bold text-purple-600">
              Active
            </p>
          </div>

        </div>



        {/* FORM */}

        <div
          ref={formRef}
          className="bg-white p-10 rounded-3xl shadow-lg mb-16"
        >
          <h2 className="text-3xl font-bold mb-8">

            {loading
              ? "Processing..."
              : editingId
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
            {image && (

              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-40 h-40 rounded-2xl object-cover"
              />

            )}

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

              {loading
                ? "Processing..."
                : editingId
                  ? "Update Product"
                  : "Add Product"}

            </button>

          </form>

        </div>
        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 border rounded-2xl mb-8"
        />
        {/* PRODUCTS */}

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold text-gray-800">
            Product Management
          </h2>

          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
            {products.length} Products
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {
            products.filter(product =>
              product.name
                .toLowerCase()
                .includes(search.toLowerCase())
            ).length === 0 ? (

              <div className="col-span-full text-center py-20">

                <h2 className="text-3xl font-bold text-gray-500">

                  No Products Found

                </h2>

              </div>

            ) : (
              products
                .filter(product =>
                  product.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((product) => (

                  <div
                    key={product._id}
                    className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
                  >

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-56 object-cover"
                    />

                    <div className="p-6">

                      <div className="flex justify-between items-start mb-2">

                        <h2 className="text-xl font-bold text-gray-800 line-clamp-1">

                          {product.name}

                        </h2>

                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-semibold">

                          {product.category}

                        </span>

                      </div>

                      <p className="text-green-700 text-2xl font-bold mb-3">

                        ₹{product.price}

                      </p>

                      <p className="text-gray-500 text-sm mb-5 line-clamp-2">

                        {product.description}

                      </p>

                      <div className="flex gap-3">

                        <button
                          onClick={() => editProduct(product)}
                          className="flex-1 bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
                        >

                          Update

                        </button>

                        <button
                          onClick={() => {

                            if (
                              window.confirm(
                                `Delete ${product.name}?`
                              )
                            ) {

                              deleteProduct(product._id)

                            }

                          }}
                          className="flex-1 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
                        >

                          Delete

                        </button>

                      </div>

                    </div>

                  </div>

                )))
          }

        </div>
      </div>

    </div>

  )
}

export default Admin