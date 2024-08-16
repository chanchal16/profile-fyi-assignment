import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../features/products/productSlice";
import { ProductCard } from "../components/ProductCard";

export const Home = () => {
  let { products } = useSelector((state) => state.productsList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="product-list container-mid mt-8 mb-8 grid gap-5 place-items-center place-self-center sm:grid-cols-3  md:grid-cols-4  md:mx-auto ">
      {products.length > 0 ? (
        products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <h3 className="text-2xl text-gray-500 ">No products found...</h3>
      )}
    </div>
  );
};
