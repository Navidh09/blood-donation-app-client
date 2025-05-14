import { useParams } from "react-router";
import blogsData from "../../../public/blogs.json";

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogsData.find((blog) => blog.id === id);

  if (!blog) return <p className="text-center mt-20">Blog not found.</p>;

  return (
    <div className="w-10/12 mx-auto py-12">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-80 object-cover rounded-md"
      />
      <h1 className="text-4xl font-bold my-6">{blog.title}</h1>
      <p className="text-gray-700 text-lg">{blog.content}</p>
    </div>
  );
};

export default BlogDetails;
