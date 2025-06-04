
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset(); // Clear the form
        });


        const todoInput = document.getElementById('todo-input');
        const addTodoButton = document.getElementById('add-todo-button');
        const todoList = document.getElementById('todo-list');

        let todos = JSON.parse(localStorage.getItem('todos')) || [];

        function saveTodos() {
            localStorage.setItem('todos', JSON.stringify(todos));
        }

        function renderTodos() {
            todoList.innerHTML = '';
            todos.forEach((todo, index) => {
                const listItem = document.createElement('li');
                listItem.classList.add('todo-item');
                if (todo.completed) {
                    listItem.classList.add('completed');
                }

                const todoText = document.createElement('span');
                todoText.textContent = todo.text;

                const todoActions = document.createElement('div');
                todoActions.classList.add('todo-actions');

                const completeButton = document.createElement('button');
                completeButton.textContent = todo.completed ? 'Uncomplete' : 'Complete';
                completeButton.classList.add('complete-todo-button');
                completeButton.addEventListener('click', () => toggleCompleteTodo(index));

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('delete-todo-button');
                deleteButton.addEventListener('click', () => deleteTodo(index));

                todoActions.appendChild(completeButton);
                todoActions.appendChild(deleteButton);

                listItem.appendChild(todoText);
                listItem.appendChild(todoActions);
                todoList.appendChild(listItem);
            });
        }

        function addTodo() {
            const text = todoInput.value.trim();
            if (text !== '') {
                todos.push({ text: text, completed: false });
                todoInput.value = '';
                saveTodos();
                renderTodos();
            }
        }

        function toggleCompleteTodo(index) {
            todos[index].completed = !todos[index].completed;
            saveTodos();
            renderTodos();
        }

        function deleteTodo(index) {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        }

        addTodoButton.addEventListener('click', addTodo);
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTodo();
            }
        });

        renderTodos(); 
        const products = [
            { id: 1, name: 'Laptop Pro', category: 'electronics', price: 98000, rating: 4.5, imageUrl: 'https://placehold.co/300x180/e74c3c/ffffff?text=Laptop' },
            { id: 2, name: 'Designer T-Shirt', category: 'clothing', price: 2800, rating: 4.0, imageUrl: 'https://placehold.co/300x180/2ecc71/ffffff?text=T-Shirt' },
            { id: 3, name: 'The Great Novel', category: 'books', price: 1600, rating: 4.8, imageUrl: 'https://placehold.co/300x180/3498db/ffffff?text=Book' },
            { id: 4, name: 'Smartphone X', category: 'electronics', price: 64000, rating: 4.2, imageUrl: 'https://placehold.co/300x180/9b59b6/ffffff?text=Phone' },
            { id: 5, name: 'Winter Jacket', category: 'clothing', price: 12000, rating: 4.1, imageUrl: 'https://placehold.co/300x180/f1c40f/ffffff?text=Jacket' },
            { id: 6, name: 'Cookbook: Italian', category: 'books', price: 2000, rating: 4.6, imageUrl: 'https://placehold.co/300x180/1abc9c/ffffff?text=Cookbook' },
            { id: 7, name: 'Wireless Headphones', category: 'electronics', price: 8000, rating: 3.9, imageUrl: 'https://placehold.co/300x180/e67e22/ffffff?text=Headphones' },
            { id: 8, name: 'Denim Jeans', category: 'clothing', price: 4800, rating: 4.3, imageUrl: 'https://placehold.co/300x180/7f8c8d/ffffff?text=Jeans' },
        ];

        const categoryFilter = document.getElementById('category-filter');
        const priceFilter = document.getElementById('price-filter');
        const sortBy = document.getElementById('sort-by');
        const productGrid = document.getElementById('product-grid');

        function renderProducts() {
            let filteredProducts = [...products];

            const selectedCategory = categoryFilter.value;
            if (selectedCategory !== 'all') {
                filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
            }

            const maxPrice = parseFloat(priceFilter.value);
            if (!isNaN(maxPrice)) {
                filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
            }

            const sortOption = sortBy.value;
            filteredProducts.sort((a, b) => {
                if (sortOption === 'name-asc') {
                    return a.name.localeCompare(b.name);
                } else if (sortOption === 'name-desc') {
                    return b.name.localeCompare(a.name);
                } else if (sortOption === 'price-asc') {
                    return a.price - b.price;
                } else if (sortOption === 'price-desc') {
                    return b.price - a.price;
                }
                return 0;
            });

            productGrid.innerHTML = ''; // Clear existing products

            if (filteredProducts.length === 0) {
                productGrid.innerHTML = '<p style="text-align: center; width: 100%; color: #666;">No products found matching your criteria.</p>';
                return;
            }

            filteredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');

                productCard.innerHTML = `
                    <img src="${product.imageUrl}" alt="${product.name}" class="product-img">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>Category: ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                        <p>Rating: ${product.rating} / 5</p>
                        <p class="product-price">₹${product.price.toFixed(2)}</p>
                    </div>
                `;
                productGrid.appendChild(productCard);
            });
        }

        categoryFilter.addEventListener('change', renderProducts);
        priceFilter.addEventListener('input', renderProducts); // Use 'input' for real-time filtering
        sortBy.addEventListener('change', renderProducts);

        renderProducts();