import {
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react"
  
  const WishlistContext = createContext()
  
  export const WishlistProvider = ({
    children,
  }) => {
  
    const [wishlistItems,
      setWishlistItems] =
      useState([])
  
    const [wishlistCount,
      setWishlistCount] =
      useState(0)
  
    /* UPDATE WISHLIST */
  
    const updateWishlist = () => {
  
      const items =
        JSON.parse(
          localStorage.getItem("wishlistItems")
        ) || []
  
      setWishlistItems(items)
  
      setWishlistCount(items.length)
  
    }
  
    useEffect(() => {
  
      updateWishlist()
  
    }, [])
  
    /* ADD TO WISHLIST */
  
    const addToWishlist = (product) => {
  
      const items =
        JSON.parse(
          localStorage.getItem("wishlistItems")
        ) || []
  
      const exists = items.find(
        (item) => item._id === product._id
      )
  
      if (!exists) {
  
        const updatedItems = [
          ...items,
          product,
        ]
  
        localStorage.setItem(
          "wishlistItems",
          JSON.stringify(updatedItems)
        )
  
        updateWishlist()
  
      }
  
    }
  
    /* REMOVE */
  
    const removeFromWishlist = (id) => {
  
      const items =
        JSON.parse(
          localStorage.getItem("wishlistItems")
        ) || []
  
      const updatedItems =
        items.filter(
          (item) => item._id !== id
        )
  
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(updatedItems)
      )
  
      updateWishlist()
  
    }
  
    return (
  
      <WishlistContext.Provider
        value={{
  
          wishlistItems,
  
          wishlistCount,
  
          addToWishlist,
  
          removeFromWishlist,
  
        }}
      >
  
        {children}
  
      </WishlistContext.Provider>
  
    )
  
  }
  
  export const useWishlist = () =>
    useContext(WishlistContext)