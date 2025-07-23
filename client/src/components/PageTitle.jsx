'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function PageTitle({ title, breadcrumbs, imageUrl }) {
  return (
    <div className="relative w-full sm:h-[60vh] h-[50vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src={imageUrl || "/assets/BannerBG.jpg"}
        alt="Banner"
        fill
        className="object-cover z-0"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#2E2903]/70 z-10" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center text-white px-8 sm:px-16 md:px-24">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg">
          {breadcrumbs?.map((crumb, index) => (
            <span key={index}>
              {crumb.link ? (
                <Link href={crumb.link} className="hover:underline text-white">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-orange-400">{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && ' » '}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
