import axios from "axios";
import { useEffect, useState } from "react";
import TopBooks from "./TopBooks";
import Anonis from "./Anonis";

interface NewsItemData {
    id: number;
    date: string;
    title: string;
    content: string;
    image: string;
}

function NewsItem({
                      date,
                      title,
                      desc,
                      img,
                      onClick
                  }: {
    date: string;
    title: string;
    desc: string;
    img: string;
    onClick?: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className="max-w-[335px] w-full bg-[#1A1D1F] rounded-[12px] p-4 border border-[#1F272A] hover:border-[#1C92E0] cursor-pointer transition-all duration-200 flex flex-col justify-between"
        >
            <div>
                <img
                    src={`/${img}`}
                    alt={title}
                    className="w-full h-[180px] object-cover rounded-[8px] mb-4"
                />
                <p className="text-[12px] font-normal font-poppins text-[#F7F9FA66] mb-2">{date}</p>
                <h2 className="text-[#F7F9FA] text-[14px] font-semibold font-inter line-clamp-2 hover:text-[#1C92E0] transition-colors mb-2">
                    {title}
                </h2>
            </div>
            <p className="text-[#9DA1A3] text-[13px] font-medium font-inter line-clamp-2 mt-2">
                {desc}
            </p>
        </div>
    );
}

interface NewsProps {
    onNewsSelect?: (title: string, onBack: () => void) => void;
    onNewsDeselect?: () => void;
}

export default function News({ onNewsSelect, onNewsDeselect }: NewsProps) {
    const [news, setNews] = useState<NewsItemData[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function getAllNews() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/public/news?search=${search}`);
                setNews(response.data?.data ?? response.data);
            } catch (error) {
                console.error("Failed to fetch news:", error);
            }
        }
        getAllNews();
    }, [search]);

    return (
        <div className="container flex flex-col lg:flex-row gap-6 items-start">
            <div className="w-full lg:flex-grow">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
                        <h1 className="text-[28px] md:text-[32px] font-bold font-poppins">Yangiliklar</h1>
                        <div className="relative w-full sm:w-auto">
                            <img
                                src="/search-outline 1.svg"
                                alt=""
                                className="absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5"
                            />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                type="search"
                                placeholder="Izlash"
                                className="w-full sm:w-[260px] border border-[#9DA1A3] rounded-[8px] p-2 pl-[40px] text-[15px] font-medium font-poppins text-[#F7F9FA] bg-transparent outline-none focus:border-[#1498F3] transition-colors"
                            />
                        </div>
                    </div>

                    {news.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {news.map((item) => (
                                <NewsItem
                                    key={item.id}
                                    date={item.date}
                                    title={item.title}
                                    desc={item.content}
                                    img={item.image}
                                    onClick={() => onNewsSelect && onNewsSelect(item.title, () => {})}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-[#9DA1A3] font-medium font-inter">
                            Yangiliklar topilmadi.
                        </div>
                    )}

                    {news.length > 0 && (
                        <div className="flex justify-center mt-4">
                            <button className="bg-[#1A1D1F] border border-[#1F272A] text-[#F7F9FA] px-12 py-3 rounded-[8px] font-poppins text-[16px] font-medium hover:bg-[#262A2D] transition-colors cursor-pointer">
                                Ko'proq
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <aside className="w-full lg:w-[326px] shrink-0 flex flex-col gap-6">
                <Anonis />
                <TopBooks />
            </aside>
        </div>
    );
}