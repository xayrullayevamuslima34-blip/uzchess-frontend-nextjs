'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopBooks from "../../components/TopBooks";
import Anonis from "../../components/Anonis";
import Navbar from "../../components/Nav";
import Footer from "../../components/Footer";

interface NewsItemData {
    id: number;
    date: string;
    title: string;
    content: string;
    image: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8888';

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
            className="w-full bg-[#1A1D1F] rounded-[10px] p-3 border border-[#1F272A] hover:border-[#1C92E0] cursor-pointer transition-all duration-200 flex flex-col justify-between"
        >
            <div>
                <img
                    src={`${apiUrl}/${img}`}
                    alt={title}
                    className="w-full h-[150px] object-cover rounded-[6px] mb-3"
                />
                <p className="text-[11px] font-normal font-poppins text-[#F7F9FA66] mb-1.5">{date}</p>
                <h2 className="text-[#F7F9FA] text-[13px] font-semibold font-inter line-clamp-2 hover:text-[#1C92E0] transition-colors mb-1.5">
                    {title}
                </h2>
            </div>
            <p className="text-[#9DA1A3] text-[12px] font-medium font-inter line-clamp-2 mt-1.5">
                {desc}
            </p>
        </div>
    );
}

export default function News() {
    const router = useRouter();
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
        <>
            <Navbar />
            <div className="container flex flex-col lg:flex-row gap-6 items-start">

                <div className="w-full lg:flex-grow">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-3">
                            <h1 className="text-[22px] md:text-[26px] font-bold font-poppins"> Yangiliklar </h1>
                            <div className="relative w-full sm:w-auto">
                                <img
                                    src="/search-outline 1.svg"
                                    alt=""
                                    className="absolute top-1/2 left-2.5 -translate-y-1/2 w-4 h-4"
                                />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    type="search"
                                    placeholder="Izlash"
                                    className="w-full sm:w-[220px] border border-[#9DA1A3] rounded-[8px] p-1.5 pl-[32px] text-[13px] font-medium font-poppins text-[#F7F9FA] bg-transparent outline-none focus:border-[#1498F3] transition-colors"
                                />
                            </div>
                        </div>

                        {news.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                {news.map((item) => (
                                    <NewsItem
                                        key={item.id}
                                        date={item.date}
                                        title={item.title}
                                        desc={item.content}
                                        img={item.image}
                                        onClick={() => router.push(`/news/${item.id}`)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 bg-[#1A1D1F] border border-[#1F272A] rounded-[12px]">
                                <img src="/notfoundcourse.svg" alt="" className="w-[200px] h-auto" />
                            </div>
                        )}

                        {news.length > 0 && (
                            <div className="flex justify-center mt-2">
                                <button className="bg-[#1A1D1F] border border-[#1F272A] text-[#F7F9FA] px-10 py-2 rounded-[8px] font-poppins text-[14px] font-medium hover:bg-[#262A2D] transition-colors cursor-pointer">
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
            <Footer />
        </>
    );
}