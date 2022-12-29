import { Button } from "flowbite-react";

const TaskItem = ({ task, index, handleComplete }) => {
  return (
    <div className="my-4">
      <div className="grid grid-cols-12 gap-5 p-3 items-center  bg-gray-800 text-white rounded">
        <div className="justify-self-center">{index + 1}</div>
        <div>
          <img src={task.task_image} alt="" className="h-16" />
        </div>
        <div className="col-span-7">{task.task_name}</div>
        <div>
          <Button onClick={() => handleComplete(task._id)}>Complete</Button>
        </div>
        <div>edit</div>
        <div>delete</div>
      </div>
    </div>
  );
};

export default TaskItem;
