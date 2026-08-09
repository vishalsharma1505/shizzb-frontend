import React from "react";

const BrandTable = ({
  brands,
  onDelete,
  onEdit,
}) => {

  console.log("✅ NEW BrandTable Loaded");

  const handleDelete = (id, name) => {

    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete "${name}"?\n\nThis action cannot be undone.`
    );

    if (confirmDelete) {
      onDelete(id);
    }

  };

  const openWebsite = (website) => {

    console.log("Website from DB =>", website);

    if (!website) {
      alert("Website not found");
      return;
    }

    let url = website.trim();

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }

    console.log("Opening =>", url);

    window.open(url, "_blank");

  };

  return (

    <table className="brand-table">

      <thead>
        <tr>
          <th>Logo</th>
          <th>Name</th>
          <th>Email</th>
          <th>Website</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>

        {brands.map((brand) => (

          <tr key={brand._id}>

            <td>

              <img
                src={brand.logo}
                alt={brand.name}
                style={{
                  width: "45px",
                  height: "45px",
                  objectFit: "contain",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openWebsite(brand.website);
                }}
              />

            </td>

            <td>{brand.name}</td>

            <td>{brand.email || "-"}</td>

            <td>

              <span
                style={{
                  color: "#2563eb",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openWebsite(brand.website);
                }}
              >
                {brand.website}
              </span>

            </td>

            <td>

              <span className={`brand-status ${brand.status}`}>
                {brand.status}
              </span>

            </td>

            <td>

              <div className="brand-action">

                <button
                  className="edit-btn"
                  onClick={() => onEdit(brand)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(brand._id, brand.name)
                  }
                >
                  Delete
                </button>

              </div>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  );

};

export default BrandTable;