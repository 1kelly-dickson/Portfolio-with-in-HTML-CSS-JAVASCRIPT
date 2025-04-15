let blogPosts = [
    {
        id: 1,
        title: "The Future of Web Development",
        date: "2025-04-10",
        excerpt: "Exploring emerging trends and technologies that will shape the future of web development...",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/images/future.png"
    },
    {
        id: 2,
        title: "Designing for Accessibility",
        date: "2025-04-02",
        excerpt: "Why accessible design matters and how to implement it effectively in your next project...",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/images/design.png"
    },
    {
        id: 3,
        title: "Optimizing Website Performance",
        date: "2025-03-24",
        excerpt: "Simple techniques to improve loading times and create smoother user experiences...",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/images/optimizing.png"
    }
];

// Check login status
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('blogAdminLoggedIn');
    
    if (!isLoggedIn) {
        document.getElementById('admin-panel').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
    } else {
        document.getElementById('admin-panel').style.display = 'block';
        document.getElementById('login-form').style.display = 'none';
        loadBlogPosts();
    }
}

// Handle login
document.getElementById('admin-login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Very simple authentication - in a real app, use proper authentication
    if (username === 'admin' && password === 'password') {
        localStorage.setItem('blogAdminLoggedIn', 'true');
        checkLoginStatus();
    } else {
        alert('Invalid username or password');
    }
});

// Load blog posts
function loadBlogPosts() {
    // Load from localStorage if available
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
        blogPosts = JSON.parse(storedPosts);
    }
    
    const tableBody = document.getElementById('blog-table-body');
    tableBody.innerHTML = '';
    
    blogPosts.forEach(post => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${post.title}</td>
            <td>${formatDate(post.date)}</td>
            <td>${post.excerpt.substring(0, 50)}${post.excerpt.length > 50 ? '...' : ''}</td>
            <td class="action-buttons">
                <button class="view-btn" onclick="viewPost(${post.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="edit-btn" onclick="editPost(${post.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" onclick="deletePost(${post.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Save to localStorage
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
}

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// New Post button
document.getElementById('new-post-btn').addEventListener('click', function() {
    document.getElementById('form-title').textContent = 'Create New Blog Post';
    document.getElementById('post-form').reset();
    document.getElementById('post-id').value = '';
    document.getElementById('image-preview').innerHTML = '';
    document.getElementById('blog-form').classList.add('active');
});

// Cancel button
document.getElementById('cancel-btn').addEventListener('click', function() {
    document.getElementById('blog-form').classList.remove('active');
});

// View Post
function viewPost(id) {
    const post = blogPosts.find(post => post.id === id);
    if (post) {
        // In a real app, redirect to the blog post page
        window.location.href = `blog-post-template.html?id=${id}`;
    }
}

// Edit Post
function editPost(id) {
    const post = blogPosts.find(post => post.id === id);
    if (post) {
        document.getElementById('form-title').textContent = 'Edit Blog Post';
        document.getElementById('post-id').value = post.id;
        document.getElementById('post-title').value = post.title;
        document.getElementById('post-date').value = post.date;
        document.getElementById('post-excerpt').value = post.excerpt;
        document.getElementById('post-content').value = post.content;
        document.getElementById('post-image').value = post.image;
        
        // Show image preview if available
        const imagePreview = document.getElementById('image-preview');
        imagePreview.innerHTML = '';
        if (post.image) {
            const img = document.createElement('img');
            img.src = post.image;
            img.alt = post.title;
            img.style.maxWidth = '100%';
            imagePreview.appendChild(img);
        }
        
        document.getElementById('blog-form').classList.add('active');
    }
}

// Delete Post
function deletePost(id) {
    if (confirm('Are you sure you want to delete this post?')) {
        blogPosts = blogPosts.filter(post => post.id !== id);
        loadBlogPosts();
    }
}

// Handle form submission
document.getElementById('post-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const postId = document.getElementById('post-id').value;
    const title = document.getElementById('post-title').value;
    const date = document.getElementById('post-date').value;
    const excerpt = document.getElementById('post-excerpt').value;
    const content = document.getElementById('post-content').value;
    const image = document.getElementById('post-image').value;
    
    if (postId) {
        // Update existing post
        const index = blogPosts.findIndex(post => post.id === parseInt(postId));
        if (index !== -1) {
            blogPosts[index] = {
                id: parseInt(postId),
                title,
                date,
                excerpt,
                content,
                image
            };
        }
    } else {
        // Add new post
        const newId = blogPosts.length > 0 ? Math.max(...blogPosts.map(post => post.id)) + 1 : 1;
        blogPosts.push({
            id: newId,
            title,
            date, 
            excerpt,
            content,
            image
        });
    }
    
    // Hide form and reload posts
    document.getElementById('blog-form').classList.remove('active');
    loadBlogPosts();
});

// Image URL preview
document.getElementById('post-image').addEventListener('blur', function() {
    const imageUrl = this.value;
    const imagePreview = document.getElementById('image-preview');
    imagePreview.innerHTML = '';
    
    if (imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Preview';
        img.style.maxWidth = '100%';
        img.onerror = function() {
            imagePreview.innerHTML = '<p style="color: red;">Invalid image URL</p>';
        };
        imagePreview.appendChild(img);
    }
});

// Initialize
checkLoginStatus();

