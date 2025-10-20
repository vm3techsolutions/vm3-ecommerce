// "use client";
// import PageTitle from "@/components/PageTitle";
// import PrimaryButton from "@/components/PrimaryButton";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const BasicDMPackages = () => {
//   const [packages, setPackages] = useState([]);
//   const [selectedBudgets, setSelectedBudgets] = useState({});
//   const [keywords, setKeywords] = useState({});

//   const title = "Advertising Campaign Packages";
//   const breadcrumbs = [
//     { label: "Home", link: "/" },
//     { label: "Advertising Campaign Packages" },
//   ];
//   const imageUrl = "/assets/BannerBG.jpg";

//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/packages/category/4");
//         setPackages(res.data);
//       } catch (err) {
//         console.error("Error fetching ads packages:", err);
//       }
//     };
//     fetchPlans();
//   }, []);

//   // Handle platform budget selection
//   const handleBudgetChange = (pkgId, platformName, value, checked) => {
//     setSelectedBudgets((prev) => {
//       const pkgBudgets = prev[pkgId] || {};
//       if (!checked) {
//         const { [platformName]: _, ...rest } = pkgBudgets;
//         return { ...prev, [pkgId]: rest };
//       }
//       return { ...prev, [pkgId]: { ...pkgBudgets, [platformName]: Number(value) } };
//     });
//   };

//   // Handle keyword input
//   const handleKeywordChange = (pkgId, index, value) => {
//     setKeywords((prev) => {
//       const pkgKeywords = prev[pkgId] || [];
//       const updated = [...pkgKeywords];
//       updated[index] = value;
//       return { ...prev, [pkgId]: updated };
//     });
//   };

// const calculateTotal = (pkg) => {
//   let total = 0;
//   const multiplier = Math.round(pkg.duration_days / 30); // convert days to months

//   // Get selected budgets for this package
//   const budgets = selectedBudgets[pkg.id] || {};

//   // Add selected platform budgets × multiplier
//   Object.values(budgets).forEach((val) => {
//     total += (Number(val) || 0) * multiplier;
//   });

//   return total;
// };
// // const calculateTotal = (pkg) => {
// //   let total = 0; // start with 0

// //   // Get selected budgets for this package
// //   const budgets = selectedBudgets[pkg.id] || {};

// //   // Add each selected budget value
// //   Object.values(budgets).forEach((val) => {
// //     total += Number(val) || 0;
// //   });

// //   return total;
// // };

//   if (!packages.length) {
//     return <p className="text-center py-10 text-lg">Loading Packages...</p>;
//   }

//   return (
//     <>
//       <PageTitle title={title} breadcrumbs={breadcrumbs} imageUrl={imageUrl} />

//       <div className="bg-gray-50 py-20">
//         <h1 className="text-4xl font-bold text-center mb-10">
//           Advertising Campaign Packages
//         </h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-10">
//           {packages.map((pkg) => (
//             <div
//               key={pkg.id}
//               className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition"
//             >
//               {/* Package Info */}
//               <h2 className="text-2xl font-semibold mb-2 text-[#EDBA3C]">
//                 {pkg.name}
//               </h2>
//               <p className="text-gray-600 mb-4">{pkg.description}</p>

//                {/* Features */}
//               <h3 className="font-semibold text-lg mb-2">Features:</h3>
//               <ul className="list-disc list-inside text-sm text-gray-700 mb-4">
//                 {pkg.details["Social Media Platforms"].map((feat, idx) => (
//                   <li key={idx}>{feat}</li>
//                 ))}
//               </ul>

//               {/* Budget Options */}
//               <h3 className="font-semibold text-lg mb-2">Budget Options (per platform):</h3>
//               <div className="space-y-3 mb-4">
//                 {pkg.details.platforms.map((platform, index) => (
//                   <div key={index} className="flex items-center justify-between space-x-2">
//                     <label className="flex items-center space-x-2">
//                       <input
//                         type="checkbox"
//                         checked={!!selectedBudgets[pkg.id]?.[platform.name]}
//                         onChange={(e) =>
//                           handleBudgetChange(pkg.id, platform.name, platform.budget_options[0], e.target.checked)
//                         }
//                       />
//                       <span>{platform.name}</span>
//                     </label>
//                     {selectedBudgets[pkg.id]?.[platform.name] !== undefined && (
//                       <select
//                         value={selectedBudgets[pkg.id][platform.name]}
//                         onChange={(e) =>
//                           handleBudgetChange(pkg.id, platform.name, e.target.value, true)
//                         }
//                         className="border border-gray-300 px-2 py-1 rounded focus:ring-2 focus:ring-[#EDBA3C]"
//                       >
//                         <option value="">Choose an option</option>
//                         {platform.budget_options.map((opt, idx) => (
//                           <option key={idx} value={opt}>
//                             ₹{opt.toLocaleString()}
//                           </option>
//                         ))}
//                       </select>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Keyword Inputs */}
//               <h3 className="font-semibold text-lg mb-2 text-orange-500">
//                 Suggest Your Top {pkg.details.keywords_required} Keywords
//               </h3>
//               <div className="grid grid-cols-2 gap-3 mb-4">
//                 {Array.from({ length: pkg.details.keywords_required }).map((_, idx) => (
//                   <input
//                     key={idx}
//                     type="text"
//                     placeholder={`Keyword-${idx + 1}`}
//                     value={keywords[pkg.id]?.[idx] || ""}
//                     onChange={(e) => handleKeywordChange(pkg.id, idx, e.target.value)}
//                     className="border border-gray-300 px-2 py-1 rounded focus:ring-2 focus:ring-[#EDBA3C]"
//                   />
//                 ))}
//               </div>

             

//               {/* Total Price */}
//               <p className="text-xl font-semibold mb-2 text-[#EDBA3C] mt-6 pb-8">
//                 Total Price: ₹{calculateTotal(pkg).toLocaleString("en-IN")}
//               </p>

//               {/* CTA */}
//               <PrimaryButton href="/">Get Started</PrimaryButton>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default BasicDMPackages;

"use client";
import PageTitle from "@/components/PageTitle";
import PrimaryButton from "@/components/PrimaryButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
  fetchWishlist,
} from "@/app/store/wishlistSlice";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";

const BasicDMPackages = () => {
  const [packages, setPackages] = useState([]);
  const [selectedBudgets, setSelectedBudgets] = useState({});
  const [keywords, setKeywords] = useState({});

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth?.user?.id);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const title = "Digital Marketing Packages";
  const breadcrumbs = [
    { label: "Home", link: "/" },
    { label: "Digital Marketing Packages" },
  ];
  const imageUrl = "/assets/BannerBG.jpg";

  // Fetch packages
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/packages/category/4`
        );
        setPackages(res.data);
      } catch (err) {
        console.error("Error fetching ads packages:", err);
      }
    };
    fetchPlans();
  }, []);

  // Fetch wishlist for logged-in user
  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlist(userId));
    }
  }, [userId, dispatch]);

  // Toggle wishlist
  const handleWishlistToggle = (pkg) => {
    if (!userId) {
      alert("Please login to use wishlist.");
      return;
    }
    if (wishlistItems.some((item) => item.id === pkg.id)) {
      dispatch(removeFromWishlist({ userId, packageId: pkg.id }));
    } else {
      dispatch(addToWishlist({ userId, packageId: pkg.id }));
    }
  };

  // Handle budget selection
  const handleBudgetChange = (pkgId, platformName, value, checked) => {
    setSelectedBudgets((prev) => {
      const pkgBudgets = prev[pkgId] || {};
      if (!checked) {
        const { [platformName]: _, ...rest } = pkgBudgets;
        return { ...prev, [pkgId]: rest };
      }
      return {
        ...prev,
        [pkgId]: { ...pkgBudgets, [platformName]: Number(value) },
      };
    });
  };

  // Handle keyword input
  const handleKeywordChange = (pkgId, index, value) => {
    setKeywords((prev) => {
      const pkgKeywords = prev[pkgId] || [];
      const updated = [...pkgKeywords];
      updated[index] = value;
      return { ...prev, [pkgId]: updated };
    });
  };

  // Calculate total price
  const calculateTotal = (pkg) => {
    let total = 0;
    const multiplier = Math.round(pkg.duration_days / 30);

    const budgets = selectedBudgets[pkg.id] || {};
    Object.values(budgets).forEach((val) => {
      total += (Number(val) || 0) * multiplier;
    });

    return total;
  };

  if (!packages.length) {
    return <p className="text-center py-10 text-lg">Loading Packages...</p>;
  }

  // Split packages into two groups
  const firstGroup = packages.slice(0, 4);
  const secondGroup = packages.slice(4, 8);

  const renderPackageCard = (pkg) => (
    <div
      key={pkg.id}
      className="relative bg-white shadow-lg rounded-2xl p-6 border border-yellow-400 hover:shadow-xl transition"
    >
      {/* Wishlist Heart */}
      <button
        onClick={() => handleWishlistToggle(pkg)}
        className="absolute top-4 right-4"
      >
        {wishlistItems.some((item) => item.id === pkg.id) ? (
          <SolidHeart className="w-8 h-8 text-red-500" />
        ) : (
          <OutlineHeart className="w-8 h-8 text-gray-400 hover:text-red-500" />
        )}
      </button>

      {/* Package Info */}
      <h2 className="text-2xl font-semibold mb-2 text-[#EDBA3C]">
        {pkg.name}
      </h2>
      <p className="text-gray-600 mb-4">{pkg.description}</p>

      {/* Features */}
      <h3 className="font-semibold text-lg mb-2">Social Media Platforms</h3>
      <ul className="mb-4">
        {pkg.details["Social Media Platforms"].map((feat, idx) => (
          <li key={idx}>✔ {feat}</li>
        ))}
      </ul>

      {/* Budget Options */}
      <h3 className="font-semibold text-lg mb-2">
        Budget Options (per platform):
      </h3>
      <div className="space-y-3 mb-4">
        {pkg.details.platforms.map((platform, index) => (
          <div
            key={index}
            className="flex items-center justify-between space-x-2"
          >
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={!!selectedBudgets[pkg.id]?.[platform.name]}
                onChange={(e) =>
                  handleBudgetChange(
                    pkg.id,
                    platform.name,
                    platform.budget_options[0],
                    e.target.checked
                  )
                }
              />
              <span>{platform.name}</span>
            </label>
            {selectedBudgets[pkg.id]?.[platform.name] !== undefined && (
              <select
                value={selectedBudgets[pkg.id][platform.name]}
                onChange={(e) =>
                  handleBudgetChange(pkg.id, platform.name, e.target.value, true)
                }
                className="border border-gray-300 px-2 py-1 rounded focus:ring-2 focus:ring-[#EDBA3C]"
              >
                <option value="">Choose an option</option>
                {platform.budget_options.map((opt, idx) => (
                  <option key={idx} value={opt}>
                    ₹{opt.toLocaleString()}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>

      {/* Keyword Inputs */}
      <h3 className="font-semibold text-lg mb-2 text-orange-500">
        Suggest Your Top {pkg.details.keywords_required} Keywords
      </h3>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {Array.from({ length: pkg.details.keywords_required }).map((_, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Keyword-${idx + 1}`}
            value={keywords[pkg.id]?.[idx] || ""}
            onChange={(e) => handleKeywordChange(pkg.id, idx, e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded focus:ring-2 focus:ring-[#EDBA3C]"
          />
        ))}
      </div>

      {/* Total Price */}
      <p className="text-xl font-semibold mb-2 text-[#EDBA3C] mt-6 pb-8">
        Total Price: ₹{calculateTotal(pkg).toLocaleString("en-IN")}
      </p>

      {/* CTA */}
      <PrimaryButton href="/">Get Started</PrimaryButton>
    </div>
  );

  return (
    <>
      <PageTitle title={title} breadcrumbs={breadcrumbs} imageUrl={imageUrl} />

      <div className="bg-white-50 py-15">
        {/* First 4 packages */}
        <h2 className="text-4xl font-bold text-center pt-2 pb-2 mb-6 text-black-600">
          Basic Digital Advertising Packages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-10 mb-16">
          {firstGroup.map(renderPackageCard)}
        </div>

        {/* Next 4 packages */}
        <h2 className="text-4xl font-bold text-center pt-4 pb-2 mb-6 text-black-600">
          Premium Digital Advertising Packages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-10">
          {secondGroup.map(renderPackageCard)}
        </div>
      </div>
    </>
  );
};

export default BasicDMPackages;

