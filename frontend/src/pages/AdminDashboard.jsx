import axios from "axios";
import { useEffect, useState } from "react";

import DashboardCards from "../components/admin/DashboardCards";
import QuickActions from "../components/admin/QuickActions";
import RecentOrders from "../components/admin/RecentOrders";

function AdminDashboard() {
const [products, setProducts] =
useState([]);

const [orders, setOrders] =
useState([]);

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

const fetchOrders =
async () => {
try {
const userInfo =
JSON.parse(
localStorage.getItem(
"userInfo"
)
);

    const { data } =
      await axios.get(
        `${import.meta.env.VITE_API_URL}/api/orders/admin`,
        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        }
      );

    setOrders(
      data.orders || []
    );
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
fetchProducts();
fetchOrders();
}, []);

return ( <div> <DashboardCards
     products={products}
     orders={orders}
   />

  <QuickActions />

  <RecentOrders
    orders={orders}
  />
</div>

);
}

export default AdminDashboard;
