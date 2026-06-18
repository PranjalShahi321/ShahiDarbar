import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Menu,
  X,
  Search,
  ShoppingCart,
  Heart,
  User,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
  const navigate = useNavigate();

  /* STATES */

  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [
    filteredProducts,
    setFilteredProducts,
  ] = useState([]);

  const [
    selectedIndex,
    setSelectedIndex,
  ] = useState(-1);

  const [mobileMenu,
    setMobileMenu] =
    useState(false);

  const [scrolled,
    setScrolled] =
    useState(false);

  const { cartCount } =
    useCart();

  const { wishlistCount } =
    useWishlist();

  /* USER */

  const userInfo = JSON.parse(
    localStorage.getItem(
      "userInfo"
    )
  );

  /* LOGOUT */

  const logoutHandler = () => {
    localStorage.removeItem(
      "userInfo"
    );

    navigate("/login");
  };

  /* KEYBOARD NAVIGATION */

  const handleKeyDown = (e) => {
    if (
      !filteredProducts.length
    )
      return;

    if (
      e.key === "ArrowDown"
    ) {
      e.preventDefault();

      setSelectedIndex(
        (prev) =>
          prev <
          filteredProducts.length -
            1
            ? prev + 1
            : 0
      );
    }

    if (
      e.key === "ArrowUp"
    ) {
      e.preventDefault();

      setSelectedIndex(
        (prev) =>
          prev > 0
            ? prev - 1
            : filteredProducts.length -
              1
      );
    }

    if (
      e.key === "Enter" &&
      selectedIndex >= 0
    ) {
      navigate(
        `/product/${filteredProducts[selectedIndex]._id}`
      );

      setSearch("");
      setFilteredProducts([]);
    }
  };

  /* FETCH PRODUCTS */

  useEffect(() => {
    const fetchProducts =
      async () => {
        try {
          const {
            data,
          } =
            await axios.get(
              `${import.meta.env.VITE_API_URL}/api/products`
            );

          setProducts(
            Array.isArray(
              data
            )
              ? data
              : []
          );
        } catch (error) {
          console.log(
            error
          );
        }
      };

    fetchProducts();
  }, []);

  /* SEARCH FILTER */

  useEffect(() => {
    if (
      search.trim() === ""
    ) {
      setFilteredProducts(
        []
      );
    } else {
      const filtered =
        products.filter(
          (
            product
          ) =>
            product.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        );

      setFilteredProducts(
        filtered.slice(
          0,
          5
        )
      );

      setSelectedIndex(
        -1
      );
    }
  }, [
    search,
    products,
  ]);

  /* NAVBAR SHADOW */

  useEffect(() => {
    const handleScroll =
      () => {
        setScrolled(
          window.scrollY >
            20
        );
      };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (    <nav
    className={`
      sticky top-0 z-50
      border-b border-green-100
      backdrop-blur-xl
      transition-all duration-300
      ${
        scrolled
          ? "bg-white/95 shadow-xl"
          : "bg-white/90"
      }
    `}
  >
    <div
      className="
        max-w-7xl mx-auto
        px-5 md:px-8 py-4
      "
    >
      {/* TOP BAR */}

      <div
        className="
          flex
          justify-between
          items-center
          gap-6
        "
      >
        {/* LOGO */}

        <Link
          to="/"
          className="
            flex items-center gap-3
            flex-shrink-0
          "
        >
          <div
            className="
              w-12 h-12
              rounded-2xl
              bg-gradient-to-br
              from-green-500
              to-green-700
              flex items-center
              justify-center
              text-white
              text-2xl
              shadow-lg
            "
          >
            🥬
          </div>

          <div>
            <h1
              className="
                text-2xl md:text-3xl
                font-extrabold
                text-green-700
                leading-none
              "
            >
              Shahi Darbar
            </h1>

            <p
              className="
                hidden md:block
                text-xs text-gray-500
                mt-1
              "
            >
              Fresh Groceries Delivered
            </p>
          </div>
        </Link>

        {/* DESKTOP SEARCH */}

        <div
          className="
            hidden md:block
            relative flex-1
            max-w-xl
          "
        >
          <Search
            size={18}
            className="
              absolute
              left-5
              top-1/2
              -translate-y-1/2
              text-gray-400
              z-10
            "
          />

          <input
            type="text"
            placeholder="Search atta, rice, milk, vegetables..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            onKeyDown={
              handleKeyDown
            }
            className="
              w-full
              py-3
              pl-12
              pr-5
              rounded-2xl
              bg-gray-50
              border
              border-gray-200
              outline-none
              transition-all
              focus:bg-white
              focus:border-green-500
              focus:ring-4
              focus:ring-green-100
            "
          />

          {/* SEARCH DROPDOWN */}

          {filteredProducts.length >
            0 && (
            <div
              className="
                absolute
                top-16
                left-0
                w-full
                bg-white
                rounded-3xl
                shadow-2xl
                border
                border-gray-100
                overflow-hidden
                z-50
              "
            >
              {filteredProducts.map(
                (
                  product,
                  index
                ) => (
                  <Link
                    key={
                      product._id
                    }
                    to={`/product/${product._id}`}
                    onClick={() => {
                      setSearch(
                        ""
                      );

                      setFilteredProducts(
                        []
                      );
                    }}
                    className={`
                      flex
                      items-center
                      gap-4
                      p-4
                      transition-all
                      border-b
                      border-gray-100
                      ${
                        selectedIndex ===
                        index
                          ? "bg-green-50"
                          : "hover:bg-gray-50"
                      }
                    `}
                  >
                    <img
                      src={
                        product.image
                      }
                      alt={
                        product.name
                      }
                      className="
                        w-14 h-14
                        rounded-2xl
                        object-cover
                        border
                      "
                    />

                    <div>
                      <h3
                        className="
                          font-bold
                          text-gray-800
                        "
                      >
                        {
                          product.name
                        }
                      </h3>

                      <p
                        className="
                          text-green-700
                          font-semibold
                        "
                      >
                        ₹
                        {
                          product.price
                        }
                      </p>
                    </div>
                  </Link>
                )
              )}
            </div>
          )}
        </div>

                  {/* DESKTOP MENU */}

                  <div
            className="
              hidden md:flex
              items-center
              gap-4
              text-[16px]
              font-semibold
            "
          >
            {/* HOME */}

            <Link
              to="/"
              className="
                px-4 py-2
                rounded-2xl
                hover:bg-green-50
                hover:text-green-700
                transition-all duration-300
              "
            >
              Home
            </Link>

            {/* PRODUCTS */}

            <Link
              to="/products"
              className="
                px-4 py-2
                rounded-2xl
                hover:bg-green-50
                hover:text-green-700
                transition-all duration-300
              "
            >
              Products
            </Link>

            {/* WISHLIST */}

            <Link
              to="/wishlist"
              className="
                relative
                flex items-center gap-2
                px-4 py-3
                rounded-2xl
                bg-red-50
                hover:bg-red-100
                transition-all duration-300
              "
            >
              <Heart
                size={18}
                className="text-red-500"
              />

              <span>
                Wishlist
              </span>

              {wishlistCount >
                0 && (
                <span
                  className="
                    absolute
                    -top-2
                    -right-2
                    min-w-[24px]
                    h-6
                    px-2
                    bg-red-500
                    text-white
                    text-xs
                    font-bold
                    rounded-full
                    flex
                    items-center
                    justify-center
                    animate-pulse
                  "
                >
                  {
                    wishlistCount
                  }
                </span>
              )}
            </Link>

            {/* CART */}

            <Link
              to="/cart"
              className="
                relative
                flex items-center gap-2
                px-4 py-3
                rounded-2xl
                bg-green-50
                hover:bg-green-100
                transition-all duration-300
              "
            >
              <ShoppingCart
                size={18}
                className="
                  text-green-700
                "
              />

              <span>
                Cart
              </span>

              {cartCount >
                0 && (
                <span
                  className="
                    absolute
                    -top-2
                    -right-2
                    min-w-[24px]
                    h-6
                    px-2
                    bg-red-500
                    text-white
                    text-xs
                    font-bold
                    rounded-full
                    flex
                    items-center
                    justify-center
                    animate-bounce
                  "
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* MyOrders*/}
            <Link
  to="/my-orders"
  className="
  flex items-center gap-2
  whitespace-nowrap
  px-4 py-3
  rounded-2xl
  bg-green-50
"
>
  📦 My Orders
</Link>

            {/* ADMIN */}

            {userInfo?.isAdmin && (
              <Link
                to="/admin"
                className="
                  px-4 py-2
                  rounded-2xl
                  bg-yellow-50
                  hover:bg-yellow-100
                  transition-all duration-300
                "
              >
                Admin
              </Link>
            )}

            {/* AUTH */}

            {userInfo ? (
              <div
                className="
                  flex items-center
                  gap-4
                  ml-2
                "
              >
                <div
  className="
    flex items-center
    gap-2
    px-4 py-3
    rounded-full
    bg-gradient-to-r
    from-green-50
    to-green-100
    border border-green-200
  "
>
  <User
    size={18}
    className="text-green-700"
  />

  <span
    className="
      text-green-800
      font-semibold
      whitespace-nowrap
    "
  >
    Hi, {userInfo.name.split(" ")[0]}
  </span>
</div>

                <button
                  onClick={
                    logoutHandler
                  }
                  className="
                    bg-gradient-to-r
                    from-red-500
                    to-red-600
                    text-white
                    px-5 py-3
                    rounded-2xl
                    shadow-lg
                    hover:scale-105
                    transition-all
                    duration-300
                  "
                >
                  Logout
                </button>
              </div>
            ) : (
              <div
                className="
                  flex items-center
                  gap-4
                "
              >
                <Link
                  to="/login"
                  className="
                    px-4 py-2
                    rounded-2xl
                    hover:bg-green-50
                    hover:text-green-700
                    transition-all
                  "
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="
                    bg-gradient-to-r
                    from-green-600
                    to-green-700
                    text-white
                    px-6 py-3
                    rounded-2xl
                    shadow-lg
                    hover:scale-105
                    transition-all
                    duration-300
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
              setMobileMenu(
                !mobileMenu
              )
            }
            className="
              md:hidden
              p-2
              rounded-xl
              hover:bg-gray-100
              transition
            "
          >
            {mobileMenu ? (
              <X size={30} />
            ) : (
              <Menu size={30} />
            )}
          </button>
        </div>

                {/* MOBILE MENU */}

                {mobileMenu && (
          <div
            className="
              md:hidden
              mt-5
              bg-white
              rounded-3xl
              shadow-2xl
              border
              border-gray-100
              p-6
              flex
              flex-col
              gap-5
            "
          >
            {/* MOBILE SEARCH */}

            <div className="relative">
              <Search
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="text"
                placeholder="Search groceries..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                onKeyDown={
                  handleKeyDown
                }
                className="
                  w-full
                  py-3
                  pl-12
                  pr-4
                  rounded-2xl
                  border
                  border-gray-200
                  bg-gray-50
                  outline-none
                  focus:border-green-500
                  focus:ring-4
                  focus:ring-green-100
                  transition-all
                "
              />
            </div>

            {/* MOBILE LINKS */}

            <Link
              to="/"
              onClick={() =>
                setMobileMenu(false)
              }
              className="
                px-4 py-3
                rounded-2xl
                hover:bg-green-50
                transition-all
              "
            >
              🏠 Home
            </Link>

            <Link
              to="/products"
              onClick={() =>
                setMobileMenu(false)
              }
              className="
                px-4 py-3
                rounded-2xl
                hover:bg-green-50
                transition-all
              "
            >
              🛍 Products
            </Link>

            <Link
              to="/wishlist"
              onClick={() =>
                setMobileMenu(false)
              }
              className="
                flex
                items-center
                justify-between
                px-4 py-3
                rounded-2xl
                bg-red-50
                hover:bg-red-100
                transition-all
              "
            >
              <span>
                ❤️ Wishlist
              </span>

              <span
                className="
                  bg-red-500
                  text-white
                  text-sm
                  px-3 py-1
                  rounded-full
                "
              >
                {wishlistCount}
              </span>
            </Link>

            <Link
              to="/cart"
              onClick={() =>
                setMobileMenu(false)
              }
              className="
                flex
                items-center
                justify-between
                px-4 py-3
                rounded-2xl
                bg-green-50
                hover:bg-green-100
                transition-all
              "
            >
              <span>
                🛒 Cart
              </span>

              <span
                className="
                  bg-green-600
                  text-white
                  text-sm
                  px-3 py-1
                  rounded-full
                "
              >
                {cartCount}
              </span>
            </Link>

            <Link
  to="/my-orders"
  onClick={() =>
    setMobileMenu(false)
  }
  className="
                flex
                items-center
                justify-between
                px-4 py-3
                rounded-2xl
                bg-green-50
                hover:bg-green-100
                transition-all
              "
>
  📦 My Orders
</Link>

            {/* ADMIN */}

            {userInfo?.isAdmin && (
              <Link
                to="/admin"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="
                  px-4 py-3
                  rounded-2xl
                  bg-yellow-50
                  hover:bg-yellow-100
                  transition-all
                "
              >
                ⚙️ Admin
              </Link>
            )}

            {/* AUTH */}

            {userInfo ? (
              <>
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    px-4 py-3
                    rounded-2xl
                    bg-green-50
                  "
                >
                  <User
                    size={20}
                    className="
                      text-green-700
                    "
                  />

                  <span
                    className="
                      font-bold
                      text-green-700
                    "
                  >
                    Hi,
                    {" "}
                    {
                      userInfo.name
                    }
                    👋
                  </span>
                </div>

                <button
                  onClick={() => {
                    setMobileMenu(false);
                    logoutHandler();
                  }}
                  className="
                    bg-gradient-to-r
                    from-red-500
                    to-red-600
                    text-white
                    py-3
                    rounded-2xl
                    shadow-lg
                    hover:scale-[1.02]
                    transition-all
                  "
                >
                  Logout
                </button>
              </>
            ) : (
              <div
                className="
                  flex
                  flex-col
                  gap-3
                "
              >
                <Link
                  to="/login"
                  onClick={() =>
                    setMobileMenu(false)
                  }
                  className="
                    text-center
                    py-3
                    rounded-2xl
                    border
                    hover:bg-gray-50
                    transition-all
                  "
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() =>
                    setMobileMenu(false)
                  }
                  className="
                    text-center
                    bg-gradient-to-r
                    from-green-600
                    to-green-700
                    text-white
                    py-3
                    rounded-2xl
                    shadow-lg
                    hover:scale-[1.02]
                    transition-all
                  "
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
