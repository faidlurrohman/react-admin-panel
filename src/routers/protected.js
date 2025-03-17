import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function Protected({ children }) {
  const session = useSelector((state) => state?.session?.user);

  if (session) {
    return children;
  }

  return <Navigate to={"/login"} replace />;
}
