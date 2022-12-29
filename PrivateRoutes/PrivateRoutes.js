import { Spinner } from "flowbite-react";
import Router, { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider/AuthProvider";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }

  if (!user) {
    return router.push("/login");
  }

  return children;
};

export default PrivateRoutes;
