'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8888';

export default function TopBooks() {
    const router = useRouter();
    const [books, setBooks] = useState<any[]>([]);
    const [authors, setAuthors] = useState<any[]>([]);

    useEffect(() => {
        async function getBooks() {
            try {
                const response = await axios.get(`${apiUrl}/public/book/list`, { params: { size: 4 } });
                const data = response.data?.data ?? response.data;
                setBooks((Array.isArray(data) ? data : []).slice(0, 4));
            } catch (err) {
                console.error("Failed to fetch top books:", err);
            }
        }
        getBooks();
    }, []);

    useEffect(() => {
        async function getAuthors() {
            try {
                const response = await axios.get(`${apiUrl}/public/authors`);
                setAuthors(response.data?.data ?? response.data);
            } catch (err) {
                console.error("Failed to fetch authors:", err);
            }
        }
        getAuthors();
    }, []);

    const getAuthorName = (book: any) => {
        if (book.authorId?.fullName) return book.authorId.fullName;
        const id = typeof book.authorId === 'object' ? book.authorId?.id : book.authorId;
        return authors.find((a: any) => a.id === id)?.fullName || "";
    };

    return (
        <div className="bg-[#1A1D1F] p-4 w-[326px] rounded-[8px]">
            <div className="flex w-full justify-between items-center">
                <h1 className="text-[18px] font-poppins font-500 text-[#FCFCFC]">Top kitoblar</h1>
                <p
                    onClick={() => router.push("/library")}
                    className="text-[#9DA1A3] flex font-poppins text-[16px] font-[400] cursor-pointer"
                >
                    Barchasi <img src="/chevron-forward-outline 1.svg" alt="" className="w-3 h-3" />
                </p>
            </div>

            {books.map((book, idx) => (
                <div key={book.id}>
                    <div
                        onClick={() => router.push(`/library/${book.id}`)}
                        className="flex w-full gap-4 mt-4 cursor-pointer"
                    >
                        <img
                            src={book.image ? `${apiUrl}/${book.image}` : "/Frame 20820.svg"}
                            alt=""
                            className="w-[60px] h-[80px] object-cover rounded-[4px]"
                        />
                        <div className="flex flex-col gap-2">
                            <h1 className="text-[#FCFCFC] font-poppins text-[13px] font-[700] line-clamp-2">
                                {book.title}
                            </h1>
                            <p className="text-[#F0F0F0B8] flex font-poppins text-[13px] font-[400]">
                                {getAuthorName(book)}
                            </p>
                        </div>
                    </div>
                    {idx < books.length - 1 && <div className="w-full h-[1px] bg-[#1F272A] mt-4"></div>}
                </div>
            ))}
        </div>
    );
}