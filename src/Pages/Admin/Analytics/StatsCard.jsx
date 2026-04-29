const StatsCard = ({ title, value }) => (
  <div className="bg-white p-5 rounded-2xl shadow">
    <h2 className="text-gray-500">{title}</h2>
    <p className="text-2xl font-bold">{value || 0}</p>
  </div>
);

export default StatsCard