import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import Anonis from "../components/Anonis";
import SupportRek from "../components/SupportRek";
import TopBooks from "../components/TopBooks";
import DayGame from "../components/home/DayGame";
import Rating from "../components/home/Rating";
import RecentGames from "../components/home/RecentGames";
import TopCourses from "../components/home/TopCourses";
import HomeNews from "../components/home/HomeNews";

export default function Home() {
    return (
        <>
            <Navbar />

            <div className="px-4 md:px-8 lg:px-12 pb-12">
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    <aside className="w-full lg:w-[280px] shrink-0 flex flex-col gap-5">
                        <DayGame />
                        <Rating />
                    </aside>

                    <main className="w-full flex-grow min-w-0 flex flex-col gap-5">
                        <RecentGames />
                        <HomeNews />
                    </main>

                    <aside className="w-full lg:w-[300px] shrink-0 flex flex-col gap-5">
                        <SupportRek />
                        <Anonis />
                        <TopCourses />
                        <TopBooks />
                    </aside>
                </div>
            </div>

            <Footer />
        </>
    );
}
