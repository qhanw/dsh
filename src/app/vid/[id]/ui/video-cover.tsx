import Image from "next/image";
import { PlayIcon } from "lucide-react";
import { cn, convertImgUrl } from "@/lib/utils";
import { Video } from "@/types/video";
import Link from "next/link";

export function VideoCover({
  data,
  className,
}: {
  data: Video;
  className?: string;
}) {
  return (
    <Link
      href={`/play/${data.id}/1`}
      title={data.name || data.enname}
      className={cn(
        "block aspect-[3/4] relative overflow-hidden rounded-md cursor-pointer",
        "max-lg:w-36",
        "lg:shadow",
        className
      )}
    >
      <Image
        src={convertImgUrl(data.image) || "/logo.png"}
        alt={data.name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 30vw"
      />
      <div className="absolute inset-0 bg-black/35 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
        <PlayIcon className={cn("text-white size-8", "lg:size-12")} />
      </div>
    </Link>
  );
}
