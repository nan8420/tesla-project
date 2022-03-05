const express = require("express");
const { Post, User } = require("../models");
const { LoginStatus } = require("./Midlew");

const router = express.Router();

router.post("/", LoginStatus, async (req, res, next) => {
  // POST /post
  try {
    const post = await Post.create({
      subject: req.body.subject,
      content: req.body.content,
      UserId: req.user.id,
    });

    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/getsupports", async (req, res, next) => {
  // GET /posts
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    1;
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ["createdAt", "DESC"],
        ["createdAt", "DESC"],
      ],
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
