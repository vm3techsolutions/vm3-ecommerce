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

const BrandingMaterialDesign = () => {
  const [plans, setPlans] = useState([]); // ✅ fixed: state missing in your code
  const [contentCounts, setContentCounts] = useState({});

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth?.user?.id);
  const wishlistItems = useSelector((state) => state.wishlist.items || []);

  const title = "Branding Material Design Only";
  const breadcrumbs = [
    { label: "Home", link: "/" },
    { label: "Branding Material Design Only" },
  ];
  const imageUrl = "/assets/BannerBG.jpg";

  // ====================
  // Fetch plans
  // ====================
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/packages/category/6`
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

    const counts = contentCounts[pkg.id] || {};
    const addons = pkg.details["Select the creative assets you need"] || [];

    addons.forEach((addon) => {
      const qty = counts[addon.name] || 0;
      total += addon.price * qty;
    });

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

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-8 px-4 md:px-10">
          {plans.map((pkg) => (
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

              {/* Content Add-ons */}
              <h3 className="font-semibold text-lg mb-2">
                Select Creative Assets:
              </h3>
              <div className="space-y-2 mb-4">
                {pkg.details["Select the creative assets you need"].map(
                  (addon, index) => (
                    <label
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span>
                        {addon.name} (₹{addon.price.toLocaleString()} each)
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={contentCounts[pkg.id]?.[addon.name] || 0}
                        onChange={(e) =>
                          handleContentChange(
                            pkg.id,
                            addon.name,
                            e.target.value
                          )
                        }
                        className="ml-2 border border-gray-300 px-2 py-1 rounded w-20 focus:ring-2 focus:ring-[#EDBA3C] focus:outline-none"
                      />
                    </label>
                  )
                )}
              </div>

              {/* Total Price */}
              <p className="text-xl font-semibold mb-2 text-[#EDBA3C] mt-6 pb-8">
                Total Price: ₹{calculateTotalPrice(pkg).toLocaleString()}
              </p>

              {/* Button */}
              <PrimaryButton href="/">Get Started</PrimaryButton>
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default BrandingMaterialDesign;
