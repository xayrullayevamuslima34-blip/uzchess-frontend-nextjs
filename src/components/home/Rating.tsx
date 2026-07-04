'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8888';

export default function Rating() {
    const router = useRouter();
    const [players, setPlayers] = useState<any[]>([]);

    useEffect(() => {
        async function getPlayers() {
            try {
                const res = await axios.get(`${apiUrl}/players/list`, { params: { size: 5 } });
                const data = res.data?.data ?? res.data;
                const list = Array.isArray(data) ? [...data] : [];
                list.sort((a, b) => (b.classic || 0) - (a.classic || 0));
                setPlayers(list.slice(0, 5));
            } catch (err) {
                setPlayers([]);
            }
        }
        getPlayers();
    }, []);

    return (
        <div className="w-full bg-[#1A1D1F] border border-[#1F272A] rounded-[16px] p-4 font-poppins">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-[#F7F9FA] text-[16px] font-bold">Reyting</h2>
                <button
                    onClick={() => router.push("/chess/ranking")}
                    className="text-[#1498F3] text-[13px] font-medium flex items-center gap-1 cursor-pointer hover:underline"
                >
                    Barchasi
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            {players.length > 0 ? (
                <div className="flex flex-col gap-3">
                    {players.map((p, idx) => (
                        <div
                            key={p.id}
                            onClick={() => router.push(`/chess/players/${p.id}`)}
                            className="flex items-center justify-between cursor-pointer hover:opacity-80"
                        >
                            <div className="flex items-center gap-2 min-w-0">
                                {idx === 0 ? (
                                    <span className="text-[14px]">👑</span>
                                ) : (
                                    <span className="text-[#9DA1A3] text-[12px] w-4 text-center shrink-0">{idx + 1}.</span>
                                )}
                                {p.country?.flag && (
                                    <img src={`${apiUrl}/${p.country.flag}`} className="w-4 h-3 object-cover rounded-[2px]" alt="" />
                                )}
                                <p className="text-[#F7F9FA] font-poppins text-[13px] truncate">{p.fullName}</p>
                            </div>
                            <p className="text-[#F7F9FA] font-poppins text-[13px] font-semibold shrink-0">{p.classic ?? "-"}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-[#9DA1A3] text-[13px] font-poppins">Reyting yuklanmadi</p>
            )}
        </div>
    );
}
