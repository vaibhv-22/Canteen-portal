import { useState, useEffect } from "react";

const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName("VAIBHV");
  }, []);

  return <div style={{ textAlign: "center" }}>Welcome to My Canteen Portal - {name}</div>;
};

export default Home;
