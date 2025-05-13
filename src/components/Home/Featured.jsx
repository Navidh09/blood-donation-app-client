const Featured = () => {
  return (
    <div className="w-11/12 mx-auto my-20 text-center">
      <h2 className="text-4xl font-bold mb-10 text-red-600">
        Featured Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {/* Feature Card 1 */}
        <div className="bg-white hover:scale-110 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <img
            src="https://i.ibb.co.com/LXRMVXp0/19-DKMS-donor-James-Moore.webp"
            alt="Donor"
            className="w-full h-56 rounded-e-md mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Become a Donor</h3>
          <p className="text-gray-600">
            Join our growing network of life-saving heroes.
          </p>
        </div>

        {/* Feature Card 2 */}
        <div className="bg-white rounded-2xl hover:scale-110 shadow-md p-6 hover:shadow-lg transition">
          <img
            src="https://i.ibb.co.com/Lzcxf0G4/world-blood-donor-day-poster-donor-blood-concept-illustration-background-for-world-blood-donor-day-f.jpg"
            alt="Search"
            className="w-full h-56 rounded-e-md mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Find a Donor</h3>
          <p className="text-gray-600">
            Quickly search for nearby blood donors by group or location.
          </p>
        </div>

        {/* Feature Card 3 */}
        <div className="bg-white rounded-2xl hover:scale-110 shadow-md p-6 hover:shadow-lg transition">
          <img
            src="https://i.ibb.co.com/kg1ctvPL/donation-1.jpg"
            alt="Camp"
            className="w-full h-56 rounded-e-md mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Blood Donation Camps</h3>
          <p className="text-gray-600">
            Stay updated on upcoming donation events and camps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Featured;
