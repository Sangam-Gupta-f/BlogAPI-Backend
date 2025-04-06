import { createBlog, deleteBlog, updateBlog,getAllBlog,getBlog } from "../controllers/blogController.js";

import express from "express"

const blogRouter=express.Router();

blogRouter.route("/").post(createBlog);
blogRouter.route('/:id').delete(deleteBlog);
blogRouter.route('/:id').put(updateBlog);
blogRouter.route('/').get(getAllBlog);
blogRouter.route('/:id').get(getBlog);

export default blogRouter;