'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { IoChevronUp, IoWarning } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiShare2 } from "react-icons/fi";
import Anonis from "@/src/components/Anonis";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Nav";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8888';

export default function CourseDetail() {
    const router = useRouter();
    const { id } = useParams();
    const [course, setCourse] = useState<any>(null);
    const [authors, setAuthors] = useState<any[]>([]);
    const [difficulties, setDifficulties] = useState<any[]>([]);
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [openSections, setOpenSections] = useState([true, false, false]);
    const [openMenu, setOpenMenu] = useState<number | null>(null);

    const toggleSection = (idx: number) => {
        const newArr = [...openSections];
        newArr[idx] = !newArr[idx];
        setOpenSections(newArr);
    };

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

                const { data: courseData } = await axios.get(`${apiUrl}/public/courses/${id}`);
                setCourse(courseData);
                setLiked(courseData.isLike);
            } catch (err) {
                console.error("Failed to fetch course:", err);
            } finally {
                setLoading(false);
            }
        }
        init();
    }, [id]);

    const diff = course ? difficulties.find((d: any) => d.id === course.difficultyId) : null;

    if (loading) return (
        <>
            <Navbar />
            <div className="px-4 md:px-8 lg:px-12 py-20 text-center text-[#F7F9FA] font-poppins">Yuklanmoqda...</div>
        </>
    );

    if (!course) return (
        <>
            <Navbar />
            <div className="px-4 md:px-8 lg:px-12 py-20 text-center">
                <p className="text-[#F7F9FA] mb-4 font-poppins">Kurs topilmadi.</p>
                <button onClick={() => router.push("/courses")} className="text-[#1498F3] text-[14px] cursor-pointer font-poppins">Barcha kurslar</button>
            </div>
        </>
    );

    return (
        <>
            <Navbar />
            <div className="px-4 md:px-8 lg:px-12">
                <div className="flex flex-col">
                    <article className="relative border border-[#1F272A] rounded-[12px] p-5 md:p-8 overflow-hidden mb-6">
                        {course.image && (
                            <div className="absolute inset-0 z-0">
                                <img src={`${apiUrl}/${course.image}`} alt="" className="w-full h-full object-cover opacity-20" />
                                <div className="absolute inset-0 bg-[#1A1D1F]/80"></div>
                            </div>
                        )}
                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-2 flex-wrap gap-3">
                                <h1 className="text-[#F7F9FA] font-poppins font-bold text-[28px] leading-[130%]">{course.title}</h1>
                                <div className="flex items-center gap-2 shrink-0">
                                    <div className="flex items-center gap-0.5">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <FaStar key={s} className="w-4 h-4" color={s <= (course.rating || 0) ? "#FFB800" : "#2A2E30"} />
                                        ))}
                                    </div>
                                    <span className="text-[#F7F9FA] font-poppins text-[14px] font-medium">{course.rating || 0}</span>
                                    <span className="text-[#9DA1A3] font-poppins text-[13px]">({course.reviewCount || 0} ta izoh)</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <img src="/cash-outline 1.svg" alt="" className="w-5 h-5" />
                                <span className="text-[#F7F9FA] font-poppins text-[20px] font-bold">
                                    {(!Number(course.newPrice) && !Number(course.price)) ? "Bepul" : formatPrice(course.newPrice || course.price)}
                                </span>
                                {Number(course.price) > 0 && Number(course.newPrice) > 0 && Number(course.price) !== Number(course.newPrice) && (
                                    <span className="text-[#F7F9FA66] font-poppins text-[14px] line-through decoration-[#DC2D2DCC]">{formatPrice(course.price)}</span>
                                )}
                            </div>

                            <div className="flex items-center justify-between gap-4 flex-wrap">
                                <div className="flex items-center gap-4 flex-wrap">
                                    {diff && (
                                        <div className="flex items-center gap-1.5">
                                            <img src={diff.icon ? `${apiUrl}/${diff.icon}` : "/Frame 36446.svg"} alt="" className="w-4 h-4 opacity-50" />
                                            <p className="text-[#F7F9FA99] font-poppins text-[13px]">{diff.title}</p>
                                        </div>
                                    )}
                                    <div className="h-3 w-px bg-[#F7F9FA29]"></div>
                                    <div className="flex items-center gap-1.5">
                                        <img src="/Group 427318394.svg" alt="" className="w-4 h-4 opacity-50" />
                                        <p className="text-[#F7F9FA99] font-poppins text-[13px]">3 ta bo'lim</p>
                                    </div>
                                    <div className="h-3 w-px bg-[#F7F9FA29]"></div>
                                    <div className="flex items-center gap-1.5">
                                        <img src="/play 1.svg" alt="" className="w-4 h-4 opacity-50" />
                                        <p className="text-[#F7F9FA99] font-poppins text-[13px]">{course.lessonCount || 0} ta dars</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="flex items-center gap-2 bg-[#1498F3] hover:bg-[#1178C2] transition-colors text-white text-[14px] font-[500] font-poppins py-2.5 px-6 rounded-[8px] cursor-pointer">
                                        Kursni sotib olish
                                    </button>
                                    <button onClick={() => setLiked(!liked)} className="w-[42px] h-[42px] flex items-center justify-center border border-[#1F272A] rounded-[8px] hover:border-[#1498F3] transition-all cursor-pointer">
                                        <img src={liked ? "/Vector heart liked.svg" : "/Vector copy.svg"} className="w-5 h-5" alt="" />
                                    </button>
                                    <button className="w-[42px] h-[42px] flex items-center justify-center border border-[#1F272A] rounded-[8px] hover:border-[#1498F3] transition-all cursor-pointer">
                                        <FiShare2 className="w-5 h-5 text-[#F7F9FA]" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>

                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                        <div className="w-full lg:flex-grow flex flex-col">


                            <div className="bg-[#1A1D1F] border border-[#1F272A] rounded-[12px] overflow-hidden">
                                <div className="border-b border-[#1F272A]">
                                    <button onClick={() => toggleSection(0)} className="w-full flex items-center justify-between p-5 cursor-pointer">
                                        <h3 className="text-[#F7F9FA] font-poppins font-bold text-[20px] leading-none">1. Asosiy donalar</h3>
                                        <IoChevronUp className={`w-5 h-5 text-[#F7F9FA] transition-transform ${openSections[0] ? '' : 'rotate-180'}`} />
                                    </button>
                                    {openSections[0] && (
                                        <div className="px-5 pb-5 pt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" style={{background: "#F7F9FA08"}}>
                                            <div>
                                                <div className="relative w-full h-[120px] rounded-[8px] overflow-hidden bg-[#222]">
                                                    <img src="/notfoundcourse.svg" alt="" className="w-full h-full object-cover" />
                                                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-[#0B141899] py-1 px-2 rounded-[6px]">
                                                        <img src="/play 2.svg" alt="" className="w-3 h-3" />
                                                        <p className="text-[#F7F9FA] font-poppins text-[11px]">07:12</p>
                                                    </div>
                                                </div>
                                                <p className="text-[#F7F9FA] font-poppins font-medium text-[15px] leading-[130%] mt-2">1.1 Kirish</p>
                                            </div>
                                            <div>
                                                <div className="relative w-full h-[120px] rounded-[8px] overflow-hidden bg-[#222]">
                                                    <img src="/notfoundcourse.svg" alt="" className="w-full h-full object-cover" />
                                                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-[#0B141899] py-1 px-2 rounded-[6px]">
                                                        <img src="/play 2.svg" alt="" className="w-3 h-3" />
                                                        <p className="text-[#F7F9FA] font-poppins text-[11px]">08:15</p>
                                                    </div>
                                                </div>
                                                <p className="text-[#F7F9FA] font-poppins font-medium text-[15px] leading-[130%] mt-2">1.2 Mot qilish</p>
                                            </div>
                                            <div>
                                                <div className="relative w-full h-[120px] rounded-[8px] overflow-hidden bg-[#222]">
                                                    <img src="/notfoundcourse.svg" alt="" className="w-full h-full object-cover" />
                                                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-[#0B141899] py-1 px-2 rounded-[6px]">
                                                        <img src="/play 2.svg" alt="" className="w-3 h-3" />
                                                        <p className="text-[#F7F9FA] font-poppins text-[11px]">05:45</p>
                                                    </div>
                                                </div>
                                                <p className="text-[#F7F9FA] font-poppins font-medium text-[15px] leading-[130%] mt-2">1.3 Piyoda bilan tanishuv</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="border-b border-[#1F272A]">
                                    <button onClick={() => toggleSection(1)} className="w-full flex items-center justify-between p-5 cursor-pointer">
                                        <h3 className="text-[#F7F9FA] font-poppins font-bold text-[20px] leading-none">2. Eng ko'p foydalaniladigan donalar</h3>
                                        <IoChevronUp className={`w-5 h-5 text-[#F7F9FA] transition-transform ${openSections[1] ? '' : 'rotate-180'}`} />
                                    </button>
                                    {openSections[1] && (
                                        <div className="px-5 pb-5 pt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" style={{background: "#F7F9FA08"}}>
                                            <div>
                                                <div className="relative w-full h-[120px] rounded-[8px] overflow-hidden bg-[#222]">
                                                    <img src="/notfoundcourse.svg" alt="" className="w-full h-full object-cover" />
                                                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-[#0B141899] py-1 px-2 rounded-[6px]">
                                                        <img src="/play 2.svg" alt="" className="w-3 h-3" />
                                                        <p className="text-[#F7F9FA] font-poppins text-[11px]">06:30</p>
                                                    </div>
                                                </div>
                                                <p className="text-[#F7F9FA] font-poppins font-medium text-[15px] leading-[130%] mt-2">2.1 Farzin bilan hujum</p>
                                            </div>
                                            <div>
                                                <div className="relative w-full h-[120px] rounded-[8px] overflow-hidden bg-[#222]">
                                                    <img src="/notfoundcourse.svg" alt="" className="w-full h-full object-cover" />
                                                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-[#0B141899] py-1 px-2 rounded-[6px]">
                                                        <img src="/play 2.svg" alt="" className="w-3 h-3" />
                                                        <p className="text-[#F7F9FA] font-poppins text-[11px]">04:45</p>
                                                    </div>
                                                </div>
                                                <p className="text-[#F7F9FA] font-poppins font-medium text-[15px] leading-[130%] mt-2">2.2 Rokirovka qilish</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <button onClick={() => toggleSection(2)} className="w-full flex items-center justify-between p-5 cursor-pointer">
                                        <h3 className="text-[#F7F9FA] font-poppins font-bold text-[20px] leading-none">3. Mot qilish oson bo'lgan donalar</h3>
                                        <IoChevronUp className={`w-5 h-5 text-[#F7F9FA] transition-transform ${openSections[2] ? '' : 'rotate-180'}`} />
                                    </button>
                                    {openSections[2] && (
                                        <div className="px-5 pb-5 pt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" style={{background: "#F7F9FA08"}}>
                                            <div>
                                                <div className="relative w-full h-[120px] rounded-[8px] overflow-hidden bg-[#222]">
                                                    <img src="/notfoundcourse.svg" alt="" className="w-full h-full object-cover" />
                                                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-[#0B141899] py-1 px-2 rounded-[6px]">
                                                        <img src="/play 2.svg" alt="" className="w-3 h-3" />
                                                        <p className="text-[#F7F9FA] font-poppins text-[11px]">09:00</p>
                                                    </div>
                                                </div>
                                                <p className="text-[#F7F9FA] font-poppins font-medium text-[15px] leading-[130%] mt-2">3.1 Ikki farzin bilan mot</p>
                                            </div>
                                            <div>
                                                <div className="relative w-full h-[120px] rounded-[8px] overflow-hidden bg-[#222]">
                                                    <img src="/notfoundcourse.svg" alt="" className="w-full h-full object-cover" />
                                                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-[#0B141899] py-1 px-2 rounded-[6px]">
                                                        <img src="/play 2.svg" alt="" className="w-3 h-3" />
                                                        <p className="text-[#F7F9FA] font-poppins text-[11px]">10:15</p>
                                                    </div>
                                                </div>
                                                <p className="text-[#F7F9FA] font-poppins font-medium text-[15px] leading-[130%] mt-2">3.2 Ot va fil bilan mot</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6">
                                <h2 className="text-[#F7F9FA] font-poppins font-bold text-[22px] mb-4">Kurs haqida izohlar</h2>
                                <div className="bg-[#1A1D1F] border border-[#1F272A] rounded-[12px] overflow-hidden">
                                    <div className="p-5 border-b border-[#1F272A]">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-start gap-3">
                                                <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-[#2A2E30] shrink-0">
                                                    <img src="/Frame 20820.svg" alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="text-[#F7F9FA] font-poppins text-[16px] font-bold">Jasurbek Narzullayev</p>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <p className="text-[#9DA1A3] font-poppins text-[12px]">7 Sentyabr 2022 y. 19:52</p>
                                                        <div className="flex items-center gap-0.5">
                                                            <FaStar className="w-4 h-4" color="#FFB800" />
                                                            <FaStar className="w-4 h-4" color="#FFB800" />
                                                            <FaStar className="w-4 h-4" color="#FFB800" />
                                                            <FaStar className="w-4 h-4" color="#FFB800" />
                                                            <FaStar className="w-4 h-4" color="#2A2E30" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <button onClick={() => setOpenMenu(openMenu === 0 ? null : 0)} className="p-1 text-[#9DA1A3] hover:text-[#F7F9FA] cursor-pointer shrink-0">
                                                    <BsThreeDotsVertical className="w-5 h-5" />
                                                </button>
                                                {openMenu === 0 && (
                                                    <div className="absolute right-0 top-8 z-20 bg-[#262A2D] border border-[#1F272A] rounded-[8px] py-1 min-w-[160px] shadow-lg">
                                                        <button onClick={() => setOpenMenu(null)} className="w-full flex items-center gap-2 px-3 py-2 text-[#F7F9FA] hover:bg-[#2F3336] font-poppins text-[13px] cursor-pointer">
                                                            <IoWarning className="w-4 h-4 text-[#FFB800]" />
                                                            Shikoyat qilish
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-[#9DA1A3] font-poppins text-[14px] leading-[1.6]">2016 yilda Nyu-Yorkda Karjakin va Karlsen shaxmat toji uchun o'yinda uchrashishdi. Keyin Norvegiya chempioni tay-brekda g'alaba qozondi va chempionlik unvonini saqlab qoldi. 26 noyabr kuni Karlsen va Karuana 12-o'yinni o'tkazishadi. Oq qismlarni amerikalik boshqaradi.</p>
                                    </div>
                                    <div className="p-5 border-b border-[#1F272A]">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-start gap-3">
                                                <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-[#2A2E30] shrink-0">
                                                    <img src="/Frame 20820.svg" alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="text-[#F7F9FA] font-poppins text-[16px] font-bold">Jasurbek Narzullayev</p>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <p className="text-[#9DA1A3] font-poppins text-[12px]">7 Sentyabr 2022 y. 19:52</p>
                                                        <div className="flex items-center gap-0.5">
                                                            <FaStar className="w-4 h-4" color="#FFB800" />
                                                            <FaStar className="w-4 h-4" color="#FFB800" />
                                                            <FaStar className="w-4 h-4" color="#FFB800" />
                                                            <FaStar className="w-4 h-4" color="#FFB800" />
                                                            <FaStar className="w-4 h-4" color="#2A2E30" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <button onClick={() => setOpenMenu(openMenu === 1 ? null : 1)} className="p-1 text-[#9DA1A3] hover:text-[#F7F9FA] cursor-pointer shrink-0">
                                                    <BsThreeDotsVertical className="w-5 h-5" />
                                                </button>
                                                {openMenu === 1 && (
                                                    <div className="absolute right-0 top-8 z-20 bg-[#262A2D] border border-[#1F272A] rounded-[8px] py-1 min-w-[160px] shadow-lg">
                                                        <button onClick={() => setOpenMenu(null)} className="w-full flex items-center gap-2 px-3 py-2 text-[#F7F9FA] hover:bg-[#2F3336] font-poppins text-[13px] cursor-pointer">
                                                            <IoWarning className="w-4 h-4 text-[#FFB800]" />
                                                            Shikoyat qilish
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-[#9DA1A3] font-poppins text-[14px] leading-[1.6]">2016 yilda Nyu-Yorkda Karjakin va Karlsen shaxmat toji uchun o'yinda uchrashishdi. Keyin Norvegiya chempioni tay-brekda g'alaba qozondi va chempionlik unvonini saqlab qoldi. 26 noyabr kuni Karlsen va Karuana 12-o'yinni o'tkazishadi. Oq qismlarni amerikalik boshqaradi.</p>
                                    </div>
                                    <div className="p-5 border-b border-[#1F272A]">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-start gap-3">
                                                <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-[#2A2E30] shrink-0">
                                                    <img src="/Frame 20820.svg" alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="text-[#F7F9FA] font-poppins text-[16px] font-bold">Jasurbek Narzullayev</p>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <p className="text-[#9DA1A3] font-poppins text-[12px]">7 Sentyabr 2022 y. 19:52</p>
                                                        <div className="flex items-center gap-0.5">
                                                            <FaStar className="w-4 h-4" color="#FFB800" />
                                                            <FaStar className="w-4 h-4" color="#FFB800" />
                                                            <FaStar className="w-4 h-4" color="#FFB800" />
                                                            <FaStar className="w-4 h-4" color="#FFB800" />
                                                            <FaStar className="w-4 h-4" color="#2A2E30" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <button onClick={() => setOpenMenu(openMenu === 2 ? null : 2)} className="p-1 text-[#9DA1A3] hover:text-[#F7F9FA] cursor-pointer shrink-0">
                                                    <BsThreeDotsVertical className="w-5 h-5" />
                                                </button>
                                                {openMenu === 2 && (
                                                    <div className="absolute right-0 top-8 z-20 bg-[#262A2D] border border-[#1F272A] rounded-[8px] py-1 min-w-[160px] shadow-lg">
                                                        <button onClick={() => setOpenMenu(null)} className="w-full flex items-center gap-2 px-3 py-2 text-[#F7F9FA] hover:bg-[#2F3336] font-poppins text-[13px] cursor-pointer">
                                                            <IoWarning className="w-4 h-4 text-[#FFB800]" />
                                                            Shikoyat qilish
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-[#9DA1A3] font-poppins text-[14px] leading-[1.6]">2016 yilda Nyu-Yorkda Karjakin va Karlsen shaxmat toji uchun o'yinda uchrashishdi. Keyin Norvegiya chempioni tay-brekda g'alaba qozondi va chempionlik unvonini saqlab qoldi. 26 noyabr kuni Karlsen va Karuana 12-o'yinni o'tkazishadi. Oq qismlarni amerikalik boshqaradi.</p>
                                    </div>
                                    <div className="p-5">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-start gap-3">
                                                <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-[#2A2E30] shrink-0">
                                                    <img src="/Frame 20820.svg" alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="text-[#F7F9FA] font-poppins text-[16px] font-bold">Jasurbek Narzullayev</p>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <p className="text-[#9DA1A3] font-poppins text-[12px]">7 Sentyabr 2022 y. 19:52</p>
                                                        <div className="flex items-center gap-0.5">
                                                            <FaStar className="w-4 h-4" color="#FFB800" />
                                                            <FaStar className="w-4 h-4" color="#FFB800" />
                                                            <FaStar className="w-4 h-4" color="#FFB800" />
                                                            <FaStar className="w-4 h-4" color="#FFB800" />
                                                            <FaStar className="w-4 h-4" color="#2A2E30" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <button onClick={() => setOpenMenu(openMenu === 3 ? null : 3)} className="p-1 text-[#9DA1A3] hover:text-[#F7F9FA] cursor-pointer shrink-0">
                                                    <BsThreeDotsVertical className="w-5 h-5" />
                                                </button>
                                                {openMenu === 3 && (
                                                    <div className="absolute right-0 top-8 z-20 bg-[#262A2D] border border-[#1F272A] rounded-[8px] py-1 min-w-[160px] shadow-lg">
                                                        <button onClick={() => setOpenMenu(null)} className="w-full flex items-center gap-2 px-3 py-2 text-[#F7F9FA] hover:bg-[#2F3336] font-poppins text-[13px] cursor-pointer">
                                                            <IoWarning className="w-4 h-4 text-[#FFB800]" />
                                                            Shikoyat qilish
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-[#9DA1A3] font-poppins text-[14px] leading-[1.6]">2016 yilda Nyu-Yorkda Karjakin va Karlsen shaxmat toji uchun o'yinda uchrashishdi. Keyin Norvegiya chempioni tay-brekda g'alaba qozondi va chempionlik unvonini saqlab qoldi. 26 noyabr kuni Karlsen va Karuana 12-o'yinni o'tkazishadi. Oq qismlarni amerikalik boshqaradi.</p>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-4">
                                    <button className="bg-[#1A1D1F] border border-[#1F272A] text-[#F7F9FA] px-8 py-2.5 rounded-[8px] font-poppins text-[14px] font-medium hover:bg-[#262A2D] transition-colors cursor-pointer">
                                        Barcha izohlar
                                    </button>
                                </div>
                            </div>
                        </div>
                        <aside className="w-full lg:w-[326px] shrink-0">
                            <Anonis />
                        </aside>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}