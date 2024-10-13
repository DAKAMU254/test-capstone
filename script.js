document.addEventListener('DOMContentLoaded', function () {
    const postForm = document.getElementById('post-form');
    const postsContainer = document.getElementById('posts-container');
    const newPostButton = document.getElementById('new-post-button');
    const savePostButton = document.getElementById('save-post');
    const cancelPostButton = document.getElementById('cancel-post');
    const postTitleInput = document.getElementById('post-title');
    const postContentInput = document.getElementById('post-content');
    let currentPostIndex = null;  // To track the index of the post being edited

    // Load saved posts from local storage
    loadPosts();

    // Show the post form for adding new blog post
    newPostButton.addEventListener('click', () => {
        postForm.classList.toggle('hidden');
        postTitleInput.value = '';
        postContentInput.value = '';
        currentPostIndex = null; // Reset index
    });

    // Save the blog post to local storage
    savePostButton.addEventListener('click', () => {
        const title = postTitleInput.value;
        const content = postContentInput.value;

        if (title && content) {
            const posts = getPostsFromLocalStorage();
            if (currentPostIndex === null) {
                // Create a new post
                const post = {
                    title: title,
                    content: content
                };
                posts.push(post);
            } else {
                // Edit an existing post
                posts[currentPostIndex] = {
                    title: title,
                    content: content
                };
            }
            savePostsToLocalStorage(posts);
            loadPosts();
            postForm.classList.add('hidden');
        } else {
            alert('Please fill in both fields.');
        }
    });

    // Cancel adding or editing a post
    cancelPostButton.addEventListener('click', () => {
        postForm.classList.add('hidden');
        currentPostIndex = null; // Reset current editing index
    });

    function loadPosts() {
        const posts = getPostsFromLocalStorage();
        postsContainer.innerHTML = '';

        posts.forEach((post, index) => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <button class="edit-post" data-index="${index}">Edit</button>
                <button class="delete-post" data-index="${index}">Delete</button>
            `;
            postsContainer.appendChild(postDiv);
        });

        // Attach event listeners to edit and delete buttons
        document.querySelectorAll('.edit-post').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                editPost(index);
            });
        });

        document.querySelectorAll('.delete-post').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                deletePost(index);
            });
        });
    }

    function editPost(index) {
        const posts = getPostsFromLocalStorage();
        postTitleInput.value = posts[index].title;
        postContentInput.value = posts[index].content;
        postForm.classList.remove('hidden');
        currentPostIndex = index; // Set the editing index
    }

    function deletePost(index) {
        const posts = getPostsFromLocalStorage();
        posts.splice(index, 1); // Remove the post from the array
        savePostsToLocalStorage(posts); // Update local storage
        loadPosts(); // Reload the posts
    }

    function getPostsFromLocalStorage() {
        const postsJson = localStorage.getItem('blogPosts');
        return postsJson ? JSON.parse(postsJson) : [];
    }

    function savePostsToLocalStorage(posts) {
        localStorage.setItem('blogPosts', JSON.stringify(posts));
    }
});
