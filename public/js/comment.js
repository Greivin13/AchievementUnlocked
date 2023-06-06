// const fetch = require('node-fetch');
// // Function to add a  comment.
// async function addComment(postID,  userId, commentText){
//     try{
//         const response = await fetch("/api/comments-routes.js",{
//             method :"POST",
//             headers: {
//                 "Content-Type":"application/json",
//             },
//             body: JSON.stringify({postId, userId, commentText}),
//         });
//         if (response.ok){
//             const newComment = await response.json();
//             console.log("New comment", newComment);
//         } else{
//             console.error("Failed to  add new  comment.");
//         }
//     } catch(error){
//         console.error("Error", error);
//     }
// }
// // Function to delete comment
// async function deleteComment(commentId){
//     try{
//         const response = await fetch("/api/comments-routes.js",{
//             method :"DELETE",
//         });
//         if (response.ok){
//             console.log( "Comment deleted", newComment);
//         } else{
//             console.error("Failed to delete comment.");
//         }
//     } catch(error){
//         console.error("Error", error);
//     }
// }
// module.exports = {
//     addComment,
//     deleteComment
// }
