const navbar = () => {
  return (
    <nav className="bg-purple-800 text-white flex justify-between">
      <div className="pl-7 pt-4 text-2xl cursor-pointer">Home</div>
      <div className="pt-4 text-2xl cursor-pointer">My Todo</div>
      <ul className="px-28 py-4 flex space-x-7 justify-end">
        <li>
          <button className="bg-blue-900 rounded-lg px-3 py-2 ">SignIn</button>
        </li>
        <li>
          <button className="bg-blue-900 rounded-lg px-3 py-2">SignUp</button>
        </li>
      </ul>
    </nav>
  );
};

export default navbar;
