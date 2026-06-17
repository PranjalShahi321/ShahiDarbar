import {
  Link,
  useNavigate,
} from "react-router-dom"

import {
  useEffect,
  useState,
} from "react"

import axios from "axios"

import {
  Menu,
  X,
} from "lucide-react"

import { useCart } from "../context/CartContext"

import { useWishlist } from "../context/WishlistContext"

function Navbar() {

  const navigate = useNavigate()

  /* STATES */

  const [products, setProducts] =
    useState([])

  const [search, setSearch] =
    useState("")

  const [filteredProducts,
    setFilteredProducts] =
    useState([])

  const [selectedIndex, setSelectedIndex] =
    useState(-1)

  const [mobileMenu,
    setMobileMenu] =
    useState(false)

  const { cartCount } = useCart()

  const { wishlistCount } =
    useWishlist()

  /* USER */

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  )

  /* LOGOUT */

  const logoutHandler = () => {

    localStorage.removeItem("userInfo")

    navigate("/login")

  }
  const handleKeyDown = (e) => {

    if (!filteredProducts.length)
      return
  
    if (e.key === "ArrowDown") {
  
      e.preventDefault()
  
      setSelectedIndex((prev) =>
        prev < filteredProducts.length - 1
          ? prev + 1
          : 0
      )
    }
  
    if (e.key === "ArrowUp") {
  
      e.preventDefault()
  
      setSelectedIndex((prev) =>
        prev > 0
          ? prev - 1
          : filteredProducts.length - 1
      )
    }
  
    if (
      e.key === "Enter" &&
      selectedIndex >= 0
    ) {
  
      navigate(
        `/product/${filteredProducts[selectedIndex]._id}`
      )
  
      setSearch("")
      setFilteredProducts([])
    }
  }

  /* FETCH PRODUCTS */

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products`
        )

        setProducts(
          Array.isArray(data)
            ? data
            : []
        )

      } catch (error) {

        console.log(error)

      }

    }

    fetchProducts()

  }, [])

  /* SEARCH FILTER */

  useEffect(() => {

    if (search.trim() === "") {

      setFilteredProducts([])

    }

    else {

      const filtered = products.filter(
        (product) =>

          product.name
            .toLowerCase()
            .includes(search.toLowerCase())

      )

      setFilteredProducts(
        filtered.slice(0, 5)
      )

      setSelectedIndex(-1)

    }

  }, [search, products])

  return (

    <nav className="bg-white shadow-md border-b sticky top-0 z-50">

      <div
        className="
          max-w-7xl mx-auto
          px-4 md:px-6 py-4
        "
      >

        {/* TOP BAR */}

        <div
          className="
            flex justify-between
            items-center gap-4
          "
        >

          {/* LOGO */}

          <Link
            to="/"
            className="
              text-2xl md:text-4xl
              font-extrabold
              text-green-700
            "
          >

            ShahiDarbar

          </Link>

          {/* DESKTOP SEARCH */}

          <div
            className="
              hidden md:block
              relative
            "
          >

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={handleKeyDown}
              className="
                border px-4 py-2
                rounded-xl
                outline-none
                w-72
              "
            />

            {/* SEARCH DROPDOWN */}

            {filteredProducts.length > 0 && (

              <div
                className="
                  absolute top-14 left-0
                  bg-white shadow-2xl
                  rounded-2xl w-full
                  overflow-hidden z-50
                "
              >

                {filteredProducts.map((product , index) => (

                  <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                    onClick={() => {

                      setSearch("")

                      setFilteredProducts([])

                    }}
                    className={`
                      flex items-center gap-4
                      p-4 transition border-b
                      ${
                        selectedIndex === index
                          ? "bg-gray-200"
                          : "hover:bg-gray-100"
                      }
                    `}
                  >

                    <img
                      src={product.image}
                      alt={product.name}
                      className="
                        w-14 h-14
                        object-cover
                        rounded-lg
                      "
                    />

                    <div>

                      <h3 className="font-bold">

                        {product.name}

                      </h3>

                      <p
                        className="
                          text-green-700
                          font-semibold
                        "
                      >

                        ₹{product.price}

                      </p>

                    </div>

                  </Link>

                ))}

              </div>

            )}

          </div>

          {/* DESKTOP MENU */}

          <div
            className="
              hidden md:flex
              items-center gap-8
              text-lg font-semibold
            "
          >

            <Link
              to="/"
              className="
                hover:text-green-700
                transition
              "
            >

              Home

            </Link>

            <Link
              to="/products"
              className="
                hover:text-green-700
                transition
              "
            >

              Products

            </Link>

            {/* WISHLIST */}

            <Link
              to="/wishlist"
              className="
                relative
                hover:text-red-500
                transition
              "
            >

              ❤️

              {wishlistCount > 0 && (

                <span
                  className="
                    absolute
                    -top-3
                    -right-5
                    bg-red-500
                    text-white
                    text-xs
                    font-bold
                    px-2 py-1
                    rounded-full
                    animate-pulse
                  "
                >

                  {wishlistCount}

                </span>

              )}

            </Link>

            {/* CART */}

            <Link
              to="/cart"
              className="
                relative
                hover:text-green-700
                transition
              "
            >

              Cart

              {cartCount > 0 && (

                <span
                  className="
                    absolute
                    -top-3
                    -right-5
                    bg-red-500
                    text-white
                    text-xs
                    font-bold
                    px-2 py-1
                    rounded-full
                    animate-bounce
                  "
                >

                  {cartCount}

                </span>

              )}

            </Link>

            {/* ADMIN */}

            {userInfo?.isAdmin && (

              <Link
                to="/admin"
                className="
                  hover:text-green-700
                  transition
                "
              >

                Admin

              </Link>

            )}

            {/* AUTH */}

            {userInfo ? (

              <div
                className="
                  flex items-center gap-5
                "
              >

                <span
                  className="
                    text-green-700
                    font-bold
                  "
                >

                  {userInfo.name}

                </span>

                <button
                  onClick={logoutHandler}
                  className="
                    bg-red-500 text-white
                    px-5 py-2 rounded-xl
                    hover:bg-red-600
                    transition
                  "
                >

                  Logout

                </button>

              </div>

            ) : (

              <div
                className="
                  flex items-center gap-5
                "
              >

                <Link
                  to="/login"
                  className="
                    hover:text-green-700
                    transition
                  "
                >

                  Login

                </Link>

                <Link
                  to="/register"
                  className="
                    bg-green-600 text-white
                    px-5 py-2 rounded-xl
                    hover:bg-green-700
                    transition
                  "
                >

                  Register

                </Link>

              </div>

            )}

          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            className="md:hidden"
          >

            {mobileMenu
              ? <X size={32} />
              : <Menu size={32} />}

          </button>

        </div>

        {/* MOBILE MENU */}

        {mobileMenu && (

          <div
            className="
              md:hidden mt-6
              flex flex-col gap-5
              text-lg font-semibold
            "
          >

            {/* MOBILE SEARCH */}

            <div className="relative">

              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="
                  border px-4 py-3
                  rounded-xl
                  outline-none
                  w-full
                "
              />

            </div>

            <Link
              to="/"
              onClick={() =>
                setMobileMenu(false)
              }
            >

              Home

            </Link>

            <Link
              to="/products"
              onClick={() =>
                setMobileMenu(false)
              }
            >

              Products

            </Link>

            <Link
              to="/wishlist"
              onClick={() =>
                setMobileMenu(false)
              }
            >

              Wishlist ❤️ ({wishlistCount})

            </Link>

            <Link
              to="/cart"
              onClick={() =>
                setMobileMenu(false)
              }
            >

              Cart ({cartCount})

            </Link>

            {userInfo?.isAdmin && (

              <Link
                to="/admin"
                onClick={() =>
                  setMobileMenu(false)
                }
              >

                Admin

              </Link>

            )}

            {userInfo ? (

              <button
                onClick={logoutHandler}
                className="
                  bg-red-500 text-white
                  py-3 rounded-xl
                "
              >

                Logout

              </button>

            ) : (

              <div className="flex gap-4">

                <Link
                  to="/login"
                  onClick={() =>
                    setMobileMenu(false)
                  }
                >

                  Login

                </Link>

                <Link
                  to="/register"
                  onClick={() =>
                    setMobileMenu(false)
                  }
                >

                  Register

                </Link>

              </div>

            )}

          </div>

        )}

      </div>

    </nav>

  )
}

export default Navbar