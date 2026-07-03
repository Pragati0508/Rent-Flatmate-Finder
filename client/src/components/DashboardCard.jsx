const DashboardCard = ({
  title,
  value,
}) => {

  return (

    <div className="bg-white rounded-2xl shadow p-6">

      <h3 className="text-gray-500 mb-2">
        {title}
      </h3>

      <h1 className="text-3xl font-bold text-blue-700">
        {value}
      </h1>

    </div>

  );

};

export default DashboardCard;