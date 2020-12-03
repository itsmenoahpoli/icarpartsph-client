import React from "react";
import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";
import NumberFormat from "react-number-format";

let APP_URL = "http://localhost:8000";

const ProductCard = ({ product }) => {
  const history = useHistory();
  const viewProduct = () => {
    history.push(`/shop/${product.slug}`);
  };

  return (
    <Card className="productCard" onClick={() => viewProduct()}>
      <Card.Body>
        <img
          src={
            product?.images.length !== 0
              ? APP_URL + product?.images[0].path
              : "/images/empty-image.png"
          }
          alt="Featured product"
          className="img-fluid mb-09"
        />

        <p className="font-weight-bold nameLabel">{product?.name}</p>
        <p className="priceLabel">
          {" "}
          <NumberFormat
            value={product?.price}
            displayType={"text"}
            thousandSeparator={true}
            fixedDecimalScale={true}
            prefix={"₱ "}
          />
        </p>
      </Card.Body>
      <Card.Footer className="text-center">
        <button className="btnDetails" onClick={() => viewProduct()}>
          View Details
        </button>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
