import { async } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import TaskItem from "../../Components/TaskItem/TaskItem";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

const MyTasks = () => {
  const { user } = useContext(AuthContext);
  const { data = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: () =>
      fetch(`http://localhost:4000/tasks/${user?.email}`).then((res) =>
        res.json()
      ),
  });
  console.log(data);
  return (
    <div className="bg-gray-900 py-12">
      <div className="container mx-auto">
        <TaskItem></TaskItem>
        <TaskItem></TaskItem>
      </div>
    </div>
  );
};

export default MyTasks;
