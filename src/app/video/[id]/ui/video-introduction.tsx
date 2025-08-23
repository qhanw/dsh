import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function VideoIntroduction({
  name,
  intro,
}: {
  name?: string;
  intro?: string;
}) {
  if (!intro) return null;

  return (
    <Card className="border-gray-100">
      <CardHeader>
        <CardTitle>简介</CardTitle>
      </CardHeader>
      <CardContent>
        {(() => {
          // 优化简介内容，开头使用《电影名称》格式，并在内容中多次提到电影名称
          let optimizedIntro = intro;

          // 如果简介不是以《电影名称》开头，则添加
          if (!optimizedIntro.startsWith(`《${name}》`)) {
            optimizedIntro = `《${name}》${optimizedIntro}`;
          }

          // 在内容中多次提到电影名称（每2-3句话提到一次）
          const sentences = optimizedIntro
            .split(/[。！？]/)
            .filter((s) => s.trim());
          const movieName = name || "";
          let enhancedIntro = "";

          sentences.forEach((c, idx) => {
            if (c.trim()) {
              // 每隔2-3句话添加一次电影名称
              if (idx > 0 && idx % 2 === 0 && !c.includes(movieName)) {
                enhancedIntro += `${c}。${movieName}的精彩剧情继续展开，`;
              } else {
                enhancedIntro += `${c}。`;
              }
            }
          });

          return enhancedIntro || optimizedIntro;
        })()}
      </CardContent>
    </Card>
  );
}
