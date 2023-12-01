import { navIcon1 } from "../atoms";
import { useRecoilValue } from "recoil";

const Navbar = () => {
  const loginvalue = useRecoilValue(navIcon1);

  const handleSignInClick = () => {
    window.location.href = "/signin";
  };

  const handleSignUpClick = () => {
    window.location.href = "/signup";
  };

  const handleSignOutClick = () => {
    localStorage.removeItem("auth-token");
    window.location.href = "/";
  };

  const handleHomeClick = () => {
    window.location.href = "/";
  };

  return (
    <nav className="bg-purple-800 text-white flex justify-between">
      <div
        className="pl-7 pt-4 text-2xl cursor-pointer"
        onClick={handleHomeClick}
      >
        Home
      </div>
      <div className="pt-4 text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">
        My Todo
      </div>
      <ul className="px-28 py-4 flex space-x-7 justify-end">
        <li>
          {loginvalue ? (
            <button
              className="bg-blue-900 rounded-lg px-3 py-2 hover:text-slate-900 hover:bg-blue-700"
              onClick={handleSignOutClick}
            >
              Sign Out
            </button>
          ) : (
            <button
              className="bg-blue-900 rounded-lg px-3 py-2 hover:text-slate-900 hover:bg-blue-700"
              onClick={handleSignInClick}
            >
              Sign In
            </button>
          )}
        </li>
        <li>
          {loginvalue ? (
            ""
          ) : (
            <button
              className="bg-blue-900 rounded-lg px-3 py-2 hover:text-slate-900 hover:bg-blue-700"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
