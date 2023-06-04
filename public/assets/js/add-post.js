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

const deleteFormHandler = async (event) => {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1];

        const response = await fetch(`/api/posts/${id}`, {
                    method: 'DELETE',
                    body: JSON.stringify({id}),
                });
                if (response.ok) {
                    document.location.replace('/dashboard');
                } else {
                    alert('Failed to delete post');
                }};

                document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);