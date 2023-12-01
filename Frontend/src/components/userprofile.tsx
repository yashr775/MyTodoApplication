import { useRecoilState } from "recoil";
import Navbar from "./navbar";
import { navIcon1, TodoListState } from "../atoms";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Usertodo from "./usertodo";

interface FormData {
  title: string;
  subject: string;
  description: string;
}

const Userprofile = () => {
  const [loginValue, setLoginValue] = useRecoilState(navIcon1);
  const [todos, setTodos] = useRecoilState(TodoListState);

  useEffect(() => {
    setLoginValue(true);
    console.log(loginValue);
  }, []);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    subject: "",
    description: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setTodos((prevTodoData) => ({
      ...prevTodoData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, subject, description } = formData;
    console.log(localStorage.getItem("token"));

    const response = await fetch("http://localhost:5000/api/todo/createtodo", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("auth-token") ?? " ",
      },
      body: JSON.stringify({ title, subject, description }),
    });

    console.log(response.json);
  };

  const fetchData = async () => {
    const response = await fetch(
      "http://localhost:5000/api/todo/getalltodoforgivenuser",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") ?? " ",
        },
      }
    );

    const data = await response.json();

    const tempTodo = data.map(
      (temp: { title: string; subject?: string; description: string }) => {
        const obj = {
          title: temp.title,
          subject: temp.subject,
          description: temp.description,
        };

        return obj;
      }
    );

    setTodos(tempTodo);

    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-pink-100">
      <Navbar></Navbar>
      <div className="items-center h-screen flex flex-col items-center  ">
        <form
          className="bg-white rounded-lg w-1/5 mt-10  "
          onSubmit={handleSubmit}
        >
          <h1 className="flex justify-center text-xl font-bold m-4 underline underline-offset-4">
            Add Todo
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
            required
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
            required
          />
          <button className="bg-blue-800 mt-5 ml-5 mb-5 h-10 w-10/12 rounded-xl text-white hover:bg-neutral-500">
            Add Todo
          </button>
        </form>
        <br />
        <div className="">
          {todos.length === 0 ? (
            <div>No Notes to display</div>
          ) : (
            todos.map((todo) => {
              return <Usertodo todo={todo} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
