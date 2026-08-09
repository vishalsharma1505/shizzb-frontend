import Link from "next/link";

const LatestCustomers = ({ customers = [] }) => {

  return (

    <div className="dashboard-table">

      <div className="table-header">

        <h4>Latest Customers</h4>

        <Link href="/admin/customers">
          View All
        </Link>

      </div>

      <table>

        <thead>

          <tr>

            <th>Name</th>

            <th>Email</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {customers.length > 0 ? (

            customers.map((customer) => (

              <tr key={customer._id}>

                <td>

                  {customer.name}

                </td>

                <td>

                  {customer.email}

                </td>

                <td>

                  <span className={`status ${customer.status}`}>

                    {customer.status}

                  </span>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="3"
                style={{
                  textAlign: "center",
                  padding: "30px",
                }}
              >

                No Customers Found

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

};

export default LatestCustomers;