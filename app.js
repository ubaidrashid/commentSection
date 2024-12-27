"use strict"
// Import or use current user data
const currentUserData = {
  image: {
    png: "assets/images/avatars/image-juliusomo.png",
    webp: "assets/images/avatars/image-juliusomo.webp"
  },
  username: "juliusomo"
};

let currentUser = document.querySelector(".currentUser");

// Add the current user comment box
let currentUserBox = document.createElement("div");
currentUserBox.className = "currentUserBox";
currentUserBox.innerHTML = `  
    <div class="profilePic">
      <img src=${currentUserData.image.png} alt="Current User">
    </div>
    <textarea placeholder="Add a comment..." name="" id="commentTextArea" cols="50" rows="10"></textarea>
    <button class="send" onclick="addComment()">Send</button>`;
currentUser.appendChild(currentUserBox);

let comments = [
  {
    id: 1,
    content: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    createdAt: "1 month ago",
    score: 12,
    user: {
      image: {
        png: "assets/images/avatars/image-amyrobson.png",
        webp: "assets/images/avatars/image-amyrobson.webp"
      },
      username: "amyrobson"
    },
    replies: []
  },
  {
    id: 2,
    content: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    createdAt: "2 weeks ago",
    score: 5,
    user: {
      image: {
        png: "assets/images/avatars/image-maxblagun.png",
        webp: "assets/images/avatars/image-maxblagun.webp"
      },
      username: "maxblagun"
    },
    replies: []
  }
];

// Function to Render Comments and Replies
// Function to Render Comments and Replies
function renderComments(commentsArray, parentElement, isReply = false) {
  console.log(commentsArray)
  commentsArray.forEach(comment => {
    // Create comment container
    let commentBox = document.createElement("div");
    commentBox.className = "commentChilds randomCom";
    commentBox.dataset.id = comment.id;

    // Determine the user image and username
    let userImage = comment.user.image.webp;
    let userName = comment.user.username;

    // Comment HTML structure
    commentBox.innerHTML = `
    <div class='awi ${comment.id}'>
    <div class="counterCover">
      <div class="counter">
        <div class="plus" onclick="incrementScore(${comment.id})">
          <img src="assets/images/icon-plus.svg" alt="Plus">
        </div>
        <span class="counterValue" id="counter-${comment.id}">${comment.score}</span>
        <div class="minus" onclick="decrementScore(${comment.id})">
          <img src="assets/images/icon-minus.svg" alt="Minus">
        </div>
      </div>
            <div class="repCover">
         <!-- Show delete button only for current user's comments/replies -->
            ${comment.user.username === currentUserData.username
        ? `<div class="delete delete2" onclick="showModal(${comment.id})">
                    <img src="assets/images/icon-delete.svg" alt="Delete Icon" class="replayIcon"> Delete
                  </div>`
        : ""
      }

      ${comment.user.username === currentUserData.username ? ` <div class="edit edit2" onclick="editComment(${comment.id})">
              <img src="assets/images/icon-edit.svg" alt="Reply Icon" class="replayIcon"> Edit
            </div>`: ` <div class="replay replay2" onclick="showReplyBox(${comment.id})">
              <img src="assets/images/icon-reply.svg" alt="Reply Icon" class="replayIcon"> Reply
            </div>` }
          
           
           
          </div>

    </div>

      <div class="details">
        <div class="profile">
          <div class="person">
            <div class="profilep">
              <img src="${userImage}" alt="${userName}">
            </div>
            <h3 class="name">${userName}</h3>
                        ${comment.user.username === currentUserData.username
        ? `<div class="you">
                  YOU
                  </div>`
        : ""
      }
            <div class="time">${comment.createdAt}</div>
          </div>
          <div class="repCover">
         <!-- Show delete button only for current user's comments/replies -->
            ${comment.user.username === currentUserData.username
        ? `<div class="delete" onclick="showModal(${comment.id})">
                    <img src="assets/images/icon-delete.svg" alt="Delete Icon" class="replayIcon"> Delete
                  </div>`
        : ""
      }

      ${comment.user.username === currentUserData.username ? ` <div class="edit" onclick="editComment(${comment.id})">
              <img src="assets/images/icon-edit.svg" alt="Reply Icon" class="replayIcon"> Edit
            </div>`: ` <div class="replay" onclick="showReplyBox(${comment.id})">
              <img src="assets/images/icon-reply.svg" alt="Reply Icon" class="replayIcon"> Reply
            </div>` }
          
           
           
          </div>
        </div>
        <div class="para">
          ${comment.content}
        </div>
      </div>

    </div>`;

    // Append replies container
    let repliesContainer = document.createElement("div");
    repliesContainer.className = "repliesContainer";
    commentBox.appendChild(repliesContainer);

    // Render replies recursively
    if (comment.replies && comment.replies.length > 0) {
      renderComments(comment.replies, repliesContainer, true);
    }

    // Append the comment box to parent
    parentElement.appendChild(commentBox);
  });
}

// let modal = document.querySelector(".modal")
// show modal
const showModal = (commentId) => {
  let modalCreate = document.createElement("div");
  modalCreate.className = "modal";
  modalCreate.innerHTML = `
    <div class="modal-content">
    <h1>Delete comment</h1>
      <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone</p>
      <div class="buttons">
      <button id="cancelDelete" onclick="closeModal()">no, Cancel</button>
      <button id="confirmDelete" onclick="deleteComment(${commentId})">yes, Delete</button>
      </div>
    </div>
  `;

  let body = document.querySelector("body");
  body.prepend(modalCreate);

};
// Close Modal Function
const closeModal = () => {
  const modal = document.querySelector(".modal");
  if (modal) modal.remove();
};





let awi = document.querySelector(".awi")
// Show Reply Box
// Show Reply Box
function showReplyBox(commentId) {
  let parentComment = document.querySelector(`[data-id="${commentId}"]`);
  let replyBox = document.createElement("div");
  replyBox.className = "profilePic replyBox";

  replyBox.innerHTML = `
    <img class="profilePic" src=${currentUserData.image.png} alt="Current User">
    <textarea placeholder="Add a comment..." name="" id="commentTextArea" cols="50" rows="10"></textarea>
    <button class="send" onclick="addReply(${commentId})">Send</button>
  `;

  // Add reply box only if it doesn't already exist
  if (!parentComment.querySelector(".replyBox")) {
    parentComment.appendChild(replyBox);
  }

  // Add Enter key event listener
  let textarea = replyBox.querySelector("textarea");
  textarea.addEventListener("keyup", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent newline
      addReply(commentId);
    }
  });

  replyBox.scrollIntoView({ behavior: "smooth", block: "center" });
}


// Add Comment
function addComment() {
  let commentText = document.getElementById("commentTextArea").value;

  if (commentText.trim() !== "") {
    const getCurrentTime = () => {
      const now = new Date();
      return `${now.getHours() / 2}:${now.getMinutes()}:${now.getSeconds()}`;
    };

    let newComment = {
      id: Date.now(),
      content: commentText,
      createdAt: getCurrentTime(),
      score: 0,
      user: {
        image: currentUserData.image,
        username: currentUserData.username
      },
      replies: [],
      isNew: true // Flag to identify the latest comment
    };

    comments.push(newComment);

    // Save to local storage
    saveToLocalStorage(comments);

    // Clear textarea after sending
    document.getElementById("commentTextArea").value = "";

    // Re-render comments
    let commentParent = document.querySelector(".comments");
    commentParent.innerHTML = "";
    renderComments(comments, commentParent);

    // Focus on the newly added comment
    setTimeout(() => {
      let newCommentElement = document.querySelector(`[data-id="${newComment.id}"]`);
      if (newCommentElement) {
        newCommentElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 0);
  }
}

// Add Reply
function addReply(commentId) {
  let parentComment = findCommentById(commentId, comments);

  if (parentComment) {
    let replyBox = document.querySelector(`[data-id="${commentId}"] .replyBox`);
    let replyText = replyBox.querySelector("textarea").value;

    if (replyText.trim() !== "") {
      // Get current time
      const getCurrentTime = () => {
        const now = new Date();
        return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      };

      let newReply = {
        id: Date.now(),
        content: replyText,
        createdAt: getCurrentTime(),
        score: 0,
        user: {
          image: currentUserData.image,
          username: currentUserData.username
        },
        replies: []
      };

      parentComment.replies.push(newReply);

      // Optional: Increment the parent comment's score when a reply is added
      parentComment.score += 1;  // Adjust this logic if you want to increment/decrement differently

      // Save to local storage
      saveToLocalStorage(comments);

      // Re-render comments
      let commentParent = document.querySelector(".comments");
      commentParent.innerHTML = "";
      renderComments(comments, commentParent);
    }

    // Remove reply box after adding
    replyBox.remove();
  }
}

// Delete Comment
// Delete Comment or Reply
function deleteComment(commentId) {
  function deleteFromCommentsArray(commentsArray) {
    return commentsArray.filter(comment => {
      if (comment.id === commentId) {
        return false; // Remove this specific comment/reply
      } else if (comment.replies.length > 0) {
        // Recursively check replies
        comment.replies = deleteFromCommentsArray(comment.replies);
      }
      return true; // Keep the comment
    });
  }

  // Update comments array by removing the specified comment/reply
  comments = deleteFromCommentsArray(comments);

  // Save to local storage
  saveToLocalStorage(comments);

  // Re-render comments
  let commentParent = document.querySelector(".comments");
  commentParent.innerHTML = "";
  renderComments(comments, commentParent);


  const modal = document.querySelector(".modal");
  if (modal) modal.remove();
}


// Delete Reply
function deleteReply(replyCreatedAt) {
  function deleteFromCommentsArray(commentsArray) {
    return commentsArray.filter(comment => {
      if (comment.createdAt === replyCreatedAt) {
        return false; // Remove this specific reply
      } else if (comment.replies.length > 0) {
        comment.replies = deleteFromCommentsArray(comment.replies); // Recursively check replies
      }
      return true;
    });
  }

  comments = deleteFromCommentsArray(comments);

  // Save to local storage
  saveToLocalStorage(comments);

  // Re-render comments
  let commentParent = document.querySelector(".comments");
  commentParent.innerHTML = "";
  renderComments(comments, commentParent);
}

// Find Comment by ID (Recursive)
function findCommentById(id, commentsArray) {
  for (let comment of commentsArray) {
    if (comment.id === id) {
      return comment;
    } else if (comment.replies.length > 0) {
      let nestedComment = findCommentById(id, comment.replies);
      if (nestedComment) {
        return nestedComment;
      }
    }
  }
  return null;
}

// Increment Score
function incrementScore(commentId) {
  let comment = findCommentById(commentId, comments);
  if (comment) {
    comment.score += 1;
    document.getElementById(`counter-${commentId}`).innerText = comment.score;

    // Save to local storage after updating the score
    saveToLocalStorage(comments);
  }
}

// Decrement Score
function decrementScore(commentId) {
  let comment = findCommentById(commentId, comments);
  if (comment && comment.score > 0) {
    comment.score -= 1;
    document.getElementById(`counter-${commentId}`).innerText = comment.score;

    // Save to local storage after updating the score
    saveToLocalStorage(comments);
  }
}

// Save Comments to Local Storage
function saveToLocalStorage(data) {
  localStorage.setItem("comments", JSON.stringify(data));
}

// Retrieve Comments from Local Storage
function loadFromLocalStorage() {
  const storedComments = localStorage.getItem("comments");
  return storedComments ? JSON.parse(storedComments) : comments;
}

// Initial Load and Render
window.onload = function () {
  comments = loadFromLocalStorage();
  let commentParent = document.querySelector(".comments");
  renderComments(comments, commentParent);
};

// Edit Comment
// Edit Comment
function editComment(commentId) {
  let commentBox = document.querySelector(`[data-id="${commentId}"]`);
  let para = commentBox.querySelector(".para");
  let originalText = para.innerText;

  // Replace comment with a textarea for editing
  para.innerHTML = `
    <textarea class="editTextarea" rows="4" cols="50">${originalText}</textarea>
    <div>
    <button class="cancel" onclick="cancelEdit(${commentId}, '${originalText}')">Cancel</button>
    <button class="update" onclick="updateComment(${commentId})">Update</button>
    </div>
  `;

  // Add Enter key event listener
  let textarea = commentBox.querySelector(".editTextarea");
  textarea.addEventListener("keyup", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent newline
      updateComment(commentId);
    }
  });
}


// Update Comment
function updateComment(commentId) {
  let commentBox = document.querySelector(`[data-id="${commentId}"]`);
  let textarea = commentBox.querySelector(".editTextarea");
  let updatedText = textarea.value.trim();

  if (updatedText !== "") {
    // Update the comment in the array
    let comment = findCommentById(commentId, comments);
    if (comment) {
      comment.content = updatedText;

      // Save to local storage
      saveToLocalStorage(comments);

      // Re-render the comments
      let commentParent = document.querySelector(".comments");
      commentParent.innerHTML = "";
      renderComments(comments, commentParent);
    }
  } else {
    alert("Comment cannot be empty.");
  }
}

// Cancel Edit
function cancelEdit(commentId, originalText) {
  let commentBox = document.querySelector(`[data-id="${commentId}"]`);
  let para = commentBox.querySelector(".para");

  // Restore original text
  para.innerHTML = originalText;
}


let send = document.querySelector(".currentUserBox").addEventListener("keyup", function (event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault(); // Prevent adding a new line
    addComment(); // Call the addComment function
  }
});
let sendre = document.querySelector(".profilePic").addEventListener("keyup", function (event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault(); // Prevent adding a new line
    addReply(); // Call the addComment function
  }
});