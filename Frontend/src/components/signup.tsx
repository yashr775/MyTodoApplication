import Navbar from "./navbar";

const signup = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-pink-200 flex justify-center items-center h-screen">
        <form className="bg-white opacity-100 rounded-3xl p-2 w-1/5 border border-black ">
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
            required
          />{" "}
          <br />
          <button className="flex justify-center text-lg bg-blue-800 mt-2 rounded-md pb-2 pt-2  w-80 h-9 ml-6 text-white hover:bg-blue-950  ">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default signup;
