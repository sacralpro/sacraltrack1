import React, { useContext } from "react";
import Link from "next/link";
//import StarRatings from "react-star-ratings";
import Image from "next/image";
import CartContext from "@/app/context/CartContext";
import { PostMainCompTypes } from "@/app/types"; 


function CartItem({ post }: { post: PostMainCompTypes }) {

  const { addItemToCart } = useContext(CartContext);

  const addToCartHandler = () => {
    addItemToCart({
      product: post.id,
      name: post.trackname,
      image: post.image_url,
    });
  };

  return (
    <article className="border border-gray-200 overflow-hidden bg-white shadow-sm rounded mb-5">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 flex p-3">
          <div
            style={{
              width: "80%",
              height: "70%",
              position: "relative",
            }}
          >
            <Image
              src={
                `useCreateBucketUrl(post?.image_url)`
                  ? post?.image_url
                  : "/images/placeholder-user.jpg"
              }
              alt="product name"
              height="240"
              width="240"
            />
          </div>
        </div>
        <div className="md:w-2/4">
          <div className="p-4">
            <Link
              href={`/product/${post?.id}`}
              className="hover:text-blue-600"
            >
              {post.trackname}
            </Link>
            <div className="flex flex-wrap items-center space-x-2 mb-2">
              <div className="ratings">
                <div className="my-1">
           
                </div>
              </div>
              <b className="text-gray-300">•</b>

            </div>
            <p className="text-gray-500 mb-2">
            </p>
          </div>
        </div>
        <div className="md:w-1/4 border-t lg:border-t-0 lg:border-l border-gray-200">
          <div className="p-5">
            <span className="text-xl font-semibold text-black">
              $
            </span>

            <p className="text-green-500">Free Shipping</p>
            <div className="my-3">
              <a
                className="px-4 py-2 inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 cursor-pointer"
                onClick={addToCartHandler}
              >
                {" "}
                Add to Cart{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CartItem;
