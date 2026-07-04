export default function Anonis() {
    return <div className=" flex flex-col items-start relative w-full p-4  bg-[#0B4789] overflow-hidden rounded-[8px]">
        <img className="absolute top-0 left-0 w-full h-full " src="/bg.svg" alt="" />
        <img src="/Vector.svg" alt="" className="absolute top-0 right-0 w-[76px] h-[76px]" />
        <img src="/Frame.svg" alt="" className="h-[24px]"/>
        <h1 className="font-poppins font-[700] text-[20px] w-[294px] mt-2">Aynan <span className="text-[#ffff00]">siz</span> uchun qanday imtiyozlar borligini bilib oling</h1>
        <button className="flex items-center justify-center gap-2 w-[149px] bg-[#1C92E0] text-[16px] text-white rounded-[8px] py-2 px-5 font-poppins font-[500] h-[40px] cursor-pointer hover:bg-[#1676b5] transition-colors mt-2 z-[1]">Batafsil <img src="/Vector (Stroke).svg" alt="" className="w-4 h-4" /></button>
    </div>
}