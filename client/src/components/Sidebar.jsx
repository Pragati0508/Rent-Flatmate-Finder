import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ menu }) => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-blue-700 text-white min-h-screen">

      <div className="p-6 text-2xl font-bold border-b border-blue-500">
        RoomMate AI
      </div>

      <nav className="mt-6">

        {menu.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={`block px-6 py-4 transition ${
              location.pathname === item.path
                ? "bg-blue-900"
                : "hover:bg-blue-600"
            }`}
          >
            {item.label}
          </Link>

        ))}

      </nav>

    </aside>
  );
};

export default Sidebar;