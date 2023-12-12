const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const blog = document.querySelector('#post-desc').value.trim();
   
  
    if (title && blog) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, blog}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create project');
      }
    }
  };
  
 

  document.addEventListener('DOMContentLoaded', function () {
    const toggleCreatePostButton = document.getElementById('toggle-create-post');
    const createPostSection = document.getElementById('create-post-section');
    const newPostForm = document.querySelector('.new-post-form');
  
    // Toggle create post form
    toggleCreatePostButton.addEventListener('click', function () {
      // Toggle the display of the create post section
      createPostSection.style.display = createPostSection.style.display === 'none' ? 'block' : 'none';
  
      // If the create post section is displayed, attach event listeners
      if (createPostSection.style.display === 'block') {
        attachEventListeners();
      }
    });
  
    // Attach event listeners for the new post form
    if (newPostForm) {
      newPostForm.addEventListener('submit', newFormHandler);
    }
  });
  
  document.addEventListener('DOMContentLoaded', function () {
    const clickablePosts = document.querySelectorAll('.clickable-post');
  
    clickablePosts.forEach((post) => {
      post.addEventListener('click', function () {
        const postId = post.getAttribute('data-id');
        // Replace 'your_site_url' with the base URL of your dashboard
        window.location.href = `/dashboard/${postId}`;
      });
    });

  });

  