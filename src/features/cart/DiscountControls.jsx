import React from "react";
import { useDispatch, useSelector } from "react-redux";
import confetti from "canvas-confetti";
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
    confetti({ angle: 120, origin: { x: 1 } });
  };

  const applyPercentageDiscount = () => {
    dispatch(RESET_DISCOUNT());
    dispatch(APPLY_PERCENTAGE_DISCOUNT(10)); // Apply 10% off
    confetti({ angle: 120, origin: { x: 1 } });
  };

  return (
    <div className="flex gap-3">
      <button
        className={`px-2 rounded-sm text-sm h-8 bg-amber-500 text-white hover:bg-amber-600 ${
          discountType === "fixed" && "bg-slate-300 hover:bg-slate-300"
        }`}
        onClick={applyFixedDiscount}
        disabled={discountType === "fixed"}
      >
        Apply $10 Off
      </button>
      <button
        className={` px-2 rounded-sm text-sm h-8 bg-amber-500 text-white hover:bg-amber-600 ${
          discountType === "percentage" && "bg-slate-300 hover:bg-slate-300"
        }`}
        onClick={applyPercentageDiscount}
        disabled={discountType === "percentage"}
      >
        Apply 10% Off
      </button>
    </div>
  );
};

export default DiscountControls;
