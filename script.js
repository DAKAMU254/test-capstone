// Get HTML elements
const newPostButton = document.getElementById('new-post-button');
const postForm = document.getElementById('post-form');
const savePostButton = document.getElementById('save-post');
const cancelPostButton = document.getElementById('cancel-post');
const postsContainer = document.getElementById('posts-container');

// Function to toggle the display of the post form
newPostButton.addEventListener('click', () => {
    postForm.style.display = postForm.style.display === 'block' ? 'none' : 'block';
});

// Function to handle saving a new post
savePostButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form from submitting

    // Get the values from the input fields
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const imageInput = document.getElementById('post-image');
    
    // Create a new post element
    if (title && content) {
        const post = document.createElement('div');
        post.classList.add('post');

        // Create post title and content
        const postTitle = document.createElement('h3');
        postTitle.innerText = title;

        const postContent = document.createElement('p');
        postContent.innerText = content;

        // Optionally include an image if uploaded
        if (imageInput.files[0]) {
            const postImage = document.createElement('img');
            postImage.src = URL.createObjectURL(imageInput.files[0]);
            postImage.alt = title;
            postImage.style.maxWidth = '100%'; // Make sure the image fits well
            post.appendChild(postImage);
        }

        // Append title and content to the new post
        post.appendChild(postTitle);
        post.appendChild(postContent);

        // Append the new post to the posts container
        postsContainer.prepend(post); // Add new post at the top

        // Clear the input fields
        document.getElementById('post-title').value = '';
        document.getElementById('post-content').value = '';
        imageInput.value = '';

        // Hide the post form
        postForm.style.display = 'none';
    } else {
        alert('Please fill in both the title and content.');
    }
});

// Function to handle canceling the post creation
cancelPostButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form from submitting

    // Clear the input fields
    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
    document.getElementById('post-image').value = '';

    // Hide the post form
    postForm.style.display = 'none';
});
