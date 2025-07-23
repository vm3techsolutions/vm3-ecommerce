'use client';
import Link from 'next/link';

const PrimaryButton = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="rounded-[5px] bg-[#FEC63F] border-l-[15px] border-l-[#C09837] px-[14px] py-[12px]  hover:bg-[#C09837] text-black font-medium transition duration-300"
    >
      {children}
    </Link>
  );
};

export default PrimaryButton;
