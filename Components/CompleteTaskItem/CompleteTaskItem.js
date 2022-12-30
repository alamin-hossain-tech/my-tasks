import { Badge, Button, Modal } from "flowbite-react";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const CompleteTaskItem = ({ task, index, handleInComplete, refetch }) => {
  const [confirmVisible, setConfirmVisible] = useState(false);
  const handleDelete = () => {
    fetch(`http://localhost:4000/task/delete/${task._id}`, {
      method: "POST",
      headers: {
        "content-type": "aplication/json",
      },
    })
      .then((res) => {
        toast.success("Deleted");
        setConfirmVisible(false);
        refetch();
      })
      .catch((err) => {
        toast.error(err.message);
        setConfirmVisible(false);
      });
  };
  return (
    <div className="my-4">
      <div className="grid grid-cols-6  lg:grid-cols-12 gap-5 p-3 items-center  bg-gray-800 text-white rounded">
        <div className="justify-self-center">{index + 1}</div>
        <div>
          <img src={task.task_image} alt="" className="h-16" />
        </div>
        <div className="col-span-4 lg:col-span-7">{task.task_name}</div>
        <div className="col-span-2 lg:col-span-1 justify-self-end lg:justify-self-auto">
          <Badge color="success">Completed</Badge>
        </div>
        <div className="col-span-3 lg:col-span-1 justify-self-end lg:justify-self-auto">
          <Button color={"failure"} onClick={() => handleInComplete(task._id)}>
            Incomplete
          </Button>
        </div>
        <div className="justify-self-center">
          <FaTrashAlt
            className="text-xl hover:cursor-pointer hover:text-red-600"
            onClick={() => setConfirmVisible(true)}
          ></FaTrashAlt>
        </div>
      </div>
      <Modal
        show={confirmVisible}
        size="md"
        popup={true}
        onClose={() => setConfirmVisible(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this task?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setConfirmVisible(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Toaster />
    </div>
  );
};

export default CompleteTaskItem;
