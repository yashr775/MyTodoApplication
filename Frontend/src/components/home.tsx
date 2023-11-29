import Navbar from "./navbar";

const home = () => {
  const handleSignInClick = () => {
    window.location.href = "/signin";
  };

  const handleSignUpClick = () => {
    window.location.href = "/signup";
  };

  return (
    <div>
      <Navbar></Navbar>
      <main className="bg-fuchsia-100 flex justify-around">
        <div className="main py-40 pl-9">
          <div className="text-6xl">Take Control of your time</div>
          <p className="py-3 w-1/3">
            The pain of discipline is uncomfortable but the pain of regret in
            unbearable. Take your decision wisely. Choise is yours
          </p>
          <div>
            <button
              className="bg-blue-900 rounded-2xl px-4 py-2 text-white hover:text-slate-900 hover:bg-blue-700"
              onClick={handleSignInClick}
            >
              Sign In
            </button>
            <span className="mx-2"></span>
            <button
              className="bg-blue-900 rounded-2xl px-4 py-2 text-white hover:text-slate-900 hover:bg-blue-700"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <img src="/gif/todo.gif" alt="Animated GIF"></img>
        </div>
      </main>
    </div>
  );
};

export default home;
