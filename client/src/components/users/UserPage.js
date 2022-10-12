import { useState, useEffect } from "react";

const UserPage = () => {
  const [userInfo, setUserInfo] = useState([]);

  const getUsers = async () => {
    const response = await fetch("http://localhost:4000/users");
    const data = await response.json();
    setUserInfo(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const makeUser = async () => {
    const response = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "lsanc0043",
        password: "testpass",
        firstname: "Linda",
        lastname: "Sanchez",
        pfp: "",
      }),
    });
    const data = await response.json();
  };

  return (
    <>
      {userInfo.map((user, index) => {
        return (
          <>
            <h1>
              {user.firstname} {user.lastname}
            </h1>
            <img
              className="pfp"
              src={user.pfp}
              alt={`${user.firstname} ${user.lastname}'s profile`}
            />
          </>
        );
      })}
      <button onClick={makeUser}>Add User</button>
    </>
  );
};

export default UserPage;
