import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video } from "@/types/video";

function Description({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <span className="text-gray-500 shrink-0">{label}：</span>
      <span className="text-gray-800">{children || "-"}</span>
    </div>
  );
}

export function VideoBaseInfo({ data }: { data: Video }) {
  return (
    <Card className="border-gray-100">
      <CardHeader>
        <CardTitle>影片信息</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <Description label="片名">{data.name}</Description>
          <Description label="状态">{data.statusStr}</Description>
          <Description label="主演">{data.actors}</Description>
          <Description label="导演">{data.directors}</Description>
          <Description label="年份">{data.period}</Description>
          <Description label="地区">{data.region}</Description>
          <Description label="语言">{data.language}</Description>
        </div>
      </CardContent>
    </Card>
  );
}
