'use client';
import PageTitle from '@/components/PageTitle';
import PrimaryButton from '@/components/PrimaryButton';
import React, { useState } from 'react';

const plans = [
  {
    name: "Starter Plan",
    description : "Static Website (HTML or Basic WordPress)",
    pages: "Pages: 1–5",
    type: "Website Development",
    features: [
      "Mobile Responsive",
      "Basic SEO",
      "Contact Form",
      "Social Links",
      "1 Update/month",
      "Estimated Delivery Time: 7 Days"
    ],
    price: 14999,
    basePrice: 14999,
    addons: [
      { name: "Domain", price: 1000 },
      { name: "Hosting", price: 3000 },
      { name: "SSL", price: 5000 },
      { name: "Maintenance", price: 5000 },
    ],
    recommendedaddons: [
      { name: "Additional Pages", price: 2000 },
      { name: "No. of Blogs", price: 1000 },
      { name: "No. of Case Studies", price: 1500 }
    ]
  },


  {
    name: "Business Plan",
    description : "Static Website (WordPress)",
    pages: "Pages: 5–10",
    type: "Dynamic Website (WordPress)",
    features: [
      "Template Design",
      "Basic SEO",
      "Blog Section",
      "WhatsApp Chat",
      "Google Maps",
      "2 Updates/month",
      "Estimated Delivery Time: 12 Days"
    ],
    price: 29999,
    basePrice: 29999,
    addons: [
      { name: "Domain", price: 1000 },
      { name: "Hosting", price: 6500 },
      { name: "SSL", price: 5000 },
      { name: "Maintenance", price: 10000 }
    ],
      recommendedaddons: [
      { name: "Additional Pages", price: 2000 },
      { name: "No. of Blogs", price: 1000 },
      { name: "No. of Case Studies", price: 1500 }
    ]
  },


    {
    name: "Business Website",
    description : "Static Website (React / NextJs)",
    pages: "Pages: 5–10",
    type: "Dynamic Website (WordPress)",
    features: [
      "Speed - Very fast (static content, optimized)",
      "SEO - Excellent (with SSR via Next.js)",
      "Design Customization - Fully custom, no design limits",
      "Scalability - Very high – easy to add advanced features later",
      "Blog Section",
      "WhatsApp Chat",
      "Google Maps",
      "2 Updates/month",
      "Recurring Costs - None (once built and hosted)",
      "Estimated Delivery Time: 15 - 20 Days"
    ],
    price: 44999,
    basePrice: 44999,
    addons: [
      { name: "Domain", price: 1000 },
      { name: "Hosting", price: 6500 },
      { name: "SSL", price: 5000 },
      { name: "Maintenance", price: 15000 }
    ],
      recommendedaddons: [
      { name: "Additional Pages", price: 2000 },
      { name: "No. of Blogs", price: 1000 },
      { name: "No. of Case Studies", price: 1500 }
    ]
  },


  {
    name: "Business Professional Website",
    description : "Dynamic Website (React / NextJs )",
    pages: "Pages: 15 – 20",
    type: "Business Professional Website",
    features: [
    "Responsive UI/UX",
    "Basic SEO",
    "Blog Section",
    "WhatsApp Chat",
    "Google Maps",
    "2 Updates/month",
    "Dynamic Pages",
    "Additional Security Features",
    "Optimize Loading Speed",
    "Estimated Delivery Time: 45 - 50 Days"
    ],
    price: 89999,
    basePrice: 89999,
    addons: [
      { name: "Domain", price: 1000 },
      { name: "Hosting", price: 15000 },
      { name: "SSL", price: 5000 },
      { name: "Maintenance", price: 30000 }
    ],
    recommendedaddons: [
      { name: "Additional Pages", price: 3000 },
      { name: "No. of Blogs", price: 1000 },
      { name: "No. of Case Studies", price: 1500 }
    ]
  },


  {
    name: "E-Commerce Starter Plan",
    description : "E-Commerce Website (WordPress)",
    products: "Products: Up to 25 ",
    type: "Website Development",
    features: [
      "Template Design",
      "Product Listings",
      "Cart & Checkout",
      "Payment Gateway",
      "Order/Inventory Panel",
      "2 Updates/month",
      "Maintenance Support - 1 Month",
      "Invoice Generation",
      "Estimated Delivery Time: 7 Days"
    ],
    price: 59999,
    basePrice: 59999,
    addons: [
      { name: "Domain", price: 1000 },
      { name: "Hosting", price: 15000 },
      { name: "SSL", price: 5000 },
      { name: "Maintenance", price: 20000 }
    ],
    recommendedaddons: [
      { name: "Additional Products", price: 200 },
      { name: "No. of Blogs", price: 1000 },
      { name: "No. of Case Studies", price: 1500 }
    ]
  },


  {
    name: "E-Commerce Professional Plan",
    description : "E-Commerce Website (React / NextJs)",
    products: "Products: Up to 50  ",
    type: "Website Development",
    features: [
      "Responsive UI/UX",
      "Product Listings",
      "Cart & Checkout",
      "Payment Gateway",
      "Order/Inventory Panel",
      "2 Updates/month",
      "Maintenance Support - 2 Months",
      "Dynamic Filtering & Search",
      "Logistics Integration",
      "Order Tracking",
      "Additional Security Features",
      "Optimize Loading Speed",
      "Invoice Generation",
      "Estimated Delivery Time: 20 - 25 Days"
    ],
    price: 99999,
    basePrice: 99999,
     addons: [
      { name: "Domain", price: 1000 },
      { name: "Hosting", price: 15000 },
      { name: "SSL", price: 5000 },
      { name: "Maintenance", price: 30000 }
    ],
    recommendedaddons: [
      { name: "Additional Products", price: 200 },
      { name: "No. of Blogs", price: 1000 },
      { name: "No. of Case Studies", price: 1500 }
    ]
  }
];

export default function WebsiteDevelopment() {
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
          Website Development Packages
        </h1>

        <div className="grid grid-cols-3 gap-10">
          {plans.map((plan, planIndex) => (
            <div
              key={planIndex}
              className="text-black rounded-2xl p-6 w-full md:w-[450px] border transition hover:shadow-xl hover:scale-[1.02] duration-200 relative"
              style={{ borderColor: '#EDBA3C' }}
            >
              <h2 className="text-xl font-bold mb-1 text-[#EDBA3C]">{plan.name}</h2>
              <p className="text-sm text-gray-900 mb-2">{plan.description}</p>
              <p className="text-sm mb-2"><strong>{plan.pages}</strong></p>
              <p className="text-sm mb-2"> <strong>{plan.products}</strong></p>
              <ul className="mb-4 space-y-1 text-sm">
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
