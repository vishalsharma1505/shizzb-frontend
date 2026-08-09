const OrderTimeline = ({ history = [] }) => {

  const steps = [
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "out_for_delivery",
    "delivered",
  ];

  const labels = {
    pending: "Pending",
    confirmed: "Confirmed",
    processing: "Processing",
    shipped: "Shipped",
    out_for_delivery: "Out For Delivery",
    delivered: "Delivered",
  };

  return (

    <div className="dashboard-table">

      <div className="table-header">
        <h4>Order Timeline</h4>
      </div>

      <div className="timeline">

        {steps.map((step, index) => {

          const completed = history.find(
            (item) => item.status === step
          );

          return (

            <div
              key={step}
              className={`timeline-item ${
                completed ? "completed" : ""
              }`}
            >

              <div className="timeline-dot" />

              {index !== steps.length - 1 && (
                <div className="timeline-line" />
              )}

              <div className="timeline-content">

                <h6>{labels[step]}</h6>

                {completed && (

                  <small>

                    {new Date(
                      completed.updatedAt
                    ).toLocaleString()}

                  </small>

                )}

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

};

export default OrderTimeline;