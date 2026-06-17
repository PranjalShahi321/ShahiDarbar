import { useEffect, useMemo, useState } from "react";
import axios from "axios";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] =
        useState("All");
    const [loading, setLoading] =
        useState(true);

    const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
    );

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/orders`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${userInfo.token}`,
                    },
                }
            );

            setOrders(data.orders);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);


    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (
        id,
        orderStatus
    ) => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
                { orderStatus },
                {
                    headers: {
                        Authorization:
                            `Bearer ${userInfo.token}`,
                    },
                }
            );


            fetchOrders();
        } catch (error) {
            console.log(error);
            alert("Unable to update status");
        }

    };

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const matchSearch =
                (order.customerName || "N/A")
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchStatus =
                statusFilter === "All"
                    ? true
                    : order.orderStatus ===
                    statusFilter;

            return (
                matchSearch &&
                matchStatus
            );
        });

    }, [
        orders,
        search,
        statusFilter,
    ]);

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
                "Pending"
        ).length;

    const deliveredOrders =
        orders.filter(
            (o) =>
                o.orderStatus ===
                "Delivered"
        ).length;

    if (loading)
        return (<h1 className="text-center mt-20 text-2xl">
            Loading... </h1>
        );

    return (<div className="min-h-screen bg-gray-100 p-6">

        ```
        <h1 className="text-4xl font-bold text-green-700 mb-8">
            Orders Dashboard
        </h1>

        {/* CARDS */}

        <div className="grid md:grid-cols-4 gap-6 mb-8">

            <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="text-gray-500">
                    Total Orders
                </h3>

                <h2 className="text-4xl font-bold mt-2">
                    {orders.length}
                </h2>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="text-gray-500">
                    Pending
                </h3>

                <h2 className="text-4xl font-bold mt-2 text-yellow-500">
                    {pendingOrders}
                </h2>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="text-gray-500">
                    Delivered
                </h3>

                <h2 className="text-4xl font-bold mt-2 text-green-600">
                    {deliveredOrders}
                </h2>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="text-gray-500">
                    Revenue
                </h3>

                <h2 className="text-4xl font-bold mt-2 text-green-600">
                    ₹{totalRevenue}
                </h2>
            </div>
        </div>

        {/* SEARCH */}

        <div className="flex flex-col md:flex-row gap-4 mb-8">

            <input
                type="text"
                placeholder="Search customer..."
                value={search}
                onChange={(e) =>
                    setSearch(
                        e.target.value
                    )
                }
                className="
        border
        p-4
        rounded-xl
        flex-1
      "
            />

            <select
                value={statusFilter}
                onChange={(e) =>
                    setStatusFilter(
                        e.target.value
                    )
                }
                className="
        border
        p-4
        rounded-xl
      "
            >
                <option>All</option>
                <option>Pending</option>
                <option>Preparing</option>
                <option>
                    Out for Delivery
                </option>
                <option>Delivered</option>
                <option>Cancelled</option>
            </select>
        </div>

        {/* TABLE */}

        <div className="overflow-x-auto bg-white rounded-2xl shadow">

            <table className="w-full">

                <thead className="bg-green-600 text-white">

                    <tr>

                        <th className="p-4">
                            Customer
                        </th>

                        <th className="p-4">
                            Phone
                        </th>

                        <th className="p-4">
                            Address
                        </th>

                        <th className="p-4">
                            Products
                        </th>

                        <th className="p-4">
                            Amount
                        </th>

                        <th className="p-4">
                            Payment
                        </th>

                        <th className="p-4">
                            Status
                        </th>

                        <th className="p-4">
                            Date
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {filteredOrders.map(
                        (order) => (
                            <tr
                                key={order._id}
                                className="
                border-b
              "
                            >
                                <td className="p-4">
                                    {
                                        order.customerName || "N/A"
                                    }
                                </td>

                                <td className="p-4">
                                    {order.phone || "N/A"}
                                </td>

                                <td className="p-4">
                                    {order.address || "N/A"}
                                </td>

                                <td className="p-4">

                                    {(order.products || []).map(
                                        (
                                            item
                                        ) => (
                                            <p
                                                key={
                                                    item.product
                                                }
                                            >
                                                {
                                                    item.name
                                                }
                                                {" x "}
                                                {
                                                    item.quantity
                                                }
                                            </p>
                                        )
                                    )}

                                </td>

                                <td className="p-4 font-bold text-green-600">
                                    ₹
                                    {
                                        order.totalAmount
                                    }
                                </td>

                                <td className="p-4">

                                    <span className="
                  px-3
                  py-1
                  rounded-full
                  bg-green-100
                  text-green-700
                ">
                                        {
                                            order.paymentStatus
                                        }
                                    </span>

                                </td>

                                <td className="p-4">

                                    <select
                                        value={
                                            order.orderStatus
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            updateStatus(
                                                order._id,
                                                e
                                                    .target
                                                    .value
                                            )
                                        }
                                        className="
                    border
                    rounded-lg
                    p-2
                  "
                                    >
                                        <option>
                                            Pending
                                        </option>

                                        <option>
                                            Preparing
                                        </option>

                                        <option>
                                            Out for Delivery
                                        </option>

                                        <option>
                                            Delivered
                                        </option>

                                        <option>
                                            Cancelled
                                        </option>
                                    </select>

                                </td>

                                <td className="p-4">
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleString()}
                                </td>

                            </tr>
                        )
                    )}

                </tbody>

            </table>

        </div>

    </div>

    );
}

export default AdminOrders;
