import axios from "axios";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";

import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

function AdminProducts() {
  const [products, setProducts] =
    useState([]);

  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [image, setImage] =
    useState(null);

  const [editingId,
    setEditingId] =
    useState(null);

  const [search,
    setSearch] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const [showModal,
    setShowModal] =
    useState(false);

  const fileRef =
    useRef();

  /* FETCH PRODUCTS */

  const fetchProducts =
    async () => {
      try {
        const { data } =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/products`
          );

        setProducts(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* IMAGE UPLOAD */

  const uploadImage =
    async () => {
      if (!image)
        return "";

      const formData =
        new FormData();

      formData.append(
        "image",
        image
      );

      try {
        const { data } =
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/upload`,
            formData
          );

        return data.imageUrl;
      } catch (error) {
        console.log(error);
        return "";
      }
    };

  /* RESET */

  const resetForm =
    () => {
      setName("");
      setPrice("");
      setCategory("");
      setDescription("");
      setImage(null);
      setEditingId(null);

      if (fileRef.current) {
        fileRef.current.value =
          "";
      }
    };

  /* SUBMIT */

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      setLoading(true);

      try {
        let imageUrl = "";

        if (image) {
          imageUrl =
            await uploadImage();
        }

        const productData = {
          name,
          price,
          category,
          description,
          image:
            imageUrl,
        };

        if (
          editingId
        ) {
          await axios.put(
            `${import.meta.env.VITE_API_URL}/api/products/${editingId}`,
            productData
          );

          toast.success(
            "Product Updated"
          );
        } else {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/products`,
            productData
          );

          toast.success(
            "Product Added"
          );
        }

        fetchProducts();

        resetForm();

        setShowModal(false);
      } catch (
        error
      ) {
        console.log(
          error
        );

        toast.error(
          "Something went wrong"
        );
      }

      setLoading(false);
    };

  /* DELETE */

  const deleteProduct =
    async (id) => {
      if (
        !window.confirm(
          "Delete this product?"
        )
      )
        return;

      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`
        );

        toast.success(
          "Product Deleted"
        );

        fetchProducts();
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  /* EDIT */

  const editProduct =
    (product) => {
      setEditingId(
        product._id
      );

      setName(
        product.name
      );

      setPrice(
        product.price
      );

      setCategory(
        product.category
      );

      setDescription(
        product.description
      );

      setShowModal(true);
    };

  /* SEARCH */

  const filteredProducts =
    products.filter(
      (product) =>
        product.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div>

      {/* Heading */}

      <h1
        className="
          text-4xl
          font-bold
          mb-8
        "
      >
        Products Management
      </h1>

      {/* Search + Button */}

      <div
        className="
          flex
          flex-col
          md:flex-row
          gap-4
          mb-8
        "
      >
        <div
          className="
            flex-1
            relative
          "
        >
          <Search
            size={20}
            className="
              absolute
              left-5
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              w-full
              bg-white
              rounded-2xl
              border
              pl-14
              pr-4
              py-4
            "
          />
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="
            bg-green-600
            text-white
            px-6
            rounded-2xl
            font-semibold
            flex
            items-center
            gap-2
            justify-center
          "
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Table */}

      <div
        className="
          bg-white
          rounded-3xl
          shadow
          overflow-hidden
        "
      >
        <div
          className="
            overflow-x-auto
          "
        >
          <table
            className="
              w-full
            "
          >
            <thead
              className="
                bg-gray-50
              "
            >
              <tr>
                <th className="p-5 text-left">
                  Image
                </th>

                <th className="p-5 text-left">
                  Product
                </th>

                <th className="p-5 text-left">
                  Price
                </th>

                <th className="p-5 text-left">
                  Category
                </th>

                <th className="p-5 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>

              {filteredProducts.map(
                (
                  product
                ) => (
                  <tr
                    key={
                      product._id
                    }
                    className="
                      border-t
                      hover:bg-gray-50
                    "
                  >
                    <td className="p-5">
                      <img
                        src={
                          product.image
                        }
                        alt=""
                        className="
                          w-14
                          h-14
                          rounded-2xl
                          object-cover
                          border
                        "
                      />
                    </td>

                    <td className="p-5 font-medium">
                      {
                        product.name
                      }
                    </td>

                    <td className="p-5">
                      ₹
                      {
                        product.price
                      }
                    </td>

                    <td className="p-5">
                      {
                        product.category
                      }
                    </td>

                    <td className="p-5">
                      <div
                        className="
                          flex
                          justify-center
                          gap-3
                        "
                      >
                        <button
                          onClick={() =>
                            editProduct(
                              product
                            )
                          }
                          className="
                            w-10
                            h-10
                            rounded-xl
                            bg-blue-50
                            text-blue-600
                            hover:bg-blue-100
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <Pencil
                            size={18}
                          />
                        </button>

                        <button
                          onClick={() =>
                            deleteProduct(
                              product._id
                            )
                          }
                          className="
                            w-10
                            h-10
                            rounded-xl
                            bg-red-50
                            text-red-600
                            hover:bg-red-100
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <Trash2
                            size={18}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}

            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}

      {showModal && (
        <div
          className="
            fixed
            inset-0
            bg-black/40
            flex
            items-center
            justify-center
            p-5
            z-50
          "
        >
          <div
            className="
              bg-white
              rounded-3xl
              p-8
              w-full
              max-w-3xl
              relative
            "
          >
            <button
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
              className="
                absolute
                top-5
                right-5
              "
            >
              <X />
            </button>

            <h2
              className="
                text-3xl
                font-bold
                mb-8
              "
            >
              {editingId
                ? "Update Product"
                : "Add Product"}
            </h2>

            <form
              onSubmit={
                handleSubmit
              }
              className="
                grid
                md:grid-cols-2
                gap-5
              "
            >
              <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                required
                className="
                  border
                  rounded-xl
                  p-4
                "
              />

              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) =>
                  setPrice(
                    e.target.value
                  )
                }
                required
                className="
                  border
                  rounded-xl
                  p-4
                "
              />

              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                required
                className="
                  border
                  rounded-xl
                  p-4
                "
              />

              <input
                ref={fileRef}
                type="file"
                onChange={(e) =>
                  setImage(
                    e.target
                      .files[0]
                  )
                }
                className="
                  border
                  rounded-xl
                  p-4
                "
              />

              <textarea
                rows="4"
                placeholder="Description"
                value={
                  description
                }
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="
                  md:col-span-2
                  border
                  rounded-xl
                  p-4
                "
              />

              <button
                type="submit"
                disabled={
                  loading
                }
                className="
                  md:col-span-2
                  bg-green-600
                  text-white
                  py-4
                  rounded-xl
                  font-bold
                  hover:bg-green-700
                "
              >
                {loading
                  ? "Please wait..."
                  : editingId
                  ? "Update Product"
                  : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;