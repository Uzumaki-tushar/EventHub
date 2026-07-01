import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#000000] text-white selection:bg-[#D80032] selection:text-white relative overflow-hidden">
      
      {/* Global Background Glows for consistency across all pages */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#D80032] rounded-full blur-[150px] opacity-[0.15] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#800080] rounded-full blur-[150px] opacity-[0.15] pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-grow w-full max-w-[1400px] mx-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
