const express = require('express');
const router = express.Router();
const {ListPosts} = require('./blog-post-model');


//Get all posts in DB
router.get('/blog-posts', (req, res) => {
	
	let allPosts = ListPosts.get()

	if(allPosts){
		res.status(200).json({
		message : "Succesfully sent the list of blog posts",
		status : 200,
		posts : allPosts
	}); 
	}
	else{
		res.status(500).json({
			message : `Internal server error.`,
			status : 500
		});
	}
	
});


//Get all posts by author in DB
router.get('/blog-posts/:author', (req, res, next) => {
	let authorName = req.params.author;

	let postsArray = ListPosts.getByAuthor(authorName);

	if(!postsArray){
		res.status(500).json({
			message : `Internal server error.`,
			status : 500
		});
		return next();
	}

	if (postsArray == 406) {
		res.status(406).json({
			message : "Error: missing arguments",
			status : 406
		});
		return next();
	}
	else if (postsArray == 404) {
		res.status(404).json({
			message : "Error: author not found",
			status : 404 
		});
		return next();
	}
	else if (authorsPosts.length > 0) {
		res.status(200).json({
			message : "Succesfully sent the list of author's posts",
			status: 200,
			posts : authorsPosts
		});
	}
});

//Add a new entry to the blog DB
router.post('/blog-posts', (req, res, next) => {
	let postTitle = req.body.title; 
	let postContent = req.body.content;
	let postAuthor = req.body.author;
	let postDate = req.body.publishDate;

	let post = ListPosts.create(postTitle, postContent, postAuthor, postDate);

	if(!post){
		res.status(500).json({
			message : `Internal server error.`,
			status : 500
		});
		return next();
	}

	if (post == 406) {
		res.status(406).json({
			message : "Error: Missing fields",
			status : 406,
		});	
		return next();	
	}
	else{
		res.status(201).json({
			message: "Succesfully posted Blog Post",
			status : 201,
			post : post
		});
	}

});

//Delete an entry from the DB
router.delete('/blog-posts/:id', (req, res, next) => {
	let idPath = req.params.id;
	let idBody = req.body.id;

	//Validate that both params where received. Send error with status 406 "Missing fields"
	if(idBody == undefined || idBody != idPath){
		res.status(406).json({
			message : "Error: Missing fields or id not matching",
			status : 406,
		});	
		return next();
	}

	let responseCode = ListPosts.remove(idBody);

	if(!responseCode){
		res.status(500).json({
			message : `Internal server error.`,
			status : 500
		});
		return next();
	}

	if(responseCode == 404){
		res.status(404).json({
			message : "Error: ID doesn't exist",
			status : 404,
		});	
		return next();
	}
	else if (responseCode == 204){
		res.status(204).json({
			message : "Successfully deleted post",
			status : 204,
		});
	}	

});


router.put('/blog-posts/:id', (req, res, next) => {
	let postId = req.params.id;
	let updateObj = req.body;

	let responseCode = ListPosts.update(postId, updateObj);

	if (!responseCode) {
		res.status(500).json({
			message : `Internal server error.`,
			status : 500
		});
		return next();
	}
	else if (responseCode == 406) {
		res.status(406).json({
			message : "Error: missing id",
			status : 406
		});
		return next();
	}
	else if (responseCode == 405) {
		res.status(404).json({
			message : "Error: missing fields in body",
			status : 404
		});
		return next();
	}
	else if (responseCode == 404){
		res.status(404).json({
			message : "Id not found",
			status : 404 
		});
		return next();
	}
	else {
		res.status(200).json({
			message : `Object ${postId} was updated`,
			status : 200,
			post : responseCode
		});
	}

});


module.exports = router;
