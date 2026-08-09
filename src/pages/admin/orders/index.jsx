import { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout from "../../../components/admin/AdminLayout";
import OrderTable from "../../../components/admin/orders/OrderTable";

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [paymentFilter, setPaymentFilter] =
    useState("all");

  useEffect(() => {

    loadOrders();

  }, []);

  useEffect(() => {

    filterOrders();

  }, [orders, search, statusFilter, paymentFilter]);

  // =====================================
  // LOAD ORDERS
  // =====================================

  const loadOrders = async () => {

    try {

      const { data } = await axios.get(

        `${process.env.NEXT_PUBLIC_API_URL}/api/order/admin/all`

      );

      if (data.success) {

        setOrders(data.data);

      }

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  };

  // =====================================
  // FILTER
  // =====================================

  const filterOrders = () => {

    let temp = [...orders];

    // Search

    if (search) {

      temp = temp.filter((item) =>

        item.invoice
          ?.toString()
          .includes(search) ||

        item.name
          ?.toLowerCase()
          .includes(search.toLowerCase())

      );

    }

    // Status

    if (statusFilter !== "all") {

      temp = temp.filter(

        (item) => item.status === statusFilter

      );

    }

    // Payment

    if (paymentFilter !== "all") {

      temp = temp.filter(

        (item) =>
          item.paymentStatus === paymentFilter

      );

    }

    setFilteredOrders(temp);

  };

  if (loading) {

    return (

      <AdminLayout>

        <h3>Loading Orders...</h3>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <div className="page-title">

        <h2>Orders</h2>

      </div>

      {/* Filters */}

      <div className="order-filters">

        <input

          type="text"

          placeholder="Search Invoice / Customer"

          value={search}

          onChange={(e)=>

            setSearch(e.target.value)

          }

        />

        <select

          value={statusFilter}

          onChange={(e)=>

            setStatusFilter(e.target.value)

          }

        >

          <option value="all">

            All Status

          </option>

          <option value="pending">

            Pending

          </option>

          <option value="confirmed">

            Confirmed

          </option>

          <option value="processing">

            Processing

          </option>

          <option value="shipped">

            Shipped

          </option>

          <option value="out for delivery">

            Out For Delivery

          </option>

          <option value="delivered">

            Delivered

          </option>

          <option value="cancelled">

            Cancelled

          </option>

          <option value="returned">

            Returned

          </option>

        </select>

        <select

          value={paymentFilter}

          onChange={(e)=>

            setPaymentFilter(e.target.value)

          }

        >

          <option value="all">

            All Payments

          </option>

          <option value="paid">

            Paid

          </option>

          <option value="pending">

            Pending

          </option>

          <option value="failed">

            Failed

          </option>

          <option value="refunded">

            Refunded

          </option>

        </select>

      </div>

      <OrderTable

        orders={filteredOrders}

      />

    </AdminLayout>

  );

};

export default Orders;