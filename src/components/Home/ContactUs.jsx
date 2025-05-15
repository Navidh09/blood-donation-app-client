import { toast } from "react-toastify";

const ContactUs = () => {
  const handleMessage = (e) => {
    e.preventDefault();
    toast.success("Message Sent Successful");
    e.target.reset();
  };

  return (
    <div className="bg-gray-100 py-16 px-4 lg:px-20">
      <h2 className="text-3xl font-bold text-center mb-10 text-red-600">
        Contact Us
      </h2>

      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow">
        {/* Form */}
        <form onSubmit={handleMessage} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Message</label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows="4"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button className="btn btn-block bg-red-500 text-white">
            Send Message
          </button>
        </form>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-4">
            You can also reach us at:
          </h3>
          <p className="mb-2 text-lg">
            <span className="font-bold">Phone:</span> +880 1751544133
          </p>
          <p className="mb-2 text-lg">
            <span className="font-bold">Email:</span> support@vitaldrops.com
          </p>
          <p className="text-lg">
            <span className="font-bold">Address:</span> 199, West Kafrul,
            Sher-E-Bangla Nagar, Dhaka-1207
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
