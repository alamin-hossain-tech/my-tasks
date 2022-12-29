import { useQuery } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import React, { useContext } from "react";
import TaskItem from "../../Components/TaskItem/TaskItem";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

const MyTasks = () => {
  const { user } = useContext(AuthContext);
  const {
    data = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [user?.email],
    queryFn: () =>
      fetch(
        `http://localhost:4000/tasks?email=${user?.email}&state=${false}`
      ).then((res) => res.json()),
  });
  if (!user) {
    refetch();
  }
  const handleComplete = (id) => {
    fetch(`http://localhost:4000/task-complete?id=${id}&state=true`, {
      method: "PUT",
    })
      .then((res) => {
        refetch();
      })

      .catch((er) => {
        console.log(er);
      });
  };
  return (
    <div className="bg-gray-900 py-12">
      <div className="container mx-auto h-[80vh]">
        {data?.map((task, i) => (
          <TaskItem
            key={task._id}
            task={task}
            index={i}
            handleComplete={handleComplete}
          ></TaskItem>
        ))}
        {data.length === 0 && (
          <div className="text-white bg-gray-800 py-5">
            <h2 className="text-xl text-center">No Task in Que</h2>
          </div>
        )}
        {isLoading && (
          <div className="h-screen">
            <Spinner></Spinner>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTasks;

// export async function getServerSideProps() {
//   const res = await fetch(`http://localhost:4000/tasks/developer@sgserver.me`);
//   const data = await res.json();
//   return {
//     props: {
//       tasks: data,
//     },
//   };
// }
