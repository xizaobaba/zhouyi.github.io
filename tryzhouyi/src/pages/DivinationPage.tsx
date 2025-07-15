import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoinDivination from "@/components/divination/CoinDivination";
import TimeDivination from "@/components/divination/TimeDivination";
import RandomDivination from "@/components/divination/RandomDivination";
import DayanDivination from "@/components/divination/DayanDivination";
import { generateHexagram, hexagramData } from "@/lib/mockData";
import { toast } from "sonner";

export default function DivinationPage() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<"coin" | "time" | "random" | "dayan">("coin");
  const [result, setResult] = useState<number | null>(null);
  const [hexagramInfo, setHexagramInfo] = useState<any>(null);
  const [rotation, setRotation] = useState(0);
  const [coins, setCoins] = useState<{value: number; isOld: boolean}[]>([]);
  const [divinationTopic, setDivinationTopic] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const method = searchParams.get("method");
    if (method === "coin" || method === "time" || method === "random" || method === "dayan") {
      setActiveTab(method);
    }
  }, [searchParams]);

  const handleDivinationComplete = (hexagramId: number, coinsData?: {value: number; isOld: boolean}[]) => {
    try {
      if (hexagramId >= 1 && hexagramId <= 64) {
        setResult(hexagramId);
        if (coinsData) {
          setCoins(coinsData);
        }
        const foundHexagram = hexagramData.find(h => h.id === hexagramId);
        setHexagramInfo(foundHexagram);
        saveDivinationRecord(hexagramId, activeTab);
        
        // 保存到我的卦象
        const myHexagrams = JSON.parse(localStorage.getItem("myHexagrams") || "[]");
        if (!myHexagrams.some((h: any) => h.hexagramId === hexagramId)) {
          myHexagrams.unshift({
            hexagramId,
            date: new Date().toISOString(),
            method: activeTab,
            topic: divinationTopic
          });
          localStorage.setItem("myHexagrams", JSON.stringify(myHexagrams));
        }
        
        toast.success("占卜完成！已保存到我的卦象");
      } else {
        toast.error("占卜结果无效，请重试");
      }
    } catch (error) {
      console.error("处理占卜结果时出错:", error);
      toast.error("处理占卜结果时出错");
    }
  };

  const saveDivinationRecord = (hexagramId: number, method: string) => {
    const records = JSON.parse(localStorage.getItem("divinationRecords") || "[]");
    records.unshift({
      id: Date.now(),
      hexagramId,
      method,
      date: new Date().toISOString(),
      topic: divinationTopic
    });
    localStorage.setItem("divinationRecords", JSON.stringify(records));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1A1A]">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif font-bold text-[#9C6A4B] mb-8 text-center">
          易经占卜
        </h1>
        
        {/* 占卜方式选项卡 */}
        <div className="flex border-b border-[#9C6A4B] mb-8 overflow-x-auto">
          <button
            className={`py-2 px-4 font-serif whitespace-nowrap ${activeTab === "coin" ? "text-white border-b-2 border-[#9C6A4B]" : "text-[#9C6A4B]"}`}
            onClick={() => {
              setActiveTab("coin");
              setResult(null);
              setHexagramInfo(null);
              setRotation(0);
            }}
          >
            金钱卦
          </button>
          <button
            className={`py-2 px-4 font-serif whitespace-nowrap ${activeTab === "time" ? "text-white border-b-2 border-[#9C6A4B]" : "text-[#9C6A4B]"}`}
            onClick={() => {
              setActiveTab("time");
              setResult(null);
              setHexagramInfo(null);
              setRotation(0);
            }}
          >
            时间卦
          </button>
          <button
            className={`py-2 px-4 font-serif whitespace-nowrap ${activeTab === "random" ? "text-white border-b-2 border-[#9C6A4B]" : "text-[#9C6A4B]"}`}
            onClick={() => {
              setActiveTab("random");
              setResult(null);
              setHexagramInfo(null);
              setRotation(0);
            }}
          >
            随机卦
          </button>
          <button
            className={`py-2 px-4 font-serif whitespace-nowrap ${activeTab === "dayan" ? "text-white border-b-2 border-[#9C6A4B]" : "text#[9C6A4B]"}`}
            onClick={() => {
              setActiveTab("dayan");
              setResult(null);
              setHexagramInfo(null);
              setRotation(0);
            }}
          >
            大衍筮法
          </button>
        </div>

        {/* 占卜操作区 */}
        <div className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg mb-8">
          <div className="mb-6">
            <label htmlFor="divinationTopic" className="block text-gray-300 mb-2">请输入要占卜的事项</label>
            <input
              type="text"
              id="divinationTopic"
              className="w-full bg-[#3A3A3A] border border-[#9C6A4B] rounded py-2 px-4 text-white focus:outline-none focus:ring-1 focus:ring-[#9C6A4B]"
              value={divinationTopic}
              onChange={(e) => setDivinationTopic(e.target.value)}
              placeholder="例如：事业发展、感情走向、健康状态等"
            />
          </div>
          {activeTab === "coin" && <CoinDivination onComplete={(hexagramId, coins) => handleDivinationComplete(hexagramId, coins)} />}
          {activeTab === "time" && <TimeDivination onComplete={handleDivinationComplete} />}
          {activeTab === "random" && <RandomDivination onComplete={handleDivinationComplete} />}
          {activeTab === "dayan" && <DayanDivination onComplete={handleDivinationComplete} />}
        </div>

        {/* 结果展示区 */}
        {hexagramInfo && (
          <div className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-serif font-bold text-[#9C6A4B] mb-4">
              {hexagramInfo.name} {hexagramInfo.symbol}
            </h3>
            
            <div className="relative w-full h-64 mb-6">
              <img
                src={hexagramInfo.image}
                alt={hexagramInfo.name}
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
                className="bg-[#9C6A4B] text-white px-4 py-2 rounded hover:bg[{#8C5A3B}] transition-colors"
              >
                <i className="fa-solid fa-rotate-right"></i> 右转
              </button>
            </div>

            {(coins.length > 0 || (hexagramInfo && hexagramInfo.lines)) && (
              <div className="mb-6">
                <h4 className="text-lg font-serif font-bold text-white mb-2">爻位状态</h4>
                <div className="grid grid-cols-6 gap-2">
                  {(coins.length > 0 ? coins : hexagramInfo.lines).map((line: {value: number; isOld: boolean}, index: number) => (
                    <div 
                      key={index}
                      className={`p-2 rounded text-center ${line.value === 1 ? "bg-yellow-500 text-black" : "bg-gray-700 text-white"}`}
                    >
                      <div>第{6-index}爻</div>
                      <div>{line.value === 1 ? "阳" : "阴"}</div>
                      <div className="text-sm">{line.isOld ? "老" : "少"}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-serif font-bold text-white mb-2">卦象描述</h4>
                <p className="text-gray-300">{hexagramInfo.description}</p>
              </div>
              
              <div>
                <h4 className="text-lg font-serif font-bold text-white mb-2">经典解读</h4>
                <p className="text-gray-300">{hexagramInfo.classicText}</p>
              </div>
              
              <div>
                <h4 className="text-lg font-serif font-bold text-white mb-2">现代解读</h4>
                <p className="text-gray-300">{hexagramInfo.modernInterpretation}</p>
              </div>
              
              <div>
                <h4 className="text-lg font-serif font-bold text-white mb-2">AI分析</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#3A3A3A] p-4 rounded">
                    <h5 className="font-serif font-bold text-[#9C6A4B] mb-2">事业</h5>
                    <p className="text-gray-300">{hexagramInfo.aiAnalysis.career}</p>
                  </div>
                  <div className="bg[{#3A3A3A}] p-4 rounded">
                    <h5 className="font-serif font-bold text-[#9C6A4B] mb-2">感情</h5>
                    <p className="text-gray-300">{hexagramInfo.aiAnalysis.love}</p>
                  </div>
                  <div className="bg-[#3A3A3A] p-4 rounded">
                    <h5 className="font-serif font-bold text-[#9C6A4B] mb-2">健康</h5>
                    <p className="text-gray-300">{hexagramInfo.aiAnalysis.health}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
