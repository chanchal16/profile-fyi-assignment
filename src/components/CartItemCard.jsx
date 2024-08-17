import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DECREASE_QTY,
  INCREASE_QTY,
  REMOVE_FROM_CART,
} from "../features/cart/cartSlice";

export const CartItemCard = ({ product }) => {
  const { cart } = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  function checkExistanceInArray(array, id) {
    return !!array.find((item) => item.id === id);
  }

  return (
    <div className=" flex border border-gray-3 rounded w-full p-2 grid-gap-4  mb-4">
      <img
        src={product?.image}
        alt="product"
        className="w-32 h-32 object-contain"
      />

      <div className="flex flex-col flex-grow">
        <strong className="font-medium">{product.title}</strong>
        <div className="flex grid-gap-4 pt-4">
          {checkExistanceInArray(cart, product.id) ? (
            <div className="flex items-center justify-between">
              <button
                onClick={() => dispatch(DECREASE_QTY(product))}
                disabled={product.quantity < 2}
                className="border pl-1 pr-1 rounded"
              >
                -
              </button>
              &nbsp;&nbsp;<small className="">{product.quantity}</small>
              &nbsp;&nbsp;
              <button
                onClick={() => dispatch(INCREASE_QTY(product))}
                className="border pl-1 pr-1 rounded"
              >
                +
              </button>
            </div>
          ) : null}
        </div>

        <div className="flex justify-between">
          <span>₹ {product.price * product.quantity}</span>
          <div>
            <button
              onClick={() => dispatch(REMOVE_FROM_CART(product.id))}
              className="p-1 border border-gray-4 rounded ml-2"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
