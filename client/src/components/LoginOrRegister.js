import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

const LoginOrRegister = ({
  allUsers,
  checkLogin,
  userInfo,
  setCurrentTab,
  logout,
}) => {
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [validLogin, setValidLogin] = useState(false);
  const [error, setError] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const userAvailable = [0];
  const passwordValidity = [0, 0, 0, 0];
  const [loginInfo, setLoginInfo] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const loginModal = () => {
    setShow(true);
    setLogin(true);
    setRegister(false);
    setError("");
  };

  const registerModal = () => {
    setShow(true);
    setLogin(false);
    setRegister(true);
    setError("");
  };

  const logoutAccount = () => {
    setValidLogin(false);
    checkLogin(false);
    setCurrentTab("");
    setLoginInfo({
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  useEffect(() => {
    if (logout) {
      logoutAccount();
    }
  }, [logout]);

  const set = (keyProp) => {
    if (register) {
      if (
        allUsers.filter(
          (user) =>
            user.username.toLowerCase() === loginInfo.username.toLowerCase()
        ).length > 0
      ) {
        userAvailable[0] = 1;
      }
      if (loginInfo.password.length >= 8) {
        passwordValidity[0] = 1;
      }
      if (loginInfo.password.search(/[A-Z]/) !== -1) {
        passwordValidity[1] = 1;
      }
      if (loginInfo.password.search(/[0-9]/) !== -1) {
        passwordValidity[2] = 1;
      }
      if (loginInfo.password === loginInfo.confirmPassword) {
        passwordValidity[3] = 1;
      }
    }
    return ({ target: { value } }) => {
      setLoginInfo((originalValues) => ({
        ...originalValues,
        [keyProp]: value,
      }));
    };
  };

  const submitInfo = async () => {
    // console.log(loginInfo);
    if (login && !register) {
      const user = allUsers.filter(
        (eachUser) =>
          eachUser.username === loginInfo.username &&
          eachUser.password === loginInfo.password
      );
      if (user.length > 0) {
        setShow(false);
        setValidLogin(true);
        checkLogin(true);
        userInfo(user[0]);
      } else {
        if (
          !allUsers
            .map((eachUser) => eachUser.username)
            .includes(loginInfo.username)
        ) {
          setError("Please enter a valid username or ");
        }
        if (
          allUsers
            .map((eachUser) => eachUser.username)
            .includes(loginInfo.username) &&
          !allUsers
            .map((eachUser) => eachUser.password)
            .includes(loginInfo.password)
        ) {
          setError("Wrong password!");
        }
      }
    } else {
      if (passwordValidity.every((val) => val === 1)) {
        const response = await fetch("http://localhost:4000/users", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: loginInfo.username,
            password: loginInfo.password,
            firstname: loginInfo.fullname.split(" ")[0],
            lastname: loginInfo.fullname.split(" ")[1] || "",
            pfp: "",
          }),
        });
        await response.json();
        loginModal();
      } else {
        setError("Please check the requirements!");
      }
    }
  };

  return (
    <div className="header">
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {login && !register ? "Login!" : "Register"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {login && !register ? (
              <></>
            ) : (
              <>
                <label htmlFor="name">Full Name: </label> <br />
                <input
                  type="text"
                  id="name"
                  required
                  autoComplete="off"
                  value={loginInfo.fullname}
                  onChange={set("fullname")}
                />
                <br />
              </>
            )}
            <label htmlFor="username">Username:</label>
            <br />
            <input
              type="text"
              id="username"
              required
              minLength={4}
              maxLength={22}
              autoComplete="off"
              value={loginInfo.username}
              onChange={set("username")}
            />
            <p>{userAvailable[0] === 0 ? "" : "Username already taken."}</p>
            <br />
            <label htmlFor="password">Password: </label> <br />
            <input
              type={viewPassword ? "text" : "password"}
              id="password"
              required
              minLength={8}
              maxLength={22}
              autoComplete="off"
              value={loginInfo.password}
              onChange={set("password")}
            />
            <i
              className="fa fa-eye"
              aria-hidden="true"
              onMouseOver={() => setViewPassword(true)}
              onMouseLeave={() => setViewPassword(false)}
            ></i>
            {login && !register ? (
              <></>
            ) : (
              <>
                <br />
                <label htmlFor="confirm-password">Confirm Password:</label>
                <br />
                <input
                  type={viewPassword ? "text" : "password"}
                  id="confirm-password"
                  required
                  autoComplete="off"
                  value={loginInfo.confirmPassword}
                  onChange={set("confirmPassword")}
                />
                <i
                  className="fa fa-eye"
                  aria-hidden="true"
                  onMouseOver={() => setViewPassword(true)}
                  onMouseLeave={() => setViewPassword(false)}
                ></i>
              </>
            )}
          </form>
          <div
            style={{ display: login && !register ? "none" : "block" }}
            className="pw-requirements"
          >
            <p>Password Requirements: </p>
            minimum 8 characters
            <svg viewBox="0 0 26 26" width="20px">
              {passwordValidity[0] === 0 ? (
                <>
                  <path className="ex" d="M 18 7 L 7 18"></path>
                  <path className="ex" d="M 7 7 L 18 18"></path>
                </>
              ) : (
                <path
                  className="checks"
                  d="M6.5 13.5L10 17 l8.808621-8.308621"
                />
              )}
            </svg>
            <br />
            at least one uppercase letter
            <svg viewBox="0 0 26 26" width="20px">
              {passwordValidity[1] === 0 ? (
                <>
                  <path className="ex" d="M 18 7 L 7 18"></path>
                  <path className="ex" d="M 7 7 L 18 18"></path>
                </>
              ) : (
                <path
                  className="checks"
                  d="M6.5 13.5L10 17 l8.808621-8.308621"
                />
              )}
            </svg>
            <br />
            at least one number
            <svg viewBox="0 0 26 26" width="20px">
              {passwordValidity[2] === 0 ? (
                <>
                  <path className="ex" d="M 18 7 L 7 18"></path>
                  <path className="ex" d="M 7 7 L 18 18"></path>
                </>
              ) : (
                <path
                  className="checks"
                  d="M6.5 13.5L10 17 l8.808621-8.308621"
                />
              )}
            </svg>
            <br />
            both passwords match
            <svg viewBox="0 0 26 26" width="20px">
              {passwordValidity[3] === 0 ? (
                <>
                  <path className="ex" d="M 18 7 L 7 18"></path>
                  <path className="ex" d="M 7 7 L 18 18"></path>
                </>
              ) : (
                <path
                  className="checks"
                  d="M6.5 13.5L10 17 l8.808621-8.308621"
                />
              )}
            </svg>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {error}
          <Button
            variant="secondary"
            onClick={() => {
              setLoginInfo({
                username: "",
                password: "",
              });
              setRegister(true);
              setError("");
            }}
            style={{
              display: register ? "none" : "block",
            }}
          >
            Register
          </Button>
          <Button variant="secondary" onClick={submitInfo}>
            Enter
          </Button>
        </Modal.Footer>
      </Modal>
      <h1 className="blog-title">I Like Big Books and I Cannot Lie</h1>
      <div>
        {validLogin ? (
          <>
            <div className="login-bar">
              Welcome,&nbsp;
              <span style={{ color: "white" }}>{loginInfo.username}</span>
              <Dropdown>
                <Dropdown.Toggle className="settings">
                  <i className="fa fa-cog" aria-hidden="true"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setCurrentTab("User")}>
                    Edit Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setCurrentTab("UserPosts")}>
                    See Posts
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setCurrentTab("UserFaves")}>
                    See Favorites
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logoutAccount}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </>
        ) : (
          <>
            <button onClick={loginModal}>Login</button> or
            <button onClick={registerModal}>Register</button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginOrRegister;
