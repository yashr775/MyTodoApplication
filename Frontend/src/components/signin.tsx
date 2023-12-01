/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, FormEvent, useState } from "react";
import Navbar from "./navbar";

interface FormData {
  email: string;
  password: string;
}

const Signin: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmitClick = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = formData;

    const response = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (json.success === true) {
      localStorage.setItem("auth-token", json.token);
      window.location.href = "/userprofile";
    } else {
      console.log("Danger Invalid details");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-pink-200 flex justify-center items-center h-screen">
        <form
          className="bg-white opacity-100 rounded-3xl p-2 w-1/5 border border-black "
          onSubmit={handleSubmitClick}
        >
          <h1 className="flex justify-center mt-4 text-2xl t">Sign In</h1>
          <br />
          <label htmlFor="" className="text-xl ml-6">
            Email:
          </label>
          <br />
          <input
            className="border border-black w-80 h-9 ml-6"
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          ></input>{" "}
          <br />
          <label htmlFor="name" className="text-xl ml-6">
            Password
          </label>
          <br />
          <input
            className="border border-black w-80 h-9 ml-6"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />{" "}
          <br />
          <button
            className="flex justify-center text-lg bg-blue-800 mt-2 rounded-md pb-2 pt-2 mb-4 w-80 h-9 ml-6
           text-white hover:bg-blue-950  "
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
