'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Anonis from "./Anonis"
import YoshlarAgentligi from "./YoshlarAgentligi";
import axios from "axios";

function CoursesItem({
                         id, title, price, newPrice, section, level, levelIcon, language, category, rating, image, authorName, onClick
                     }: {
    id: number, title: string, price: number, newPrice: number, section: number, level: string, language: string, category: string, rating: number, image: string, authorName: string, levelIcon: string, onClick?: () => void
}) {
    const [liked, setLiked] = useState(false);

    return (
        <div onClick={onClick} className="bg-[#1A1D1F] flex gap-4 rounded-[12px] p-4 border border-[#1F272A] hover:border-[#1498F3] cursor-pointer transition-colors">
            <div className="relative w-[185px] min-w-[185px] h-[141px] rounded-[8px] overflow-hidden bg-[#222]">
                <img src={`${process.env.NEXT_PUBLIC_API_URL}/${image}`} className="w-full h-full object-cover" alt="" />
                <div className="absolute top-2 left-2 flex items-center bg-[#0B141899] border border-[#F7F9FA29] py-1.5 px-2 gap-1.5 rounded-[6px]">
                    <img src="/Star 1.svg" alt="" className="w-3 h-3" />
                    <p className="text-[#F7F9FA] font-[500] font-poppins text-[12px]">{rating}</p>
                </div>
                <div className="absolute bottom-2 left-2 flex items-center bg-[#1A1D1F] border border-[#F7F9FA29] py-1 px-2 rounded-[6px]">
                    <p className="text-[#F7F9FA] font-[500] font-poppins text-[11px]">{language}</p>
                </div>
            </div>

            <div className="flex flex-col justify-between flex-grow min-w-0">
                <div>
                    <h3 className="font-poppins font-[700] text-[18px] text-[#F7F9FA] hover:text-[#1498F3] transition-colors line-clamp-1">{title}</h3>
                    <p className="text-[#F7F9FA99] font-poppins text-[12px] mt-0.5">{authorName}</p>
                    <div className="flex flex-col mt-1">
                        {Number(price) > 0 && Number(newPrice) > 0 && Number(price) !== Number(newPrice) && (
                            <p className="text-[#F7F9FAA3] font-poppins text-[12px] line-through decoration-[#DC2D2DCC]">
                                {Number(price).toLocaleString()} uzs
                            </p>
                        )}
                        {Number(newPrice) > 0 ? (
                            <p className="text-[#82CC27] text-[15px] font-[700] font-poppins">{Number(newPrice).toLocaleString()} uzs</p>
                        ) : Number(price) > 0 ? (
                            <p className="text-[#82CC27] text-[15px] font-[700] font-poppins">{Number(price).toLocaleString()} uzs</p>
                        ) : (
                            <p className="text-[#82CC27] text-[15px] font-[700] font-poppins">Bepul kurs</p>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                        <img src={`${process.env.NEXT_PUBLIC_API_URL}/${levelIcon}`} className="w-4 h-4 opacity-60" alt="" />
                        <p className="text-[#F7F9FA99] font-[400] font-poppins text-[12px]">{level}</p>
                    </div>
                    <div className="h-[12px] w-[1px] bg-[#F7F9FA29]"></div>
                    <div className="flex items-center gap-1.5">
                        <img src="/Group 427318394.svg" className="w-4 h-4 opacity-60" alt="" />
                        <p className="text-[#F7F9FA99] font-[400] font-poppins text-[12px]">{section || 0} ta bo'lim</p>
                    </div>
                    <div className="h-[12px] w-[1px] bg-[#F7F9FA29]"></div>
                    <div className="flex items-center gap-1.5">
                        <img src="/Group 427318468.svg" className="w-4 h-4 opacity-60" alt="" />
                        <p className="text-[#F7F9FA99] font-[400] font-poppins text-[12px]">{category}</p>
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
                        className="w-[28px] h-[28px] flex items-center justify-center hover:scale-110 transition-transform ml-auto cursor-pointer"
                    >
                        <img src={liked ? "/Vector heart liked.svg" : "/Vector copy.svg"} className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity" alt="wishlist" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function Courses() {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const [courses, setCourses] = useState<any[]>([])
    const [allCourses, setAllCourses] = useState<any[]>([])
    const [difficulties, setDifficulties] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [languages, setLanguages] = useState<any[]>([])
    const [authors, setAuthors] = useState<any[]>([])
    const [search, setSearch] = useState("")
    const [difficultyId, setDifficultyId] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [languageId, setLanguageId] = useState("")
    const [rating, setRating] = useState("")

    useEffect(() => {
        async function init() {
            try {
                const [catRes, langRes, diffRes, authRes, courseRes] = await Promise.all([
                    axios.get(`${apiUrl}/public/course-categories/list`, { params: { size: 1000 } }),
                    axios.get(`${apiUrl}/public/languages/list`, { params: { size: 1000 } }),
                    axios.get(`${apiUrl}/public/difficulties/list`, { params: { size: 1000 } }),
                    axios.get(`${apiUrl}/public/authors`),
                    axios.get(`${apiUrl}/public/courses/list`, { params: { size: 1000 } })
                ]);
                setCategories(catRes.data?.data ?? catRes.data);
                setLanguages(langRes.data?.data ?? langRes.data);
                setDifficulties(diffRes.data?.data ?? diffRes.data);
                setAuthors(authRes.data?.data ?? authRes.data);
                setAllCourses(courseRes.data?.data ?? courseRes.data);
                setCourses(courseRes.data?.data ?? courseRes.data);
            } catch (err) {
                console.error("Failed to fetch data:", err);
            }
        }
        init();
    }, []);

    useEffect(() => {
        let result = [...allCourses];

        if (search) {
            const q = search.toLowerCase();
            result = result.filter((c: any) =>
                c.title?.toLowerCase().includes(q) ||
                c.authorId?.fullName?.toLowerCase().includes(q) ||
                c.categoryId?.title?.toLowerCase().includes(q)
            );
        }
        if (difficultyId) {
            const did = Number(difficultyId);
            result = result.filter((c: any) => c.difficultyId === did);
        }
        if (categoryId) {
            const cid = Number(categoryId);
            result = result.filter((c: any) => c.categoryId === cid);
        }
        if (languageId) {
            const lid = Number(languageId);
            result = result.filter((c: any) => c.languageId === lid);
        }
        if (rating) {
            const r = Number(rating);
            result = result.filter((c: any) => (c.rating || 0) >= r);
        }

        setCourses(result);
    }, [search, difficultyId, categoryId, languageId, rating, allCourses]);

    return (
        <div className="px-4 md:px-8 lg:px-12">
            <div className="flex gap-6">
                <div className="w-[334px] shrink-0">
                    <div className="w-full h-[80px] bg-[#1A1D1F] flex justify-center items-center gap-3 border border-[#1F272A] rounded-[16px] text-[#F7F9FA] text-[28px] font-bold mb-6">
                        <img src="/graduation-cap.3 1.svg" alt="" className="w-8 h-8" />
                        <p className="font-poppins">Kurslar</p>
                    </div>

                    <div className="w-full bg-[#1A1D1F] border border-[#1F272A] rounded-[16px] p-6 font-poppins">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-[#F7F9FA] text-[20px] font-bold">Filter</h2>
                            <button onClick={() => {
                                setDifficultyId("")
                                setCategoryId("")
                                setLanguageId("")
                                setRating("")
                                setSearch("")
                            }} className="text-[#1498F3] text-[14px] hover:underline cursor-pointer">Tozalash</button>
                        </div>

                        <div className="flex flex-col gap-5">
                            <div>
                                <p className="text-[#9DA1A3] text-[12px] font-bold tracking-wider mb-2 uppercase">Darajani tanlang:</p>
                                <div className="relative">
                                    <select value={difficultyId} onChange={(e) => setDifficultyId(e.target.value)} className="w-full bg-[#15181A] border border-[#1F272A] text-[#F7F9FA] p-3 rounded-[8px] appearance-none outline-none cursor-pointer text-[14px]">
                                        <option value="">Barchasi</option>
                                        {difficulties.map((diff: any) => (
                                            <option key={diff.id} value={diff.id}>{diff.title}</option>
                                        ))}
                                    </select>
                                    <img src="/chevron-down.svg" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 pointer-events-none" alt="" />
                                </div>
                            </div>

                            <div>
                                <p className="text-[#9DA1A3] text-[12px] font-bold tracking-wider mb-2 uppercase">Kategoriya:</p>
                                <div className="relative">
                                    <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full bg-[#15181A] border border-[#1F272A] text-[#F7F9FA] p-3 rounded-[8px] appearance-none outline-none cursor-pointer text-[14px]">
                                        <option value="">Barchasi</option>
                                        {categories.map((cat: any) => (
                                            <option key={cat.id} value={cat.id}>{cat.title}</option>
                                        ))}
                                    </select>
                                    <img src="/chevron-down.svg" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 pointer-events-none" alt="" />
                                </div>
                            </div>

                            <div>
                                <p className="text-[#9DA1A3] text-[12px] font-bold tracking-wider mb-2 uppercase">Darslik tili:</p>
                                <div className="relative">
                                    <select value={languageId} onChange={(e) => setLanguageId(e.target.value)} className="w-full bg-[#15181A] border border-[#1F272A] text-[#F7F9FA] p-3 rounded-[8px] appearance-none outline-none cursor-pointer text-[14px]">
                                        <option value="">Barchasi</option>
                                        {languages.map((lang: any) => (
                                            <option key={lang.id} value={lang.id}>{lang.title}</option>
                                        ))}
                                    </select>
                                    <img src="/chevron-down.svg" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 pointer-events-none" alt="" />
                                </div>
                            </div>

                            <div>
                                <p className="text-[#9DA1A3] text-[12px] font-bold tracking-wider mb-2 uppercase">Reyting:</p>
                                <div className="flex gap-2 p-2 bg-[#15181A] border border-[#1F272A] rounded-[8px] justify-around">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg
                                            key={star}
                                            onClick={() => setRating(rating === String(star) ? "" : String(star))}
                                            className="w-6 h-6 cursor-pointer transition-colors"
                                            viewBox="0 0 24 24"
                                            fill={star <= Number(rating || 0) ? "#FFB800" : "#2A2E30"}
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 flex-grow">
                    <div className="relative">
                        <img src="/search-outline 1.svg" alt="" className="absolute top-1/2 left-3 -translate-y-1/2 w-4 h-4" />
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Izlash"
                            className="w-full bg-[#1A1D1F] border border-[#1F272A] rounded-[8px] p-3 pl-[40px] text-[14px] font-poppins text-[#F7F9FA] outline-none focus:border-[#1498F3] transition-colors"
                        />
                    </div>

                    {courses.map((item: any, index: number) => {
                        const courseId = item.id ?? (index + 1);
                        return (
                            <CoursesItem
                                key={courseId}
                                id={courseId}
                                title={item.title}
                                price={item.price}
                                newPrice={item.newPrice}
                                section={item.sectionCount}
                                level={difficulties.find((d: any) => d.id === item.difficultyId)?.title || ""}
                                levelIcon={difficulties.find((d: any) => d.id === item.difficultyId)?.icon || ""}
                                language={languages.find((l: any) => l.id === item.languageId)?.code || ""}
                                category={categories.find((c: any) => c.id === item.categoryId)?.title || ""}
                                rating={item.rating || 0}
                                image={item.image}
                                authorName={authors.find((a: any) => a.id === item.authorId)?.fullName || ""}
                                onClick={() => router.push(`/courses/${courseId}`)}
                            />
                        );
                    })}

                    {courses.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 bg-[#1A1D1F] border border-[#1F272A] rounded-[12px]">
                            <img src="/notfoundcourse.svg" alt="" className="w-[200px] h-auto" />
                        </div>
                    )}

                    <button className="bg-[#1A1D1F] w-[200px] mx-auto border border-[#1F272A] text-[#F7F9FA] px-10 py-2.5 rounded-[8px] font-poppins text-[14px] font-medium hover:bg-[#262A2D] transition-colors cursor-pointer mt-2">
                        Ko'proq
                    </button>
                </div>

                <div className="w-[326px] shrink-0 flex flex-col gap-5">
                    <Anonis />
                    <YoshlarAgentligi />
                </div>
            </div>
        </div>
    )
}