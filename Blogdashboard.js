function myMenuFunction() {
    var menuBth = document.getElementById("myNavMenu");

    if (menuBth.className === "nav-menu") {
        menuBth.className += " responsive ";
    } else {
        menuBth.className = "nav-menu";
    }
}


/*-------Dark Mode----------*/

const body = document.querySelector("body"),
    toggleSwitch = document.getElementById("toggle-switch");
    toggleSwitch.addEventListener("click" , ()=>{
        body.classList.toggle("dark");
    });

    /*-------Scroll animation--------*/

    const sr = ScrollReveal({
        origin: "top",
        distance: "80px",
        duration: 2000,
        reset: true,
    })

    sr.reveal(".featured-name", { delay: 100 });
    sr.reveal(".text-info", { delay: 200 });
    sr.reveal(".text-btn", { delay: 200 });
    sr.reveal(".social_icons", { delay: 200 });
    sr.reveal(".featured-image", { delay: 320 });

    sr.reveal(".project-box", { interval: 200});

    sr.reveal(".top-header", {});

    const srLeft = ScrollReveal({
        origin: "left",
        distance: "80px",
        duration: 2000,
        reset: true,
    })

    srLeft.reveal(".about-info" , { delay: 100});
    srLeft.reveal(".contact-info" , { delay: 100});


    const srRight = ScrollReveal({
        origin: "left",
        distance: "80px",
        duration: 2000,
        reset: true,
    })

    srRight.reveal(".skill" , { delay: 100});
    srRight.reveal(".skill-box" , { delay: 100});

    //new js
     // Data structure functions
     function getAllBlogPosts() {
        const posts = localStorage.getItem('blogPosts');
        return posts ? JSON.parse(posts) : [];
      }
  
      function saveBlogPosts(posts) {
        localStorage.setItem('blogPosts', JSON.stringify(posts));
      }
  
      function addBlogPost(title, content, date = new Date().toISOString().split('T')[0]) {
        const posts = getAllBlogPosts();
        const newPost = {
          id: Date.now().toString(), // Simple unique ID
          title,
          content,
          date
        };
        posts.push(newPost);
        saveBlogPosts(posts);
        return newPost;
      }
  
      function updateBlogPost(id, title, content, date) {
        const posts = getAllBlogPosts();
        const index = posts.findIndex(post => post.id === id);
        if (index !== -1) {
          posts[index] = { ...posts[index], title, content, date };
          saveBlogPosts(posts);
          return true;
        }
        return false;
      }
  
      function deleteBlogPost(id) {
        const posts = getAllBlogPosts();
        const updatedPosts = posts.filter(post => post.id !== id);
        saveBlogPosts(updatedPosts);
        return posts.length !== updatedPosts.length;
      }
  
      // Display functions for public blog section
      function renderPublicBlogSection() {
        const blogSection = document.getElementById('blog-section');
        if (!blogSection) return;
        
        blogSection.innerHTML = '';
        
        const posts = getAllBlogPosts();
        
        if (posts.length === 0) {
          blogSection.innerHTML = '<p>No blog posts yet.</p>';
          return;
        }
        
        const blogList = document.createElement('div');
        blogList.className = 'blog-post-list';
        
        posts.forEach(post => {
          const postElement = document.createElement('article');
          postElement.className = 'blog-post';
          
          // Generate preview (first 150 chars)
          const contentPreview = post.content.length > 150 
            ? post.content.substring(0, 150) + '...' 
            : post.content;
          
          postElement.innerHTML = `
            <h3>${post.title}</h3>
            <div class="post-date">${post.date}</div>
            <div class="post-preview">${contentPreview}</div>
            <a href="#" class="read-more" data-id="${post.id}">Read more</a>
          `;
          
          blogList.appendChild(postElement);
        });
        
        blogSection.appendChild(blogList);
        
        // Add event listeners for "Read more" links
        document.querySelectorAll('.read-more').forEach(link => {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            const postId = e.target.getAttribute('data-id');
            displayFullPost(postId);
          });
        });
      }
  
      function displayFullPost(postId) {
        const posts = getAllBlogPosts();
        const post = posts.find(p => p.id === postId);
        
        if (!post) return;
        
        const blogSection = document.getElementById('blog-section');
        blogSection.innerHTML = `
          <div class="blog-post-full">
            <a href="#" id="back-to-posts">&larr; Back to all posts</a>
            <h2>${post.title}</h2>
            <div class="post-date">${post.date}</div>
            <div class="post-content">${post.content}</div>
          </div>
        `;
        
        document.getElementById('back-to-posts').addEventListener('click', (e) => {
          e.preventDefault();
          renderPublicBlogSection();
        });
      }
  
      // Initialize blog functionality when the DOM is loaded
      document.addEventListener('DOMContentLoaded', () => {
        // Initialize public blog section if present
        if (document.getElementById('blog-section')) {
          renderPublicBlogSection();
        }
      });
    //end

    // Blog Dashboard Functions
function renderDashboard() {
    const postsListContainer = document.getElementById('posts-list');
    if (!postsListContainer) return;
    
    postsListContainer.innerHTML = '';
    
    const posts = getAllBlogPosts();
    
    if (posts.length === 0) {
        postsListContainer.innerHTML = '<p>No blog posts yet.</p>';
        return;
    }
    
    posts.forEach(post => {
        const postItem = document.createElement('div');
        postItem.className = 'post-item';
        
        postItem.innerHTML = `
            <div class="post-info">
                <strong>${post.title}</strong>
                <span>(${post.date})</span>
            </div>
            <div class="post-actions">
                <button class="edit-post" data-id="${post.id}">Edit</button>
                <button class="delete-post" data-id="${post.id}">Delete</button>
            </div>
        `;
        
        postsListContainer.appendChild(postItem);
    });
    
    // Add event listeners to edit and delete buttons
    document.querySelectorAll('.edit-post').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const postId = e.target.getAttribute('data-id');
            editPost(postId);
        });
    });
    
    document.querySelectorAll('.delete-post').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const postId = e.target.getAttribute('data-id');
            if (confirm('Are you sure you want to delete this post?')) {
                deleteBlogPost(postId);
                renderDashboard();
                renderPublicBlogSection();
            }
        });
    });
}

function initializeForm() {
    const form = document.getElementById('blog-post-form');
    const newPostBtn = document.getElementById('new-post-btn');
    const cancelBtn = document.getElementById('cancel-post');
    const formContainer = document.getElementById('post-form-container');
    
    if (!form || !newPostBtn || !cancelBtn || !formContainer) return;
    
    // Show the form when "Add New Post" button is clicked
    newPostBtn.addEventListener('click', () => {
        // Clear the form for a new post
        document.getElementById('post-id').value = '';
        document.getElementById('post-title').value = '';
        document.getElementById('post-content').value = '';
        document.getElementById('post-date').value = new Date().toISOString().split('T')[0];
        
        formContainer.style.display = 'block';
    });
    
    // Hide the form when "Cancel" button is clicked
    cancelBtn.addEventListener('click', () => {
        formContainer.style.display = 'none';
    });
    
    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const postId = document.getElementById('post-id').value;
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        const date = document.getElementById('post-date').value;
        
        if (postId) {
            // Update existing post
            updateBlogPost(postId, title, content, date);
        } else {
            // Add new post
            addBlogPost(title, content, date);
        }
        
        // Hide the form and update the dashboard and public blog section
        formContainer.style.display = 'none';
        renderDashboard();
        renderPublicBlogSection();
    });
}

function editPost(postId) {
    const posts = getAllBlogPosts();
    const post = posts.find(p => p.id === postId);
    
    if (!post) return;
    
    // Fill the form with the post data
    document.getElementById('post-id').value = post.id;
    document.getElementById('post-title').value = post.title;
    document.getElementById('post-content').value = post.content;
    document.getElementById('post-date').value = post.date;
    
    // Show the form
    document.getElementById('post-form-container').style.display = 'block';
}

// Initialize blog dashboard when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize public blog section (already added in your code)
    
    // Initialize blog dashboard if present
    if (document.getElementById('posts-list')) {
        renderDashboard();
        initializeForm();
    }
    
    // Add navigation link to the Blog Dashboard
    const blogLink = document.querySelector('a[href="#Blog"]').parentNode;
    if (blogLink) {
        const dashboardLink = document.createElement('li');
        dashboardLink.className = 'nav_list';
        dashboardLink.innerHTML = `
            <a href="#BlogDashboard" class="nav-link">DASHBOARD</a>
            <div class="circle"></div>
        `;
        blogLink.parentNode.insertBefore(dashboardLink, blogLink.nextSibling);
    }
});