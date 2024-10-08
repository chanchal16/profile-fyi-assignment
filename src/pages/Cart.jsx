import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconX } from "@tabler/icons-react";
import { CartItemCard } from "../components/CartItemCard";
import DiscountControls from "../features/cart/DiscountControls";
import { RESET_DISCOUNT } from "../features/cart/cartSlice";

export const Cart = () => {
  const { cart, totalPrice, discount, discountType, finalPrice } = useSelector(
    (state) => state.cartItems
  );
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-6 grid-gap-4 p-8">
      <div className="col-span-4 pt-4 ml-2">
        {/* cart */}
        <div className="p-2">
          <h3 className="mb-2 text-2xl">
            Cart {cart.length ? `(${cart.length} )` : "items"}
          </h3>
          {cart.length > 0 ? (
            cart.map((item) => {
              return <CartItemCard key={item.id} product={item} />;
            })
          ) : (
            <div className=""> Your cart is empty</div>
          )}
        </div>
      </div>
      <div className="pt-4 col-span-2 mr-2">
        {cart.length > 0 && (
          <div className="flex justify-between">
            <h3 className="mb-2 text-lg">Available Discounts</h3>
            <DiscountControls />
          </div>
        )}
        <h3 className="mb-2 text-2xl">Order Summary</h3>
        {cart.length > 0 ? (
          <div className=" flex flex-col gap-3 p-2 border border-gray-300 rounded mt-4">
            <ul className="list-no-style flex flex-col gap-4">
              {cart.map((item) => {
                return (
                  <li key={item.id} className="flex flex-col rounded">
                    <strong className="text-gray-4 font-medium">
                      {item.title}{" "}
                      {item.quantity > 1 ? `(x ${item.quantity})` : ""}
                    </strong>
                    <small>Price: ${item.price * item.quantity}</small>
                  </li>
                );
              })}
            </ul>

            <hr />
            <p>Subtotal: ${totalPrice.toFixed(2)}</p>
            <hr />
            {discountType && (
              <>
                <div className="flex justify-between">
                  <p>
                    Discount:{" "}
                    {discountType === "fixed" ? `$${discount}` : `${discount}%`}
                  </p>
                  <IconX
                    onClick={() => dispatch(RESET_DISCOUNT())}
                    className="cursor-pointer"
                  />
                </div>
                <hr />
              </>
            )}

            <div className="font-semibold">
              Total Price: ${finalPrice.toFixed(2)}
            </div>
          </div>
        ) : (
          <div className="">Cart is empty</div>
        )}
      </div>
    </div>
  );
};
