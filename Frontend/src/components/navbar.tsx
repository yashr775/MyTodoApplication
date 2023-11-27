const navbar = () => {
  return (
    <nav className="bg-purple-800 text-white flex justify-between">
      <div className="pl-7 pt-4 text-2xl cursor-pointer">Home</div>
      <div className="pt-4 text-2xl font-bold">My Todo</div>
      <ul className="px-28 py-4 flex space-x-7 justify-end">
        <li>
          <button className="bg-blue-900 rounded-lg px-3 py-2 hover:text-slate-900 hover:bg-blue-700">
            Sign In
          </button>
        </li>
        <li>
          <button className="bg-blue-900 rounded-lg px-3 py-2 hover:text-slate-900 hover:bg-blue-700">
            Sign Up
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default navbar;
