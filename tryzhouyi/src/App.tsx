import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import DivinationPage from "@/pages/DivinationPage";
import HexagramPage from "@/pages/HexagramPage";
import UserPage from "@/pages/UserPage";
import MyHexagramsPage from "@/pages/MyHexagramsPage";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
  logout: () => {},
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/divination" element={<DivinationPage />} />
        <Route path="/hexagram/:id" element={<HexagramPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/my-hexagrams" element={<MyHexagramsPage />} />
        <Route path="/culture" element={<div className="text-center text-xl">易经文化 - 开发中</div>} />
      </Routes>

    </AuthContext.Provider>
  );
}
