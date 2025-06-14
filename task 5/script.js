const blogListingSection = document.getElementById('blog-listing-section');
        const createPostSection = document.getElementById('create-post-section');
        const singlePostView = document.getElementById('single-post-view');
        const aboutBlogSection = document.getElementById('about-blog-section');

        const newPostForm = document.getElementById('new-post-form');
        const postTitleInput = document.getElementById('post-title');
        const postAuthorInput = document.getElementById('post-author');
        const postCategorySelect = document.getElementById('post-category');
        const postImageUrlInput = document.getElementById('post-image-url');
        const postContentInput = document.getElementById('post-content');

        const blogPostsGrid = document.getElementById('blog-posts-grid');
        const noPostsMessage = document.getElementById('no-posts-message');
        const searchInput = document.getElementById('search-input');
        const categoryFilterSelect = document.getElementById('category-filter');

        const singlePostTitle = document.getElementById('single-post-title');
        const singlePostMeta = document.getElementById('single-post-meta');
        const singlePostImage = document.getElementById('single-post-image');
        const singlePostContent = document.getElementById('single-post-content');
        const backToPostsButton = document.getElementById('back-to-posts');

        const homeLink = document.getElementById('home-link');
        const viewPostsLink = document.getElementById('view-posts-link');
        const createNewPostLink = document.getElementById('create-new-post-link');
        const aboutBlogLink = document.getElementById('about-blog-link');

        let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

        function savePosts() {
            localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
        }

        function showSection(sectionToShow) {
            blogListingSection.classList.add('hidden');
            createPostSection.classList.add('hidden');
            singlePostView.classList.add('hidden');
            aboutBlogSection.classList.add('hidden');
            sectionToShow.classList.remove('hidden');
        }

        function renderBlogPosts(postsToRender = blogPosts) {
            blogPostsGrid.innerHTML = '';
            if (postsToRender.length === 0) {
                noPostsMessage.classList.remove('hidden');
                return;
            } else {
                noPostsMessage.classList.add('hidden');
            }

            postsToRender.forEach((post, index) => {
                const blogCard = document.createElement('div');
                blogCard.classList.add('blog-card');
                blogCard.dataset.index = index;

                const img = document.createElement('img');
                img.src = post.imageUrl || 'https://placehold.co/300x200/cccccc/333333?text=No+Image';
                img.alt = post.title;
                img.classList.add('blog-card-img');
                img.setAttribute('loading', 'lazy');

                const infoDiv = document.createElement('div');
                infoDiv.classList.add('blog-info');

                const titleElem = document.createElement('h3');
                titleElem.textContent = post.title;

                const contentPreview = document.createElement('p');
                contentPreview.textContent = post.content.substring(0, 100) + (post.content.length > 100 ? '...' : '');

                const metaElem = document.createElement('p');
                metaElem.classList.add('blog-meta');
                metaElem.textContent = `By ${post.author} in ${post.category} on ${new Date(post.date).toLocaleDateString()}`;

                infoDiv.appendChild(titleElem);
                infoDiv.appendChild(contentPreview);
                infoDiv.appendChild(metaElem);

                blogCard.appendChild(img);
                blogCard.appendChild(infoDiv);

                blogCard.addEventListener('click', () => viewPost(post));
                blogPostsGrid.appendChild(blogCard);
            });
        }

        newPostForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newPost = {
                id: Date.now(),
                title: postTitleInput.value.trim(),
                author: postAuthorInput.value.trim(),
                category: postCategorySelect.value,
                imageUrl: postImageUrlInput.value.trim(),
                content: postContentInput.value.trim(),
                date: new Date().toISOString()
            };

            if (newPost.title && newPost.author && newPost.category && newPost.content) {
                blogPosts.unshift(newPost);
                savePosts();
                newPostForm.reset();
                showSection(blogListingSection);
                filterAndSearchPosts();
            } else {
                alert('Please fill in all required fields (Title, Author, Category, Content).');
            }
        });

        function viewPost(post) {
            singlePostTitle.textContent = post.title;
            singlePostMeta.textContent = `By ${post.author} in ${post.category} on ${new Date(post.date).toLocaleDateString()}`;
            singlePostImage.src = post.imageUrl || 'https://placehold.co/800x400/cccccc/333333?text=No+Image';
            singlePostImage.alt = post.title;
            singlePostContent.innerHTML = post.content.replace(/\n/g, '<br>');
            showSection(singlePostView);
        }

        backToPostsButton.addEventListener('click', () => {
            showSection(blogListingSection);
            filterAndSearchPosts();
        });

        function filterAndSearchPosts() {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedCategory = categoryFilterSelect.value;

            let filtered = blogPosts.filter(post => {
                const matchesSearch = post.title.toLowerCase().includes(searchTerm) ||
                                      post.content.toLowerCase().includes(searchTerm);
                const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
                return matchesSearch && matchesCategory;
            });
            renderBlogPosts(filtered);
        }

        searchInput.addEventListener('input', filterAndSearchPosts);
        categoryFilterSelect.addEventListener('change', filterAndSearchPosts);

        homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(blogListingSection);
            filterAndSearchPosts();
        });
        viewPostsLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(blogListingSection);
            filterAndSearchPosts();
        });
        createNewPostLink.addEventListener('click', (e) => {
            e.preventDefault();
            newPostForm.reset();
            showSection(createPostSection);
        });
        aboutBlogLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(aboutBlogSection);
        });


        showSection(blogListingSection);
        renderBlogPosts();