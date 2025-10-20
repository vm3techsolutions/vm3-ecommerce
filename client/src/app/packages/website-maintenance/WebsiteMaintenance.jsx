"use client";
import PageTitle from "@/components/PageTitle";
import PrimaryButton from "@/components/PrimaryButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist, fetchWishlist } from "@/app/store/wishlistSlice";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

const WebsiteMaintenance = () => {
  const [packages, setPackages] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState({});
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth?.user?.id);
  const wishlistItems = useSelector((state) => state.wishlist.items); // should contain full packages from backend

  const title = "Website Maintenance Packages";
  const breadcrumbs = [
    { label: "Home", link: "/" },
    { label: "Website Maintenance Packages" },
  ];
  const imageUrl = "/assets/BannerBG.jpg";

  // Fetch Packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/packages/category/2`
        );
        setPackages(res.data);
      } catch (err) {
        console.error("Failed to fetch packages:", err);
      }
    };
    fetchPackages();
  }, []);

  // Fetch wishlist on load
  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlist(userId)); // backend should return full packages joined with wishlist
    }
  }, [userId, dispatch]);

  // Toggle wishlist
  const handleWishlist = (pkg) => {
    if (!userId) return alert("Please login to use wishlist.");
    if (wishlistItems.some((item) => item.id === pkg.id)) {
      dispatch(removeFromWishlist({ userId, packageId: pkg.id }));
    } else {
      dispatch(addToWishlist({ userId, packageId: pkg.id }));
    }
  };

  // Toggle Add-ons
  const handleAddonChange = (pkgId, addon) => {
    setSelectedAddons((prev) => {
      const current = prev[pkgId] || [];
      if (current.includes(addon.name)) {
        return { ...prev, [pkgId]: current.filter((a) => a !== addon.name) };
      } else {
        return { ...prev, [pkgId]: [...current, addon.name] };
      }
    });
  };

  // Calculate total
  const calculateTotalPrice = (pkg) => {
    let total = parseInt(pkg.price);
    const addonsChosen = selectedAddons[pkg.id] || [];
    pkg.details.recommended_addons.forEach((addon) => {
      if (addonsChosen.includes(addon.name)) total += addon.price;
    });
    return total;
  };

  if (!packages.length) {
    return <p className="text-center py-10 text-lg">Loading Packages...</p>;
  }

  return (
    <>
      <PageTitle title={title} breadcrumbs={breadcrumbs} imageUrl={imageUrl} />
      <div className="bg-gray-50 py-20">
        <h1 className="text-4xl font-bold text-center mb-10">{title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="relative bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition"
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

              <h2 className="text-2xl font-semibold mb-2 text-[#EDBA3C]">
                {pkg.name}
              </h2>
              <p className="text-gray-600 mb-4">{pkg.description}</p>

              <h3 className="font-semibold text-lg mb-2">Features:</h3>
              <ul className="mb-4 space-y-1 text-sm">
                {pkg.details.features.map((f, i) => (
                  <li key={i}>✔ {f}</li>
                ))}
              </ul>

              <h3 className="font-semibold text-lg mb-2">Recommended Add-ons:</h3>
              <div className="space-y-2 mb-4">
                {pkg.details.recommended_addons.map((addon, i) => (
                  <label key={i} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedAddons[pkg.id]?.includes(addon.name) || false}
                      onChange={() => handleAddonChange(pkg.id, addon)}
                    />
                    <span>
                      {addon.name} (+₹{addon.price.toLocaleString()})
                    </span>
                  </label>
                ))}
              </div>

              <p className="text-xl font-semibold mb-2 text-[#EDBA3C] mt-10 pb-8">
                Total Price: ₹{calculateTotalPrice(pkg).toLocaleString()}
              </p>

              <PrimaryButton href="/">Add to Cart</PrimaryButton>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WebsiteMaintenance;
