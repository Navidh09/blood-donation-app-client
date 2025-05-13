import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="text-red-500 mt-40 text-center">
      <h2 className="text-3xl">Page Not Found !!!</h2>
      <h1 className="text-2xl">404 Error</h1>
      <Link to={"/"} className="btn btn-dash text-blue-700 mt-6">
        Back to Homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
