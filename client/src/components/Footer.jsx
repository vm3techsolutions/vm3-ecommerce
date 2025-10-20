import Link from "next/link";
import {
  FaLinkedin,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="text-white bg-cover bg-center bg-no-repeat bg-black"
      style={{ backgroundImage: "url('/assets/footerbg.png')" }}
    >
      <div className="sm:ml-20 ml-4 mx-auto py-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Column 1 - Packages - including 1st 5 packages */}
        <div>
          <h2 className="text-2xl font-bold mb-4 border-b-2 inline-block border-white">Explore Our Packages</h2>
          <ul className="space-y-2 mt-4 text-gray-300">
            {[
              { label: "Website Development", link: "/packages/website-development" },
              { label: "Website Maintenance", link: "/packages/website-maintenance" },
              { label: "Social Media Marketing", link: "/packages/social-media-marketing" },
              { label: "Digital Marketing Ads", link: "/packages/digital-marketing-ads" },
              { label: "SEO", link: "/packages/seo" }
            ].map((item) => (
                <li key={item.link} className="flex items-center space-x-2">
                <span className="text-yellow-400">➜</span>
                <Link href={item.link} className="">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2 - Packages -Remaining 4 packages */}
        <div className="mb-4 mt-13">
          {/* <h2 className="text-2xl font-bold mb-4 border-b-2 inline-block border-white"></h2> */}

          <ul className="space-y-2 mt-4 text-gray-300">
            {[
              { label: "Branding Material Design Only", link: "/packages/branding-material-design-only" },
              { label: "Market Places", link: "/packages/market-places" },
              { label: "Enterprise Plans", link: "/packages/enterprise-plans" },
              { label: "CRM", link: "/packages/crm" },
            //   { label: "SEO", link: "/pakages/seo" }
            ].map((item) => (
               <li key={item.link} className="flex items-center space-x-2">
                <span className="text-[#FEC63F]">➜</span>
                <Link href={item.link} className="">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 - Address & Email */}
        <div>
          <h2 className="text-2xl font-bold mb-4 border-b-2 inline-block border-white">Connect with Us</h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-start space-x-3">
              <FaMapMarkerAlt className="text-[#FEC63F] mt-1" />
              <p className="text-sm text-gray-300">
                VM3 Tech Solutions LLP,<br />
                Office no 202 & 203,<br />
                Second floor, Uday Chamber,<br />
                Wagholi, Pune - 412207
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-[#FEC63F]" />
              <Link href="mailto:info@vm3techsolution.com" className="text-sm text-gray-300">
                info@vm3techsolution.com
                
              </Link>
            </div>
          </div>
        </div>

        {/* Column 4 - Phone & Socials */}
        <div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FaPhoneAlt className="text-[#FEC63F]" />
              <div className="text-sm text-gray-300">
                <p>India No.</p>
                <p>+91 7877554499</p>
              </div>
            </div>
            <div className="flex sm:space-x-4 space-x-1 pt-4 text-2xl">
              <Link href="https://www.linkedin.com/company/vm3techsolutions" target="_blank" className="hover:text-blue-400"><FaLinkedin /></Link>
              <Link href="https://www.facebook.com/vm3techsolutions" target="_blank" className="hover:text-blue-500"><FaFacebook /></Link>
              <Link href="https://www.youtube.com/channel/UCiER8PazbQ_ArgBYTOhY4Lw" target="_blank" className="hover:text-red-500"><FaYoutube /></Link>
              <Link href="https://www.instagram.com/vm3techsolutions" target="_blank" className="hover:text-pink-400"><FaInstagram /></Link>
              <Link href="https://twitter.com/vm3tech" target="_blank" className="hover:text-blue-300"><FaTwitter /></Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center py-4 border-t-2 border-gray-400 text-md text-gray-300">
        © Copyright 2024 by{" "}
        <Link href="https://vm3techsolution.com/" className="text-orange-400 font-semibold" target="_blank">
          VM3 Tech Solutions LLP
        </Link>
      </div>
    </footer>
  );
}
