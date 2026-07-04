export default function TestModeBar() {
    const text = "Sayt test rejimda ishlamoqda";

    return (
        <div className="w-full bg-[#0F1213] overflow-hidden border-b border-[#1F272A]">
            <div className="flex whitespace-nowrap py-2 animate-[marquee_22s_linear_infinite]">
                {Array.from({ length: 10 }).map((_, i) => (
                    <span
                        key={i}
                        className="flex items-center gap-2 text-[#F7F9FA99] font-poppins text-[13px] font-medium mx-3"
                    >
                        {text}
                        <span className="text-[#1498F3]">♟</span>
                    </span>
                ))}
            </div>

            <style>{`
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
}
