import React from "react";
import { IconStarFilled } from "@tabler/icons-react";

export const ProductCard = ({ product }) => {
  return (
    <div className="bg-white w-56 flex flex-col rounded border border-gray-3 shadow-md-gray-1 mb-4 p-2">
      <img
        src={product?.image}
        alt="product"
        className="w-28 h-36 my- mx-auto"
      />
      <h3 className="text-gray-5 font-medium mt-2.5 text-ellipsis">
        {product?.title}
      </h3>

      <div className=" mb-2.5 flex justify-between items-center">
        <h4 className="text-gray-5 mt-2">${product?.price}</h4>
        <div className="my-auto bg-green-600 text-white rounded-sm inline-flex text-xs py-1 px-1.5 items-center gap-[2px]">
          {product.rating.rate}
          <IconStarFilled size={12} />
        </div>
      </div>

      <button
        className="text-sm py-1.5 px-1 border-[1.5px] border-orange-400 rounded text-orange-400  hover:bg-orange-500 hover:text-white"
        onClick={() => cartHandler(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};
