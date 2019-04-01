const uuid = require('uuid');

let postsArray = [
	{
		id : uuid.v4(),
		title : "Article One",
		content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		author : "A guy",
		publishDate : new Date('2019-01-10T12:24:00')
	},
	{
		id : uuid.v4(),
		title : "Article One and a Half",
		content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		author : "A guy",
		publishDate : new Date('2019-02-10T12:24:00')
	},
	{
		id : uuid.v4(),
		title : "Article Two",
		content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." ,
		author : "Another dude",
		publishDate : new Date('2019-02-23T02:37:00')
	},
	{
		id : uuid.v4(),
		title : "Article Three",
		content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		author : "Some other guy",
		publishDate : new Date('2018-12-17T03:24:00')
	}
];

const ListPosts = {
	get : function(){
		return postsArray;
	},

	getByAuthor : function(author){
		if(!author){
			return 406;
		}

		let authorsPosts = [];
		postsArray.forEach( item => {
			if(item.author == author){
				authorsPosts.push(item);
			}
		});

		if(authorsPosts.length > 0){
			return authorsPosts;
		}
		else{
			return 404;
		}	
	},

	create : function(title, content, author, date){
		if (title == undefined || title == "" 
		|| content == undefined || content == "" 
		|| author == undefined || author == "" 
		|| date == undefined || date == "") {
			return 406;
		}

		let newPost = {
			id : uuid.v4(),
			title : title,
			content : content,
			author : author,
			publishDate : date
		};

		postsArray.push(newPost);

		return newPost;
	},

	remove : function(id){
		//Validate that the id received is in the current array.
		let found = false;
		postsArray.forEach(item => {
			if(item.id == id){
				found = true;
			}
		});

		//If id is found, delete the item. Else throw error
		if(found){
			postsArray.forEach((item, index, object) => {
				if(item.id == id){
					object.splice(index, 1);	
				}
			});

			return 204;
		}else{
			return 404;
		}
	},

	update : function(id, updateObj){
		if(!id){
			return 406;
		}

		if(updateObj == undefined 
			|| (updateObj.author == undefined
			 && updateObj.title == undefined
			 && updateObj.content == undefined
			 && updateObj.publishDate)){
			return 405;
		}

		let found = false;

		postsArray.forEach( element => {
			if(element.id == id){
				if(updateObj.title != undefined){
					element.title = updateObj.title;
				}

				if(updateObj.content != undefined){
					element.content = updateObj.Content;
				}

				if(updateObj.author != undefined){
					element.author = updateObj.author;
				}

				if(updateObj.publishDate != undefined){
					element.publishDate = updateObj.publishDate;
				}
				found = element;
			}
		});

		if (found) {
			return found;
		}
		return 404;
	}  
}

module.exports = {ListPosts};