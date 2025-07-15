import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { hexagramData } from "@/lib/mockData";
import { toast } from "sonner";

export default function HexagramPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hexagram, setHexagram] = useState<any>(null);
  const [rotation, setRotation] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const hexagramId = parseInt(id || "1");
    const foundHexagram = hexagramData.find(h => h.id === hexagramId);
    if (foundHexagram) {
      setHexagram(foundHexagram);
      
      // 检查收藏状态
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      const favoriteIndex = favorites.findIndex((f: any) => f.hexagramId === hexagramId);
      if (favoriteIndex !== -1) {
        setIsFavorite(true);
      }
    } else {
      navigate("/");
      toast.error("未找到该卦象");
    }
  }, [id, navigate]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const hexagramId = parseInt(id || "1");
    
    if (isFavorite) {
      const newFavorites = favorites.filter((f: any) => f.hexagramId !== hexagramId);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      favorites.push({
        hexagramId,
        date: new Date().toISOString()
      });
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "已从收藏移除" : "已添加到收藏");
  };

  if (!hexagram) {
    return <div className="min-h-screen bg-[#1A1A1A]"></div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1A1A]">
      <Helmet>
        <title>{`${hexagram.name} ${hexagram.symbol} - 周易占卜网`}</title>
        <meta name="description" content={`${hexagram.name}卦象`} />
        <meta name="keywords" content={`周易,易经,占卜,${hexagram.name},${hexagram.symbol}`} />
        <meta property="og:title" content={`${hexagram.name} ${hexagram.symbol} - 周易占卜网`} />
        <meta property="og:description" content={`${hexagram.name}卦象`} />
        <meta property="og:image" content={hexagram.image} />
        <meta property="og:url" content={`https://www.tryzhouyi.com/hexagram/${hexagram.id}`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-serif font-bold text-[#9C6A4B]">
                {hexagram.name} {hexagram.symbol}
              </h2>
              <button
                onClick={toggleFavorite}
                className={`px-4 py-2 rounded-full ${isFavorite ? "bg-yellow-500 text-black" : "bg-[#9C6A4B] text-white"} hover:opacity-80 transition-opacity`}
              >
                <i className={`fa-${isFavorite ? "solid" : "regular"} fa-star mr-2`}></i>
                {isFavorite ? "已收藏" : "收藏"}
              </button>
            </div>
            
            <div className="relative w-full h-64 mb-6">
              <img
                src={hexagram.image}
                alt={hexagram.name}
                className="w-full h-full object-contain"
                style={{ transform: `rotate(${rotation}deg)` }}
              />
            </div>
            
            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={() => setRotation(rotation - 15)}
                className="bg-[#9C6A4B] text-white px-4 py-2 rounded hover:bg-[#8C5A3B] transition-colors"
              >
                <i className="fa-solid fa-rotate-left"></i> 左转
              </button>
              <button
                onClick={() => setRotation(0)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
              >
                <i className="fa-solid fa-undo"></i> 重置
              </button>
              <button
                onClick={() => setRotation(rotation + 15)}
                className="bg-[#9C6A4B] text-white px-4 py-2 rounded hover:bg-[#8C5A3B] transition-colors"
              >
                <i className="fa-solid fa-rotate-right"></i> 右转
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
