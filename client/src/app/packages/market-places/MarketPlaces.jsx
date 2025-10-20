"use client";
import PageTitle from "@/components/PageTitle";
import PrimaryButton from "@/components/PrimaryButton";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";

/**
 * MarketPlaces page: improved/wrapped wishlist behavior
 * - Reads logged-in user id from Redux (state.auth.user.id)
 * - Fetches wishlist for that user and stores packageIds
 * - Adds/removes wishlist entries for the logged-in user
 * - Defensive parsing of backend responses (handles several shapes)
 * - Simple UI locking while wishlist update in-flight
 *
 * NOTE: Replace NEXT_PUBLIC_BACKEND_URL in your .env with your backend root URL.
 */

const plans = [
  {
    id: 1, // unique id (should match backend package id when available)
    name: "Market Places",
    description: "Boost sales across Amazon, Flipkart, & more.",
    type: "Market Places",
    features: [
      "SEO Content Writing",
      "Bulk Product Upload",
      "Product Listing & Cataloging",
      "Ad Campaign Management",
      "Marketplace Account Setup",
      "Price & Inventory Sync",
      "Order Management",
      "Sales & Performance Reporting",
      "Account Health Monitoring",
    ],
    addons: [
      { name: "Amazon", price: 10000 },
      { name: "Flipkart", price: 10000 },
    ],
    recommendedaddons: [
      { name: "Number of Amazon Listings", price: 200 },
      { name: "Number of Flipkart Listings", price: 150 },
    ],
    basePrice: 0,
  },
];

export default function MarketPlaces() {
  const title = "Market Places Package";
  const breadcrumbs = [
    { label: "Home", link: "/" },
    { label: "Market Places Package" },
  ];
  const imageUrl = "/assets/BannerBG.jpg";

  // get logged-in user id from redux auth
  const { user } = useSelector((state) => state.auth || {});
  const userId = user?.id ?? null;

  // local UI state
  const [selectedAddons, setSelectedAddons] = useState({});
  const [recommendedQuantities, setRecommendedQuantities] = useState({});
  const [wishlist, setWishlist] = useState([]); // array of packageIds
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [updating, setUpdating] = useState({}); // { [packageId]: boolean }

  // backend base
  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  // helper: extract packageId from various backend shapes
  const extractPackageId = (item) => {
    // possible shapes:
    // { packageId: 3 } OR { package_id: 3 } OR { package: { id: 3 } } OR { id: 3 } (maybe a package object)
    if (!item) return null;
    if (typeof item === "number") return item;
    if ("packageId" in item && item.packageId != null) return item.packageId;
    if ("package_id" in item && item.package_id != null) return item.package_id;
    if (item.package && (item.package.id || item.package.id === 0)) return item.package.id;
    // sometimes backend might return package object directly
    if (item.id && (!item.userId && !item.user_id)) return item.id;
    return null;
  };

  // fetch wishlist for logged-in user
  useEffect(() => {
    let canceled = false;
    const fetchWishlist = async () => {
      if (!userId) {
        setWishlist([]);
        return;
      }
      setLoadingWishlist(true);
      try {
        const res = await axios.get(`${API_BASE.replace(/\/$/, "")}/wishlist/${userId}`);
        // expected res.data to be array; handle flexible shapes
        const arr = Array.isArray(res.data) ? res.data : [];
        const packageIds = arr
          .map(extractPackageId)
          .filter((id) => id !== null && id !== undefined);
        if (!canceled) setWishlist(packageIds);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        if (!canceled) setWishlist([]);
      } finally {
        if (!canceled) setLoadingWishlist(false);
      }
    };
    fetchWishlist();
    return () => {
      canceled = true;
    };
  }, [userId, API_BASE]);

  // UI helpers for addons + quantities
  const handleRecommendedQuantityChange = (planIndex, addonIndex, quantity) => {
    setRecommendedQuantities((prev) => ({
      ...prev,
      [planIndex]: {
        ...(prev[planIndex] || {}),
        [addonIndex]: parseInt(quantity, 10) || 0,
      },
    }));
  };

  const toggleAddon = (planIndex, addonIndex) => {
    setSelectedAddons((prev) => {
      const selected = prev[planIndex] || [];
      if (selected.includes(addonIndex)) {
        return { ...prev, [planIndex]: selected.filter((i) => i !== addonIndex) };
      } else {
        return { ...prev, [planIndex]: [...selected, addonIndex] };
      }
    });
  };

  const calculateTotal = (planIndex) => {
    const plan = plans[planIndex];
    const addons = selectedAddons[planIndex] || [];
    const recommended = recommendedQuantities[planIndex] || {};

    const addonTotal = addons.reduce((sum, i) => {
      const price = plan.addons?.[i]?.price || 0;
      return sum + price;
    }, 0);

    const recommendedTotal =
      plan.recommendedaddons?.reduce((sum, addon, i) => {
        const quantity = recommended[i] || 0;
        return sum + (addon.price || 0) * quantity;
      }, 0) || 0;

    return (plan.basePrice || 0) + addonTotal + recommendedTotal;
  };

  // update wishlist for logged-in user
  const handleWishlist = async (packageId) => {
    if (!userId) {
      alert("Please login to use wishlist!");
      return;
    }
    // prevent double clicks
    setUpdating((u) => ({ ...u, [packageId]: true }));

    try {
      if (wishlist.includes(packageId)) {
        // remove from wishlist
        // endpoint style: trying to be compatible with common patterns
        // backend might accept DELETE /api/wishlist (body) or DELETE /api/wishlist/:userId/:packageId
        try {
          await axios.delete(`${API_BASE.replace(/\/$/, "")}/wishlist`, {
            data: { userId, packageId },
          });
        } catch (err) {
          // fallback to RESTful route
          await axios.delete(
            `${API_BASE.replace(/\/$/, "")}/wishlist/${userId}/${packageId}`
          );
        }
        setWishlist((prev) => prev.filter((id) => id !== packageId));
      } else {
        // add to wishlist
        try {
          const res = await axios.post(`${API_BASE.replace(/\/$/, "")}/wishlist`, {
            userId,
            packageId,
          });
          // backend may return created wishlist item or package object or only id
          // be defensive:
          const returned = Array.isArray(res.data) ? res.data : res.data;
          const newPackageId = extractPackageId(returned) ?? packageId;
          setWishlist((prev) => {
            if (prev.includes(newPackageId)) return prev;
            return [...prev, newPackageId];
          });
        } catch (err) {
          console.error("Error adding to wishlist (first attempt):", err);
          // if first POST fails, rethrow so user can see error
          throw err;
        }
      }
    } catch (err) {
      // final fallback / show console
      console.error("Wishlist update failed:", err);
      // optionally show alert:
      // alert("Unable to update wishlist — please try again.");
    } finally {
      setUpdating((u) => ({ ...u, [packageId]: false }));
    }
  };

  return (
    <>
      <PageTitle title={title} breadcrumbs={breadcrumbs} imageUrl={imageUrl} />

      <div className="relative w-full py-10 px-6 text-black">
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold text-center mb-10">Market Places Package</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, planIndex) => {
              const packageId = plan.id;
              const isInWishlist = wishlist.includes(packageId);
              const isUpdating = !!updating[packageId];

              return (
                <div
                  key={packageId}
                  className="relative bg-white rounded-2xl p-6 border transition hover:shadow-xl hover:scale-[1.01] duration-200"
                  style={{ borderColor: "#EDBA3C" }}
                >
                  {/* Wishlist Heart */}
                  <button
                    onClick={() => handleWishlist(packageId)}
                    className="absolute top-4 right-4"
                    aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    disabled={isUpdating}
                  >
                    {isInWishlist ? (
                      <SolidHeart className="w-8 h-8 text-red-500" />
                    ) : (
                      <OutlineHeart className="w-8 h-8 text-gray-400 hover:text-red-500" />
                    )}
                  </button>

                  <h2 className="text-xl font-bold mb-1 text-[#EDBA3C]">{plan.name}</h2>
                  <p className="text-sm text-gray-700 mb-3">{plan.description}</p>

                  <ul className="mb-4 space-y-1 text-sm">
                    {(plan.features || []).map((feature, i) => (
                      <li key={i}>✔ {feature}</li>
                    ))}
                  </ul>

                  {/* Addons */}
                  {(plan.addons || []).length > 0 && (
                    <div className="mb-4">
                      <p className="font-medium text-lg mb-2">Recommended Add-ons:</p>
                      <ul className="space-y-2">
                        {plan.addons.map((addon, addonIndex) => {
                          const checkboxId = `web-addon-${planIndex}-${addonIndex}`;
                          return (
                            <li key={addonIndex} className="flex items-center">
                              <input
                                id={checkboxId}
                                type="checkbox"
                                className="mr-2"
                                checked={selectedAddons[planIndex]?.includes(addonIndex) || false}
                                onChange={() => toggleAddon(planIndex, addonIndex)}
                              />
                              <label htmlFor={checkboxId}>
                                {addon.name} (+₹{(addon.price || 0).toLocaleString()})
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {/* Recommended Addons quantity */}
                  {(plan.recommendedaddons || []).length > 0 && (
                    <div className="mb-6">
                      <p className="font-medium text-lg mb-2">Select No of Content Items:</p>
                      <ul className="space-y-2">
                        {plan.recommendedaddons.map((addon, addonIndex) => {
                          const inputId = `recommended-addon-${planIndex}-${addonIndex}`;
                          return (
                            <li key={addonIndex} className="flex items-center gap-3">
                              <label htmlFor={inputId} className="flex-1">
                                {addon.name} (+₹{(addon.price || 0).toLocaleString()})
                              </label>
                              <input
                                type="number"
                                id={inputId}
                                min="0"
                                value={recommendedQuantities[planIndex]?.[addonIndex] || 0}
                                onChange={(e) =>
                                  handleRecommendedQuantityChange(
                                    planIndex,
                                    addonIndex,
                                    e.target.value
                                  )
                                }
                                className="ml-2 border border-gray-300 px-3 py-1 rounded w-20 focus:ring-2 focus:ring-[#EDBA3C] focus:outline-none"
                              />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  <div className="text-xl font-semibold mb-4 text-[#EDBA3C]">
                    {typeof plan.basePrice === "number" && plan.basePrice > 0
                      ? `Total Price: ₹${calculateTotal(planIndex).toLocaleString()}`
                      : "Custom Quote"}
                  </div>

                  <PrimaryButton href="/">Add to Cart</PrimaryButton>
                </div>
              );
            })}
          </div>

          {/* small status message for wishlist loading */}
          {loadingWishlist && <p className="text-center mt-6 text-sm text-gray-600">Loading wishlist...</p>}
        </div>
      </div>
    </>
  );
}
