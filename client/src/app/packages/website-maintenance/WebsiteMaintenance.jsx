'use client';
import PageTitle from '@/components/PageTitle';
import PrimaryButton from '@/components/PrimaryButton';
import React, { useState } from 'react';

const plans = [
  {
    name: "Basic Website Maintenance",
    description : "Static Website (HTML or Basic WordPress)",
    pages: "Pages: 1–5",
    type: "Website Maintenance",
    features: [
      "Mobile Responsive",
      "Website Audit",
      "1 Update/month",
      "Monthly Backup",
      "Estimated Delivery Time: 5 Days"
    ],
    price: 4999,
    basePrice: 4999,
    addons: [
      { name: "Domain", price: 1000 },
      { name: "Hosting", price: 3000 },
      { name: "SSL", price: 5000 },
      { name: "Page Builder", price: 5000 },
    ],
    recommendedaddons: [
      { name: "Additional Pages", price: 2000 },
      { name: "No. of Blogs", price: 1000 },
      { name: "No. of Case Studies", price: 1500 }
    ]
  },


  {
    name: "Business Website Maintenance",
    description : "Static Website (WordPress)",
    pages: "Pages: 5–10",
    type: "Website Maintenance",
    features: [
      "Mobile Responsive",
      "Website Audit",
      "1 Update/month",
      "Monthly Backup",
      "Basic SEO",
      "Estimated Delivery Time: 3 Days"
    ],
    price: 9999,
    basePrice: 9999,
    addons: [
      { name: "Domain", price: 1000 },
      { name: "Hosting", price: 6500 },
      { name: "SSL", price: 5000 },
      { name: "Page Builder", price: 10000 }
    ],
      recommendedaddons: [
      { name: "Additional Pages", price: 2000 },
      { name: "No. of Blogs", price: 1000 },
      { name: "No. of Case Studies", price: 1500 }
    ]
  },


    {
    name: "Business Professional Website Maintenance",
    description : "Dynamic Website (React)",
    pages: "Pages: 15–20",
    type: "Website Maintenance",
    features: [
      "Responsive UI/UX",
      "Website Audit",
      "2 Updates/month",
      "Monthly Backup",
      "Basic SEO",
      "Additional Security Features",
      "SEO Tools Integration",
      "2 Updates/month",
      "Enhance Security System",
      "Optimize Loading Speed",
      "Monthly Maintenance Activity Report",
      "Estimated Delivery Time: 3 - 5 Days"
    ],
    price: 29999,
    basePrice: 29999,
    addons: [
      { name: "Domain", price: 1000 },
      { name: "Hosting", price: 15000 },
      { name: "SSL", price: 5000 },
    ],
      recommendedaddons: [
      { name: "Additional Pages", price: 3000 },
      { name: "No. of Blogs", price: 1000 },
      { name: "No. of Case Studies", price: 1500 }
    ]
  },


  {
    name: "Basic E-Commerce Maintenance",
    description : "E-Commerce Website (WordPress)",
    products: "Products: Up to 25 ",
    type: "Website Maintenance",
    features: [
    "Mobile Responsive",
    "Website Audit",
    "1 Update/month",
    "Monthly Backup",
    "Basic SEO",
    "Enhance Security System",
    "Yearly 10 Products Listing",
    "Estimated Delivery Time: 3 -5 Days"
    ],
    price: 19999,
    basePrice: 19999,
    addons: [
      { name: "Domain", price: 1000 },
      { name: "Hosting", price: 15000 },
      { name: "SSL", price: 5000 },
      { name: "Page Builder", price: 5000 }
    ],
    recommendedaddons: [
      { name: "Additional Products", price: 200 },
      { name: "No. of Blogs", price: 1000 },
      { name: "No. of Case Studies", price: 1500 }
    ]
  },


  {
    name: "E-Commerce Professional Maintenance",
    description : "E-Commerce Website (React)",
    products: "Products: Up to 50   ",
    type: "Website Maintenance",
    features: [
      "Responsive UI/UX",
      "Website Audit",
      "2 Updates/month",
      "Monthly Backup",
      "Basic SEO",
      "Additional Security Features",
      "SEO Tools Integration",
      "Enhance Security System",
      "Optimize Loading Speed",
      "Payment Gateway Integration",
      "Additional Security Features",
      "Optimize Loading Speed",
      "Yearly 20 Products Listing",
      "Monthly Maintenance Activity Report",
      "Estimated Delivery Time: 3 - 5 Days"
    ],
    price: 29999,
    basePrice: 29999,
    addons: [
      { name: "Domain", price: 1000 },
      { name: "Hosting", price: 15000 },
      { name: "SSL", price: 5000 },

    ],
    recommendedaddons: [
      { name: "Additional Products", price: 200 },
      { name: "No. of Blogs", price: 1000 },
      { name: "No. of Case Studies", price: 1500 }
    ]
  }
];

export default function WebsiteMaintenance() {
  const title = "Website Development Packages";
  const breadcrumbs = [
    { label: "Home", link: "/" },
    { label: "Website Development Packages" }
  ];
  const imageUrl = "/assets/BannerBG.jpg"; // or any banner image you like

const [selectedAddons, setSelectedAddons] = useState({});
const [recommendedQuantities, setRecommendedQuantities] = useState({});

const handleRecommendedQuantityChange = (planIndex, addonIndex, quantity) => {
  setRecommendedQuantities(prev => ({
    ...prev,
    [planIndex]: {
      ...prev[planIndex],
      [addonIndex]: parseInt(quantity) || 0,
    },
  }));
};

  const toggleAddon = (planIndex, addonIndex) => {
    setSelectedAddons(prev => {
      const selected = prev[planIndex] || [];
      if (selected.includes(addonIndex)) {
        return { ...prev, [planIndex]: selected.filter(i => i !== addonIndex) };
      } else {
        return { ...prev, [planIndex]: [...selected, addonIndex] };
      }
    });
  };

  // const calculateTotal = (planIndex) => {
  //   const plan = plans[planIndex];
  //   const addons = selectedAddons[planIndex] || [];
  //   const addonTotal = addons.reduce((sum, i) => sum + plan.addons[i].price, 0);
  //  return (plan.basePrice || 0) + addonTotal;
  // };
const calculateTotal = (planIndex) => {
  const plan = plans[planIndex];
  const addons = selectedAddons[planIndex] || [];
  const recommended = recommendedQuantities[planIndex] || {};

  const addonTotal = addons.reduce((sum, i) => sum + plan.addons[i].price, 0);

  const recommendedTotal = plan.recommendedaddons?.reduce((sum, addon, i) => {
    const quantity = recommended[i] || 0;
    return sum + (addon.price * quantity);
  }, 0) || 0;

  return (plan.basePrice || 0) + addonTotal + recommendedTotal;
};

  return (
    <>
    <PageTitle title={title} breadcrumbs={breadcrumbs} imageUrl={imageUrl} />
  
    <div className="relative w-full py-10 px-22 text-white">
    {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-black">
          Website Maintenance Packages
        </h1>

        <div className="grid grid-cols-3 gap-10">
          {plans.map((plan, planIndex) => (
            <div
              key={planIndex}
              className="text-black rounded-2xl p-6 w-full md:w-[450px] border transition hover:shadow-xl hover:scale-[1.02] duration-200 relative"
              style={{ borderColor: '#EDBA3C' }}
            >
              <h2 className="text-xl font-bold mb-1 text-[#EDBA3C]">{plan.name}</h2>
              <p className="text-base text-gray-900 mb-2">{plan.description}</p>
              <p className="text-base mb-2"><strong>{plan.pages}</strong></p>
               <p className="text-base mb-2"><strong>{plan.products}</strong></p>
              <ul className="mb-4 space-y-1 text-base">
                {plan.features.map((feature, i) => (
                  <li key={i}>✔ {feature}</li>
                ))}
              </ul>

              

<div className="space-y-4 text-sm text-gray-900">
  {/* Addons - Checkbox */}
  {(plan.addons || []).length > 0 && (
    <div>
      <p className="font-medium text-lg mb-2 mt-4">Recommended Add-ons:</p>
      <ul className="space-y-1">
        {plan.addons.map((addon, addonIndex) => {
          const checkboxId = `web-addon-${planIndex}-${addonIndex}`;
          return (
            <li key={addonIndex} className="flex items-center">
              <input
                type="checkbox"
                id={checkboxId}
                className="mr-2"
                checked={selectedAddons[planIndex]?.includes(addonIndex) || false}
                onChange={() => toggleAddon(planIndex, addonIndex)}
              />
              <label htmlFor={checkboxId}>
                {addon.name} (+₹{addon.price.toLocaleString()})
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  )}

  {/* Recommended Addons - Quantity Input */}
  {(plan.recommendedaddons || []).length > 0 && (
    <div className='pb-4'>
      <p className="font-medium text-lg mt-4 mb-2">Select No of Content Items: </p>
      <ul className="space-y-2">
        {plan.recommendedaddons.map((addon, addonIndex) => {
          const inputId = `recommended-addon-${planIndex}-${addonIndex}`;
          return (
            <li key={addonIndex} className="flex items-center gap-3">
              <label htmlFor={inputId}>
                {addon.name} (+₹{addon.price.toLocaleString()})
              </label>
              <input
                type="number"
                id={inputId}
                min="0"
                value={recommendedQuantities[planIndex]?.[addonIndex] || 0}
                onChange={(e) =>
                  handleRecommendedQuantityChange(planIndex, addonIndex, e.target.value)
                }
                className="ml-2 border border-gray-300 px-3 py-1 rounded w-20 focus:ring-2 focus:ring-[#EDBA3C] focus:outline-none"
              />
            </li>
          );
        })}
      </ul>
      
    </div>
    
  )}
  <div className="text-xl font-semibold mb-2 text-[#EDBA3C] pb-8">
                {plan.basePrice > 0 ? `Total Price:- ₹${calculateTotal(planIndex).toLocaleString()}` : "Custom Quote"}
              </div>
  <PrimaryButton  href="/">Add to Cart</PrimaryButton>
</div>
                
            </div>
            
          ))}
          
        </div>
      </div>
    </div>
    </>
  );
}
