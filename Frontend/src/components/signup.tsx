import { ChangeEvent, FormEvent, useState } from "react";
import Navbar from "./navbar";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
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

    try {
      console.log("Form Data:", formData);
      const { name, email, password } = formData;
      const response = await fetch(
        "http://localhost:5000/api/user/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const json = await response.json();

      if (json.success === true) {
        localStorage.setItem("auth-token", json.token);
      } else {
        console.log("danger Invalid details");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-pink-200 flex justify-center items-center h-screen">
        <form
          className="bg-white opacity-100 rounded-3xl p-2 w-1/5 border border-black "
          onClick={handleSubmitClick}
        >
          <h1 className="flex justify-center pt-2 pb-2 text-2xl t">Register</h1>
          <label htmlFor="name" className="text-xl ml-6 ">
            Name:
          </label>
          <br />
          <input
            className="border border-black w-80 h-9 ml-6"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />{" "}
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
            type="text"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />{" "}
          <br />
          <button className="flex justify-center text-lg bg-blue-800 mt-4 rounded-md pb-2 pt-1 mb-4  w-80 h-9 ml-6 text-white hover:bg-blue-950  ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
