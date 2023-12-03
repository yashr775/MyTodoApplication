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

    // setTodos((prevTodoData) => ({
    //   ...prevTodoData,
    //   [name]: value,
    // }));

    // setTodos((prevTodoData) => [
    //   ...prevTodoData,
    //   {
    //     title: name === "title" ? value : formData.title,
    //     subject: name === "subject" ? value : formData.subject,
    //     description: name === "description" ? value : formData.description,
    //   },
    // ]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, subject, description } = formData;

    const response = await fetch("http://localhost:5000/api/todo/createtodo", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("auth-token") ?? " ",
      },
      body: JSON.stringify({ title, subject, description }),
    });

    const responseData = await response.json();

    console.log(responseData.id);

    setTodos((prevTodoData) => [
      ...prevTodoData,
      {
        id: responseData.id,
        title: title,
        subject: subject,
        description: description,
      },
    ]);

    setFormData({
      title: "",
      subject: "",
      description: "",
    });
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
      (temp: {
        id: number;
        title: string;
        subject?: string;
        description: string;
      }) => {
        const obj = {
          id: temp.id,
          title: temp.title,
          subject: temp.subject,
          description: temp.description,
        };

        return obj;
      }
    );

    setTodos(tempTodo);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-pink-100 h-full w-screen">
      <Navbar></Navbar>
      <div className="items-center h-screen flex flex-col  ">
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
        <div
          className="
        mt-10 grid grid-cols-4 gap-4 h-1/4 flex-content-0 "
        >
          {todos.length === 0 ? (
            <div>No Notes to display</div>
          ) : (
            todos.map((todo) => {
              return (
                <Usertodo
                  id={todo.id}
                  title={todo.title}
                  subject={todo.subject}
                  description={todo.description}
                  col-span-3
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
