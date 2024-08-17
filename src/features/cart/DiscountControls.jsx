import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  APPLY_FIXED_DISCOUNT,
  APPLY_PERCENTAGE_DISCOUNT,
  RESET_DISCOUNT,
} from "./cartSlice";

const DiscountControls = () => {
  const { discountType } = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  const applyFixedDiscount = () => {
    dispatch(RESET_DISCOUNT());
    dispatch(APPLY_FIXED_DISCOUNT(10)); // Apply $10 off
  };

  const applyPercentageDiscount = () => {
    dispatch(RESET_DISCOUNT());
    dispatch(APPLY_PERCENTAGE_DISCOUNT(10)); // Apply 10% off
  };

  return (
    <div className="discount-controls flex gap-3">
      <button
        className="btn btn-fixed-discount p-2 bg-blue-400 text-white hover:bg-blue-600"
        onClick={applyFixedDiscount}
        disabled={discountType === "fixed"}
      >
        Apply $10 Off
      </button>
      <button
        className="btn btn-percentage-discount p-2 bg-blue-400 text-white hover:bg-blue-600"
        onClick={applyPercentageDiscount}
        disabled={discountType === "percentage"}
      >
        Apply 10% Off
      </button>
    </div>
  );
};

export default DiscountControls;
