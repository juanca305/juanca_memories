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

// https://www.restapitutorial.com/httpstatuscodes.html

export const createPosts = async (req, res) => {
    //res.send('Post Creation');
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();

        //Successful creation
        res.status(201).json(newPost);
    } catch (error) {
        //If not successful
        res.status(409).json({ message: error.message });
    }
}