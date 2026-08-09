import Link from "next/link";

const RecentOrders = ({ orders }) => {

  return (

    <div className="dashboard-table">

      <div className="table-header">

        <h4>Recent Orders</h4>

        <Link href="/admin/orders">
          View All
        </Link>

      </div>

      <table>

        <thead>

          <tr>

            <th>Invoice</th>

            <th>Customer</th>

            <th>Status</th>

            <th>Payment</th>

            <th>Total</th>

          </tr>

        </thead>

        <tbody>

          {orders?.map((order) => (

            <tr key={order._id}>

              <td>

                #{order.invoice}

              </td>

              <td>

                {order.name}

              </td>

              <td>

                <span className={`status ${order.status}`}>

                  {order.status}

                </span>

              </td>

              <td>

                {order.paymentStatus}

              </td>

              <td>

                ₹ {order.totalAmount}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};

export default RecentOrders;