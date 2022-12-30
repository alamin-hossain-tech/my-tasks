import { jsonEval } from "@firebase/util";
import {
  Button,
  FileInput,
  Label,
  Modal,
  Spinner,
  TextInput,
} from "flowbite-react";
import Link from "next/link";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const TaskItem = ({ task, index, handleComplete, refetch }) => {
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [formLoading, setFormLoading] = useState(false);
  const imghostkey = process.env.NEXT_PUBLIC_ANALYTICS_imgbb;

  const onSubmit = (data) => {
    setFormLoading(true);
    const image = data.task_media[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imghostkey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          const update = {
            task_name: data.task_name,
            task_image: imageData.data.url,
          };
          fetch(
            `https://my-tasks-server-chi.vercel.app/task/edit/${task._id}`,
            {
              method: "PUT",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(update),
            }
          )
            .then((res) => res.json())
            .then((result) => {
              toast.success("Updated");
              reset();
              setFormLoading(false);
              refetch();
              setVisible(false);
            });
        } else {
          toast.error("Provide a Valid image file");
          setFormLoading(false);
        }
      });
  };

  const handleDelete = () => {
    fetch(`https://my-tasks-server-chi.vercel.app/task/delete/${task._id}`, {
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
        <div className="col-span-4 lg:col-span-1 justify-self-end lg:justify-self-auto">
          <Button onClick={() => handleComplete(task._id)}>Complete</Button>
        </div>
        <div className="justify-self-center">
          <FaRegEdit
            className="text-xl hover:cursor-pointer hover:text-blue-600"
            onClick={() => setVisible(true)}
          ></FaRegEdit>
        </div>
        <div className="justify-self-center">
          <FaTrashAlt
            className="text-xl hover:cursor-pointer hover:text-red-600"
            onClick={() => setConfirmVisible(true)}
          ></FaTrashAlt>
        </div>
      </div>
      <Fragment className="bg-gray-800">
        <Modal show={visible} onClose={() => setVisible(false)}>
          <Modal.Header>Edit : {task.task_name}</Modal.Header>
          <Modal.Body>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="task" value="Task Name" />
                </div>
                <TextInput
                  id="task"
                  type="text"
                  required={true}
                  defaultValue={task.task_name}
                  {...register("task_name")}
                />
              </div>
              <div id="fileUpload">
                <div className="mb-2 block">
                  <Label htmlFor="file" value="Upload media file" />
                </div>
                <FileInput id="file" {...register("task_media")} />
              </div>
              {formLoading && (
                <Spinner
                  aria-label="Center-aligned spinner example"
                  className="my-4"
                />
              )}
              <div className="flex gap-2">
                <Button type="submit">Update</Button>
                <Button color="failure" onClick={() => setVisible(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </Fragment>

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

export default TaskItem;
