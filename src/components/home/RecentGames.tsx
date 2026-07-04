'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8888';

const typeLabel: Record<string, string> = {
    classic: "Klassika",
    rapid: "Rapid",
    blitz: "Blitz",
};

const typeColor: Record<string, string> = {
    classic: "#82CC27",
    rapid: "#DC2D2D",
    blitz: "#FFB800",
};

function formatDate(date?: string) {
    if (!date) return "";
    try {
        return new Date(date).toLocaleDateString("uz-UZ", { day: "2-digit", month: "long", year: "numeric" });
    } catch {
        return date;
    }
}

export default function RecentGames() {
    const router = useRouter();
    const [matches, setMatches] = useState<any[]>([]);

    useEffect(() => {
        async function getMatches() {
            try {
                const res = await axios.get(`${apiUrl}/public/matches/list`, { params: { size: 5 } });
                const data = res.data?.data ?? res.data;
                setMatches(Array.isArray(data) ? data : []);
            } catch (err) {
                setMatches([]);
            }
        }
        getMatches();
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <button
                    onClick={() => router.push("/courses")}
                    className="flex-1 flex items-center justify-center gap-3 h-[64px] bg-[#1A1D1F] border border-[#1F272A] hover:border-[#1498F3] rounded-[12px] text-[#F7F9FA] font-poppins font-bold text-[18px] transition-colors cursor-pointer"
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#1498F3" strokeWidth="1.6">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" strokeLinejoin="round" />
                        <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" strokeLinejoin="round" />
                    </svg>
                    Kurslar
                </button>
                <button
                    onClick={() => router.push("/library")}
                    className="flex-1 flex items-center justify-center gap-3 h-[64px] bg-[#1A1D1F] border border-[#1F272A] hover:border-[#1498F3] rounded-[12px] text-[#F7F9FA] font-poppins font-bold text-[18px] transition-colors cursor-pointer"
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#1498F3" strokeWidth="1.6">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinejoin="round" />
                    </svg>
                    Kutubxona
                </button>
            </div>

            <div className="bg-[#1A1D1F] border border-[#1F272A] rounded-[12px] p-4 font-poppins">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-[#F7F9FA] text-[16px] font-bold">Yakunlangan o'yinlar</h2>
                    <button
                        onClick={() => router.push("/chess/games")}
                        className="text-[#1498F3] text-[13px] font-medium flex items-center gap-1 cursor-pointer hover:underline"
                    >
                        Barchasi
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {matches.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[#9DA1A3] text-[11px] uppercase tracking-wide">
                                    <th className="font-medium pb-2 pr-2">O'yinchilar</th>
                                    <th className="font-medium pb-2 pr-2">Natija</th>
                                    <th className="font-medium pb-2 pr-2">O'yin turi</th>
                                    <th className="font-medium pb-2 pr-2">Yurishlar</th>
                                    <th className="font-medium pb-2">Sana</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matches.map((m) => (
                                    <tr
                                        key={m.id}
                                        onClick={() => router.push(`/chess/${m.id}`)}
                                        className="border-t border-[#1F272A] cursor-pointer hover:bg-[#15181A] transition-colors"
                                    >
                                        <td className="py-2 pr-2">
                                            <p className="text-[#F7F9FA] text-[13px]">{m.fPlayer?.fullName}</p>
                                            <p className="text-[#F7F9FA] text-[13px]">{m.sPlayer?.fullName}</p>
                                        </td>
                                        <td className="py-2 pr-2">
                                            <p className="text-[#9DA1A3] text-[13px]">{m.firstPlayerResult}</p>
                                            <p className="text-[#9DA1A3] text-[13px]">{m.secondPlayerResult}</p>
                                        </td>
                                        <td className="py-2 pr-2">
                                            <span
                                                className="text-[13px] font-medium"
                                                style={{ color: typeColor[m.type] || "#9DA1A3" }}
                                            >
                                                {typeLabel[m.type] || m.type}
                                            </span>
                                        </td>
                                        <td className="py-2 pr-2 text-[#F7F9FA] text-[13px]">{m.moves}</td>
                                        <td className="py-2 text-[#9DA1A3] text-[13px] whitespace-nowrap">{formatDate(m.date)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-[#9DA1A3] text-[13px] font-poppins py-6 text-center">
                        O'yinlar topilmadi yoki ko'rish uchun tizimga kirish kerak.
                    </p>
                )}
            </div>

            <div className="relative w-full h-[110px] rounded-[12px] overflow-hidden bg-gradient-to-r from-[#0B4789] to-[#1C92E0] flex items-center justify-between px-6">
                <div>
                    <p className="text-[#FFFF00] font-poppins font-extrabold text-[20px] leading-tight">2022 CHESS.COM</p>
                    <p className="text-white font-poppins font-bold text-[15px] tracking-wide">GLOBAL CHAMPIONSHIP</p>
                </div>
                <button className="bg-[#0B141A] text-white font-poppins text-[14px] font-medium px-5 py-2 rounded-[8px] hover:bg-black transition-colors cursor-pointer shrink-0">
                    Ko'rish
                </button>
            </div>
        </div>
    );
}
