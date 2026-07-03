const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-700 flex">

      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 text-white flex-col justify-center px-16">

        <h1 className="text-6xl font-bold mb-6">
          RoomMate AI
        </h1>

        <p className="text-xl leading-9 opacity-95">
          Find your ideal roommate with AI-powered compatibility,
          verified listings, secure messaging and smart matching.
        </p>

      </div>

      {/* Right Panel */}

      <div className="flex-1 flex items-center justify-center p-8">

        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">

          <h2 className="text-3xl font-bold text-center mb-2">
            {title}
          </h2>

          <p className="text-center text-gray-500 mb-8">
            {subtitle}
          </p>

          {children}

        </div>

      </div>

    </div>
  );
};

export default AuthLayout;