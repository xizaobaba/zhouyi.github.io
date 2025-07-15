import { useState } from "react";
import { generateHexagram } from "@/lib/mockData";

interface CoinDivinationProps {
  onComplete: (hexagramId: number) => void;
}

export default function CoinDivination({ onComplete }: CoinDivinationProps) {
  const [coins, setCoins] = useState<{value: number; isOld: boolean}[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const throwCoins = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCoins([]);
    
    try {
      // 模拟抛掷动画
      setTimeout(() => {
        const results = Array(6).fill(0).map(() => {
          const value = Math.floor(Math.random() * 2);
          // 25%概率是老阳或老阴
          const isOld = Math.random() < 0.25;
          return {value, isOld};
        });
        setCoins(results);
        
        setTimeout(() => {
          try {
            const hexagramId = generateHexagram("coin", results);
            if (hexagramId >= 1 && hexagramId <= 64) {
              onComplete(hexagramId);
            } else {
              console.error("生成的卦象ID无效:", hexagramId);
            }
          } catch (error) {
            console.error("生成卦象时出错:", error);
          } finally {
            setIsAnimating(false);
          }
        }, 1000);
      }, 1500);
    } catch (error) {
      console.error("抛掷铜钱时出错:", error);
      setIsAnimating(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-serif font-bold text-white mb-6">金钱卦</h2>
      <p className="text-gray-300 mb-6">点击下方按钮抛掷铜钱，共需抛掷六次</p>
      
      <button
        className={`bg-[#9C6A4B] text-white px-6 py-3 rounded-full mb-8 hover:bg-[#8C5A3B] transition-colors ${isAnimating ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={throwCoins}
        disabled={isAnimating}
      >
        {isAnimating ? "占卜中..." : "抛掷铜钱"}
      </button>
      
      <div className="flex justify-center space-x-4 mb-6">
        {coins.length > 0 ? (
          coins.map((coin, index) => (
            <div 
              key={index}
              className={`w-12 h-12 rounded-full flex flex-col items-center justify-center text-xl transition-all duration-500 ${coin.value === 1 ? "bg-yellow-500 text-black" : "bg-gray-700 text-white"}`}
            >
              <span>{coin.value === 1 ? "阳" : "阴"}</span>
              <span className="text-xs">{coin.isOld ? (coin.value === 1 ? "老" : "老") : "少"}</span>
            </div>
          ))
        ) : (
          <div className="flex space-x-4">
            {Array(6).fill(0).map((_, index) => (
              <div 
                key={index}
                className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center"
              >
                <i className="fa-solid fa-question text-gray-500"></i>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
