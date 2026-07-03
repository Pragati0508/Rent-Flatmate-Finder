import useAuth from "../hooks/useAuth";

const Navbar = () => {

  const { user } = useAuth();

  return (

    <header className="bg-white shadow px-8 py-4 flex justify-between">

      <h2 className="text-2xl font-bold">
        Dashboard
      </h2>

      <div className="font-semibold">

        {user?.fullName}

      </div>

    </header>

  );

};

export default Navbar;