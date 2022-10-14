import { useState, useEffect } from "react";

const UserPage = ({ loggedUser, logout }) => {
  const [userInfo, setUserInfo] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editUserInfo, setEditUserInfo] = useState({
    image: "",
    description: "",
  });

  const getUsers = async () => {
    const response = await fetch("http://localhost:4000/users");
    const data = await response.json();
    setUserInfo(data.filter((val) => val.username === loggedUser.username)[0]);
  };

  useEffect(() => {
    getUsers();
  }, [userInfo]);

  useEffect(() => {
    setEditUserInfo({
      image: userInfo.pfp,
      description: userInfo.description,
    });
  }, [loggedUser, editMode]);

  const removeUser = async (e) => {
    logout(true);
    const response = await fetch(
      `http://localhost:4000/users/${e.currentTarget.value}`,
      {
        method: "DELETE",
      }
    );
    await response.json();
    // setUserInfo(
    //   userInfo.filter((user) => user.id !== Number(e.currentTarget.value))
    // );
  };

  const set = (keyProp) => {
    return ({ target: { value } }) => {
      setEditUserInfo((originalValues) => ({
        ...originalValues,
        [keyProp]: value,
      }));
      setUserInfo((originalValues) => ({
        ...originalValues,
        [keyProp]: value,
      }));
    };
  };

  const handleEdit = (e) => {
    console.log(editUserInfo);
    console.log(userInfo);
    if (editMode === false) {
      setEditMode(true);
    } else {
      editUser(e);
      setEditMode(false);
    }
  };

  const editUser = async (e) => {
    console.log(e.currentTarget.value);
    const response = await fetch(
      `http://localhost:4000/users/${e.currentTarget.value}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editUserInfo),
      }
    );
    await response.json();
  };

  return (
    <div className="all-users">
      <h1>{userInfo.username}</h1>
      <div className={editMode ? "edit-user" : "user"}>
        {editMode ? (
          <input
            type="text"
            id="image"
            value={editUserInfo.pfp}
            placeholder="Image URL"
            onChange={set("image")}
          />
        ) : (
          <img
            className="pfp"
            src={userInfo.pfp}
            alt={`${userInfo.firstname} ${userInfo.lastname}'s profile`}
            align="left"
          />
        )}
        {editMode ? (
          <textarea
            type="text"
            rows="15"
            cols="100"
            value={editUserInfo.description}
            placeholder="Type description"
            onChange={set("description")}
          />
        ) : (
          userInfo.description
        )}
      </div>
      <div className="slider-buttons">
        <button value={userInfo.id} onClick={handleEdit}>
          {editMode ? "Update" : "Edit"}
        </button>
        <button value={userInfo.id} onClick={removeUser}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default UserPage;
