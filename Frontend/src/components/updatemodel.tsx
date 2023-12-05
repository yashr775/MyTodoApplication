import { ChangeEvent, FormEvent, useState } from "react";
import { TodoListState, setTodoToUpdate, updateModelHandler } from "../atoms";
import { useRecoilState } from "recoil";

interface FormData {
  title: string;
  subject: string;
  description: string;
}

const Updatemodel = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [updateVal, setUpdateVal] = useRecoilState(updateModelHandler);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [todos, setTodos] = useRecoilState(TodoListState);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [propVal, setPropVal] = useRecoilState(setTodoToUpdate);

  const [formData, setFormData] = useState<FormData>({
    title: propVal.title,
    subject: propVal.subject || "default",
    description: propVal.description,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setUpdateVal(false);
  };

  const handleUpdateTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, subject, description } = formData;
    const response = await fetch(
      `http://localhost:5000/api/todo/updatetodo/${propVal.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, subject, description }),
      }
    );
    const data = await response.json();

    console.log(data.title + " " + data.subject + " " + data.description);

    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === propVal.id ? data : todo))
    );

    setUpdateVal(false);
  };

  return (
    <div className="fixed left-0 top-0 bg-black bg-opacity-20 w-screen h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg w-1/5 h-1/2 mt-10">
        <form onSubmit={handleUpdateTodo}>
          <button className="m-4 " onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <h1 className="flex justify-center text-xl font-bold m-4 underline underline-offset-4">
            Update Todo
          </h1>
          <label htmlFor="" className="m-5 text-lg">
            Title
          </label>
          <br />
          <input
            className="border border-black mt-2 ml-5 h-10 rounded-md w-10/12 pl-2"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          ></input>
          <br />
          <label className="m-5 text-lg">Subject</label>
          <br />
          <input
            className="border border-black mt-2 ml-5 h-10 rounded-md w-10/12 pl-2"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
          <br />
          <label className="m-5 text-lg">Desription</label>
          <br />
          <input
            className="border border-black mt-2 ml-5 h-10 rounded-md w-10/12 pl-2"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <button className="bg-blue-800 mt-5 ml-5 mb-5 h-10 w-10/12 rounded-xl text-white hover:bg-neutral-500">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Updatemodel;
