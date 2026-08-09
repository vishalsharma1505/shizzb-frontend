import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout from "../../../components/admin/AdminLayout";
import OrderTimeline from "../../../components/admin/orders/OrderTimeline";
import CourierCard from "../../../components/admin/orders/CourierCard";

const OrderDetails = () => {

  const router = useRouter();

  const { id } = router.query;

  const [order, setOrder] = useState(null);

  const [status, setStatus] = useState("");

const [paymentStatus, setPaymentStatus] = useState("");

const [courierCompany, setCourierCompany] = useState("");

const [trackingNumber, setTrackingNumber] = useState("");

const [trackingUrl, setTrackingUrl] = useState("");

const [adminNote, setAdminNote] = useState("");

const [cancelReason, setCancelReason] = useState("");

const [returnReason, setReturnReason] = useState("");

const [saving, setSaving] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (id) {

      loadOrder();

    }

  }, [id]);

  const loadOrder = async () => {

    try {

      const { data } = await axios.get(

        `${process.env.NEXT_PUBLIC_API_URL}/api/order/admin/details/${id}`

      );

      if (data.success) {

        setOrder(data.data);

        setStatus(data.data.status || "");

setPaymentStatus(data.data.paymentStatus || "");

setCourierCompany(data.data.courierCompany || "");

setTrackingNumber(data.data.trackingNumber || "");

setTrackingUrl(data.data.trackingUrl || "");

setAdminNote(data.data.adminNote || "");

setCancelReason(data.data.cancelReason || "");

setReturnReason(data.data.returnReason || "");

      }

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  };

const saveOrder = async () => {

  try {

    setSaving(true);

    await axios.patch(

      `${process.env.NEXT_PUBLIC_API_URL}/api/order/admin/update-status/${id}`,

      {

        status,

        paymentStatus,

        courierCompany,

        trackingNumber,

        trackingUrl,

        adminNote,

        cancelReason,

        returnReason,

      }

    );

    alert("Order Updated Successfully");

    loadOrder();

  } catch (err) {

    console.log(err);

    alert("Unable to update order.");

  }

  setSaving(false);

};

  if (loading) {

    return (

      <AdminLayout>

        <h3>Loading Order...</h3>

      </AdminLayout>

    );

  }

  if (!order) {

    return (

      <AdminLayout>

        <h3>Order Not Found</h3>

      </AdminLayout>

    );

  }

  return (

  <AdminLayout>

    <div className="order-page-title">

      <div>

        <h2>

          Order #{order.invoice}

        </h2>

        <small>

          Created :
          {" "}
          {new Date(order.createdAt).toLocaleString()}

        </small>

      </div>

    </div>

    {/* ============================
          TOP CARDS
    ============================= */}

    <div className="order-summary-grid">

      {/* Customer */}

      <div className="order-summary-card">

        <h4>Customer Information</h4>

        <hr />

        <p><strong>Name :</strong> {order.name}</p>

        <p><strong>Email :</strong> {order.email}</p>

        <p><strong>Phone :</strong> {order.contact}</p>

      </div>

      {/* Shipping */}

      <div className="order-summary-card">

        <h4>Shipping Address</h4>

        <hr />

        <p>{order.address}</p>

        <p>{order.city}</p>

        <p>{order.country}</p>

        <p>{order.zipCode}</p>

      </div>

      {/* Payment */}

      <div className="order-summary-card">

        <h4>Payment Details</h4>

        <hr />

        <p>

          <strong>Method :</strong>

          {" "}

          {order.paymentMethod}

        </p>

        <p>

          <strong>Payment :</strong>

          {" "}

          {order.paymentStatus}

        </p>

        <p>

          <strong>Order Status :</strong>

          {" "}

          {order.status}

        </p>

      </div>

      {/* Summary */}

      <div className="order-summary-card">

        <h4>Order Summary</h4>

        <hr />

        <p>

          <strong>Subtotal :</strong>

          ₹ {order.subTotal}

        </p>

        <p>

          <strong>Shipping :</strong>

          ₹ {order.shippingCost}

        </p>

        <p>

          <strong>Discount :</strong>

          ₹ {order.discount}

        </p>

        <hr />

        <h3>

          Total :

          ₹ {order.totalAmount}

        </h3>

      </div>

    </div>

    {/* ============================
            PRODUCTS
    ============================= */}

    <div className="order-dashboard-table">

      <div className="order-table-header">

        <h4>

          Ordered Products

        </h4>

      </div>


      <table>

        <thead>

          <tr>

            <th>Image</th>

            <th>Product</th>

            <th>Price</th>

            <th>Qty</th>

            <th>Total</th>

          </tr>

        </thead>

        <tbody>

          {order.cart?.map((item,index)=>(

            <tr key={index}>

              <td>

                <img

                  src={item.img}

                  className="order-product-thumb"

                  alt={item.title}

                />

              </td>

              <td>

                <strong>

                  {item.title}

                </strong>

              </td>

              <td>

                ₹ {item.price}

              </td>

              <td>

                {item.orderQuantity}

              </td>

              <td>

                ₹ {(item.price || 0) * (item.orderQuantity || 0)}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

<OrderTimeline
    history={order.statusHistory}
/>

<CourierCard
    order={order}
/>

<div className="order-dashboard-table">

    <div className="order-table-header">

        <h4>Order Management</h4>

    </div>

    <div className="order-form-grid">

        <div>

            <label>Status</label>

            <select
                value={status}
                onChange={(e)=>setStatus(e.target.value)}
            >

                <option value="pending">Pending</option>

                <option value="confirmed">Confirmed</option>

                <option value="processing">Processing</option>

                <option value="shipped">Shipped</option>

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

        </div>

        <div>

            <label>Payment Status</label>

            <select
                value={paymentStatus}
                onChange={(e)=>setPaymentStatus(e.target.value)}
            >

                <option value="pending">Pending</option>

                <option value="paid">Paid</option>

                <option value="failed">Failed</option>

                <option value="refunded">Refunded</option>

            </select>

        </div>

        <div>

            <label>Courier Company</label>

            <input
                value={courierCompany}
                onChange={(e)=>setCourierCompany(e.target.value)}
            />

        </div>

        <div>

            <label>Tracking Number</label>

            <input
                value={trackingNumber}
                onChange={(e)=>setTrackingNumber(e.target.value)}
            />

        </div>

        <div>

            <label>Tracking URL</label>

            <input
                value={trackingUrl}
                onChange={(e)=>setTrackingUrl(e.target.value)}
            />

        </div>

        <div>

            <label>Admin Note</label>

            <textarea
                rows={3}
                value={adminNote}
                onChange={(e)=>setAdminNote(e.target.value)}
            />

        </div>

        <div>

            <label>Cancel Reason</label>

            <textarea
                rows={3}
                value={cancelReason}
                onChange={(e)=>setCancelReason(e.target.value)}
            />

        </div>

        <div>

            <label>Return Reason</label>

            <textarea
                rows={3}
                value={returnReason}
                onChange={(e)=>setReturnReason(e.target.value)}
            />

        </div>

    </div>

    <button

        className="save-btn"

        onClick={saveOrder}

    >

        {

            saving

            ?

            "Saving..."

            :

            "Update Order"

        }

    </button>

</div>


  </AdminLayout>

);

};

export default OrderDetails;