import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../../components/admin/AdminLayout";

const Customers = () => {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {

    try {

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/admin/customers`
      );

      if (data.success) {
        setCustomers(data.data);
      }

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

const deleteCustomer = async (id) => {

    const confirmDelete = window.confirm(
        "Delete this customer?"
    );

    if (!confirmDelete) return;

    try {

        await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user/admin/customer/${id}`
        );

        alert("Customer Deleted Successfully");

        loadCustomers();

    } catch (err) {

        console.log(err);

        alert("Unable to delete customer");

    }

};

  
  // ==========================
  // Dashboard Cards
  // ==========================

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (item) => item.status === "active"
  ).length;

  const inactiveCustomers = customers.filter(
    (item) => item.status === "inactive"
  ).length;

  // ==========================
  // Search
  // ==========================

  const filteredCustomers = customers.filter((item) => {

    return (

      item.name
        ?.toLowerCase()
        .includes(search.toLowerCase())

      ||

      item.email
        ?.toLowerCase()
        .includes(search.toLowerCase())

    );

  });

  if (loading) {

    return (
      <AdminLayout>
        <h3>Loading...</h3>
      </AdminLayout>
    );
  }

  return (

    <AdminLayout>

      <div className="customer-page-title">

        <div>

          <h2>Customers</h2>

          <small>
            Registered customer list
          </small>

        </div>

      </div>

      {/* Dashboard */}

      <div className="customer-dashboard-cards">

        <div className="customer-dashboard-card">

          <h6>Total Customers</h6>

          <h2>{totalCustomers}</h2>

        </div>

        <div className="customer-dashboard-card">

          <h6>Active Customers</h6>

          <h2>{activeCustomers}</h2>

        </div>

        <div className="customer-dashboard-card">

          <h6>Inactive Customers</h6>

          <h2>{inactiveCustomers}</h2>

        </div>

      </div>

      {/* Search */}

      <div className="customer-search-bar">

        <input

          type="text"

          placeholder="Search customer..."

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

        />

      </div>

      {/* Customer Table */}

      <div className="customer-table">

        <table>

          <thead>

            <tr>

              <th>Name</th>

              <th>Email</th>

              <th>Phone</th>

              <th>Address</th>

              <th>Joined Date</th>

              <th>Last Login</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredCustomers.map((item) => (

              <tr key={item._id}>

                <td>

                  <strong>
                    {item.name}
                  </strong>

                </td>

                <td>
                  {item.email}
                </td>

                <td>
                  {item.phone || "-"}
                </td>

                <td>
                  {item.address || "-"}
                </td>

                <td>

                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}

                </td>

                <td>

                  {

                    item.lastLogin

                      ?

                      new Date(
                        item.lastLogin
                      ).toLocaleString()

                      :

                      "Never"

                  }

                </td>

                <td>

                  {

                    item.status === "active"

                      ?

                      <span className="customer-status active">
                        Active
                      </span>

                      :

                      <span className="customer-status inactive">
                        Inactive
                      </span>

                  }

                </td>

                <td>

                  <button
    className="customer-delete-btn"
    onClick={() => deleteCustomer(item._id)}
>
    🗑 Delete
</button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>

  );

};

export default Customers;