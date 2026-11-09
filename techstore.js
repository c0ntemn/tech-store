let cartCount = 0;

function addToCart(productName) {
  cartCount++;
  const toast = document.getElementById('toast');
  toast.textContent = `«${productName}» добавлен в корзину (всего: ${cartCount})`;
  toast.classList.add('show');
  clearTimeout(toast.hideTimer);
  toast.hideTimer = setTimeout(() => toast.classList.remove('show'), 2000);
}

/* Фильтрация каталога */
function filterCatalog(category, btn) {
  document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.card[data-category]').forEach(card => {
    card.style.display =
      category === 'all' || card.dataset.category === category ? '' : 'none';
  });
}

/* Простая обработка формы */
function sendForm(event) {
  event.preventDefault();
  const toast = document.getElementById('toast');
  toast.textContent = 'Спасибо! Мы свяжемся с вами в ближайшее время.';
  toast.style.background = '#1e3a8a';
  toast.classList.add('show');
  clearTimeout(toast.hideTimer);
  toast.hideTimer = setTimeout(() => {
    toast.classList.remove('show');
    toast.style.background = '#16a34a';
  }, 3000);
  event.target.reset();
}