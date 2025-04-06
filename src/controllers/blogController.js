import { Blog } from "../models/Blog.js"

const createBlog=async(req, res)=>{
    try {
        const {tilte, content, author}=req.body;
        const blog= await Blog.create({tilte, content, author: req.user._id});
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({
            message:`${error}`
        })
    }
}

const getAllBlog=async(req,res)=>{
    const blog=await Blog.find().populate('author', 'name');
    if(!blog)return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
}

const getBlog=async(req,res)=>{
    const blog=await Blog.findById(req.params.id).populate('author', 'name');
    if (!blog) return res.status(404).json({ message: "Blog not found" });
     res.json(blog);
}

const updateBlog=async(req,res)=>{
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized" });
      }
    const updatedBlog=await Blog.findByIdAndUpdate(req.params.id,req.body,{new :true})  
    res.status(201).json(updatedBlog);
}

const deleteBlog=async(req,res)=>{
    const blog=await Blog.findById(req.params.id);
    if(!blog || blog.author.toString() !==req.user._id.toString())
        return res.status(403).json({ message: "Not authorized" });
    await blog.deleteOne();
    res.status(201).json({ message: "Blog deleted" });
}

export {createBlog, getAllBlog,getBlog, updateBlog, deleteBlog}