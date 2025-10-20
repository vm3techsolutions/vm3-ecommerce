'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation"; 
import { logout } from "@/app/store/authSlice";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/24/outline"; // ✅ added HeartIcon

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // 👈 hydration guard

  const user = useSelector((state) => state.auth.user);

  // Cart state
  const cartItems = useSelector((state) => state.cart.items || []);
  const totalItems = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0)
    : 0;

  // Wishlist state (optional slice, else fallback empty)
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const totalWishlist = Array.isArray(wishlistItems) ? wishlistItems.length : 0;

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true); // ✅ ensure we only render after client hydration
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    router.push("/login");
  };

  const menuItems = [
    { title: "About Us", path: "/" },
    { title: "Products", path: "/" },
    { title: "Our Packages", path: "/" },
    { title: "Contact Us", path: "/" },
    { title: "Login", path: "/login" },
  ];

  if (!isMounted) return null; // 👈 Prevent hydration error

  return (
    <header className="absolute top-0 left-0 w-full bg-black/50 text-white shadow-md z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 ml-4 md:ml-20">
          <Link href="/">
            <Image
              src="/assets/vm3-logo.png"
              alt="VM3 Logo"
              className="h-20 w-auto"
              width={80}
              height={80}
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 items-center">
          {menuItems.map((item, idx) => (
            <div key={idx} className="relative group">
              <Link
                href={item.path || "#"}
                className="hover:text-yellow-400 transition"
              >
                {item.title}
              </Link>
            </div>
          ))}

          {/* Wishlist, Cart & User */}
          <div className="flex space-x-4 text-[#FFB703] relative justify-end items-center ml-6">
            
            {/* Wishlist Icon */}
            <Link href="/wishlist" className="relative">
              <HeartIcon className="w-8 h-8 cursor-pointer" />
              {totalWishlist > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalWishlist}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link href="/cart" className="relative">
              <ShoppingCartIcon className="w-8 h-8 cursor-pointer" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Icon */}
            {user ? (
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <User className="w-10 h-10 cursor-pointer" />
                {dropdownOpen && (
                  <div className="absolute right-0 w-48 bg-white border rounded-lg shadow-lg text-black py-2 z-50">
                    <p className="px-4 py-2 font-medium border-b">
                      Hi, {user?.name || "Guest"}
                    </p>
                    <Link
                      href="/packages"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      My Account
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <User className="w-5 h-5 cursor-pointer" />
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black text-white px-4 pb-4">
          <nav className="flex flex-col space-y-2">
            {menuItems.map((item, i) => (
              <div key={i}>
                <Link
                  href={item.path || "#"}
                  className="hover:text-[#FEC63F] transition"
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
