import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { popularHexagrams } from "@/lib/mockData";
import { toast } from "sonner";

export default function HexagramCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [validHexagrams, setValidHexagrams] = useState<any[]>([]);

  useEffect(() => {
    // 验证并过滤有效卦象数据
    const filtered = popularHexagrams.filter(hexagram => 
      hexagram && hexagram.id && hexagram.name && hexagram.image
    );
    
    if (filtered.length > 0) {
      setValidHexagrams(filtered);
      setIsLoading(false);
    } else {
      toast.error("热门卦象数据加载失败");
      setIsLoading(false); // 即使失败也停止加载状态
    }
  }, []);

  useEffect(() => {
    if (validHexagrams.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % validHexagrams.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [validHexagrams]);

  if (isLoading) {
    return (
      <section className="py-12 bg-[#1A1A1A]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-[#9C6A4B] mb-8 text-center">
            热门卦象
          </h2>
          <div className="flex justify-center items-center h-96">
            <div className="animate-pulse bg-[#2A2A2A] p-6 rounded-lg shadow-lg w-full max-w-md h-80 flex flex-col items-center justify-center">
              <div className="w-32 h-32 bg-gray-700 rounded-full mb-4"></div>
              <div className="h-6 w-3/4 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-2/3 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (validHexagrams.length === 0) {
    return (
      <section className="py-12 bg-[#1A1A1A]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-[#9C6A4B] mb-8 text-center">
            热门卦象
          </h2>
          <div className="bg-[#2A2A2A] p-8 rounded-lg text-center text-gray-300">
            <i className="fa-solid fa-triangle-exclamation text-4xl mb-4"></i>
            <p>暂时无法加载热门卦象，请稍后再试</p>
          </div>
        </div>
      </section>
    );
  }

  const defaultImage = "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=%E6%98%93%E7%BB%8F%E5%8D%A6%E7%AC%A6%E7%BC%BA%E5%A4%B1%E5%9B%BE%E7%89%87&sign=8896cdfdcbb886346f725d9e21624df3";

  return (
    <section className="py-12 bg-[#1A1A1A]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-[#9C6A4B] mb-8 text-center">
          热门卦象
        </h2>
        <div className="relative overflow-hidden h-[32rem] md:h-96">
          <div
            className="flex transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${validHexagrams.length * 100}%`
            }}
          >
            {validHexagrams.map((hexagram) => (
              <div
                key={hexagram.id}
                className="w-full flex-shrink-0 flex justify-center px-2"
              >
                <Link
                  to={`/hexagram/${hexagram.id}`}
                  className="block w-full max-w-md h-full"
                >
                  <div className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg h-full flex flex-col items-center justify-center transition-all hover:scale-105">
                    <div className="w-32 h-32 mb-4 flex items-center justify-center">
                      <img
                        src={hexagram.image}
                        alt={hexagram.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = defaultImage;
                        }}
                      />
                    </div>
                     <h3 className="text-2xl font-serif font-bold text-white mb-2 text-center">
                       {hexagram.name} {hexagram.symbol}
                     </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-6 space-x-2">
          {validHexagrams.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-[#9C6A4B] w-6' : 'bg-gray-500'}`}
              aria-label={`查看第 ${index + 1} 个卦象`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
