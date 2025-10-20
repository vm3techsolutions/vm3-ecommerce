'use client';
import Link from "next/link";
import PageTitle from "../../components/PageTitle";
import PrimaryButton from "../../components/PrimaryButton";
import { FaRandom , FaChartLine ,FaRupeeSign, FaAward, FaRegClock } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

const ArrivedPackages = () => {
  const title = "Explore Our Packages";
  const breadcrumbs = [
    { label: "Home", link: "/" },
    { label: "Packages" }
  ];
  const imageUrl = "/assets/BannerBG.jpg"; 

  const [categories, setCategories] = useState([]);

  // 🔹 Slug map for clean URLs
  const slugMap = {
    "Website Development": "website-development",
    "Website Maintenance": "website-maintenance",
    "Social Media Marketing": "social-media-marketing",
    "Digital Marketing Ads": "digital-marketing-ads",
    "SEO": "seo",
    "Branding Material Design Only": "branding-material-design-only",
    "Market Places": "market-places",
    "Enterprise Plan": "enterprise-plans",
    "CRM": "crm"
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <PageTitle title={title} breadcrumbs={breadcrumbs} imageUrl={imageUrl} />

      <section
        className="bg-cover bg-center py-16 px-10"
        style={{ backgroundImage: "url('/assets/Verticle.jpg')" }}
      >
        <div className="max-w-[1600px] mx-auto text-center">
          <h3 className="text-white font-bold text-2xl sm:text-4xl">Pay As You Go</h3>
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-4 text-[#FEC63F] py-5">
            Flexible, Scalable, Result-Oriented
          </h2>
          <p className="text-xl text-white pb-20">
            Our Pay As You Go model is designed for modern businesses that seek flexibility,
            value, and results without the burden of long-term commitments. Whether you're a
            startup, SME, or growing enterprise, you can now opt for digital services as per
            your needs, goals, and budget — no lock-ins, no wastage. You pay only for what you
            need, when you need it.
          </p>
          <h3 className=" text-[#FEC63F] font-bold text-2xl sm:text-4xl  pb-12">
            Services You Can Select From
          </h3>
        </div>

        {/* 🔹 Packages grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {categories.map((category) => {
            // pick slug if available, else fallback to ID
            const slug = slugMap[category.name] || category.id;
            return (
              <div
                key={category.id}
                className="bg-black text-white p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-xl font-bold mb-2 pb-2">{category.name}</h3>
                <p className="mb-4 pb-10">{category.description}</p>

                <PrimaryButton href={`/packages/${slug}`} className="pb-2">
                  View Plans
                </PrimaryButton>
                
              </div>
            );
          })}
        </div>

        {/* 🔹 Icon Boxes */}
        <div>
          <h3 className=" text-[#FEC63F] font-bold text-2xl sm:text-4xl pt-25 pb-12 text-center">
            Why Choose PAYG
          </h3>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5 px-5 ">
            <div className="bg-black/80 bg-opacity-60 rounded-xl p-6 transition hover:shadow-xl hover:scale-[1.02] duration-200 relative pb-10">
              <div className="flex justify-center pb-2">
                <FaRandom className=" text-[#FEC63F] text-4xl " />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-white text-center">
                100% Flexibility
              </h2>
              <p className="text-white text-base text-center">
                Choose services monthly, quarterly, or as needed
              </p>
            </div>

            <div className="bg-black/80 bg-opacity-60 rounded-xl p-6 transition hover:shadow-xl hover:scale-[1.02] duration-200 relative pb-10">
              <div className="flex justify-center pb-2">
                <FaChartLine className=" text-[#FEC63F] text-4xl " />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-white text-center">
                Scalable
              </h2>
              <p className="text-white text-base text-center">
                Start small and scale up as your business grows
              </p>
            </div>

            <div className="bg-black/80 bg-opacity-60 rounded-xl p-6 transition hover:shadow-xl hover:scale-[1.02] duration-200 relative pb-10">
              <div className="flex justify-center pb-2">
                <FaRupeeSign className=" text-[#FEC63F] text-4xl " />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-white text-center">
                Transparent Pricing
              </h2>
              <p className="text-white text-base text-center">
                Pre-defined service costs, no hidden charges
              </p>
            </div>

            <div className="bg-black/80 bg-opacity-60 rounded-xl p-6 transition hover:shadow-xl hover:scale-[1.02] duration-200 relative pb-10">
              <div className="flex justify-center pb-2">
                <FaRegClock className=" text-[#FEC63F] text-4xl " />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-white text-center">
                Quick Turnaround
              </h2>
              <p className="text-white text-base text-center">
                On-demand execution with minimum timeframe
              </p>
            </div>

            <div className="bg-black/80 bg-opacity-60 rounded-xl p-6 transition hover:shadow-xl hover:scale-[1.02] duration-200 relative pb-10">
              <div className="flex justify-center pb-2">
                <FaAward className=" text-[#FEC63F] text-4xl " />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-white text-center">
                Assured Quality
              </h2>
              <p className="text-white text-base text-center">
                Professional delivery from experts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ArrivedPackages;
