const commentRouter = require("express").Router({ mergeParams: true });
const Comment = require("../models/comment");
const Blog = require("../models/blog");

commentRouter.get("/", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).send({ error: "Blog not found" });
  }
  const comments = await Comment.find({ _id: { $in: blog.comments } });
  console.log("Comments: ", comments);
  response.json(comments);
});

commentRouter.post("/", async (request, response) => {
  console.log("Comment reqParams: ", request.params);
  const blog = await Blog.findById(request.params.id);
  const comment = new Comment({
    content: request.body.content,
    blogId: blog._id,
  });
  const savedComment = await comment.save();
  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();
  response.status(201).json(savedComment);
});

module.exports = commentRouter;
