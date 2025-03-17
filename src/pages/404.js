import { ArrowLeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router";
import { IMAGE } from "constants";

export default function NotFound({ useNav = true }) {
  const session = useSelector((state) => state.session.user);

  if (!session) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <div className="flex justify-center items-center w-full h-screen flex-col">
      <img
        className="mix-blend-multiply max-w-full md:max-w-md"
        src={IMAGE[404]}
        alt="Not found"
      />
      <p className="m-0 text-right text-xs">
        An art by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://dribbble.com/mt1278"
          className="text-primary"
        >
          Max Tkachenko
        </a>
      </p>

      {useNav && (
        <p className="mt-10 flex flex-row items-center space-x-5">
          <Link
            to="/"
            className="text-black hover:text-black my-transition flex items-center hover:bg-secondaryOpacity py-2 px-5 rounded-full"
          >
            <ArrowLeftOutlined />{" "}
            <span className="ml-2">Kembali ke halaman awal</span>
          </Link>
        </p>
      )}
    </div>
  );
}
