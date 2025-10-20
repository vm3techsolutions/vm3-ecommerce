
"use client";
import PageTitle from "@/components/PageTitle";
import PrimaryButton from "@/components/PrimaryButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
  fetchWishlist,
} from "@/app/store/wishlistSlice";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

// ✅ Helper: safely parse JSON + normalize keys
const parseDetails = (details) => {
  try {
    const parsed =
      typeof details === "string" ? JSON.parse(details) : details || {};

    const normalized = {};
    for (const key in parsed) {
      normalized[key.toLowerCase()] = parsed[key];
    }
    return normalized;
  } catch (err) {
    console.error("Invalid JSON in pkg.details:", err, details);
    return {};
  }
};

const CRM = () => {
  const [plans, setPlans] = useState([]);
  const [contentCounts, setContentCounts] = useState({});

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth?.user?.id);
  const wishlistItems = useSelector((state) => state.wishlist.items || []);

  const title = "CRM";
  const breadcrumbs = [
    { label: "Home", link: "/" },
    { label: "CRM" },
  ];
  const imageUrl = "/assets/BannerBG.jpg";

  // ====================
  // Fetch plans
  // ====================
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/packages/category/9`
        );
        setPlans(response.data);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      }
    };

    fetchPlans();
  }, []);

  // ====================
  // Fetch wishlist on load
  // ====================
  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlist(userId));
    }
  }, [userId, dispatch]);

  // ====================
  // Toggle wishlist
  // ====================
  const handleWishlist = (pkg) => {
    if (!userId) return alert("Please login to use wishlist.");
    if (wishlistItems.some((item) => item.id === pkg.id)) {
      dispatch(removeFromWishlist({ userId, packageId: pkg.id }));
    } else {
      dispatch(addToWishlist({ userId, packageId: pkg.id }));
    }
  };

  // ====================
  // Update content counts
  // ====================
  const handleContentChange = (pkgId, addonName, value) => {
    setContentCounts((prev) => ({
      ...prev,
      [pkgId]: {
        ...(prev[pkgId] || {}),
        [addonName]: Math.max(0, Number(value)), // no negative values
      },
    }));
  };

  // ====================
  // Calculate total price
  // ====================
  const calculateTotalPrice = (pkg) => {
    let total = parseFloat(pkg.price) || 0;
    return total;
  };

  if (!plans.length) {
    return <p className="text-center py-10 text-lg">Loading Packages...</p>;
  }

  return (
    <>
      <PageTitle title={title} breadcrumbs={breadcrumbs} imageUrl={imageUrl} />

      <div className="bg-gray-50 py-20">
        <h1 className="text-4xl font-bold text-center mb-10">{title}</h1>

       <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8 px-16 md:px-140">
            {plans.map((pkg) => {
              const parsedDetails = parseDetails(pkg.details);

              return (
                <div
                  key={pkg.id}
                  className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition relative"
                >
                  {/* Wishlist Heart */}
                  <button
                    onClick={() => handleWishlist(pkg)}
                    className="absolute top-4 right-4"
                  >
                    {wishlistItems.some((item) => item.id === pkg.id) ? (
                      <HeartSolid className="h-7 w-7 text-red-500" />
                    ) : (
                      <HeartOutline className="h-7 w-7 text-gray-400 hover:text-red-500" />
                    )}
                  </button>

                  {/* Package Info */}
                  <h2 className="text-2xl font-semibold mb-2 text-[#EDBA3C]">
                    {pkg.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>

                  {/* Features */}
                  {parsedDetails.features?.length > 0 && (
                    <>
                      <h3 className="font-semibold text-lg mb-2">Features:</h3>
                      <ul className="mb-4 space-y-1 text-sm">
                        {parsedDetails.features.map((feature, index) => (
                          <li key={index}>✔ {feature}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  <p clasname="text-gray-600 mb-4 pt-4">🎯 Perfect for businesses seeking to streamline operations and grow customer relationships, without the high cost.</p>

                  {/* Total Price */}
                  <p className="text-xl font-semibold mb-2 text-[#EDBA3C] mt-6 pb-8">
                    Total Price: ₹{calculateTotalPrice(pkg).toLocaleString()}
                  </p>

                  {/* Button */}
                  <PrimaryButton href="/">Add to Cart</PrimaryButton>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CRM;

