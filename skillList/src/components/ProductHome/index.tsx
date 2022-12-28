import React from "react";
import { useNavigate } from "react-router-dom";

const ProductHome = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>ProductHome</div>
      <button
        onClick={() => {
          navigate("/product/1");
        }}
      >
        Go to product Detail page
      </button>
    </>
  );
};

export default ProductHome;
