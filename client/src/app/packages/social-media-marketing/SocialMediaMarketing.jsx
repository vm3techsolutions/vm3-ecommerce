"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import PageTitle from '@/components/PageTitle';
import PrimaryButton from '@/components/PrimaryButton';

// const baseProductPrice = 5000;
const platformHandlingCharge = 4000;
const postRate = 600;
const blogRate = 1000;
const caseRate = 1500;
const jobPostRate = 1000;
const videoReelRate = 1500;

const socialPlans = [
  { name: "Monthly Plan", duration: "1 Month", multiplier: 1 },
  { name: "Quarterly Plan", duration: "3 Months", multiplier: 3 },
  { name: "Half-Yearly Plan", duration: "6 Months", multiplier: 6 },
  { name: "Yearly Plan", duration: "12 Months", multiplier: 12 },
];

const platforms = ["Facebook", "Instagram", "LinkedIn", "Google", "YouTube", "Twitter" ];

function SocialPlanCard({ plan }) {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [posts, setPosts] = useState(0);
  const [blogs, setBlogs] = useState(0);
  const [caseStudies, setCaseStudies] = useState(0);
  const [videoReels, setVideoReels] = useState(0);
  const [jobPosts, setJobPosts] = useState(0);

  const togglePlatform = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const calculateOriginalPrice = () => {
  const platformCost = selectedPlatforms.length * platformHandlingCharge * plan.multiplier;

  const contentCost =
    posts * postRate +
    blogs * blogRate +
    caseStudies * caseRate +
    jobPosts * jobPostRate +
    videoReels * videoReelRate;

  return platformCost + contentCost;
};
  const calculatePrice = () => {
    const total = calculateOriginalPrice();
    return total;
  };


  const router = useRouter();

//   const handleClick = () => {
//   const queryParams = new URLSearchParams({
//     plan: plan.name,
//     duration: plan.duration,
//     multiplier: plan.multiplier.toString(),
//     platforms: selectedPlatforms.join(","),
//     posts: posts.toString(),
//     blogs: blogs.toString(),
//     caseStudies: caseStudies.toString(),
//     videoReels: videoReels.toString(),
//     jobPosts: jobPosts.toString(),
//     total: calculatePrice().toString(),
//     // baseProductPrice: baseProductPrice.toString(),
//     serviceName: "Social Media Marketing",
//   });

//   router.push(`/Payment?${queryParams.toString()}`);
// };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-[#EDBA3C] flex flex-col justify-between p-6 w-full transition hover:shadow-xl hover:scale-[1.02] duration-200 relative">
   

      <div>
        <h2 className="text-2xl font-bold mb-2 text-[#EDBA3C]">{plan.name}</h2>
        <p className="text-sm text-gray-600 mb-2">{plan.duration}</p>


        <div className="mb-4">
          <p className="text-sl font-semibold mb-2 text-gray-800 pt-2 ">Select Platforms:</p>
          <div className="flex flex-wrap gap-2">
            {platforms.map((p) => (
              <label
                key={p}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedPlatforms.includes(p)}
                  onChange={() => togglePlatform(p)}
                  className="accent-[#EDBA3C] w-4 h-4"
                />
                {p}
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2 mb-6">
            <h2 className="text-sl font-semibold mb-2 text-gray-800 pt-2">Select Your Number of Content Items :</h2>
          <label className="block text-sm font-medium text-gray-800">
            Number of Posts:
            <input
              type="number"
              className="ml-2 border border-gray-300 px-3 py-1 rounded w-20 focus:ring-2 focus:ring-[#EDBA3C] focus:outline-none"
              value={posts}
              min={0}
              onChange={(e) => setPosts(Number(e.target.value))}
            />
          </label>
          <label className="block text-sm font-medium text-gray-800">
            Number of Blogs:
            <input
              type="number"
              className="ml-2 border border-gray-300 px-3 py-1 rounded w-20 focus:ring-2 focus:ring-[#EDBA3C] focus:outline-none"
              value={blogs}
              min={0}
              onChange={(e) => setBlogs(Number(e.target.value))}
            />
          </label>
          <label className="block text-sm font-medium text-gray-800">
            Case Studies:
            <input
              type="number"
              className="ml-2 border border-gray-300 px-3 py-1 rounded w-20 focus:ring-2 focus:ring-[#EDBA3C] focus:outline-none"
              value={caseStudies}
              min={0}
              onChange={(e) => setCaseStudies(Number(e.target.value))}
            />
          </label>
          <label className="block text-sm font-medium text-gray-800">
            Video/Reels:
            <input
              type="number"
              className="ml-2 border border-gray-300 px-3 py-1 rounded w-20 focus:ring-2 focus:ring-[#EDBA3C] focus:outline-none"
              value={videoReels}
              min={0}
              onChange={(e) => setVideoReels(Number(e.target.value))}
            />
          </label>
          <label className="block text-sm font-medium text-gray-800">
            Job Posts:
            <input
              type="number"
              className="ml-2 border border-gray-300 px-3 py-1 rounded w-20 focus:ring-2 focus:ring-[#EDBA3C] focus:outline-none"
              value={jobPosts}
              min={0}
              onChange={(e) => setJobPosts(Number(e.target.value))}
            />
          </label>
            <div className="text-2xl font-bold mb-4 text-[#EDBA3C]">
          Total Price: ₹{calculatePrice().toFixed(0)}
        </div>
        </div>
         <PrimaryButton  href="/">Get Started</PrimaryButton>
      </div>

    </div>
  );
}

export default function SocialMediaPlans() {
      const title = "Social Media Marketing Packages";
  const breadcrumbs = [
    { label: "Home", link: "/" },
    { label: "Social Media Marketing Packages" }
  ];
  const imageUrl = "/assets/BannerBG.jpg"; // or any banner image you like
  return (
    <>
    <PageTitle title={title} breadcrumbs={breadcrumbs} imageUrl={imageUrl} />
    <div className="max-w-9xl mx-auto py-4 px-4 bg-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mt-4 mb-12 text-black drop-shadow">
        Social Media Marketing Packages
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        {socialPlans.map((plan, index) => (
          <div key={index} className="flex-1 min-w-[280px] max-w-[320px]">
            <SocialPlanCard plan={plan} />
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

