import { Link } from "react-router-dom"
import { useState } from "react"

import { FaBars, FaTimes } from "react-icons/fa"

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false)

  return (

    <nav className="bg-white shadow-md px-8 py-4">

      <div className="flex justify-between items-center">

        {/* Logo */}

        <h1 className="text-3xl font-bold text-green-700">
          ShahiDarbar
        </h1>

        {/* Desktop Menu */}

        <ul className="hidden md:flex gap-8 font-medium text-gray-700">

          <Link to="/">
            <li className="hover:text-green-600 cursor-pointer">
              Home
            </li>
          </Link>

          <Link to="/products">
            <li className="hover:text-green-600 cursor-pointer">
              Products
            </li>
          </Link>

          <li className="hover:text-green-600 cursor-pointer">
            Wholesale
          </li>

          <li className="hover:text-green-600 cursor-pointer">
            About
          </li>

        </ul>

        {/* Desktop Buttons */}

        <div className="hidden md:flex gap-4">

          <button className="border border-green-600 text-green-700 px-4 py-2 rounded-lg hover:bg-green-50">
            Login
          </button>

          <Link to="/cart">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Cart
            </button>
          </Link>

        </div>

        {/* Mobile Menu Button */}

        <button
          className="md:hidden text-2xl text-green-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >

          {menuOpen ? <FaTimes /> : <FaBars />}

        </button>

      </div>

      {/* Mobile Menu */}

      {

        menuOpen && (

          <div className="md:hidden mt-6 flex flex-col gap-5 text-lg font-medium text-gray-700">

            <Link to="/">
              <p>Home</p>
            </Link>

            <Link to="/products">
              <p>Products</p>
            </Link>

            <p>Wholesale</p>

            <div className="flex gap-4 mt-2">

              <button className="flex-1 border border-green-600 text-green-700 px-4 py-3 rounded-lg hover:bg-green-50">
                Login
              </button>

              <Link to="/cart" className="flex-1">
                <button className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700">
                  Cart
                </button>
              </Link>

            </div>
          </div>

        )

      }

    </nav>

  )
}

export default Navbar