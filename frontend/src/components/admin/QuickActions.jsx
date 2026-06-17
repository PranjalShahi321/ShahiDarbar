import {
    Package,
    ShoppingCart,
  } from "lucide-react";
  
  import { useNavigate }
  from "react-router-dom";
  
  function QuickActions() {
    const navigate =
      useNavigate();
  
    return (
      <div
        className="
          bg-white
          rounded-3xl
          shadow
          p-8
          mb-10
        "
      >
        <h2 className="
          text-3xl
          font-bold
          mb-8
        ">
          Quick Actions
        </h2>
  
        <div className="
          grid
          md:grid-cols-2
          gap-6
        ">
  
          <button
            onClick={() =>
              navigate(
                "/admin/products"
              )
            }
            className="
              p-6
              rounded-3xl
              bg-green-50
              hover:bg-green-100
              text-left
            "
          >
            <Package
              size={40}
              className="
                text-green-600
                mb-4
              "
            />
  
            <h3 className="
              text-2xl
              font-bold
            ">
              Manage Products
            </h3>
  
            <p className="
              text-gray-500
              mt-2
            ">
              Add, edit and
              delete products
            </p>
          </button>
  
          <button
            onClick={() =>
              navigate(
                "/admin/orders"
              )
            }
            className="
              p-6
              rounded-3xl
              bg-blue-50
              hover:bg-blue-100
              text-left
            "
          >
            <ShoppingCart
              size={40}
              className="
                text-blue-600
                mb-4
              "
            />
  
            <h3 className="
              text-2xl
              font-bold
            ">
              Manage Orders
            </h3>
  
            <p className="
              text-gray-500
              mt-2
            ">
              Track customer
              orders
            </p>
          </button>
  
        </div>
      </div>
    );
  }
  
  export default QuickActions;