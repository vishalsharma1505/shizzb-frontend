import React from "react";

const ProductActions = ({
  loading,
}) => {

  return (

    <div className="product-footer">

      <button
        type="button"
        className="btn-cancel"
        onClick={() => window.history.back()}
      >
        Cancel
      </button>

      <button
        type="submit"
        className="btn-save"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Product"}
      </button>

    </div>

  );

};

export default ProductActions;