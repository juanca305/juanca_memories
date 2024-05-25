import  mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

//Each callback function is going to have a try catch block
export const getPosts = async (req, res) => {
    //res.send('THIS WORKS');
    try {
        const postMessages = await PostMessage.find();
        //console.log(postMessages);
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query
    try {
        //We converted it in a reg expression because it's easier for mongodb and mongoose to search the database
        const title = new RegExp(searchQuery, 'i'); // TEST test (gonna be the same)

        // Find to me all the posts that match one of those two criteria. The first one is the title and the second one is
        //one of the tags in the array of tags equal to our tag.
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') }}]});
        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// https://www.restapitutorial.com/httpstatuscodes.html

export const createPosts = async (req, res) => {
    //res.send('Post Creation');
    const post = req.body;
    console.log('req.body from create post', req.body);
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});
    try {
        await newPost.save();

        //Successful creation
        res.status(201).json(newPost);
    } catch (error) {
        //If not successful
        res.status(409).json({ message: error.message });
    }
}

// export const updatePost = async (req, res) => {
//     const { id } = req.params;
//     const { post } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
//     const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true});
//     res.json(updatePost);
// }

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);
    //console.log('DELETE!');

    res.json({ message: 'Post deleted successfully'});
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: 'Unauthenticated' })

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        //likes the post.
        post.likes.push(req.userId)
    } else {
        //dislike a post.
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    
    
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}