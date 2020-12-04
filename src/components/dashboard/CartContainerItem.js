import React from "react";
import NumberFormat from "react-number-format";

let APP_URL = "http://localhost:8000";

const CartContainerItem = ({ item, index, removeProduct }) => {
  return (
    <div className="row border-bottom py-3">
      <div className="row container mx-auto">
        <div className="col-lg-5">
          <img
            src={
              item?.images.length !== 0
                ? APP_URL + item?.images[0].path
                : "/images/empty-image.png"
            }
            alt="Featured product"
            className="img-fluid"
          />

          <button
            type="button"
            className="btn btn-danger btn-sm mt-2"
            onClick={() => removeProduct(index)}
          >
            Remove item
          </button>
        </div>

        <div className="col-lg-7 pl-4">
          <div className="productDetailsContainer">
            <p className="font-weight-bold" style={{ overflow: "hidden" }}>
              {item?.name}
            </p>

            <small>Quantity</small>
            <p className="text-muted">{item?.qty}</p>

            <small>Description</small>
            <p className="mb-3">{item?.description}</p>

            <h4>
              <NumberFormat
                value={parseInt(item?.price) * parseInt(item?.qty)}
                displayType={"text"}
                thousandSeparator={true}
                fixedDecimalScale={true}
                prefix={"₱ "}
              />
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartContainerItem;
