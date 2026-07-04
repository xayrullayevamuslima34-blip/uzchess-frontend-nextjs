export default function Footer() {
    return (
        <footer className="w-full bg-[#1A1D1F] text-[#F7F9FA] mt-20 font-poppins">
            <div className="container py-12 flex flex-col items-center border-b border-[#1F272A]">
                <div className="mb-8">
                    <img src="/Group 427318455.svg" alt="UzChess" className="h-[40px]" />
                </div>

                <ul className="flex flex-wrap justify-center gap-6 mb-8 text-[14px] text-[#9DA1A3]">
                    <li className="hover:text-white transition-colors cursor-pointer">Biz haqimizda</li>
                    <li className="hover:text-white transition-colors cursor-pointer">Cookie fayllari siyosati</li>
                    <li className="hover:text-white transition-colors cursor-pointer">Foydalanish qoidalari</li>
                    <li className="hover:text-white transition-colors cursor-pointer">Cookie fayllari siyosati</li>
                </ul>

                <div className="flex gap-4 opacity-60">
                    <a href="#" className="hover:opacity-100 transition-opacity"><img src="/instagram.svg" alt="Instagram" className="w-5 h-5" /></a>
                    <a href="#" className="hover:opacity-100 transition-opacity"><img src="/telegram.svg" alt="Telegram" className="w-5 h-5" /></a>
                    <a href="#" className="hover:opacity-100 transition-opacity"><img src="/youtube.svg" alt="YouTube" className="w-5 h-5" /></a>
                    <a href="#" className="hover:opacity-100 transition-opacity"><img src="/twitter.svg" alt="Twitter" className="w-5 h-5" /></a>
                    <a href="#" className="hover:opacity-100 transition-opacity"><img src="/facebook 01.svg" alt="Facebook" className="w-5 h-5" /></a>
                </div>
            </div>

            <div className="container py-6 flex justify-between items-center text-[12px] text-[#9DA1A3]">
                <p>© UzChess. All rights reserved.</p>
                <div className="opacity-40">
                    <img src="/Group 1.svg" alt="" className="h-6" />
                </div>
                <p className="hover:text-white cursor-pointer transition-colors">Foydalanish qoidalari</p>
            </div>
        </footer>
    );
}