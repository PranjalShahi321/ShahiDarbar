import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    BarChart3,
    LogOut,
  } from "lucide-react";
  
  import { NavLink } from "react-router-dom";
  
  function AdminSidebar() {
    return (
      <div
        className="
          w-72
          bg-white
          shadow-lg
          min-h-screen
          p-6
          flex
          flex-col
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            text-green-700
            mb-12
          "
        >
          Shahi Darbar
        </h1>
  
        <nav className="space-y-3">
  
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `
              flex
              items-center
              gap-3
              p-4
              rounded-2xl
              font-semibold
              transition
              ${
                isActive
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-100"
              }
            `
            }
          >
            <LayoutDashboard size={22} />
            Dashboard
          </NavLink>
  
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `
              flex
              items-center
              gap-3
              p-4
              rounded-2xl
              font-semibold
              transition
              ${
                isActive
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-100"
              }
            `
            }
          >
            <Package size={22} />
            Products
          </NavLink>
  
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `
              flex
              items-center
              gap-3
              p-4
              rounded-2xl
              font-semibold
              transition
              ${
                isActive
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-100"
              }
            `
            }
          >
            <ShoppingCart size={22} />
            Orders
          </NavLink>
  
          <button
            onClick={() => {
              localStorage.removeItem(
                "userInfo"
              );
              window.location.href =
                "/login";
            }}
            className="
              flex
              items-center
              gap-3
              p-4
              rounded-2xl
              font-semibold
              w-full
              text-left
              hover:bg-red-100
              text-red-600
              mt-10
            "
          >
            <LogOut size={22} />
            Logout
          </button>
        </nav>
      </div>
    );
  }
  
  export default AdminSidebar;