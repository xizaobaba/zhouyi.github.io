import { useState } from "react";
import { generateHexagram } from "@/lib/mockData";

interface DayanDivinationProps {
  onComplete: (hexagramId: number, lines?: {value: number; isOld: boolean}[]) => void;
}

export default function DayanDivination({ onComplete }: DayanDivinationProps) {
  const [steps, setSteps] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const performDivination = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSteps([]);
    setCurrentStep(0);
    
    // 模拟大衍筮法的分步过程
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= 6) {
          clearInterval(interval);
          const hexagramId = generateHexagram("dayan");
          // 生成爻位数据
          const lines = steps.map(step => ({
            value: step % 2,
            isOld: step === 0 || step === 3
          }));
          setTimeout(() => {
            onComplete(hexagramId, lines);
            setIsAnimating(false);
          }, 1000);
          return prev;
        }
        
        // 模拟每次分堆结果 (0-3)
        const result = Math.floor(Math.random() * 4);
        setSteps(prev => [...prev, result]);
        return prev + 1;
      });
    }, 1500);
  };

  const getStepDescription = (step: number) => {
    const descriptions = [
      "第一变：分二、挂一、揲四、归奇",
      "第二变：分二、挂一、揲四、归奇",
      "第三变：分二、挂一、揲四、归奇",
      "第四变：分二、挂一、揲四、归奇",
      "第五变：分二、挂一、揲四、归奇",
      "第六变：分二、挂一、揲四、归奇"
    ];
    return descriptions[step] || "";
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-serif font-bold text-white mb-6">大衍筮法</h2>
      <p className="text-gray-300 mb-6">点击下方按钮开始传统蓍草占卜</p>
      
      <button
        className={`bg-[#9C6A4B] text-white px-6 py-3 rounded-full mb-8 hover:bg-[#8C5A3B] transition-colors ${isAnimating ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={performDivination}
        disabled={isAnimating}
      >
        {isAnimating ? "占卜中..." : "开始占卜"}
      </button>
      
      {/* 分步显示 */}
      <div className="w-full max-w-md mb-6">
        {currentStep > 0 && (
          <div className="bg-[#3A3A3A] p-4 rounded-lg mb-4">
            <h3 className="text-lg font-serif font-bold text-[#9C6A4B] mb-2">
              当前进度: {currentStep}/6 变
            </h3>
            <p className="text-gray-300">{getStepDescription(currentStep - 1)}</p>
          </div>
        )}
        
        {/* 爻位显示 */}
        <div className="grid grid-cols-6 gap-2">
          {Array(6).fill(0).map((_, index) => (
            <div 
              key={index}
              className={`p-2 rounded text-center ${
                index < steps.length 
                  ? steps[index] % 2 === 0 
                    ? "bg-yellow-500 text-black" 
                    : "bg-gray-700 text-white"
                  : "bg-gray-800 text-gray-400"
              }`}
            >
              <div>第{6-index}爻</div>
              <div>{index < steps.length ? (steps[index] % 2 === 0 ? "阳" : "阴") : "?"}</div>
              {index < steps.length && (
                <div className="text-sm">
                  {steps[index] === 0 || steps[index] === 3 ? "老" : "少"}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}