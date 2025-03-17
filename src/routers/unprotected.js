import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function Unprotected({ children }) {
  const session = useSelector((state) => state?.session?.user);

  if (session) {
    return <Navigate to={"/"} replace />;
  }

  return children;
}
