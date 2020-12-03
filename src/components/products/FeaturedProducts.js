import React, { useEffect } from "react";
import ProductCard from "./ProductCard";

/** Redux */
import { connect, useDispatch } from "react-redux";
import { fetchFeaturedProducts } from "./redux";

const FeaturedProducts = ({ featuredProducts }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, []);

  return (
    <div className="row mt-4">
      {featuredProducts.map((product) => (
        <div className="col-lg-4" key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

const mapState = (state) => ({
  featuredProducts: state.productReducer.featuredProducts,
});

const mapDispatch = {
  fetchFeaturedProducts,
};

export default connect(mapState, mapDispatch)(FeaturedProducts);
