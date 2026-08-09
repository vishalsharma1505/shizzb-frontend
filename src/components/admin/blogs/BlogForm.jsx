import { useState, useEffect } from "react";

const BrandForm = ({
  initialData = null,
  onSubmit,
  loading,
}) => {

  const [form, setForm] = useState({
    logo: "",
    name: "",
    description: "",
    email: "",
    website: "",
    location: "",
    status: "active",
  });

  useEffect(() => {

    if (!initialData) return;

    setForm({
      logo: initialData.logo || "",
      name: initialData.name || "",
      description: initialData.description || "",
      email: initialData.email || "",
      website: initialData.website || "",
      location: initialData.location || "",
      status: initialData.status || "active",
    });

  }, [initialData?._id]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const submit = (e) => {

    e.preventDefault();

    onSubmit(form);

  };

  return (

    <form className="brand-form" onSubmit={submit}>

      <div className="form-group">

        <label>Logo URL</label>

        <input
          type="text"
          name="logo"
          value={form.logo}
          onChange={handleChange}
          placeholder="https://example.com/logo.png"
          required
        />

        {form.logo && (

          <img
            src={form.logo}
            alt="Brand Logo"
            style={{
              width: "120px",
              height: "120px",
              marginTop: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              objectFit: "contain",
              padding: "8px",
              background: "#fff",
            }}
          />

        )}

      </div>

      <div className="form-group">

        <label>Brand Name</label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

      </div>

      <div className="form-group">

        <label>Description</label>

        <textarea
          rows={4}
          name="description"
          value={form.description}
          onChange={handleChange}
        />

      </div>

      <div className="form-group">

        <label>Email</label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

      </div>

      <div className="form-group">

        <label>Website</label>

        <input
          type="text"
          name="website"
          value={form.website}
          onChange={handleChange}
        />

      </div>

      <div className="form-group">

        <label>Location</label>

        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
        />

      </div>

      <div className="form-group">

        <label>Status</label>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >

          <option value="active">
            Active
          </option>

          <option value="inactive">
            Inactive
          </option>

        </select>

      </div>

      <button
        className="brand-add-btn"
        type="submit"
        disabled={loading}
      >

        {loading ? "Saving..." : "Save Brand"}

      </button>

    </form>

  );

};

export default BrandForm;