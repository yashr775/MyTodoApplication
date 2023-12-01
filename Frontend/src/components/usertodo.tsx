interface todolist {
  title: string;
  subject?: string;
  description: string;
}

interface UserTodo {
  todo: todolist;
}

const Usertodo: React.FC<UserTodo> = () => {
  return <div>usertodo</div>;
};

export default Usertodo;
