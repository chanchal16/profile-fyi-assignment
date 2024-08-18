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
    <div className="mt-8 mb-8 grid gap-5 place-items-center place-self-center max-[480px]:grid-cols-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 md:mx-auto lg:max-w-screen-xl xl:grid-cols-5 ">
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
