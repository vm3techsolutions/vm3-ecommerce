"use client";
import PageTitle from "@/components/PageTitle";
import PrimaryButton from "@/components/PrimaryButton";
import { useEffect, useState } from "react";
import axios from "axios";

const SEO = () => {
  const [packages, setPackages] = useState([]);
  const [keywords, setKeywords] = useState({});
  const [competitors, setCompetitors] = useState({});
  const [locations, setLocations] = useState({});

  const title = "SEO Packages";
  const breadcrumbs = [
    { label: "Home", link: "/" },
    { label: "SEO Packages" },
  ];
  const imageUrl = "/assets/BannerBG.jpg";

  useEffect(() => {
    const fetchSEOPlans = async () => {
      try {
       
        const res = await axios.get(
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/packages/category/5`);
                  setPackages(res.data);
      } catch (err) {
        console.error("Error fetching SEO packages:", err);
      }
    };
    fetchSEOPlans();
  }, []);

  // Handle keyword input
  const handleKeywordChange = (pkgId, index, value) => {
    setKeywords((prev) => {
      const pkgKeywords = prev[pkgId] || [];
      const updated = [...pkgKeywords];
      updated[index] = value;
      return { ...prev, [pkgId]: updated };
    });
  };

  // Handle competitor URL(s)
  const handleCompetitorChange = (pkgId, index, value) => {
    setCompetitors((prev) => {
      const pkgCompetitors = prev[pkgId] || [];
      const updated = [...pkgCompetitors];
      updated[index] = value;
      return { ...prev, [pkgId]: updated };
    });
  };

  // Handle location input
  const handleLocationChange = (pkgId, field, value) => {
    setLocations((prev) => ({
      ...prev,
      [pkgId]: { ...(prev[pkgId] || {}), [field]: value },
    }));
  };

  if (!packages.length) {
    return <p className="text-center py-10 text-lg">Loading SEO Packages...</p>;
  }

  return (
    <>
      <PageTitle title={title} breadcrumbs={breadcrumbs} imageUrl={imageUrl} />

      <div className="bg-gray-50 py-20">
        <h1 className="text-4xl font-bold text-center mb-10">SEO Packages</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 md:px-10">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white shadow-lg rounded-2xl p-6 border border-yellow-400 hover:shadow-xl transition"
            >
              {/* Package Info */}
              <h2 className="text-2xl font-semibold mb-2 text-[#EDBA3C]">
                {pkg.name}
              </h2>
              <p className="text-gray-600 mb-4">{pkg.description}</p>

              {/* Features */}
              <h3 className="font-semibold text-lg mb-2">Features:</h3>
              <ul className=" mb-4">
                {pkg.details.Features.map((feat, idx) => (
                //   <li key={idx}>{feat}</li>
                   <li key={idx}>✔ {feat}</li>
                ))}
              </ul>

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

              {/* Competitor URLs */}
              <h3 className="font-semibold text-lg mb-2 text-[#EDBA3C]-500">Competitor Websites</h3>
              {pkg.details.competitor_url && (
                <input
                  type="url"
                  defaultValue={pkg.details.competitor_url}
                  onChange={(e) => handleCompetitorChange(pkg.id, 0, e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded w-full mb-4"
                />
              )}
              {pkg.details.competitor_urls &&
                pkg.details.competitor_urls.map((url, idx) => (
                  <input
                    key={idx}
                    type="url"
                    defaultValue={url}
                    onChange={(e) => handleCompetitorChange(pkg.id, idx, e.target.value)}
                    className="border border-gray-300 px-2 py-1 rounded w-full mb-2"
                  />
                ))}

              {/* Target Location */}
              <h3 className="font-semibold text-lg mb-2 text-green-600">Target Location</h3>
              <div className="grid grid-cols-1 gap-2 mb-4">
                {["city", "state", "country"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={`Enter ${field}`}
                    defaultValue={pkg.details.target_location[field]}
                    onChange={(e) =>
                      handleLocationChange(pkg.id, field, e.target.value)
                    }
                    className="border border-gray-300 px-2 py-1 rounded"
                  />
                ))}
              </div>

              {/* Total Price (SEO might not be budget-based, so just show static) */}
             <p className="text-xl font-semibold mb-2 text-[#EDBA3C] mt-6 pb-8">
  Price: ₹
  {pkg.price && !isNaN(pkg.price)
    ? Number(pkg.price).toLocaleString("en-IN")
    : "0"}
</p>

              {/* CTA */}
              <PrimaryButton href="/">Get Started</PrimaryButton>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SEO;
