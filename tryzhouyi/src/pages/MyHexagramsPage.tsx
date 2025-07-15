import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { hexagramData } from "@/lib/mockData";
import { toast } from "sonner";

export default function MyHexagramsPage() {
  const navigate = useNavigate();
  const [myHexagrams, setMyHexagrams] = useState<any[]>([]);

  useEffect(() => {
    try {
      const hexagrams = JSON.parse(localStorage.getItem("myHexagrams") || "[]");
      setMyHexagrams(hexagrams);
    } catch (error) {
      console.error("加载我的卦象时出错:", error);
      toast.error("加载我的卦象失败");
    }
  }, []);

  const handleViewHexagram = (id: number) => {
    navigate(`/hexagram/${id}`);
  };

  const handleDeleteHexagram = (id: number) => {
    if (confirm("确定要删除这个卦象记录吗？")) {
      const updated = myHexagrams.filter(h => h.hexagramId !== id);
      setMyHexagrams(updated);
      localStorage.setItem("myHexagrams", JSON.stringify(updated));
      toast.success("卦象记录已删除");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1A1A]">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif font-bold text-[#9C6A4B] mb-8 text-center">
          我的卦象
        </h1>
        
        {myHexagrams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myHexagrams.map((record) => {
              const hexagram = hexagramData.find(h => h.id === record.hexagramId);
              return (
                <div 
                  key={record.hexagramId} 
                  className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-serif font-bold text-white">
                      {hexagram?.name || "未知卦象"} {hexagram?.symbol || ""}
                    </h3>
                    <span className="text-gray-400 text-sm">
                      {new Date(record.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    {hexagram?.description || ""}
                  </p>
                  
                  <div className="flex justify-between">
                    <button
                      className="bg-[#9C6A4B] text-white px-4 py-2 rounded hover:bg-[#8C5A3B] transition-colors"
                      onClick={() => handleViewHexagram(record.hexagramId)}
                    >
                      查看详情
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                      onClick={() => handleDeleteHexagram(record.hexagramId)}
                    >
                      删除记录
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg text-center text-gray-300">
            <i className="fa-solid fa-inbox text-4xl mb-4"></i>
            <p>暂无保存的卦象记录</p>
            <p className="mt-2">进行占卜后，卦象将自动保存到这里</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
