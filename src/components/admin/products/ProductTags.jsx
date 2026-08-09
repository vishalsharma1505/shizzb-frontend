import React from "react";

const ProductTags = ({
  product,
  tagInput,
  setTagInput,
  addTag,
  removeTag,
}) => {

  return (

    <div className="product-card">

      <h4>Product Tags</h4>

      <div className="tag-input-box">

        <input
  className="tag-input"
  value={tagInput}
  onChange={(e)=>setTagInput(e.target.value)}
  placeholder="Enter Tag"
/>

        <button

          type="button"

          className="btn-save"

          onClick={addTag}

        >

          Add Tag

        </button>

      </div>

      <div className="tag-list">

        {

          product.tags.map((tag,index)=>(

            <div

              key={index}

              className="tag-chip"

            >

              <span>

                {tag}

              </span>

              <button

                type="button"

                onClick={()=>removeTag(tag)}

              >

                ×

              </button>

            </div>

          ))

        }

      </div>

    </div>

  );

};

export default ProductTags;