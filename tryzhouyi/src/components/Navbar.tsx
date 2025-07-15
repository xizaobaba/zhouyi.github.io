import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/App";
 
export default function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <nav className="bg-[#1A1A1A] text-[#9C6A4B] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-[#9C6A4B] flex items-center justify-center">
            <i className="fa-solid fa-yin-yang text-white text-xl"></i>
          </div>
          <span className="font-serif text-xl font-bold">周易占卜</span>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-white transition-colors">首页</Link>
          <Link to="/divination" className="hover:text-white transition-colors">占卜</Link>
          <Link to="/my-hexagrams" className="hover:text-white transition-colors">我的卦象</Link>
          <Link 
            to="/user" 
            className="hover:text-white transition-colors flex items-center"
          >
            <i className={`fa-${isAuthenticated ? "solid" : "regular"} fa-user mr-1`}></i>
            用户中心
          </Link>
        </div>
      </div>
    </nav>
  );
}
