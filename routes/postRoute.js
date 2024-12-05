const nnamdiPost = require('../model/nnamdiPost')
const nnamdiUser = require('../model/nnamdiUser')
const express = require('express');
const router = express.Router();


router.post('/create_post', async(req,res) => {
    const postData = req.body;

    try {
        if(postData.title === "" || postData.content === ""|| postData.category === "" || postData.image === "" || postData.author === ""){
            return res.status(403).json({message: " please fill the required fields"})
        }

        const newPost = new nnamdiPost(postData);

        const savedPost = await newPost.save()

        return res.status(200).json({message: "post successfuly updated", post: savedPost})
    } catch (error) {
        return res.status(500).json({error: "error creating post", errorDetail: error.message})
    }



})

router.get('/posts', async(req, res) => {
    const posts = await nnamdiPost.find().populate('author', 'username email');
    return res.status(200).json({posts: posts})
})

router.get('/post/:_id', async(req, res) => {
     const {_id} = req.params
    try {
        const post = await nnamdiPost.findById(_id).populate('author', 'username email');
        if (!post) {
          return res.status(404).json({message: "post not found"})
        }
        return res.status(200).json({post: post});
      } catch (error) {
        return res.status(500).json({error: error.message})
      }
})



module.exports = router
