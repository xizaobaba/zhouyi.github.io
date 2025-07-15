import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { hexagramData } from "@/lib/mockData";
import { toast } from "sonner";

function FavoriteItem({ fav, hexagram, onEditNote, onViewHexagram }: {
  fav: any;
  hexagram: any;
  onEditNote: (hexagramId: number, newNote: string) => void;
  onViewHexagram: (id: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState(fav.notes || "");

  return (
    <div className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-serif font-bold text-white">
          {hexagram?.name || "未知卦象"} {hexagram?.symbol || ""}
        </h3>
        <span className="text-gray-400 text-sm">
          {new Date(fav.date).toLocaleDateString()}
        </span>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-300 mb-2">{hexagram?.description || ""}</p>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">个人笔记</label>
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              className="w-full bg-[#3A3A3A] border border-[#9C6A4B] rounded py-2 px-4 text-white focus:outline-none focus:ring-1 focus:ring-[#9C6A4B]"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
                onClick={() => setIsEditing(false)}
              >
                取消
              </button>
              <button
                className="bg-[#9C6A4B] text-white px-4 py-2 rounded hover:bg-[#8C5A3B] transition-colors"
                onClick={() => {
                  onEditNote(fav.hexagramId, note);
                  setIsEditing(false);
                }}
              >
                保存
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-gray-300 bg-[#3A3A3A] p-3 rounded">
              {note || "暂无笔记"}
            </p>
            <div className="flex justify-end mt-2">
              <button
                className="bg-[#9C6A4B] text-white px-4 py-2 rounded hover:bg-[#8C5A3B] transition-colors"
                onClick={() => setIsEditing(true)}
              >
                <i className="fa-solid fa-pen mr-2"></i>编辑
              </button>
            </div>
          </div>
        )}
      </div>
      
      <button
        className="w-full bg-[#9C6A4B] text-white px-4 py-2 rounded hover:bg-[#8C5A3B] transition-colors"
        onClick={() => onViewHexagram(fav.hexagramId)}
      >
        查看卦象详情
      </button>
    </div>
  );
}

export default function UserPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"profile" | "history" | "favorites" | "settings">("profile");
  const [userData, setUserData] = useState({
    avatar: "",
    nickname: "易经爱好者",
    joinDate: "2025-01-01"
  });
  const [divinationHistory, setDivinationHistory] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    // 加载用户数据
    const user = JSON.parse(localStorage.getItem("userData") || "null");
    if (user) {
      setUserData(user);
    }

    // 加载占卜历史
    const history = JSON.parse(localStorage.getItem("divinationRecords") || "[]");
    setDivinationHistory(history);

    // 加载收藏
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favs);
  }, []);

  const handleViewHexagram = (id: number) => {
    navigate(`/hexagram/${id}`);
  };

  const handleEditNote = (hexagramId: number, newNote: string) => {
    const updatedFavorites = favorites.map(fav => 
      fav.hexagramId === hexagramId ? {...fav, notes: newNote} : fav
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    toast.success("笔记已保存");
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newUserData = {...userData, avatar: event.target.result as string};
          setUserData(newUserData);
          localStorage.setItem("userData", JSON.stringify(newUserData));
          toast.success("头像上传成功");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredHistory = filter === "all" 
    ? divinationHistory 
    : divinationHistory.filter(record => record.method === filter);

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1A1A]">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif font-bold text-[#9C6A4B] mb-8 text-center">
          用户中心
        </h1>
        
        {/* 选项卡导航 */}
        <div className="flex border-b border-[#9C6A4B] mb-8 overflow-x-auto">
          <button
            className={`py-2 px-4 font-serif whitespace-nowrap ${activeTab === "profile" ? "text-white border-b-2 border-[#9C6A4B]" : "text-[#9C6A4B]"}`}
            onClick={() => setActiveTab("profile")}
          >
            <i className="fa-solid fa-user mr-2"></i>个人信息
          </button>
          <button
            className={`py-2 px-4 font-serif whitespace-nowrap ${activeTab === "history" ? "text-white border-b-2 border-[#9C6A4B]" : "text-[#9C6A4B]"}`}
            onClick={() => setActiveTab("history")}
          >
            <i className="fa-solid fa-clock-rotate-left mr-2"></i>历史记录
          </button>
          <button
            className={`py-2 px-4 font-serif whitespace-nowrap ${activeTab === "favorites" ? "text-white border-b-2 border-[#9C6A4B]" : "text-[#9C6A4B]"}`}
            onClick={() => setActiveTab("favorites")}
          >
            <i className="fa-solid fa-star mr-2"></i>收藏夹
          </button>
          <button
            className={`py-2 px-4 font-serif whitespace-nowrap ${activeTab === "settings" ? "text-white border-b-2 border-[#9C6A4B]" : "text-[#9C6A4B]"}`}
            onClick={() => setActiveTab("settings")}
          >
            <i className="fa-solid fa-gear mr-2"></i>设置
          </button>
        </div>

        {/* 个人信息区 */}
        {activeTab === "profile" && (
          <div className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative w-24 h-24 rounded-full bg-[#9C6A4B] flex items-center justify-center overflow-hidden">
                {userData.avatar ? (
                  <img src={userData.avatar} alt="用户头像" className="w-full h-full object-cover" />
                ) : (
                  <i className="fa-solid fa-user text-white text-4xl"></i>
                )}
                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <i className="fa-solid fa-camera text-white text-xl"></i>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleAvatarUpload}
                  />
                </label>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-serif font-bold text-white mb-2">{userData.nickname}</h2>
                <p className="text-gray-300">加入时间: {new Date(userData.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )}

        {/* 历史记录区 */}
        {activeTab === "history" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <select
                  className="bg-[#3A3A3A] border border-[#9C6A4B] rounded py-2 px-4 text-white focus:outline-none focus:ring-1 focus:ring-[#9C6A4B]"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">全部</option>
                  <option value="coin">金钱卦</option>
                  <option value="time">时间卦</option>
                  <option value="random">随机卦</option>
                </select>
              </div>
              {filteredHistory.length > 0 && (
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
                  onClick={() => {
                    if (confirm(`确定要清除${filter === 'all' ? '全部' : '当前筛选'}历史记录吗？此操作不可撤销！`)) {
                      if (filter === 'all') {
                        localStorage.setItem('divinationRecords', '[]');
                        setDivinationHistory([]);
                      } else {
                        const remaining = divinationHistory.filter(record => record.method !== filter);
                        localStorage.setItem('divinationRecords', JSON.stringify(remaining));
                        setDivinationHistory(remaining);
                      }
                      toast.success('历史记录已清除');
                    }
                  }}
                >
                  <i className="fa-solid fa-trash mr-2"></i>
                  清除{filter === 'all' ? '全部' : '当前筛选'}记录
                </button>
              )}
            </div>
            
            {filteredHistory.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredHistory.map((record) => {
                  const hexagram = hexagramData.find(h => h.id === record.hexagramId);
                  return (
                    <div 
                      key={record.id} 
                      className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                      onClick={() => handleViewHexagram(record.hexagramId)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-serif font-bold text-white">
                          {hexagram?.name || "未知卦象"} {hexagram?.symbol || ""}
                        </h3>
                        <span className="text-gray-400 text-sm">
                          {new Date(record.date).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-2">
                        占卜方式: {record.method === "coin" ? "金钱卦" : record.method === "time" ? "时间卦" : "随机卦"}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg text-center text-gray-300">
                <i className="fa-solid fa-inbox text-4xl mb-4"></i>
                <p>暂无占卜记录</p>
              </div>
            )}
          </div>
        )}

        {/* 收藏夹区 */}
        {activeTab === "favorites" && (
          <div className="space-y-6">
            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favorites.map((fav) => {
                  const hexagram = hexagramData.find(h => h.id === fav.hexagramId);
                  return (
                    <FavoriteItem 
                      key={fav.hexagramId}
                      fav={fav}
                      hexagram={hexagram}
                      onEditNote={handleEditNote}
                      onViewHexagram={handleViewHexagram}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg text-center text-gray-300">
                <i className="fa-solid fa-star text-4xl mb-4"></i>
                <p>暂无收藏的卦象</p>
              </div>
            )}
          </div>
        )}

        {/* 设置区 */}
        {activeTab === "settings" && (
          <div className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-serif font-bold text-white mb-6">个人设置</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-serif font-bold text-[#9C6A4B] mb-4">个人信息</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">昵称</label>
                    <input
                      type="text"
                      className="w-full bg-[#3A3A3A] border border-[#9C6A4B] rounded py-2 px-4 text-white focus:outline-none focus:ring-1 focus:ring-[#9C6A4B]"
                      value={userData.nickname}
                      onChange={(e) => setUserData({...userData, nickname: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-serif font-bold text-[#9C6A4B] mb-4">偏好设置</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-gray-300">
                    <input type="checkbox" className="rounded text-[#9C6A4B] focus:ring-[#9C6A4B]" />
                    <span>接收邮件通知</span>
                  </label>
                  <label className="flex items-center space-x-2 text-gray-300">
                    <input type="checkbox" className="rounded text-[#9C6A4B] focus:ring-[#9C6A4B]" />
                    <span>深色模式</span>
                  </label>
                </div>
              </div>
              
              <div className="pt-4 border-t border-[#9C6A4B]">
                <button
                  className="bg-[#9C6A4B] text-white px-6 py-3 rounded hover:bg-[#8C5A3B] transition-colors"
                  onClick={() => {
                    localStorage.setItem("userData", JSON.stringify(userData));
                    toast.success("设置已保存");
                  }}
                >
                  保存设置
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
