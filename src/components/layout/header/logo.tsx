import Link from "next/link";
import { SITE_CONFIG } from "@/cfg";

export function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center flex-shrink-0 space-x-2 lg:space-x-3"
      title={SITE_CONFIG.shortName}
    >
      <div className="flex items-center justify-center size-8 lg:size-10">
        <img
          src={SITE_CONFIG.logo}
          alt={SITE_CONFIG.name}
          className="size-6 lg:size-8"
        />
      </div>
      <h1 className="font-bold text-white leading-tight truncate text-base lg:text-xl">
        {SITE_CONFIG.shortName}
      </h1>
    </Link>
  );
}
