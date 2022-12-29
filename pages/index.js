import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { Button, Card } from "flowbite-react";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider/AuthProvider";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Head>
        <title>HOME | MY TASKS</title>
      </Head>
      <div className="  py-5  mx-auto bg-gray-900">
        <div className="text-white text-center h-[80vh] flex items-center justify-center">
          <div>
            {" "}
            <h1 className="text-4xl font-bold">Welcome to My Tasks App</h1>
            <p className="py-5">
              Organizing your tasks make easier using My Task App{" "}
            </p>
            {!user && (
              <Link href={"/login"}>
                <Button className="mx-auto">Please Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
