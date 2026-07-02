const CART_KEY = 'maison-fleur-cart';
const WISHLIST_KEY = 'maison-fleur-wishlist';
const ACCOUNT_KEY = 'maison-fleur-account';

const toggleButton = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const yearSpans = document.querySelectorAll('#year');
const cartCountSpans = document.querySelectorAll('[data-cart-count]');
const wishlistCountSpans = document.querySelectorAll('[data-wishlist-count]');
const newsletterForm = document.querySelector('#newsletterForm');
const newsletterMessage = document.querySelector('#newsletterMessage');
const contactForm = document.querySelector('#contactForm');
const contactMessage = document.querySelector('#contactMessage');
const productGrid = document.querySelector('#productGrid');
const categoryFilters = document.querySelector('#categoryFilters');
const productCount = document.querySelector('#productCount');
const productDetail = document.querySelector('#productDetail');
const cartItems = document.querySelector('#cartItems');
const cartSummary = document.querySelector('#cartSummary');
const checkoutForm = document.querySelector('#checkoutForm');
const checkoutMessage = document.querySelector('#checkoutMessage');
const wishlistGrid = document.querySelector('#wishlistGrid');
const accountForm = document.querySelector('#accountForm');
const accountMessage = document.querySelector('#accountMessage');
const accountStatus = document.querySelector('#accountStatus');

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getProductById(productId) {
  return PRODUCTS.find((product) => product.id === productId);
}

function getNumericPrice(priceText) {
  const parsed = Number.parseFloat(String(priceText).replace('CHF', '').trim());
  return Number.isNaN(parsed) ? 0 : parsed;
}

function getCart() {
  return readStorage(CART_KEY, []);
}

function saveCart(cart) {
  writeStorage(CART_KEY, cart);
  updateHeaderCounts();
}

function getWishlist() {
  return readStorage(WISHLIST_KEY, []);
}

function saveWishlist(wishlist) {
  writeStorage(WISHLIST_KEY, wishlist);
  updateHeaderCounts();
}

function getAccount() {
  return readStorage(ACCOUNT_KEY, null);
}

function saveAccount(account) {
  writeStorage(ACCOUNT_KEY, account);
}

function updateHeaderCounts() {
  const cartCount = getCart().reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = getWishlist().length;

  cartCountSpans.forEach((span) => {
    span.textContent = String(cartCount);
  });

  wishlistCountSpans.forEach((span) => {
    span.textContent = String(wishlistCount);
  });
}

function addToCart(productId, quantity = 1) {
  const safeQuantity = Math.max(1, Number(quantity) || 1);
  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity += safeQuantity;
  } else {
    cart.push({ id: productId, quantity: safeQuantity });
  }

  saveCart(cart);
}

function updateCartItem(productId, quantity) {
  const safeQuantity = Math.max(1, Number(quantity) || 1);
  const cart = getCart().map((item) =>
    item.id === productId ? { ...item, quantity: safeQuantity } : item
  );
  saveCart(cart);
}

function removeFromCart(productId) {
  saveCart(getCart().filter((item) => item.id !== productId));
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateHeaderCounts();
}

function toggleWishlist(productId) {
  const wishlist = getWishlist();
  const exists = wishlist.includes(productId);
  const nextWishlist = exists
    ? wishlist.filter((id) => id !== productId)
    : [...wishlist, productId];

  saveWishlist(nextWishlist);
  return !exists;
}

function isWishlisted(productId) {
  return getWishlist().includes(productId);
}

function createProductCard(product) {
  const wishlisted = isWishlisted(product.id);

  return `
    <article class="card product-card">
      <img src="${product.image}" alt="Parfümflakon ${product.name}" />
      <div class="card-body">
        <p class="card-category">${product.category}</p>
        <h3>${product.name}</h3>
        <p>${product.shortDescription}</p>
        <div class="card-meta">
          <span>${product.price}</span>
          <a class="text-link" href="detail.html?id=${product.id}">Details</a>
        </div>
        <div class="action-row">
          <button class="btn btn-primary" type="button" data-add-cart="${product.id}">In den Warenkorb</button>
          <button class="btn btn-secondary" type="button" data-toggle-wishlist="${product.id}">
            ${wishlisted ? 'Gemerkt' : 'Merken'}
          </button>
        </div>
      </div>
    </article>
  `;
}

function bindProductButtons(scope = document) {
  scope.querySelectorAll('[data-add-cart]').forEach((button) => {
    button.addEventListener('click', () => {
      addToCart(button.dataset.addCart, 1);
      button.textContent = 'Hinzugefügt';
      window.setTimeout(() => {
        button.textContent = 'In den Warenkorb';
      }, 1000);
    });
  });

  scope.querySelectorAll('[data-toggle-wishlist]').forEach((button) => {
    button.addEventListener('click', () => {
      const active = toggleWishlist(button.dataset.toggleWishlist);
      button.textContent = active ? 'Gemerkt' : 'Merken';
      renderWishlistPage();
    });
  });
}

function renderProducts(category = 'Alle') {
  if (!productGrid || !categoryFilters || !productCount) {
    return;
  }

  const filteredProducts =
    category === 'Alle'
      ? PRODUCTS
      : PRODUCTS.filter((product) => product.category === category);

  productGrid.innerHTML = filteredProducts.map(createProductCard).join('');
  productCount.textContent = `${filteredProducts.length} Produkte in der Kategorie ${category}`;

  categoryFilters.querySelectorAll('button').forEach((button) => {
    button.classList.toggle('active', button.dataset.category === category);
  });

  bindProductButtons(productGrid);
}

function setupFilters() {
  if (!categoryFilters) {
    return;
  }

  categoryFilters.innerHTML = PRODUCT_CATEGORIES.map(
    (category) =>
      `<button class="filter-btn" type="button" data-category="${category}">${category}</button>`
  ).join('');

  categoryFilters.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) {
      return;
    }

    const { category } = target.dataset;
    if (category) {
      renderProducts(category);
    }
  });

  const urlCategory = new URLSearchParams(window.location.search).get('category');
  const initialCategory =
    urlCategory && PRODUCT_CATEGORIES.includes(urlCategory) ? urlCategory : 'Alle';

  renderProducts(initialCategory);
}

function renderDetailPage() {
  if (!productDetail) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id') || PRODUCTS[0].id;
  const product = getProductById(productId);

  if (!product) {
    productDetail.innerHTML = `
      <section class="info-box">
        <h1>Produkt nicht gefunden</h1>
        <p>Bitte wähle ein Produkt aus der Übersicht.</p>
        <a class="btn btn-primary" href="produkte.html">Zur Produktseite</a>
      </section>
    `;
    return;
  }

  document.title = `Maison Fleur | ${product.name}`;

  productDetail.innerHTML = `
    <section class="detail-media">
      <img src="${product.image}" alt="Parfümflakon ${product.name}" />
    </section>
    <section class="detail-content">
      <p class="eyebrow">${product.category}</p>
      <h1>${product.name}</h1>
      <p class="detail-price">${product.price}</p>
      <p>${product.description}</p>
      <div class="note-list">
        ${product.notes.map((note) => `<span>${note}</span>`).join('')}
      </div>
      <form id="orderForm" class="order-form">
        <label>
          Menge
          <input type="number" name="quantity" min="1" max="10" value="1" required />
        </label>
        <div class="action-row">
          <button class="btn btn-primary" type="submit">In den Warenkorb</button>
          <button class="btn btn-secondary" type="button" data-toggle-wishlist="${product.id}">
            ${isWishlisted(product.id) ? 'Gemerkt' : 'Merken'}
          </button>
        </div>
        <p id="orderMessage" class="form-message"></p>
      </form>
    </section>
  `;

  const orderForm = document.querySelector('#orderForm');
  const orderMessage = document.querySelector('#orderMessage');

  if (orderForm && orderMessage) {
    orderForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(orderForm);
      const quantity = formData.get('quantity');
      addToCart(product.id, quantity);
      orderMessage.textContent = `${product.name} wurde ${quantity}x in den Warenkorb gelegt.`;
    });
  }

  bindProductButtons(productDetail);
}

function renderCartPage() {
  if (!cartItems || !cartSummary) {
    return;
  }

  const items = getCart()
    .map((item) => {
      const product = getProductById(item.id);
      return product
        ? { ...product, quantity: item.quantity, total: getNumericPrice(product.price) * item.quantity }
        : null;
    })
    .filter(Boolean);

  if (items.length === 0) {
    cartItems.innerHTML = `
      <section class="info-box">
        <h2>Dein Warenkorb ist leer</h2>
        <p>Lege zuerst ein paar Düfte in den Warenkorb.</p>
        <a class="btn btn-primary" href="produkte.html">Produkte ansehen</a>
      </section>
    `;
    cartSummary.innerHTML = `
      <h2>Zusammenfassung</h2>
      <p>0 Produkte im Warenkorb.</p>
    `;
    if (checkoutForm) {
      checkoutForm.style.display = 'none';
    }
    return;
  }

  if (checkoutForm) {
    checkoutForm.style.display = 'grid';
  }

  cartItems.innerHTML = items
    .map(
      (item) => `
        <article class="card cart-item">
          <img src="${item.image}" alt="Parfümflakon ${item.name}" />
          <div class="cart-item-body">
            <p class="card-category">${item.category}</p>
            <h3>${item.name}</h3>
            <p>${item.price} pro Stück</p>
            <div class="cart-controls">
              <label>
                Menge
                <input type="number" min="1" max="10" value="${item.quantity}" data-cart-qty="${item.id}" />
              </label>
              <button class="btn btn-secondary" type="button" data-cart-remove="${item.id}">Entfernen</button>
            </div>
          </div>
        </article>
      `
    )
    .join('');

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.total, 0);

  cartSummary.innerHTML = `
    <h2>Zusammenfassung</h2>
    <p>${totalItems} Produkte im Warenkorb</p>
    <p class="detail-price">${totalPrice.toFixed(2)} CHF</p>
    <button class="btn btn-secondary" type="button" id="clearCartButton">Warenkorb leeren</button>
  `;

  cartItems.querySelectorAll('[data-cart-qty]').forEach((input) => {
    input.addEventListener('change', () => {
      updateCartItem(input.dataset.cartQty, input.value);
      renderCartPage();
    });
  });

  cartItems.querySelectorAll('[data-cart-remove]').forEach((button) => {
    button.addEventListener('click', () => {
      removeFromCart(button.dataset.cartRemove);
      renderCartPage();
    });
  });

  const clearCartButton = document.querySelector('#clearCartButton');
  if (clearCartButton) {
    clearCartButton.addEventListener('click', () => {
      clearCart();
      renderCartPage();
    });
  }
}

function renderWishlistPage() {
  if (!wishlistGrid) {
    return;
  }

  const items = getWishlist().map(getProductById).filter(Boolean);

  if (items.length === 0) {
    wishlistGrid.innerHTML = `
      <section class="info-box">
        <h2>Deine Merkliste ist leer</h2>
        <p>Merke dir Produkte auf der Produktseite oder in der Übersicht.</p>
        <a class="btn btn-primary" href="produkte.html">Produkte ansehen</a>
      </section>
    `;
    return;
  }

  wishlistGrid.innerHTML = items.map(createProductCard).join('');
  bindProductButtons(wishlistGrid);
}

function renderAccountPage() {
  if (!accountStatus) {
    return;
  }

  const account = getAccount();

  if (!account) {
    accountStatus.innerHTML = `
      <h2>Nicht eingeloggt</h2>
      <p>Lege einen Namen und eine E-Mail an, um das Demo-Konto lokal im Browser zu speichern.</p>
    `;
    return;
  }

  accountStatus.innerHTML = `
    <h2>Aktives Konto</h2>
    <p><strong>Benutzername:</strong> ${account.username}</p>
    <p><strong>E-Mail:</strong> ${account.email}</p>
    <button class="btn btn-secondary" type="button" id="logoutButton">Logout</button>
  `;

  const logoutButton = document.querySelector('#logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem(ACCOUNT_KEY);
      if (accountMessage) {
        accountMessage.textContent = 'Du wurdest ausgeloggt.';
      }
      renderAccountPage();
    });
  }
}

if (toggleButton && navLinks) {
  toggleButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggleButton.setAttribute('aria-expanded', String(isOpen));
  });
}

yearSpans.forEach((span) => {
  span.textContent = new Date().getFullYear();
});

updateHeaderCounts();

if (newsletterForm && newsletterMessage) {
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(newsletterForm);
    const email = formData.get('newsletterEmail');
    newsletterMessage.textContent = `${email} wurde für den Newsletter eingetragen.`;
    newsletterForm.reset();
  });
}

if (contactForm && contactMessage) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const subject = formData.get('subject');
    contactMessage.textContent = `Danke ${name}. Dein Anliegen "${subject}" wurde gespeichert.`;
    contactForm.reset();
  });
}

if (accountForm && accountMessage) {
  accountForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(accountForm);
    const account = {
      username: String(formData.get('username') || '').trim(),
      email: String(formData.get('email') || '').trim()
    };
    saveAccount(account);
    accountMessage.textContent = `${account.username} wurde lokal gespeichert und eingeloggt.`;
    accountForm.reset();
    renderAccountPage();
  });
}

if (checkoutForm && checkoutMessage) {
  checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const items = getCart();
    if (items.length === 0) {
      checkoutMessage.textContent = 'Dein Warenkorb ist leer.';
      return;
    }

    const formData = new FormData(checkoutForm);
    const customerName = formData.get('customerName');
    checkoutMessage.textContent = `Danke ${customerName}. Deine Bestellung wurde gespeichert.`;
    checkoutForm.reset();
    clearCart();
    renderCartPage();
  });
}

setupFilters();
renderDetailPage();
renderCartPage();
renderWishlistPage();
renderAccountPage();
