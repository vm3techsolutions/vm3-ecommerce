"use client";
'use client';
import PageTitle from '@/components/PageTitle';
import PrimaryButton from '@/components/PrimaryButton';
import React, { useEffect, useState } from "react";
import axios from "axios";

const TestPackages = () => {
      const title = "Test Packages";
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

  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/packages");
        setPackages(res.data);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <> <PageTitle title={title} breadcrumbs={breadcrumbs} imageUrl={imageUrl} />

    
    <div>
     {packages.map((packages) => (
        <div key={packages.id} className="bg-black text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-2 pb-2">{packages.name}</h3>
          <p className="mb-4 pb-10">{packages.description}</p>
         


        </div>
      ))}
    </div>
    </>
  );
};

export default TestPackages;
