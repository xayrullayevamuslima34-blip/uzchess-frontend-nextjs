'use client';
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface NavbarProps {
    selectedNewsTitle?: string;
    onBack?: () => void;
}

export default function Navbar({ selectedNewsTitle, onBack }: NavbarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState("O'zbekcha");

    const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

    const languages = [
        { label: "O'zbekcha", code: "uz" },
        { label: "Ўзбекча", code: "uz_cyr" },
        { label: "Русский", code: "ru" }
    ];

    const navigate = (path: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        router.push(path);
    };

    return <header className="mb-8 px-4 md:px-8 lg:px-12">
        <nav className="w-full bg-[#1A1D1F] border-[#1F272A] border-[1px] flex justify-between items-center h-[56px] px-5 rounded-[12px] mt-4 relative">
            <div className="flex items-center gap-3 text-[#F7F9FA] font-poppins">
                <a href="/" onClick={navigate("/")}><img src="/Frame 427318621.svg" alt="UzChess" className="h-6" /></a>

                <div className="h-[20px] border-l border-[#3D4549]"></div>

                <div className="relative">
                    <button
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        className="flex items-center gap-1 cursor-pointer text-[13px] font-medium hover:text-white transition-colors"
                    >
                        {selectedLang}
                        <svg
                            className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isLangOpen && (
                        <div className="absolute top-[40px] left-0 w-[160px] bg-[#1A1D1F] border border-[#1F272A] rounded-xl overflow-hidden z-50 shadow-2xl">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setSelectedLang(lang.label);
                                        setIsLangOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-[13px] transition-colors hover:bg-[#262A2D] ${
                                        selectedLang === lang.label ? 'text-[#1C92E0] bg-[#262A2D]' : 'text-[#9DA1A3]'
                                    }`}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="hidden md:flex items-center text-[#F7F9FA] text-[14px] font-medium font-poppins">
                <ul className="flex items-center gap-7">
                    <li>
                        <a href="/" onClick={navigate("/")} className={`hover:border-b-2 hover:border-[#1498F3] pb-1 transition-all ${pathname === "/" ? "text-[#1498F3] border-b-2 border-[#1498F3]" : ""}`}>Asosiy</a>
                    </li>
                    <li>
                        <a href="/news" onClick={navigate("/news")} className={`hover:border-b-2 hover:border-[#1498F3] pb-1 transition-all ${isActive("/news") ? "text-[#1498F3] border-b-2 border-[#1498F3]" : ""}`}>Yangiliklar</a>
                    </li>
                    <li>
                        <a href="/courses" onClick={navigate("/courses")} className={`hover:border-b-2 hover:border-[#1498F3] pb-1 transition-all ${isActive("/courses") ? "text-[#1498F3] border-b-2 border-[#1498F3]" : ""}`}>Kurslar</a>
                    </li>
                    <li>
                        <a href="/library" onClick={navigate("/library")} className={`hover:border-b-2 hover:border-[#1498F3] pb-1 transition-all ${isActive("/library") ? "text-[#1498F3] border-b-2 border-[#1498F3]" : ""}`}>Kutubxona</a>
                    </li>
                    <li>
                        <a href="/about" onClick={navigate("/about")} className={`hover:border-b-2 hover:border-[#1498F3] pb-1 transition-all ${isActive("/about") ? "text-[#1498F3] border-b-2 border-[#1498F3]" : ""}`}>Bog'lanish</a>
                    </li>
                </ul>
            </div>

            <div className="flex justify-center gap-3 items-center">
                <div className="flex items-center gap-3">
                    <a href="#"><img className="h-[18px]" src="/search-outline 2.svg" alt="" /></a>
                    <a href="#"><img className="h-[18px]" src="/Component 1.svg" alt="" /></a>
                    <a href="#"><img className="h-[18px]" src="/notifications-outline 1.svg" alt="" /></a>
                </div>
                <div className="h-[18px] border-l border-[#3D4549]"></div>
                <button className="flex gap-1 bg-[#1C92E0] text-[13px] text-white rounded-[4px] py-1.5 px-4 items-center h-[32px] cursor-pointer hover:bg-[#1676b5] transition-colors">
                    Kirish <img src="/log-in.svg" alt="" className="w-4 h-4" />
                </button>
            </div>
        </nav>

        <div className="flex items-center gap-1.5 text-[#F7F9FA] text-[12px] font-[500] font-poppins mt-3 ml-1">
            <img src="/home 1.svg" alt="" className="h-3.5" />
            <p className="text-[#6D7274] font-[500] font-poppins text-[12px] cursor-pointer hover:text-white transition-colors" onClick={navigate("/")}>Asosiy</p>
            {pathname !== "/" && (
                <>
                    <img src="/Frame 427318565.svg" alt="" className="h-3" />
                    <p className={`font-[500] font-poppins text-[12px] cursor-pointer hover:text-white transition-colors ${selectedNewsTitle ? 'text-[#6D7274]' : 'text-[#fff]'}`}
                       onClick={selectedNewsTitle && onBack ? (e) => { e.preventDefault(); onBack(); } : undefined}>
                        {selectedNewsTitle || (pathname === "/news" ? "Yangiliklar" : pathname === "/courses" ? "Kurslar" : pathname === "/library" ? "Kutubxona" : "")}
                    </p>
                </>
            )}
            {selectedNewsTitle && (
                <>
                    <img src="/Frame 427318565.svg" alt="" className="h-3" />
                    <p className="text-[#fff] font-[500] font-poppins text-[12px] truncate max-w-[200px] md:max-w-[400px]">{selectedNewsTitle}</p>
                </>
            )}
        </div>
    </header>
}