'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8888';

interface NewsItemData {
    id: number;
    date: string;
    title: string;
    content: string;
    image: string;
}

function formatDate(date?: string) {
    if (!date) return "";
    try {
        return new Date(date).toLocaleDateString("uz-UZ", { day: "2-digit", month: "long", year: "numeric" });
    } catch {
        return date;
    }
}

export default function HomeNews() {
    const router = useRouter();
    const [news, setNews] = useState<NewsItemData[]>([]);

    useEffect(() => {
        async function getNews() {
            try {
                const res = await axios.get(`${apiUrl}/public/news`, { params: { size: 4 } });
                const data = res.data?.data ?? res.data;
                setNews(Array.isArray(data) ? data : []);
            } catch (err) {
                setNews([]);
            }
        }
        getNews();
    }, []);

    return (
        <div className="bg-[#1A1D1F] border border-[#1F272A] rounded-[12px] p-4 font-poppins">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-[#F7F9FA] text-[18px] font-bold">Yangiliklar</h2>
                <button
                    onClick={() => router.push("/news")}
                    className="text-[#1498F3] text-[13px] font-medium flex items-center gap-1 cursor-pointer hover:underline"
                >
                    Barchasi
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {news.map((item, idx) => (
                    <div key={item.id}>
                        <div
                            onClick={() => router.push(`/news/${item.id}`)}
                            className="flex gap-4 cursor-pointer group"
                        >
                            <img
                                src={`${apiUrl}/${item.image}`}
                                alt={item.title}
                                className="w-[110px] h-[80px] object-cover rounded-[8px] shrink-0"
                            />
                            <div className="min-w-0">
                                <p className="text-[11px] text-[#F7F9FA66] mb-1">{formatDate(item.date)}</p>
                                <h3 className="text-[#F7F9FA] text-[14px] font-semibold line-clamp-1 group-hover:text-[#1C92E0] transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-[#9DA1A3] text-[12px] line-clamp-2 mt-1">{item.content}</p>
                            </div>
                        </div>
                        {idx < news.length - 1 && <div className="w-full h-[1px] bg-[#1F272A] mt-4" />}
                    </div>
                ))}

                {news.length === 0 && (
                    <p className="text-[#9DA1A3] text-[13px] py-6 text-center">Yangiliklar topilmadi</p>
                )}
            </div>

            {news.length > 0 && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => router.push("/news")}
                        className="bg-[#15181A] border border-[#1F272A] text-[#F7F9FA] px-10 py-2 rounded-[8px] font-poppins text-[14px] font-medium hover:bg-[#262A2D] transition-colors cursor-pointer"
                    >
                        Ko'proq
                    </button>
                </div>
            )}
        </div>
    );
}
