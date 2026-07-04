export default function YoshlarAgentligi() {
    return (
        <div className="relative w-full bg-gradient-to-b from-[#0F2E24] to-[#0A211A] border border-[#1F3D32] rounded-[12px] p-6 flex flex-col items-center text-center overflow-hidden font-poppins">
            <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 50% 30%, #FFFFFF 0%, transparent 60%)",
                }}
            />

            <div className="relative w-14 h-14 rounded-full border-2 border-[#D4AF37] flex items-center justify-center mb-3">
                <span className="text-[#D4AF37] text-[22px]">☀</span>
            </div>

            <p className="relative text-[#F7F9FA] font-bold text-[15px] tracking-wide uppercase leading-tight">
                Yoshlar ishlari<br />agentligi
            </p>

            <p className="relative text-[#F7F9FA] font-semibold text-[17px] mt-6 mb-1 leading-snug">
                Yoshlarga oid yangiliklarni<br />biz bilan kuzating
            </p>

            <a
                href="https://yoshlar.gov.uz"
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-[#4FA8E8] text-[14px] mt-3 hover:underline"
            >
                yoshlar.gov.uz
            </a>
        </div>
    );
}
