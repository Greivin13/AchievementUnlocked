const { post } = require("../../../controllers");

const addPost = async() => {
    const post = {
        title: 'New Post',
        post_content: ' ',
        user_id: 1
      };
}
try {
   const response = await fetch ('/api/posts-routes.js',{
    method: 'POST',
    headers:{
      'Content-Type':'application/json'
    },
   body:JSON.stringify(post)
  })

  if (response.ok){
    const newPost = await response.json();
    console.log('New post',newPost);
  } else {
    console.error('Failed to add post.');
  }
} catch (error) {
  console.error('Error', error);
};

addPost()