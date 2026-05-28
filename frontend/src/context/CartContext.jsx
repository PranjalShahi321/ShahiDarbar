import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

const CartContext = createContext()

export const CartProvider = ({
  children,
}) => {

  const [cartCount, setCartCount] =
    useState(0)

  const [isCartOpen, setIsCartOpen] =
    useState(false)

  const [cartItems, setCartItems] =
    useState([])

  /* INCREASE QUANTITY */

const increaseQuantity = (id) => {

  const items =
    JSON.parse(
      localStorage.getItem("cartItems")
    ) || []

  const updatedItems = items.map((item) =>

    item._id === id

      ? {
          ...item,
          quantity: item.quantity + 1,
        }

      : item

  )

  localStorage.setItem(
    "cartItems",
    JSON.stringify(updatedItems)
  )

  updateCart()

}

/* DECREASE QUANTITY */

const decreaseQuantity = (id) => {

  let items =
    JSON.parse(
      localStorage.getItem("cartItems")
    ) || []

  items = items.map((item) =>

    item._id === id

      ? {
          ...item,
          quantity: item.quantity - 1,
        }

      : item

  )

  items = items.filter(
    (item) => item.quantity > 0
  )

  localStorage.setItem(
    "cartItems",
    JSON.stringify(items)
  )

  updateCart()

}

  /* UPDATE CART */

  const updateCart = () => {

    const items =
      JSON.parse(
        localStorage.getItem("cartItems")
      ) || []
  
    setCartItems([...items])
  
    const totalItems = items.reduce(
  
      (acc, item) =>
  
        acc + item.quantity,
  
      0
  
    )
  
    setCartCount(totalItems)
  
  }

  useEffect(() => {

    updateCart()

  }, [])

  return (

    <CartContext.Provider
      value={{

        cartCount,

        cartItems,

        isCartOpen,

        setIsCartOpen,

        updateCart,

        increaseQuantity,

        decreaseQuantity,

      }}
    >

      {children}

    </CartContext.Provider>

  )

}

export const useCart = () =>
  useContext(CartContext)