import { Spinner } from "flowbite-react";

const PrivateRoutes = ({ children }) => {
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }

  return children;
};

export default PrivateRoutes;
