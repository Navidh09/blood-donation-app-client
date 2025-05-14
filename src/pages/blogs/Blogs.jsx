import { useState, useEffect } from "react";
import blogsData from "../../../public/blogs.json";
import BlogCard from "../../components/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const publishedBlogs = blogsData.filter((blog) => blog.published);
    setBlogs(publishedBlogs);
  }, []);

  return (
    <div className="w-11/12 mx-auto py-15 mt-15">
      <h1 className="text-4xl font-bold pb-6 text-center text-red-600 mb-8">
        Our Blog
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
