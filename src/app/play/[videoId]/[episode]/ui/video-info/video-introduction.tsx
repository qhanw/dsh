export function VideoIntroduction({
  name,
  intro,
}: {
  name: string;
  intro?: string;
}) {
  if (!intro) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-white mb-2">简介</h3>
      <p className="text-gray-300 leading-relaxed line-clamp-3">
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
      </p>
    </div>
  );
}
