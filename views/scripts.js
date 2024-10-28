const apiUrl = 'http://localhost:3000/api/blogs';

// Function to fetch and display all blog posts
async function fetchPosts() {
    const response = await fetch(apiUrl);
    const posts = await response.json();
    const blogPosts = document.getElementById('blog-posts');
    blogPosts.innerHTML = ''; // Clear the current list

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button onclick="deletePost('${post._id}')">Delete</button>
        `;
        blogPosts.appendChild(postElement);
    });
}

// Function to create a new blog post
async function createPost(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
    });

    if (response.ok) {
        fetchPosts(); // Refresh the list of posts
    } else {
        const errorData = await response.json();
        alert('Error: ' + errorData.message); // Display error to user
    }
}

// Function to delete a blog post
async function deletePost(id) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        fetchPosts(); // Refresh the list of posts
    }
}

// Add event listener to the form
document.getElementById('post-form').addEventListener('submit', createPost);

// Fetch and display blog posts on page load
fetchPosts();
