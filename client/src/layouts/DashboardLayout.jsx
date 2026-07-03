import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = ({
  menu,
  children,
}) => {
  return (
    <div className="flex">

      <Sidebar menu={menu} />

      <div className="flex-1 bg-slate-100 min-h-screen">

        <Navbar />

        <div className="p-8">

          {children}

        </div>

      </div>

    </div>
  );
};

export default DashboardLayout;