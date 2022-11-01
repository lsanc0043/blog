import { useState, useEffect } from "react";
import LoginOrRegister from "./LoginOrRegister.js";

const NavBar = ({
  setCount,
  count,
  setCurrentTab,
  checkLogin,
  userInfo,
  logout,
}) => {
  const tabs = ["Posts", "Add Post", "Get a Random Post"];
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
      <LoginOrRegister
        allUsers={allUsers}
        checkLogin={checkLogin}
        userInfo={userInfo}
        setCurrentTab={setCurrentTab}
        logout={logout}
      />
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
