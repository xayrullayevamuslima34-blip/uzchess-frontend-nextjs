'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8888';

export default function TopCourses() {
    const router = useRouter();
    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
        async function getCourses() {
            try {
                const res = await axios.get(`${apiUrl}/public/courses/list`, { params: { size: 4 } });
                const data = res.data?.data ?? res.data;
                setCourses(Array.isArray(data) ? data.slice(0, 4) : []);
            } catch (err) {
                setCourses([]);
            }
        }
        getCourses();
    }, []);

    return (
        <div className="bg-[#1A1D1F] border border-[#1F272A] p-4 w-full rounded-[12px] font-poppins">
            <div className="flex w-full justify-between items-center mb-1">
                <h1 className="text-[16px] font-bold text-[#FCFCFC]">Top kurslar</h1>
                <p
                    onClick={() => router.push("/courses")}
                    className="text-[#9DA1A3] flex items-center gap-1 text-[13px] cursor-pointer hover:text-white transition-colors"
                >
                    Barchasi
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </p>
            </div>

            {courses.map((course, idx) => (
                <div key={course.id}>
                    <div
                        onClick={() => router.push(`/courses/${course.id}`)}
                        className="flex w-full gap-3 mt-4 cursor-pointer"
                    >
                        <div className="relative w-[48px] h-[48px] shrink-0 rounded-[8px] overflow-hidden bg-[#222]">
                            <img
                                src={course.image ? `${apiUrl}/${course.image}` : "/Frame 20820.svg"}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                            {idx === 0 && (
                                <span className="absolute bottom-0 left-0 right-0 bg-[#1498F3] text-[8px] text-white text-center font-semibold leading-tight">
                                    TOP
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 min-w-0">
                            <h2 className="text-[#FCFCFC] text-[13px] font-bold line-clamp-1">{course.title}</h2>
                            <div className="flex items-center gap-2">
                                <span className="flex items-center gap-1 text-[#FFB800] text-[12px]">
                                    ★ {course.rating ?? "—"}
                                </span>
                                <span className="text-[#6F767E] text-[12px]">👁 {course.reviewsCount ?? 0}</span>
                            </div>
                        </div>
                    </div>
                    {idx < courses.length - 1 && <div className="w-full h-[1px] bg-[#1F272A] mt-4" />}
                </div>
            ))}

            {courses.length === 0 && (
                <p className="text-[#9DA1A3] text-[13px] mt-3">Kurslar topilmadi</p>
            )}
        </div>
    );
}
