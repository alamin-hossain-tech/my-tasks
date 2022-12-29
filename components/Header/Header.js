import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import Link from "next/link";
import { useContext } from "react";
import { toast, Toaster } from "react-hot-toast";
import AuthProvider, {
  AuthContext,
} from "../../Contexts/AuthProvider/AuthProvider";
const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);
  const handleLogout = () => {
    logOut()
      .then((res) => {
        toast.success("Succesfully logedout ");
      })
      .catch((err) => {
        toast.error("error.message");
      });
  };
  return (
    <div className="dark bg-gray-800">
      <div className="container mx-auto">
        <Navbar fluid={true}>
          <Navbar.Brand href="https://flowbite.com/">
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              My Tasks
            </span>
          </Navbar.Brand>
          <Navbar.Collapse>
            <Link href={"/"} className="text-white hover:text-gray-500">
              Home
            </Link>
            <Link href={"/add-task"} className="text-white hover:text-gray-500">
              Add Task
            </Link>
            <Link href={"/add-task"} className="text-white hover:text-gray-500">
              My Task
            </Link>
            <Link href={"/add-task"} className="text-white hover:text-gray-500">
              Completed Task
            </Link>
          </Navbar.Collapse>
          {user ? (
            <div className="flex md:order-2">
              <Dropdown
                arrowIcon={false}
                inline={true}
                label={
                  <Avatar
                    alt="User settings"
                    img={user?.photoURL}
                    rounded={true}
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{user?.displayName}</span>
                  <span className="block truncate text-sm font-medium">
                    {user?.email}
                  </span>
                </Dropdown.Header>

                <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
              </Dropdown>
              <Navbar.Toggle />
            </div>
          ) : (
            <Link href={"/login"}>
              <Button>Login</Button>
            </Link>
          )}
        </Navbar>
        <Toaster></Toaster>
      </div>
    </div>
  );
};

export default Header;