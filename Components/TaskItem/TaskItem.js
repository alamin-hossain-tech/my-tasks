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

const TaskItem = ({ task, index, handleComplete, refetch }) => {
  const [visible, setVisible] = useState(false);
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
          fetch(`http://localhost:4000/task/edit/${task._id}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(update),
          })
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
        <div className="justify-self-center">
          <FaRegEdit
            className="text-xl hover:cursor-pointer hover:text-blue-600"
            onClick={() => setVisible(true)}
          ></FaRegEdit>
        </div>
        <div className="justify-self-center">
          <FaTrashAlt className="text-xl hover:cursor-pointer hover:text-red-600"></FaTrashAlt>
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
      <Toaster />
    </div>
  );
};

export default TaskItem;
