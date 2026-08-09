import { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout from "../../components/admin/AdminLayout";
import MonthlySalesChart from "../../components/admin/dashboard/MonthlySalesChart";
import RecentOrders from "../../components/admin/dashboard/RecentOrders";
import LatestCustomers from "../../components/admin/dashboard/LatestCustomers";
import TopSellingProducts from "../../components/admin/dashboard/TopSellingProducts";

const Dashboard = () => {

  const [summary, setSummary] = useState(null);

  const [monthlySales, setMonthlySales] = useState([]);

  const [recentOrders, setRecentOrders] = useState([]);

  const [latestCustomers, setLatestCustomers] = useState([]);

  const [topProducts, setTopProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      // ==========================
      // Dashboard Summary
      // ==========================

      const summaryRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/summary`
      );

      if (summaryRes.data.success) {

        setSummary(summaryRes.data.data);

      }

      // ==========================
      // Monthly Sales
      // ==========================

      const salesRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/monthly-sales`
      );

      if (salesRes.data.success) {

        setMonthlySales(salesRes.data.data);

      }

      // ==========================
      // Recent Orders
      // ==========================

      const ordersRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/recent-orders`
      );

      if (ordersRes.data.success) {

        setRecentOrders(ordersRes.data.data);

      }

      // ==========================
      // Latest Customers
      // ==========================

      const customerRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/latest-customers`
      );

      if (customerRes.data.success) {

        setLatestCustomers(customerRes.data.data);

      }

      // ==========================
      // Top Selling Products
      // ==========================

      const topProductsRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/best-selling-products`
      );

      if (topProductsRes.data.success) {

        setTopProducts(topProductsRes.data.data);

      }

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  };

  if (loading) {

    return (

      <AdminLayout>

        <h3>Loading Dashboard...</h3>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      {/* =======================
          Dashboard Cards
      ======================== */}

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h6>Total Orders</h6>
          <h2>{summary?.totalOrders || 0}</h2>
        </div>

        <div className="dashboard-card">
          <h6>Pending Orders</h6>
          <h2>{summary?.pendingOrders || 0}</h2>
        </div>

        <div className="dashboard-card">
          <h6>Confirmed Orders</h6>
          <h2>{summary?.confirmedOrders || 0}</h2>
        </div>

        <div className="dashboard-card">
          <h6>Processing Orders</h6>
          <h2>{summary?.processingOrders || 0}</h2>
        </div>

        <div className="dashboard-card">
          <h6>Shipped</h6>
          <h2>{summary?.shippedOrders || 0}</h2>
        </div>

        <div className="dashboard-card">
          <h6>Out For Delivery</h6>
          <h2>{summary?.outForDeliveryOrders || 0}</h2>
        </div>

        <div className="dashboard-card">
          <h6>Delivered</h6>
          <h2>{summary?.deliveredOrders || 0}</h2>
        </div>

        <div className="dashboard-card">
          <h6>Cancelled</h6>
          <h2>{summary?.cancelledOrders || 0}</h2>
        </div>

        <div className="dashboard-card">
          <h6>Returned</h6>
          <h2>{summary?.returnedOrders || 0}</h2>
        </div>

        <div className="dashboard-card">
          <h6>Total Revenue</h6>
          <h2>₹ {summary?.totalRevenue || 0}</h2>
        </div>

      </div>

      {/* =======================
          Monthly Sales
      ======================== */}

      <MonthlySalesChart
        data={monthlySales}
      />

      {/* =======================
          Recent Orders + Latest Customers
      ======================== */}

      <div className="dashboard-bottom">

        <RecentOrders
          orders={recentOrders}
        />

        <LatestCustomers
          customers={latestCustomers}
        />

      </div>

      {/* =======================
          Top Selling Products
      ======================== */}

      <div style={{ marginTop: "30px" }}>

        <TopSellingProducts
          products={topProducts}
        />

      </div>

    </AdminLayout>

  );

};

export default Dashboard;