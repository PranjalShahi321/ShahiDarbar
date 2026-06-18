function DashboardCards({
    products,
    orders,
  }) {
    const totalRevenue =
      orders.reduce(
        (acc, order) =>
          acc +
          Number(
            order.totalAmount || 0
          ),
        0
      );
  
    const pendingOrders =
      orders.filter(
        (o) =>
          o.orderStatus ===
          "Processing"
      ).length;
  
    return (
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
        mb-10
      ">
  
        <div className="
          bg-white
          rounded-3xl
          p-6
          shadow
        ">
          <h3 className="text-gray-500">
            🛒 Orders
          </h3>
  
          <h1 className="
            text-5xl
            font-bold
            text-blue-600
            mt-3
          ">
            {orders.length}
          </h1>
        </div>
  
        <div className="
          bg-white
          rounded-3xl
          p-6
          shadow
        ">
          <h3 className="text-gray-500">
            💰 Revenue
          </h3>
  
          <h1 className="
            text-5xl
            font-bold
            text-green-600
            mt-3
          ">
            ₹{totalRevenue}
          </h1>
        </div>
  
        <div className="
          bg-white
          rounded-3xl
          p-6
          shadow
        ">
          <h3 className="text-gray-500">
            ⏳ Pending
          </h3>
  
          <h1 className="
            text-5xl
            font-bold
            text-yellow-500
            mt-3
          ">
            {pendingOrders}
          </h1>
        </div>
  
        <div className="
          bg-white
          rounded-3xl
          p-6
          shadow
        ">
          <h3 className="text-gray-500">
            📦 Products
          </h3>
  
          <h1 className="
            text-5xl
            font-bold
            text-purple-600
            mt-3
          ">
            {products.length}
          </h1>
        </div>
  
      </div>
    );
  }
  
  export default DashboardCards;