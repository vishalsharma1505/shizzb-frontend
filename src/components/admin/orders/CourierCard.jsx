const CourierCard = ({ order }) => {

  return (

    <div className="dashboard-table">

      <div className="table-header">

        <h4>Courier Information</h4>

      </div>

      <div className="courier-card">

        <div className="courier-item">

          <span>Courier Company</span>

          <strong>

            {order.courierCompany || "Not Assigned"}

          </strong>

        </div>

        <div className="courier-item">

          <span>Tracking Number</span>

          <strong>

            {order.trackingNumber || "-"}

          </strong>

        </div>

        <div className="courier-item">

          <span>Tracking URL</span>

          {

            order.trackingUrl ?

            <a

              href={order.trackingUrl}

              target="_blank"

              rel="noreferrer"

              className="track-btn"

            >

              Track Package

            </a>

            :

            <strong>-</strong>

          }

        </div>

      </div>

    </div>

  );

};

export default CourierCard;