import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { useState } from "react";
import NavBar from "./components/NavBar";
import AllPosts from "./components/posts/AllPosts";
import UserPage from "./components/users/UserPage";
import UserPosts from "./components/users/UserPosts";
import UserFaves from "./components/users/UserFaves";
import OtherUsers from "./components/users/OtherUsers";

function App() {
  const [count, setCount] = useState(0);
  const [currentTab, setCurrentTab] = useState("");
  const [specificPage, setSpecificPage] = useState("");
  const [validLogin, setValidLogin] = useState(false);
  const [logout, setLogout] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const [user, setUser] = useState({});

  const checkLogin = (childData) => {
    setValidLogin(childData);
  };

  const deleteLogOut = (childData) => {
    setLogout(childData);
  };

  const getUser = (childData) => {
    console.log(childData);
    setUser(childData);
  };

  const userInfo = (childData) => {
    console.log(childData);
    setLoggedUser(childData);
  };

  return (
    <div className="App">
      <NavBar
        setCount={setCount}
        count={count}
        setCurrentTab={setCurrentTab}
        checkLogin={checkLogin}
        userInfo={userInfo}
        logout={logout}
      />
      {(() => {
        switch (currentTab) {
          case "":
          case "Posts":
            return (
              <AllPosts
                action={0}
                validLogin={validLogin}
                loggedUser={loggedUser}
              />
            );
          case "Add Post":
            return (
              <AllPosts
                action={"addPost"}
                validLogin={validLogin}
                loggedUser={loggedUser}
              />
            );
          case "User":
            return <UserPage loggedUser={loggedUser} logout={deleteLogOut} />;
          case "UserPosts":
            return (
              <UserPosts
                setCurrentTab={setCurrentTab}
                setSpecificPage={setSpecificPage}
                loggedUser={loggedUser}
              />
            );
          case "UserFaves":
            return (
              <UserFaves
                setCurrentTab={setCurrentTab}
                setSpecificPage={setSpecificPage}
                loggedUser={loggedUser}
              />
            );
          case "Get a Random Post":
            return (
              <AllPosts
                action={count}
                validLogin={validLogin}
                loggedUser={loggedUser}
              />
            );
          case "Specific Post":
            return (
              <AllPosts
                action={specificPage.toString()}
                validLogin={validLogin}
                loggedUser={loggedUser}
              />
            );
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default App;
