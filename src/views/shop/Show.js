import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";

/** Redux */
import { connect, useDispatch } from "react-redux";
import { fetchProductBySlug } from "../../components/products/redux";
import { addProductToCart } from "../../components/cart/redux";

let APP_URL = "http://localhost:8000";

const ProductBySlug = ({ product }) => {
  const dispatch = useDispatch();
  let { slug } = useParams();

  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(fetchProductBySlug(slug));
  }, []);

  const addToCart = (product) => {
    dispatch(addProductToCart({ ...product, qty: qty }));
    setQty(1);
    document.getElementById("quantity-input").value = 1;
    Swal.fire({ icon: "success", text: "Added to cart" });
  };

  const setQuantity = (type) => {
    if (type === "increment") {
      setQty(qty + 1);
    } else {
      setQty(qty - 1);
    }
  };

  return (
    <section>
      <div className="row container mx-auto" style={{ marginTop: "20vh" }}>
        <div className="col-lg-8">
          <img
            src={
              product?.images.length !== 0
                ? APP_URL + product?.images[0].path
                : "/images/empty-image.png"
            }
            alt="Featured product"
            className="img-fluid"
          />

          <div className="row mt-3">
            {product?.images.map((image, index) => (
              <div className="col-lg-4">
                <img
                  src={APP_URL + image.path}
                  alt="Product"
                  className={`img-fluid ${index === 0 ? "d-none" : ""}`}
                  style={{ height: "180px" }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-4 pl-4">
          <div className="productDetailsContainer">
            <h4 className="font-weight-bold" style={{ overflow: "hidden" }}>
              {product?.name}
            </h4>

            <p className="text-muted">{product?.description}</p>

            <NumberFormat
              value={product?.price}
              displayType={"text"}
              thousandSeparator={true}
              fixedDecimalScale={true}
              prefix={"₱ "}
            />

            <div className="form-group mt-3">
              <small>Quantity</small>
              <div className="input-group mt-2 mb-3">
                <div className="input-group-prepend">
                  <button
                    className="btn btn-light border px-4"
                    type="button"
                    onClick={(e) => setQuantity("decrement")}
                    disabled={qty === 0 ? true : false}
                  >
                    <small>-</small>
                  </button>
                </div>
                <input
                  type="number"
                  id="quantity-input"
                  className="form-control text-center py-3"
                  value={qty}
                  readOnly
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-light border px-4"
                    type="button"
                    onClick={(e) => setQuantity("increment")}
                    disabled={qty === product?.stock ? true : false}
                  >
                    <small>+</small>
                  </button>
                </div>
              </div>

              <small className="text-muted">
                Available: <span className="ml-2">{product?.stock}</span>
              </small>
            </div>

            <div className="">
              <button
                type="button"
                className="btn btn-dark btn-block py-2"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="text-center text-muted w-100 bg-light mt-4 py-5"
        style={{ border: "solid 1px #f1f1f1" }}
      >
        <p className="mb-0">SKU: {product?.sku}</p>
      </div>
    </section>
  );
};

const mapState = (state) => ({
  product: state.productReducer.product,
});

const mapDispatch = {
  fetchProductBySlug,
  addProductToCart,
};

export default connect(mapState, mapDispatch)(ProductBySlug);
