import { useState } from "react";
import { generateHexagram } from "@/lib/mockData";

interface TimeDivinationProps {
  onComplete: (hexagramId: number, lines?: {value: number; isOld: boolean}[]) => void;
}

export default function TimeDivination({ onComplete }: TimeDivinationProps) {
  const [dateTime, setDateTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateTime) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      const hexagramId = generateHexagram("time", dateTime);
      // 生成模拟爻位数据
      const lines = Array(6).fill(0).map(() => ({
        value: Math.floor(Math.random() * 2),
        isOld: Math.random() < 0.25
      }));
      onComplete(hexagramId, lines);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-serif font-bold text-white mb-6">时间卦</h2>
      <p className="text-gray-300 mb-6">请输入当前时间进行占卜</p>
      
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-6">
          <label htmlFor="datetime" className="block text-gray-300 mb-2">选择时间</label>
          <input
            type="datetime-local"
            id="datetime"
            className="w-full bg-[#3A3A3A] border border-[#9C6A4B] rounded py-2 px-4 text-white focus:outline-none focus:ring-1 focus:ring-[#9C6A4B]"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          className={`w-full bg-[#9C6A4B] text-white px-6 py-3 rounded hover:bg-[#8C5A3B] transition-colors ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "占卜中..." : "开始占卜"}
        </button>
      </form>
    </div>
  );
}
