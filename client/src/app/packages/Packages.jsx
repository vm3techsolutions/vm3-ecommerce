'use client';
import Link from "next/link";
import PageTitle from "../../components/PageTitle";
import PrimaryButton from "../../components/PrimaryButton";
import { FaRandom , FaChartLine ,FaRupeeSign,  FaAward,  FaRegClock} from "react-icons/fa";

const ArrivedPackages = () => {
  const title = "Explore Our Packages";
  const breadcrumbs = [
    { label: "Home", link: "/" },
    { label: "Packages" }
  ];
  const imageUrl = "/assets/BannerBG.jpg"; // or any banner image you like
  return (
    <>
     <PageTitle title={title} breadcrumbs={breadcrumbs} imageUrl={imageUrl} />

    <section
        className="bg-cover bg-center py-16 px-10"
        style={{ backgroundImage: "url('/assets/Verticle.jpg')" }}
      >
      <div className="max-w-[1600px] mx-auto text-center">

        {/* New Section Designing */}

        <h3 className="text-white font-bold text-2xl sm:text-4xl">Pay As You Go</h3>
        <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-4 text-[#FEC63F] py-5">Flexible, Scalable, Result-Oriented</h2>
        <p className="text-xl text-white pb-20">Our Pay As You Go model is designed for modern businesses that seek flexibility, value, and results without the burden of long-term commitments. Whether you're a startup, SME, or growing enterprise, you can now opt for digital services as per your needs, goals, and budget — no lock-ins, no wastage. You pay only for what you need, when you need it.</p>
        <h3 className=" text-[#FEC63F] font-bold text-2xl sm:text-4xl  pb-12">Services You Can Select From</h3>



        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 px-5 ">
          
          {/* Website Development*/}
          <div className="bg-black/40 bg-opacity-30 rounded-xl p-6 text-left transition hover:shadow-xl hover:scale-[1.02] duration-200 relative pb-10">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Website Development
            </h2>
            <p className="text-white text-base mb-10">
              Custom-built websites that combine stunning design with performance, security, and user experience to help you grow your business online.
            </p>
            <PrimaryButton href="/packages/website-development">View Plans</PrimaryButton>
          </div>

           {/* Website Maintenance*/}
          <div className="bg-black/40 bg-opacity-30 rounded-xl p-6 text-left transition hover:shadow-xl hover:scale-[1.02] duration-200 relative pb-10">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Website Maintenance
            </h2>
            <p className="text-white text-base mb-16">
              Keep your website running smoothly, securely, and up-to-date with our comprehensive maintenance services.
            </p>
            <PrimaryButton href="/packages/website-maintenance">View Plans</PrimaryButton>
          </div>

          {/* Social Media Marketing*/}
          <div className="bg-black/40 bg-opacity-30 rounded-xl p-6 text-left transition hover:shadow-xl hover:scale-[1.02] duration-200 relative pb-10">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Social Media Marketing
            </h2>
            <p className="text-white text-base mb-10">
              Build a strong digital presence, connect with your audience, and grow your brand through impactful social media strategies and content.
            </p>
            <PrimaryButton href="/packages/social-media-marketing">View Plans</PrimaryButton>
          </div>

          {/* Digital Marketing Ads*/}
          <div className="bg-black/40 bg-opacity-30 rounded-xl p-6 text-left transition hover:shadow-xl hover:scale-[1.02] duration-200 relative pb-10">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Digital Marketing Ads
            </h2>
            <p className="text-white text-base mb-10">
              Boost your brand visibility, drive qualified leads, and achieve measurable growth with targeted digital ad campaigns across Google, Meta, and more.
            </p>
            <PrimaryButton href="">View Plans</PrimaryButton>
          </div>

          {/* SEO*/}
          <div className="bg-black/40 bg-opacity-30 rounded-xl p-6 text-left transition hover:shadow-xl hover:scale-[1.02] duration-200 relative pb-10">
            <h2 className="text-2xl font-bold mb-4 text-white">
              SEO
            </h2>
            <p className="text-white text-base mb-16">
              Drive consistent traffic, climb search rankings, and grow your online visibility with our comprehensive SEO strategy.
            </p>
            <PrimaryButton href="">View Plans</PrimaryButton>
          </div>

          {/* Branding Material Design Only*/}
          <div className="bg-black/40 bg-opacity-30 rounded-xl p-6 text-left transition hover:shadow-xl hover:scale-[1.02] duration-200 relative pb-10">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Branding Material Design Only
            </h2>
            <p className="text-white text-base mb-10">
              Create a consistent, compelling brand identity across all customer touchpoints. From logos to marketing materials, we design with purpose and style.
            </p>
            <PrimaryButton href="">View Plans</PrimaryButton>
          </div>

          {/* Market Places*/}
          <div className="bg-black/40 bg-opacity-30 rounded-xl p-6 text-left transition hover:shadow-xl hover:scale-[1.02] duration-200 relative pb-10">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Market Places
            </h2>
            <p className="text-white text-base mb-10">
              Expand your reach across top online marketplaces like Amazon, Flipkart, and more. We handle product listing, catalog optimization, inventory sync, pricing updates, and order management.
            </p>
            <PrimaryButton href="/packages/market-places">View Plans</PrimaryButton>
          </div>

          {/* Enterprise Plan*/}
          <div className="bg-black/40 bg-opacity-30 rounded-xl p-6 text-left transition hover:shadow-xl hover:scale-[1.02] duration-200 relative pb-10">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Enterprise Plan
            </h2>
            <p className="text-white text-base mb-10">
              All-in-one solution for businesses ready to scale. Includes custom Web & Mobile App Development, SaaS solutions, ERP & CRM systems, Business Automation, and Secure Data Migration.
            </p>
            <PrimaryButton href="">View Plans</PrimaryButton>
          </div>

          {/* CRM Plan*/}
          <div className="bg-black/40 bg-opacity-30 rounded-xl p-6 text-left transition hover:shadow-xl hover:scale-[1.02] duration-200 relative pb-10">
            <h2 className="text-2xl font-bold mb-4 text-white">
              CRM
            </h2>
            <p className="text-white text-base mb-16">
              Simple, cost-effective CRM to capture and manage leads, track tasks, and grow client relationships. Ideal for small teams, no technical setup required.
            </p>
            <PrimaryButton href="">View Plans</PrimaryButton>
          </div>
        </div>

{/* icon Boxes */}
<div>
<h3 className=" text-[#FEC63F] font-bold text-2xl sm:text-4xl pt-25 pb-12">Why Choose PAYG</h3>

<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5 px-5 ">

  <div className="bg-black/80 bg-opacity-60 rounded-xl p-6 text-left transition hover:shadow-xl hover:scale-[1.02] duration-200 relative pb-10  ">
          <div className="flex justify-center pb-2"> <FaRandom  className=" text-[#FEC63F] text-4xl "/></div> 
            <h2 className="text-2xl font-bold mb-4 text-white text-center">
              100% Flexibility
            </h2>
              <p className="text-white text-base text-center">
           Choose services monthly, quarterly, or as needed
            </p>
  </div>

  <div className="bg-black/80 bg-opacity-60 rounded-xl p-6 text-left transition hover:shadow-xl hover:scale-[1.02] duration-200 relative pb-10">
   <div className="flex justify-center pb-2">
     <FaChartLine  className=" text-[#FEC63F] text-4xl "/>
   </div>
           
            <h2 className="text-2xl font-bold mb-4 text-white text-center">
              Scalable
            </h2>
            <p className="text-white text-base text-center">
           Start small and scale up as your business grows
            </p>
  </div>

  <div className="bg-black/80 bg-opacity-60 rounded-xl p-6 text-left transition hover:shadow-xl hover:scale-[1.02] duration-200 relative pb-10">
  <div className="flex justify-center pb-2">
    <FaRupeeSign className=" text-[#FEC63F] text-4xl "/>
  </div>
           
            <h2 className="text-2xl font-bold mb-4 text-white text-center">
              Transparent Pricing
            </h2>
            <p className="text-white text-base text-center">
             Pre-defined service costs, no hidden charges
            </p>
  </div>

  <div className="bg-black/80 bg-opacity-60 rounded-xl p-6 text-left transition hover:shadow-xl hover:scale-[1.02] duration-200 relative pb-10">
  <div className="flex justify-center pb-2">
    < FaRegClock className=" text-[#FEC63F] text-4xl "/>
  </div>
            
            <h2 className="text-2xl font-bold mb-4 text-white text-center">
              Quick Turnaround
            </h2>
            <p className="text-white text-base text-center">
           On-demand execution with minimum timeframe
            </p>
  </div>

  <div className="bg-black/80 bg-opacity-60 rounded-xl p-6 text-left transition hover:shadow-xl hover:scale-[1.02] duration-200 relative pb-10">
  <div className="flex justify-center pb-2">
    <FaAward className=" text-[#FEC63F] text-4xl "/>
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

</div>
</section>
</>
);
};

export default ArrivedPackages;
