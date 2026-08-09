import Link from "next/link";

const OrderTable = ({ orders = [] }) => {

  const formatDate = (date) => {

    return new Date(date).toLocaleDateString("en-IN", {

      day: "2-digit",
      month: "short",
      year: "numeric",

    });

  };

  return (

    <div className="dashboard-table">

      <div className="table-header">

        <h4>Orders List</h4>

        <span>

          Total : {orders.length}

        </span>

      </div>

      <table>

        <thead>

          <tr>

            <th>Invoice</th>

            <th>Customer</th>

            <th>Date</th>

            <th>Total</th>

            <th>Payment</th>

            <th>Status</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {

            orders.length > 0 ?

            orders.map((order)=>(

              <tr key={order._id}>

                <td>

                  #{order.invoice}

                </td>

                <td>

                  <div>

                    <strong>

                      {order.name}

                    </strong>

                    <br />

                    <small>

                      {order.email}

                    </small>

                  </div>

                </td>

                <td>

                  {formatDate(order.createdAt)}

                </td>

                <td>

                  ₹ {Number(order.totalAmount).toLocaleString()}

                </td>

                <td>

                  <span

                    className={`payment ${order.paymentStatus}`}

                  >

                    {order.paymentStatus}

                  </span>

                </td>

                <td>

                  <span

                    className={`status ${order.status}`}

                  >

                    {order.status.replaceAll("_"," ")}

                  </span>

                </td>

                <td>

                  <Link

                    href={`/admin/orders/${order._id}`}

                    className="view-btn"

                  >

                    View

                  </Link>

                </td>

              </tr>

            ))

            :

            <tr>

              <td

                colSpan="7"

                style={{

                  textAlign:"center",

                  padding:"30px"

                }}

              >

                No Orders Found

              </td>

            </tr>

          }

        </tbody>

      </table>

    </div>

  );

};

export default OrderTable;