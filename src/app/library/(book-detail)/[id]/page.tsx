'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/src/components/Nav";
import Anonis from "@/src/components/Anonis";
import TopBooks from "@/src/components/TopBooks";
import Footer from "@/src/components/Footer";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8888';

export default function BookDetail() {
    const router = useRouter();
    const { id } = useParams();
    const [book, setBook] = useState<any>(null);
    const [authors, setAuthors] = useState<any[]>([]);
    const [difficulties, setDifficulties] = useState<any[]>([]);
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(true);

    const formatPrice = (num: number) => {
        const n = Number(num);
        if (isNaN(n)) return "0.00 UZS";
        return n.toFixed(2) + " UZS";
    };

    useEffect(() => {
        if (!id) return;
        async function init() {
            try {
                setLoading(true);
                const authRes = await axios.get(`${apiUrl}/public/author`);
                setAuthors(authRes.data);

                const diffRes = await axios.get(`${apiUrl}/public/difficulty`);
                setDifficulties(diffRes.data);

                const { data: bookData } = await axios.get(`${apiUrl}/public/book/${id}`);
                setBook(bookData);
                setLiked(bookData.isLike);
            } catch (err) {
                console.error("Failed to fetch book:", err);
            } finally {
                setLoading(false);
            }
        }
        init();
    }, [id]);

    const authorName = book ? authors.find((a: any) => a.id === book.authorId)?.fullName || "" : "";
    const diff = book ? difficulties.find((d: any) => d.id === book.difficultyId) : null;

    if (loading) return (
        <>
            <Navbar />
            <div className="px-4 md:px-8 lg:px-12 py-20 text-center text-[#F7F9FA] font-poppins">Yuklanmoqda...</div>
        </>
    );

    if (!book) return (
        <>
            <Navbar />
            <div className="px-4 md:px-8 lg:px-12 py-20 text-center">
                <p className="text-[#F7F9FA] mb-4 font-poppins">Kitob topilmadi.</p>
                <button onClick={() => router.push("/library")} className="text-[#1498F3] text-[14px] cursor-pointer font-poppins">Barcha kitoblar</button>
            </div>
        </>
    );

    return (
        <>
            <Navbar />
            <div className="px-4 md:px-8 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    <div className="w-full lg:flex-grow flex flex-col gap-6">
                        <article className="bg-[#1A1D1F] border border-[#1F272A] rounded-[12px] p-5 md:p-8">
                            <div className="flex flex-col sm:flex-row gap-6 items-start">
                                <div className="relative w-[180px] min-w-[180px] h-[240px] rounded-[12px] overflow-hidden bg-[#222]">
                                    <img src={`${apiUrl}/${book.image}`} alt={book.title} className="w-full h-full object-cover" />
                                </div>

                                <div className="flex flex-col justify-between flex-grow">
                                    <div>
                                        <h1 className="text-[#F7F9FA] font-poppins font-bold text-[28px] leading-[130%] mb-4">{book.title}</h1>

                                        <div className="flex items-center gap-3 mb-5">
                                            <div className="flex items-center gap-2">
                                                <img src="/cash-outline 1.svg" alt="" className="w-5 h-5" />
                                                <span className="text-[#F7F9FA] font-poppins text-[20px] font-bold">
                                                    {(!Number(book.newPrice) && !Number(book.price)) ? "Bepul" : formatPrice(book.newPrice || book.price)}
                                                </span>
                                            </div>
                                            {Number(book.price) > 0 && Number(book.newPrice) > 0 && Number(book.price) !== Number(book.newPrice) && (
                                                <span className="text-[#F7F9FA66] font-poppins text-[14px] line-through decoration-[#DC2D2DCC]">{formatPrice(book.price)}</span>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-4 border border-[#1F272A] mb-5">
                                            <div className="flex flex-col justify-center px-4 py-3 border-r border-[#1F272A]">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <img src={diff?.icon ? `${apiUrl}/${diff.icon}` : "/Frame 36446.svg"} alt="" className="w-3.5 h-3.5 opacity-40" />
                                                    <p className="text-[#9DA1A3] text-[11px] font-poppins leading-none">Daraja</p>
                                                </div>
                                                <p className="text-[#F7F9FA] text-[13px] font-poppins font-medium leading-none">{diff?.title || "—"}</p>
                                            </div>
                                            <div className="flex flex-col justify-center px-4 py-3 border-r border-[#1F272A]">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <img src="/Vector (1).svg" alt="" className="w-3.5 h-3.5 opacity-40" />
                                                    <p className="text-[#9DA1A3] text-[11px] font-poppins leading-none">Muallif</p>
                                                </div>
                                                <p className="text-[#F7F9FA] text-[13px] font-poppins font-medium leading-none">{authorName || "—"}</p>
                                            </div>
                                            <div className="flex flex-col justify-center px-4 py-3 border-r border-[#1F272A]">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <img src="/book-page-count.svg" alt="" className="w-3.5 h-3.5 opacity-40" />
                                                    <p className="text-[#9DA1A3] text-[11px] font-poppins leading-none">Sahifa soni</p>
                                                </div>
                                                <p className="text-[#F7F9FA] text-[13px] font-poppins font-medium leading-none">{book.pages || "—"}</p>
                                            </div>
                                            <div className="flex flex-col justify-center px-4 py-3">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <img src="/person-circle-outline 2.svg" alt="" className="w-3.5 h-3.5 opacity-40" />
                                                    <p className="text-[#9DA1A3] text-[11px] font-poppins leading-none">Chop etilgan sana</p>
                                                </div>
                                                <p className="text-[#F7F9FA] text-[13px] font-poppins font-medium leading-none">{book.pubDate || "—"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button className="flex items-center gap-2 bg-[#1498F3] hover:bg-[#1178C2] transition-colors text-white text-[14px] font-[500] font-poppins py-2.5 px-6 rounded-[8px] cursor-pointer">
                                            <img src="/card.svg" alt="" className="brightness-0 invert" />
                                            Savatchaga
                                        </button>
                                        <button onClick={() => setLiked(!liked)} className="w-[42px] h-[42px] flex items-center justify-center border border-[#1F272A] rounded-[8px] hover:border-[#1498F3] transition-all cursor-pointer">
                                            <img src={liked ? "/Vector heart liked.svg" : "/Vector copy.svg"} className="w-5 h-5" alt="" />
                                        </button>
                                        <button className="w-[42px] h-[42px] flex items-center justify-center border border-[#1F272A] rounded-[8px] hover:border-[#1498F3] transition-all cursor-pointer">
                                            <img src="/share.svg" alt="" className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {book.description && (
                                <div className="mt-6">
                                    <h2 className="text-[#F7F9FA] font-poppins font-bold text-[22px] mb-4">Kitob haqida</h2>
                                    <p className="text-[#9DA1A3] font-poppins text-[16px] leading-[140%]">{book.description}</p>
                                </div>
                            )}
                        </article>
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