// "use client";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchWishlist, removeFromWishlist } from "@/app/store/wishlistSlice";
// import PageTitle from "@/components/PageTitle";
// import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

// const WishlistPage = () => {
//   const dispatch = useDispatch();
//   const userId = useSelector((state) => state.auth?.user?.id);
//   const wishlistItems = useSelector((state) => state.wishlist.items); // product objects

//   const title = "My Wishlist";
//   const breadcrumbs = [
//     { label: "Home", link: "/" },
//     { label: "Wishlist" },
//   ];
//   const imageUrl = "/assets/BannerBG.jpg";

//   // Fetch wishlist on load
//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchWishlist(userId));
//     }
//   }, [userId, dispatch]);

//   if (!userId) {
//     return <p className="text-center py-10 text-lg">Please login to view wishlist.</p>;
//   }

//   if (!wishlistItems.length) {
//     return <p className="text-center py-10 text-lg">Your wishlist is empty.</p>;
//   }

//   return (
//     <>
//       <PageTitle title={title} breadcrumbs={breadcrumbs} imageUrl={imageUrl} />

//       <div className="bg-gray-50 py-20">
//         <h1 className="text-4xl font-bold text-center mb-10">My Wishlist</h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10">
//           {wishlistItems.map((pkg) => (
//             <div
//               key={pkg.id}
//               className="relative bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition"
//             >
//               {/* Remove Wishlist */}
//               <button
//                 onClick={() => dispatch(removeFromWishlist({ userId, packageId: pkg.id }))}
//                 className="absolute top-4 right-4"
//               >
//                 <HeartSolid className="h-7 w-7 text-red-500" />
//               </button>

//               <h2 className="text-2xl font-semibold mb-2 text-[#EDBA3C]">
//                 {pkg.name}
//               </h2>
//               <p className="text-gray-600 mb-4">{pkg.description}</p>

//               <h3 className="font-semibold text-lg mb-2">Features:</h3>
//               <ul className="mb-4 space-y-1 text-sm">
//                 {pkg.details.features.map((feature, index) => (
//                   <li key={index}>✔ {feature}</li>
//                 ))}
//               </ul>

//               <p className="text-xl font-semibold mb-2 text-[#EDBA3C]">
//                 Price: ₹{pkg.price.toLocaleString()}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default WishlistPage;




"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "@/app/store/wishlistSlice";
import PageTitle from "@/components/PageTitle";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";


const WishlistPage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth?.user?.id);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []); // safe fallback

  const title = "My Wishlist";
  const breadcrumbs = [
    { label: "Home", link: "/" },
    { label: "Wishlist" },
  ];
  const imageUrl = "/assets/BannerBG.jpg";

  // Fetch wishlist on load
  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlist(userId));
    }
  }, [userId, dispatch]);

  if (!userId) {
    return <p className="text-center py-10 text-lg">Please login to view wishlist.</p>;
  }

  if (!wishlistItems || wishlistItems.length === 0) {
    return <p className="text-center py-10 text-lg">Your wishlist is empty.</p>;
  }

  return (
    <>
      <PageTitle title={title} breadcrumbs={breadcrumbs} imageUrl={imageUrl} />

      <div className="bg-gray-50 py-20">
        <h1 className="text-4xl font-bold text-center mb-10">My Wishlist</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10">
          {wishlistItems.map((pkg) => (
            <div
              key={pkg.id}
              className="relative bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition"
            >
              {/* Remove Wishlist */}
              <button
                onClick={() => dispatch(removeFromWishlist({ userId, packageId: pkg.id }))}
                className="absolute top-4 right-4"
              >
                <HeartSolid className="h-7 w-7 text-red-500" />
              </button>

              <h2 className="text-2xl font-semibold mb-2 text-[#EDBA3C]">
                {pkg.name || "No name"}
              </h2>

              
              <p className="text-gray-600 mb-4">{pkg.description || "No description"}</p>

              {/* Features Safe Check */}
              {/* {pkg?.details?.features && pkg.details.features.length > 0 && (
                <>
                  <h3 className="font-semibold text-lg mb-2">Features:</h3>
                  <ul className="mb-4 space-y-1 text-sm">
                    {pkg.details.features.map((feature, index) => (
                      <li key={index}>✔ {feature}</li>
                    ))}
                  </ul>
                  
                </>
              )} */}


              <p className="text-xl font-semibold mb-2 text-[#EDBA3C]">
                Price: ₹{pkg.price ? pkg.price.toLocaleString() : "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WishlistPage;
