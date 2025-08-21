import Image from "next/image";
import { Play } from "lucide-react";
import { cn, convertImgUrl } from "@/lib/utils";
import { Video } from "@/types/video";

export function VideoCover({ data }: { data: Video }) {
  return (
    <div
      className={cn(
        "aspect-[3/4] relative overflow-hidden rounded-lg",
        "max-lg:w-36",
        "lg:shadow-2xl"
      )}
    >
      <Image
        src={convertImgUrl(data.image)}
        alt={data.name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 30vw"
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
        <Play className={cn("text-white size-8", "lg:size-16")} />
      </div>
    </div>
  );
}
