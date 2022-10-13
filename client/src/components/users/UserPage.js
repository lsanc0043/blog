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
  }, [userInfo]);

  const removeUser = async (e) => {
    const response = await fetch(
      `http://localhost:4000/users/${e.currentTarget.value}`,
      {
        method: "DELETE",
      }
    );
    await response.json();
    setUserInfo(
      userInfo.filter((user) => user.id !== Number(e.currentTarget.value))
    );
  };

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
    await response.json();
  };

  const editUser = async (e) => {
    const response = await fetch(
      `http://localhost:4000/users/${e.currentTarget.value}`,
      {
        method: "PUT",
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
      }
    );
    await response.json();
  };

  return (
    <div className="all-users">
      {userInfo.map((user, index) => {
        return (
          <div key={index}>
            <h1>
              {user.firstname} {user.lastname}
            </h1>
            <img
              className="pfp"
              src={user.pfp}
              alt={`${user.firstname} ${user.lastname}'s profile`}
              draggable="true"
            />
            <button value={user.id} onClick={editUser}>
              Edit
            </button>
            <button value={user.id} onClick={removeUser}>
              Delete
            </button>
          </div>
        );
      })}
      <button onClick={makeUser}>Add User</button>
    </div>
  );
};

export default UserPage;
