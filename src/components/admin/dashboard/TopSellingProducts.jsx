import Link from "next/link";

const TopSellingProducts = ({ products = [] }) => {

  // Sirf Top 5 Products
  const topProducts = products.slice(0, 5);

  // Highest Sell Count
  const maxSell =
    topProducts.length > 0
      ? Math.max(...topProducts.map((p) => p.sellCount || 0))
      : 1;

  return (

    <div className="dashboard-table">

      <div className="table-header">

        <h4>🔥 Top Selling Products</h4>

        <Link href="/admin/products">
          View All
        </Link>

      </div>

      <table>

        <thead>

          <tr>

            <th style={{ width: "70px" }}>Image</th>

            <th>Product</th>

            <th style={{ width: "100px" }}>Price</th>

            <th style={{ width: "180px" }}>Sold</th>

          </tr>

        </thead>

        <tbody>

          {topProducts.length > 0 ? (

            topProducts.map((item) => {

              const percent =
                maxSell > 0
                  ? (item.sellCount / maxSell) * 100
                  : 0;

              return (

                <tr key={item._id}>

                  <td>

                    <img
                      src={item.img || "/images/no-image.png"}
                      alt={item.title}
                      className="product-thumb"
                    />

                  </td>

                  <td>

                    <div>

                      <strong className="product-title">
                        {item.title}
                      </strong>

                      <br />

                      <small>
                        {item.category?.name || "-"}
                      </small>

                    </div>

                  </td>

                  <td>

                    ₹ {item.price}

                  </td>

                  <td>

                    <div>

                      <strong>{item.sellCount}</strong>

                      <div className="progress">

                        <div
                          className="progress-bar"
                          style={{
                            width: `${percent}%`,
                          }}
                        />

                      </div>

                    </div>

                  </td>

                </tr>

              );

            })

          ) : (

            <tr>

              <td
                colSpan="4"
                style={{
                  textAlign: "center",
                  padding: "25px",
                }}
              >

                No Products Found

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

};

export default TopSellingProducts;