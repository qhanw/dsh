import { SITE_CONFIG } from "@/lib/site-config";

export function Logo() {
  return (
    <a
      href="/"
      className="flex items-center flex-shrink-0 space-x-2 lg:space-x-3"
    >
      <div className="flex items-center justify-center size-8 lg:size-10">
        <img
          src={SITE_CONFIG.logo.image}
          alt="Logo"
          className="size-6 lg:size-8"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-white leading-tight truncate text-base lg:text-xl">
          {SITE_CONFIG.shortName}
        </span>
      </div>
    </a>
  );
}
