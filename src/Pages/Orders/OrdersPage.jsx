import useOrders from "../../hooks/useOrders";

const OrdersPage = () => {
  const bookings=useOrders()
  
  const now = new Date();

  // ✅ SAFETY: always use array
  const safeBookings = Array.isArray(bookings) ? bookings : [];

  const upcoming = safeBookings.filter(
    (b) => b?.showDate && new Date(b.showDate) >= now && b.status === "completed"
  );

  const past = safeBookings.filter(
    (b) => b?.showDate && new Date(b.showDate) < now && b.status === "completed"
  );

  return (
    <div className="min-h-screen px-4 md:px-10 py-8 bg-gray-50">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        My Bookings
      </h1>

      {/* 🔹 Upcoming Shows */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-green-600 mb-4">
          Upcoming Shows
        </h2>

        {upcoming.length === 0 ? (
          <p className="text-gray-500">No upcoming bookings</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((b) => (
              <div
                key={b.id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold">
                  {b.movieName}
                </h3>

                <p className="text-sm text-gray-600">
                  🎬 {b.theaterName}
                </p>

                <p className="text-sm mt-2">
                  📅 {new Date(b.showDate).toLocaleDateString()}
                </p>

                <p className="text-sm">
                  ⏰ {b.startTime?.slice(0, 5) || "N/A"}
                </p>

                <p className="mt-2 font-medium text-green-600">
                  ₹{b.price}
                </p>

                <span className="inline-block mt-2 text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 🔹 Past Shows */}
      <section>
        <h2 className="text-xl font-semibold text-gray-500 mb-4">
          Past Shows
        </h2>

        {past.length === 0 ? (
          <p className="text-gray-500">No past bookings</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((b) => (
              <div
                key={b.id}
                className="bg-white p-4 rounded-xl shadow opacity-70"
              >
                <h3 className="text-lg font-semibold">
                  {b.movieName}
                </h3>

                <p className="text-sm text-gray-600">
                  🎬 {b.theaterName}
                </p>

                <p className="text-sm mt-2">
                  📅 {new Date(b.showDate).toLocaleDateString()}
                </p>

                <p className="text-sm">
                  ⏰ {b.startTime?.slice(0, 5) || "N/A"}
                </p>

                <p className="mt-2 font-medium text-gray-700">
                  ₹{b.price}
                </p>

                <span className="inline-block mt-2 text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded">
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default OrdersPage;