import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Wrapper = () => {
  return (
    <div className="flex w-[100%] min-h-screen">
      {/* Sidebar */}
      <aside className="w-[20%] bg-slate-800 text-white fixed left-0 top-0 min-h-screen font-mono">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 w-[80%] ml-[302px] flex flex-col min-h-screen">
        {/* Navbar */}
        <header className="sticky top-0 z-40 bg-slate-700 text-white p-7 font-mono">
          <Navbar />
        </header>

        {/* Scrollable Outlet */}
        <main className="flex-1 overflow-y-auto bg-slate-400 p-7 min-h-screen font-mono">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Wrapper;