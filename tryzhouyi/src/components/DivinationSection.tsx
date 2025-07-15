import { Link } from "react-router-dom";
import { divinationMethods } from "@/lib/mockData";

export default function DivinationSection() {
  return (
    <section className="py-12 bg-[#1A1A1A]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-[#9C6A4B] mb-8 text-center">
          快速占卜
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {divinationMethods.map((method) => (
            <Link
              key={method.id}
              to={{
                pathname: "/divination",
                search: `?method=${method.id}`
              }}
              className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="flex flex-col items-center text-center">
                <i className={`${method.icon} text-4xl text-[#9C6A4B] mb-4`}></i>
                <h3 className="text-xl font-serif font-bold text-white mb-2">
                  {method.name}
                </h3>
                <p className="text-gray-300">{method.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
