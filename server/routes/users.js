import db from "../db/db-connection.js";
import { Router } from "express";

const route = Router();

route.get("/", async (req, res) => {
  try {
    const allUsers = await db.any("SELECT * FROM users ORDER BY id", [true]);
    res.send(allUsers);
  } catch (e) {
    console.log("get users", e);
    res.status(400).send({ e });
  }
});

route.post("/", async (req, res) => {
  const userInfo = {
    username: req.body.username,
    password: req.body.password,
    pfp: req.body.pfp,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  console.log(userInfo);
  try {
    if (userInfo.pfp !== "") {
      const createdUser = await db.any(
        "INSERT INTO users(username, password, firstname, lastname, pfp) VALUES($1, $2, $3, $4, $5)",
        [
          userInfo.username,
          userInfo.password,
          userInfo.firstname,
          userInfo.lastname,
          userInfo.pfp,
        ]
      );
      res.send(createdUser);
    } else {
      const createdUser = await db.any(
        "INSERT INTO users(username, password, firstname, lastname) VALUES($1, $2, $3, $4)",
        [
          userInfo.username,
          userInfo.password,
          userInfo.firstname,
          userInfo.lastname,
        ]
      );
      res.send(createdUser);
    }
  } catch (e) {
    console.log("post user", e);
    res.status(400).send({ e });
  }
});

route.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const userInfo = {
    pfp: req.body.image,
    description: req.body.description,
  };
  console.log("line 64, put request", [id, userInfo]);
  try {
    if (userInfo.pfp !== "") {
      await db.any("UPDATE users SET pfp=$1, description=$2 WHERE id=$3", [
        userInfo.pfp,
        userInfo.description,
        id,
      ]);
    } else {
      await db.any("UPDATE users SET description=$1 WHERE id=$2", [
        userInfo.description,
        id,
      ]);
    }
  } catch (e) {
    console.log("put user", e);
    res.status(400).send({ e });
  }
});

route.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  try {
    const deletedUser = await db.query("DELETE FROM users WHERE id=$1", [id]);
    const deleteFaves = await db.query("DELETE FROM faves WHERE user_id=$1", [
      id,
    ]);
    const deletePosts = await db.query("DELETE FROM posts WHERE user_id=$1", [
      id,
    ]);
  } catch (e) {
    console.log("delete user", e);
    res.status(400).send({ e });
  }
});

export default route;
