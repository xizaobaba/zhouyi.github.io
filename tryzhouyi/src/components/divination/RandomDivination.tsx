import { useState } from "react";
import { generateHexagram } from "@/lib/mockData";

interface RandomDivinationProps {
  onComplete: (hexagramId: number, lines?: {value: number; isOld: boolean}[]) => void;
}

export default function RandomDivination({ onComplete }: RandomDivinationProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateRandom = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const hexagramId = generateHexagram("random");
      // 生成模拟爻位数据
      const lines = Array(6).fill(0).map(() => ({
        value: Math.floor(Math.random() * 2),
        isOld: Math.random() < 0.25
      }));
      onComplete(hexagramId, lines);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-serif font-bold text-white mb-6">随机卦</h2>
      <p className="text-gray-300 mb-6">点击下方按钮随机生成一个卦象</p>
      
      <button
        className={`bg-[#9C6A4B] text-white px-6 py-3 rounded hover:bg-[#8C5A3B] transition-colors ${isGenerating ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={generateRandom}
        disabled={isGenerating}
      >
        {isGenerating ? "生成中..." : "随机生成"}
      </button>
    </div>
  );
}
