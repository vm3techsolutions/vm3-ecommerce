"use client";
import PageTitle from "@/components/PageTitle";
import { useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";


const EnterprisePlan = () => {

    // Page Title Img
    const title = "Enterprise Plan";
    const breadcrumbs = [
    { label: "Home", link: "/" },
    { label: "Enterprise Plan" },
    ];
    const imageUrl = "/assets/BannerBG.jpg";

    // Form 
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const services = [
    "Custome Web Application Development",
    "Mobile App Development",
    "SaaS Product Development",
    "ERP System Integration",
    "CRM Setup & Customization",
    "Business Process Automation",
    "Database Migration Services"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Here you can send data to your backend API
  };

    return(
        <>
         <PageTitle title={title} breadcrumbs={breadcrumbs} imageUrl={imageUrl} />

        <div className="bg-gray-50 pt-20 px-2 ">
        <h1 className="text-4xl font-bold text-center ">Build the digital backbone of your business</h1> 
        <div className="bg-gray-50">
            
            <div className="flex items-center justify-center bg-gray-50 py-20">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div>
        
          <p className="mb-6">
            Are you looking to scale with robust, tailor-made tech solutions? Our Enterprise Plan is designed for growing businesses that need advanced, end-to-end digital support. Select the services that best match your goals:
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Custom Web Application Development",
              "Mobile App Development",
              "SaaS Product Development",
              "ERP System Integration",
              "CRM Setup & Customization",
              "Business Process Automation",
              "Database Migration Services",
            ].map((service) => (
              <li key={service} className="flex items-center">
                <span className="mr-2 text-yellow-500">✔</span> {service}
              </li>
            ))}
          </ul>
          <p className="mb-1">Let’s co-create your enterprise tech ecosystem.</p>
          <p className="text-black-500 pt-0.5">Choose your services, and we’ll build a solution that works for you.</p>
        </div>

        {/* Right Section (Form) */}
        <div className="flex justify-center items-center py-2">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl border border-yellow-300"
      >
        {/* Name & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pt-4 ">
          <input
            type="text"
            name="name"
            placeholder="Your Name*"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-yellow-400 outline-none"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-yellow-400 outline-none"
          />
        </div>

        {/* Email & Service Dropdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address*"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-yellow-400 outline-none"
            required
          />
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-yellow-400 outline-none"
            required
          >
            <option value="">Select a Service</option>
            {services.map((srv, index) => (
              <option key={index} value={srv}>
                {srv}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="mb-4">
          <textarea
            name="message"
            rows="4"
            placeholder="Write a Message"
            value={formData.message}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-yellow-400 outline-none"
          ></textarea>
        </div>

        {/* Submit */}
        <div className="flex justify-center">
           <PrimaryButton href="/">Submit Now</PrimaryButton>
        </div>
      </form>
    </div>



      </div>
    </div>

        </div>
        </div>


{/* <div className="flex justify-center items-center py-10">
     <p className="mb-6">
            Are you looking to scale with robust, tailor-made tech solutions? Our Enterprise Plan is designed for growing businesses that need advanced, end-to-end digital support. Select the services that best match your goals:
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Custom Web Application Development",
              "Mobile App Development",
              "SaaS Product Development",
              "ERP System Integration",
              "CRM Setup & Customization",
              "Business Process Automation",
              "Database Migration Services",
            ].map((service) => (
              <li key={service} className="flex items-center">
                <span className="mr-2 text-yellow-500">✔️</span> {service}
              </li>
            ))}
          </ul>
          <p className="mb-1">Let’s co-create your enterprise tech ecosystem.</p>
          <p className="text-gray-500">Choose your services, and we’ll build a solution that works for you.</p>
        </div> */}




    
       
        </>
    )
}

export default EnterprisePlan;