import { useRecoilState } from "recoil";
import Navbar from "./navbar";
import { navIcon1 } from "../atoms";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface FormData {
  title: string;
  subject: string;
  description: string;
}

const Userprofile = () => {
  const [loginValue, setLoginValue] = useRecoilState(navIcon1);

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

  return (
    <div>
      <Navbar></Navbar>
      <div className="bg-pink-100   items-center h-screen ">
        <form
          className="bg-white absolute top-36 left-1/2 transform -translate-x-1/2 rounded-lg w-1/5 "
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
      </div>
    </div>
  );
};

export default Userprofile;
