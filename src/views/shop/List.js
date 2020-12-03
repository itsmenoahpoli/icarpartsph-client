import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ProductCard from "./../../components/products/ProductCard";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

/** Redux */
import { connect, useDispatch } from "react-redux";
import { fetchProducts, setProduct } from "../../components/products/redux";

const ProductBySlug = ({ products }) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ show: false, text: "" });

  useEffect(() => {
    dispatch(fetchProducts());
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const showProduct = (product) => {
    dispatch(setProduct(product));
    history.push(`/shop/${product.slug}`);
  };

  const onSearchSubmit = (search) => {
    setLoading(true);
    dispatch(fetchProducts(search));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container" style={{ marginTop: "150px" }}>
      <form className="mb-5" onSubmit={() => onSearchSubmit(search)}>
        <input
          type="text"
          className="form-control py-4"
          placeholder="Search ..."
          defaultValue={search}
          onChange={(e) => onSearchSubmit(e.target.value)}
        />
      </form>

      {loading ? (
        <div className="text-center text-muted my-5 py-5">
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={70}
            width={70}
            timeout={3000} //3 secs
          />{" "}
          <p className="mt-4">Loading</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-muted my-5 py-5">
          No products found
        </div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div
              className="col-lg-4"
              key={product.id}
              onClick={() => showProduct(product)}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const mapState = (state) => ({
  products: state.productReducer.products,
});

const mapDispatch = {
  fetchProducts,
  setProduct,
};

export default connect(mapState, mapDispatch)(ProductBySlug);
