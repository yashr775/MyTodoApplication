import { useEffect } from "react";

interface todolist {
  title: string;
  subject?: string;
  description: string;
}

// interface UserTodo {
//   todo: todolist;
// }

const Usertodo: React.FC<todolist> = (props: todolist) => {
  const displYprops = () => {
    console.log(props);
  };

  useEffect(() => {
    displYprops();
  }, []);

  return (
    <div>
      <div>{props.title} </div>
    </div>
  );
};

export default Usertodo;
