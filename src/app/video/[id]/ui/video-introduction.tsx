import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function VideoIntroduction({
  name,
  intro,
}: {
  name: string;
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
          const movieName = name;
          let enhancedIntro = "";

          sentences.forEach((sentence, index) => {
            if (sentence.trim()) {
              // 每隔2-3句话添加一次电影名称
              if (
                index > 0 &&
                index % 2 === 0 &&
                !sentence.includes(movieName)
              ) {
                enhancedIntro += `${sentence}。${movieName}的精彩剧情继续展开，`;
              } else {
                enhancedIntro += `${sentence}。`;
              }
            }
          });

          return enhancedIntro || optimizedIntro;
        })()}
      </CardContent>
    </Card>
  );
}
