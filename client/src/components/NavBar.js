import { useState, useEffect } from "react";
import LoginOrRegister from "./LoginOrRegister";

const NavBar = ({ setCount, count, setCurrentTab }) => {
  const tabs = ["Home", "Posts", "Users", "Get a Random Post"];
  const [allUsers, setAllUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch("http://localhost:4000/users");
    const data = await response.json();
    setAllUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, [allUsers]);

  return (
    <>
      <LoginOrRegister allUsers={allUsers}/>
      <div className="nav-bar">
        {tabs.map((tab, index) => {
          return (
            <button
              key={index}
              className="nav-tab"
              onClick={
                tab === "Get a Random Post"
                  ? () => {
                      setCurrentTab(tab);
                      setCount(count + 1);
                    }
                  : () => {
                      setCurrentTab(tab);
                    }
              }
            >
              {tab}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default NavBar;
