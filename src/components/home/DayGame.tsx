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

export default function DayGame() {
    const router = useRouter();
    const [match, setMatch] = useState<any>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getMatch() {
            try {
                const res = await axios.get(`${apiUrl}/public/matches/list`, { params: { size: 1 } });
                const data = res.data?.data ?? res.data;
                setMatch(Array.isArray(data) ? data[0] : null);
            } catch (err) {
                setError(true);
            }
        }
        getMatch();
    }, []);

    return (
        <div className="w-full bg-[#1A1D1F] border border-[#1F272A] rounded-[16px] p-4 font-poppins">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-[#F7F9FA] text-[16px] font-bold">Kun o'yini</h2>
                <button
                    onClick={() => router.push("/chess")}
                    className="text-[#1498F3] text-[13px] font-medium flex items-center gap-1 cursor-pointer hover:underline"
                >
                    Ko'rish
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            <div
                onClick={() => match && router.push(`/chess/${match.id}`)}
                className="relative w-full h-[183px] rounded-[10px] bg-[#0B141A] border border-[#1F272A] overflow-hidden cursor-pointer group"
            >
                <img src="/Board.svg" alt="" className="absolute inset-0 w-full h-full object-cover" />

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-[#1A1D1FCC] border border-[#F7F9FA40] flex items-center justify-center group-hover:bg-[#1498F3] transition-colors">
                        <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>

                {match && (
                    <span
                        className="absolute top-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded-[4px] bg-[#0B1418CC] flex items-center gap-1"
                        style={{ color: typeColor[match.type] || "#9DA1A3" }}
                    >
                        {typeLabel[match.type] || match.type}
                    </span>
                )}
                <span className="absolute bottom-2 left-2 text-[11px] text-[#F7F9FA] bg-[#0B1418CC] px-1.5 py-0.5 rounded-[4px]">
                    5:30
                </span>

                <div className="absolute bottom-0 left-0 right-0 bg-[#0B1418CC] backdrop-blur-sm flex items-center justify-between px-3 py-2">
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-full bg-[#82CC27] flex items-center justify-center shrink-0">
                            <img src="/ic-thumb-up.svg" alt="" className="w-3 h-3" />
                        </div>
                        <p className="text-[#F7F9FA] font-poppins text-[12px] font-medium truncate">
                            {match?.fPlayer?.fullName || (error ? "Tizimga kiring" : "Yuklanmoqda...")}
                        </p>
                    </div>

                    {match && (
                        <>
                            <img src="/fighting-game_2.svg" alt="vs" className="w-6 h-6 shrink-0 mx-1" />
                            <div className="flex items-center gap-2 min-w-0">
                                <p className="text-[#F7F9FA] font-poppins text-[12px] font-medium truncate">
                                    {match.sPlayer?.fullName}
                                </p>
                                <div className="w-6 h-6 rounded-full bg-[#DC2D2D] flex items-center justify-center shrink-0">
                                    <img src="/ic-thumb-down.svg" alt="" className="w-3 h-3" />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
