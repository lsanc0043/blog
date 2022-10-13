import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { useState } from "react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import AllPosts from "./components/posts/AllPosts";
import UserPage from "./components/users/UserPage";

function App() {
  const [count, setCount] = useState(0);
  const [currentTab, setCurrentTab] = useState("");
  return (
    <div className="App">
      <NavBar setCount={setCount} count={count} setCurrentTab={setCurrentTab} />
      {(() => {
        switch (currentTab) {
          case "":
          case "Home":
            return <Home />;
          case "Users":
            return <UserPage />;
          case "Posts":
            return <AllPosts path={0} />;
          case "Get a Random Post":
            return <AllPosts path={count} />;
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default App;
