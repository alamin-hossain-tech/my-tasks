import React from "react";
import TaskItem from "../../Components/TaskItem/TaskItem";

const CompleteTasks = () => {
  return (
    <div className="bg-gray-900 py-12">
      <div className="container mx-auto">
        <TaskItem></TaskItem>
        <TaskItem></TaskItem>
      </div>
    </div>
  );
};

export default CompleteTasks;
