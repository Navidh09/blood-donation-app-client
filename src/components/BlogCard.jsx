import { Link } from "react-router";

const BlogCard = ({ blog }) => (
  <div className="card shadow-lg rounded-lg bg-white">
    <img
      src={blog.image}
      alt={blog.title}
      className="w-full h-52 object-cover rounded-t-lg"
    />
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
      <p className="text-gray-600 mb-4">{blog.excerpt}</p>
      <Link
        to={`/blogs/${blog.id}`}
        className="text-red-500 font-medium hover:underline"
      >
        Read More
      </Link>
    </div>
  </div>
);

export default BlogCard;
