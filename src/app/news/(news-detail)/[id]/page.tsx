'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/src/components/Nav";
import Anonis from "@/src/components/Anonis";
import TopBooks from "@/src/components/TopBooks";
import Footer from "@/src/components/Footer";

interface NewsItemData {
    id: number;
    date: string;
    title: string;
    content: string;
    image: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8888';

function formatDate(dateStr: string): string {
    try {
        const d = new Date(dateStr);
        const months = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"];
        const day = d.getDate();
        const month = months[d.getMonth()];
        const year = d.getFullYear();
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        return `${day} ${month}, ${year} • ${hours}:${minutes}`;
    } catch {
        return dateStr;
    }
}

export default function NewsDetail() {
    const router = useRouter();
    const { id } = useParams();
    const [news, setNews] = useState<NewsItemData | null>(null);
    const [similar, setSimilar] = useState<NewsItemData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`${apiUrl}/public/news`);
                const all: NewsItemData[] = data;
                const found = all.find((n) => n.id === Number(id));
                if (found) {
                    setNews(found);
                    setSimilar(all.filter((n) => n.id !== Number(id)).slice(0, 3));
                }
            } catch (err) {
                console.error("Failed to fetch news detail:", err);
                setNews(null);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    if (loading) return (
        <div className="container py-20 text-center text-[#F7F9FA]">Yuklanmoqda...</div>
    );
    if (!news) return (
        <div className="container py-20 text-center">
            <p className="text-[#F7F9FA] mb-4">Yangilik topilmadi.</p>
            <button onClick={() => router.push("/news")} className="text-[#1498F3] text-[14px] cursor-pointer">Barcha yangiliklar</button>
        </div>
    );

    return (
        <>
            <Navbar selectedNewsTitle={news.title} onBack={() => router.push("/news")} />
            <div className="px-4 md:px-8 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    <div className="w-full lg:flex-grow">
                        <article className="bg-[#1A1D1F] border border-[#1F272A] rounded-[12px] p-5 md:p-8">
                            <h1 className="text-[#F7F9FA] font-poppins font-bold text-[28px] leading-[100%] mb-3">{news.title}</h1>
                            <p className="text-[#F7F9FA66] text-[14px] font-poppins mb-6">{formatDate(news.date)}</p>

                            <img src={`${apiUrl}/${news.image}`} alt={news.title} className="w-full rounded-[12px] mb-8 max-h-[420px] object-cover" />

                            {news.content && (
                                <div className="mt-2">
                                    {news.content.split('\n\n').map((para, idx) => (
                                        <p key={idx} className="text-[#9DA1A3] text-[15px] leading-[1.8] mb-5">{para}</p>
                                    ))}
                                </div>
                            )}

                            <div className="flex flex-wrap justify-between items-center gap-4 border-t border-b border-[#1F272A] py-4 mt-8">
                                <div className="flex items-center gap-4">
                                    {["/twitter.svg","/facebook 01.svg","/telegram.svg","/log-in.svg"].map((s) => (
                                        <button key={s} className="opacity-60 hover:opacity-100 cursor-pointer"><img src={s} alt="" className="h-[18px]" /></button>
                                    ))}
                                </div>
                                <div className="flex items-center gap-4 text-[#9DA1A3] text-[13px]">
                                    <button className="flex items-center gap-1.5 bg-[#0D0F10] border border-[#1F272A] hover:bg-[#262A2D] text-white px-3 py-1.5 rounded-[8px] text-[12px] cursor-pointer">
                                        <span>Ulashish</span>
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 10.742l4.628-2.2a3 3 0 11.83 1.666l-4.628 2.2a3 3 0 01-.83-1.666zM13.316 13.258l-4.628 2.2a3 3 0 10.83 1.666l4.628-2.2a3 3 0 00-.83-1.666z" /></svg>
                                    </button>
                                </div>
                            </div>
                        </article>

                        {similar.length > 0 && (
                            <div className="mt-8">
                                <div className="flex justify-between items-center mb-5">
                                    <h2 className="text-[18px] font-bold font-poppins text-[#FCFCFC]">O'xshash yangiliklar</h2>
                                    <button onClick={() => router.push("/news")} className="text-[#9DA1A3] hover:text-white text-[13px] flex items-center gap-1 cursor-pointer">
                                        Barcha yangiliklar
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    {similar.map((item) => (
                                        <div key={item.id} onClick={() => router.push(`/news/${item.id}`)} className="bg-[#1A1D1F] border border-[#1F272A] rounded-[10px] p-4 cursor-pointer hover:border-[#1C92E0] transition-all">
                                            <img src={`${apiUrl}/${item.image}`} alt="" className="w-full h-[120px] object-cover rounded-[6px] mb-3" />
                                            <p className="text-[12px] text-[#F7F9FA66] mb-2 font-poppins">{formatDate(item.date)}</p>
                                            <h3 className="text-[#F7F9FA] text-[13px] font-semibold font-poppins line-clamp-2 mb-2">{item.title}</h3>
                                            <p className="text-[#9DA1A3] text-[12px] line-clamp-2">{item.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <aside className="w-full lg:w-[326px] shrink-0 flex flex-col gap-6">
                        <Anonis />
                        <TopBooks />
                    </aside>
                </div>
            </div>
            <Footer />
        </>
    );
}