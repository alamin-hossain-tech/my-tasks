const TaskItem = () => {
  return (
    <div className="my-4">
      <div className="grid grid-cols-12 gap-5 p-3 items-center  bg-gray-800 text-white rounded">
        <div className="justify-self-center">sl</div>
        <div>
          <img
            src="https://i.ibb.co/y0TL1WN/1-JS229084732-removebg-preview.png"
            alt=""
          />
        </div>
        <div className="col-span-7">name</div>
        <div>Complete</div>
        <div>edit</div>
        <div>delete</div>
      </div>
    </div>
  );
};

export default TaskItem;
