import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IconShoppingCart, IconChevronDown } from "@tabler/icons-react";

export const Navbar = () => {
  const { cart, totalItems } = useSelector((state) => state.cartItems);
  return (
    <nav className="bg-blue-500">
      <div className="app-container flex items-center md:justify-between py-4 px-6 text-lg">
        <div className="flex gap-6 w-3/4">
          <Link to="/" className="text-xl text-white hover:text-yellow-300">
            ShopEase
          </Link>
          <input type="search" className="w-1/3" />
        </div>

        <div className="flex items-center flex-grow md:justify-end">
          <ul className="flex flex-grow md:flex-initial items-center justify-between md:gap-x-4 flex-wrap">
            <li>
              <span className="flex items-center text-white">
                {" "}
                More <IconChevronDown stroke={2} />
              </span>
            </li>
            <Link to="/cart">
              <li className="badge-icon">
                <span
                  className="text-white link flex items-center"
                  aria-label="shopping cart"
                >
                  <IconShoppingCart stroke={2} />
                </span>
                {cart.length > 0 ? (
                  <div className="badge numbadge">
                    <small>{totalItems}</small>
                  </div>
                ) : null}
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};
