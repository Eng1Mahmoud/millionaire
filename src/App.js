import axios from "axios";
import { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min";

function App() {
  const [img, setImg] = useState([]);
  console.log(img);

  const fetch = async () => {
    try {
      const res = await axios.get("http://localhost:4000/user");
      setImg(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const execut = async () => {
      fetch();
    };
    execut();
    console.log("hello");
  }, []);

  return (
    <div className="App">

    </div>
  );
}

export default App;
