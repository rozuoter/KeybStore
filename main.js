// Данные товаров
        const products = [
            { id: 1, name: 'Mechanical Keyboard K1', price: 99.99, description: 'Механическая клавиатура с синими переключателями, подсветка RGB, алюминиевая панель. Идеальный выбор для печати и игр.', image: './src/image/1.png' },
            { id: 2, name: 'Gaming Keyboard G2', price: 129.99, description: 'Игровая клавиатура с красными переключателями, программируемые макросы, полная RGB-подсветка и магнитная подставка для рук.', image: './src/image/2.png' },
            { id: 3, name: 'Wireless Keyboard W3', price: 79.99, description: 'Беспроводная клавиатура с тихими мембранными переключателями, работает от батареек до 6 месяцев, компактный дизайн.', image: './src/image/3.png' },
            { id: 4, name: 'Compact Keyboard C4', price: 89.99, description: 'Компактная 60% клавиатура с коричневыми переключателями, съёмный кабель USB-C, идеально для путешествий.', image: './src/image/4.png' },
            { id: 5, name: 'Compact Keyboard C4', price: 89.99, description: 'Компактная 60% клавиатура с коричневыми переключателями, съёмный кабель USB-C, идеально для путешествий.', image: './src/image/5.png' },
            { id: 6, name: 'Compact Keyboard C4', price: 89.99, description: 'Компактная 60% клавиатура с коричневыми переключателями, съёмный кабель USB-C, идеально для путешествий.', image: './src/image/6.png' },
            { id: 7, name: 'Compact Keyboard C4', price: 89.99, description: 'Компактная 60% клавиатура с коричневыми переключателями, съёмный кабель USB-C, идеально для путешествий.', image: './src/image/7.png' },
            { id: 8, name: 'Compact Keyboard C4', price: 89.99, description: 'Компактная 60% клавиатура с коричневыми переключателями, съёмный кабель USB-C, идеально для путешествий.', image: './src/image/8.png' },
            { id: 9, name: 'Compact Keyboard C4', price: 89.99, description: 'Компактная 60% клавиатура с коричневыми переключателями, съёмный кабель USB-C, идеально для путешествий.', image: './src/image/9.png' },
            { id: 10, name: 'Compact Keyboard C4', price: 89.99, description: 'Компактная 60% клавиатура с коричневыми переключателями, съёмный кабель USB-C, идеально для путешествий.', image: './src/image/10.png' },
        ];

        // Корзина
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Текущий просматриваемый товар
        let currentProduct = null;

        // Элементы DOM
        const homeSection = document.getElementById('home-section');
        const productSection = document.getElementById('product-section');
        const cartSection = document.getElementById('cart-section');
        const privacySection = document.getElementById('privacy-section');
        const productsGrid = document.getElementById('products-grid');
        const productDetailContainer = document.getElementById('product-detail-container');
        const cartContainer = document.getElementById('cart-container');
        const cartCountSpan = document.getElementById('cart-count');

        // Навигация (обработчики на все элементы с data-nav, включая футер)
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-nav]');
            if (!link) return;
            e.preventDefault();
            const target = link.getAttribute('data-nav');
            if (target === 'home') showHome();
            else if (target === 'cart') showCart();
            else if (target === 'privacy') showPrivacy();
        });

        // Отображение главной
        function showHome() {
            homeSection.classList.remove('hidden');
            productSection.classList.add('hidden');
            cartSection.classList.add('hidden');
            privacySection.classList.add('hidden');
            renderProducts();
        }

        // Отображение корзины
        function showCart() {
            homeSection.classList.add('hidden');
            productSection.classList.add('hidden');
            cartSection.classList.remove('hidden');
            privacySection.classList.add('hidden');
            renderCart();
        }

        // Отображение страницы товара
        function showProductPage(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;
            currentProduct = product;
            homeSection.classList.add('hidden');
            productSection.classList.remove('hidden');
            cartSection.classList.add('hidden');
            privacySection.classList.add('hidden');
            renderProductDetail(product);
        }

        // Отображение политики конфиденциальности
        function showPrivacy() {
            homeSection.classList.add('hidden');
            productSection.classList.add('hidden');
            cartSection.classList.add('hidden');
            privacySection.classList.remove('hidden');
        }

        // Рендер товаров на главной
        function renderProducts() {
            productsGrid.innerHTML = products.map(product => `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <div class="product-title">${product.name}</div>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <div class="product-actions">
                            <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}"><i class="fas fa-cart-plus"></i> В корзину</button>
                            <button class="btn btn-outline details-btn" data-id="${product.id}">Подробнее</button>
                        </div>
                    </div>
                </div>
            `).join('');

            // Обработчики на кнопки главной
            document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(btn.dataset.id);
                    const product = products.find(p => p.id === id);
                    addToCart(product);
                });
            });

            document.querySelectorAll('.details-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(btn.dataset.id);
                    showProductPage(id);
                });
            });
        }

        // Рендер детальной страницы товара
        function renderProductDetail(product) {
            productDetailContainer.innerHTML = `
                <div class="product-detail-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-detail-info">
                    <h2 class="product-detail-title">${product.name}</h2>
                    <div class="product-detail-price">$${product.price.toFixed(2)}</div>
                    <p class="product-detail-description">${product.description}</p>
                    <button class="btn btn-primary" id="detail-add-to-cart"><i class="fas fa-cart-plus"></i> Добавить в корзину</button>
                </div>
            `;

            document.getElementById('detail-add-to-cart').addEventListener('click', () => {
                addToCart(currentProduct);
            });
        }

        // Рендер корзины (без изменений, но убедимся, что кнопка "Продолжить покупки" работает)
        function renderCart() {
            if (cart.length === 0) {
                cartContainer.innerHTML = '<div class="empty-cart"><i class="fas fa-shopping-cart" style="font-size: 3rem; color: #ccc;"></i><p>Корзина пуста</p><button class="btn btn-primary" data-nav="home">Продолжить покупки</button></div>';
                // Обработчик на кнопку внутри пустой корзины (data-nav уже есть)
                document.querySelector('.empty-cart .btn').addEventListener('click', (e) => {
                    e.preventDefault();
                    showHome();
                });
                updateCartCount();
                return;
            }

            let itemsHtml = '';
            let total = 0;

            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                itemsHtml += `
                    <div class="cart-item" data-id="${item.id}">
                        <div class="cart-item-info">
                            <img src="${products.find(p => p.id === item.id).image}" alt="${item.name}" class="cart-item-image">
                            <span class="cart-item-title">${item.name}</span>
                        </div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" data-action="decr" data-id="${item.id}">−</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" data-action="incr" data-id="${item.id}">+</button>
                        </div>
                        <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
                        <button class="remove-btn" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                    </div>
                `;
            });

            cartContainer.innerHTML = `
                ${itemsHtml}
                <div class="cart-summary">Итого: $${total.toFixed(2)}</div>
                <div class="cart-actions">
                    <button class="btn btn-outline" id="clear-cart">Очистить корзину</button>
                    <button class="btn btn-primary" id="checkout">Оформить заказ</button>
                </div>
            `;

            // Обработчики кнопок в корзине
            document.querySelectorAll('.quantity-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(btn.dataset.id);
                    const action = btn.dataset.action;
                    changeQuantity(id, action);
                });
            });

            document.querySelectorAll('.remove-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(btn.dataset.id);
                    removeFromCart(id);
                });
            });

            document.getElementById('clear-cart').addEventListener('click', clearCart);
            document.getElementById('checkout').addEventListener('click', () => {
                prompt('Введите почту для связи с вами');
                clearCart();
                showHome();
            });

            updateCartCount();
        }

        // Функции работы с корзиной
        function addToCart(product) {
            const existing = cart.find(item => item.id === product.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
            }
            saveCart();
            updateCartCount();
            if (!cartSection.classList.contains('hidden')) renderCart(); // обновить если корзина открыта
        }

        function changeQuantity(id, action) {
            const item = cart.find(item => item.id === id);
            if (!item) return;
            if (action === 'incr') {
                item.quantity += 1;
            } else if (action === 'decr') {
                item.quantity -= 1;
                if (item.quantity <= 0) {
                    removeFromCart(id);
                    return;
                }
            }
            saveCart();
            renderCart(); // обновить отображение корзины
            updateCartCount();
        }

        function removeFromCart(id) {
            cart = cart.filter(item => item.id !== id);
            saveCart();
            renderCart();
            updateCartCount();
        }

        function clearCart() {
            cart = [];
            saveCart();
            renderCart();
            updateCartCount();
        }

        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        function updateCartCount() {
            const count = cart.reduce((acc, item) => acc + item.quantity, 0);
            cartCountSpan.textContent = count;
        }

        // Инициализация
        function init() {
            renderProducts();
            updateCartCount();
            showHome(); // по умолчанию главная
        }

        init();