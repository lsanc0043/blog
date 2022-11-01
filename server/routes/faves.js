import db from "../db/db-connection.js";
import { Router } from "express";

const route = Router();

route.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const allFaves = await db.any(
      "SELECT faves.*, posts.*, users.username FROM posts JOIN users ON posts.user_id=users.id JOIN faves ON posts.id=faves.post_id WHERE faves.user_id=$1",
      [id]
    );
    res.send(allFaves);
  } catch (e) {
    console.log("get faves", e);
    res.status(400).send({ e });
  }
});

route.post("/", async (req, res) => {
  const faveInfo = {
    post_id: req.body.postId,
    user_id: req.body.userId,
  };
  // console.log(faveInfo);
  try {
    const entry = await db.any(
      "SELECT * FROM faves WHERE post_id=$1 AND user_id=$2",
      [faveInfo.post_id, faveInfo.user_id]
    );
    console.log(entry);
    if (entry.length === 0) {
      const createFave = await db.any(
        "INSERT INTO faves(post_id, user_id) VALUES ($1, $2)",
        [faveInfo.post_id, faveInfo.user_id]
      );
      res.send(createFave);
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

route.delete("/:postid/:userid", (req, res) => {
  const postid = req.params.postid;
  const userid = req.params.userid;
  console.log([postid, userid]);
  try {
    const deletedUser = db.query(
      "DELETE FROM faves WHERE post_id=$1 AND user_id=$2",
      [postid, userid]
    );
  } catch (e) {
    console.log("delete user", e);
    res.status(400).send({ e });
  }
});

export default route;
