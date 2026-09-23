<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/counter.js';
import HeaderApi from "../components/Header.vue"
import FooterApi from "../components/Footer.vue"

const store = useUserStore();

const form = ref({
	id: null,
	name: '',
	quantity: 1,
});

async function submit() {
	try {
		await store.createItem({ ...form.value });
		form.value = { id: null, name: '', quantity: 1 };
		alert('Успешно отправлено!');
	} catch (e) {
		alert('Ошибка: ' + e.message);
	}
}

async function fetchProducts() {
      // --- РЕАЛЬНЫЙ ВАРИАНТ (раскомментируй, когда будет бэкенд) ---
      // const res = await fetch('http://localhost:8000/products');
      // if (!res.ok) throw new Error('Не удалось загрузить товары');
      // return await res.json();

      // --- ФЕЙК (эмуляция задержки сети) ---
      await new Promise(r => setTimeout(r, 600));
      return [
        { id: 1, name: 'Смартфон Galaxy X',  description: '6.5", 128 ГБ, камера 50 Мп', price: 49990, image: '' },
        { id: 2, name: 'Ноутбук UltraBook',  description: '14", 16 ГБ RAM, 512 ГБ SSD', price: 89990, image: '' },
        { id: 3, name: 'Наушники AirSound',  description: 'Беспроводные, шумоподавление', price: 12990, image: '' },
        { id: 4, name: 'Планшет Tab Lite',   description: '10.1", 64 ГБ, Wi-Fi',        price: 24990, image: '' },
        { id: 5, name: 'Умные часы FitPro',  description: 'GPS, пульсометр, 7 дней',    price: 15990, image: '' },
        { id: 6, name: 'Клавиатура Mech K2', description: 'Механическая, RGB',          price: 6990,  image: '' },
      ];
    }

    let allProducts = [];       // сырые данные с бэка
    let productsLoaded = false; // чтобы не грузить повторно при каждом переходе

    async function loadProducts() {
      if (productsLoaded) return;

      const grid = document.getElementById('catalogGrid');
      const status = document.getElementById('catalogStatus');

      // скелетоны на время загрузки
      grid.innerHTML = Array.from({ length: 6 }).map(() =>
        '<div class="skeleton"></div>'
      ).join('');
      status.className = 'form__status';
      status.textContent = '';

      try {
        allProducts = await fetchProducts();
        productsLoaded = true;
        applyFiltersAndRender();
      } catch (err) {
        grid.innerHTML = '';
        status.className = 'form__status is-error';
        status.textContent = 'Ошибка загрузки: ' + err.message;
      }
    }

    function applyFiltersAndRender() {
      const query = document.getElementById('catalogSearch').value.trim().toLowerCase();
      const sort = document.getElementById('catalogSort').value;

      let list = allProducts.filter(p =>
        p.name.toLowerCase().includes(query) ||
        (p.description || '').toLowerCase().includes(query)
      );

      if (sort === 'price-asc')  list.sort((a, b) => a.price - b.price);
      if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
      if (sort === 'name-asc')   list.sort((a, b) => a.name.localeCompare(b.name, 'ru'));

      renderProducts(list);
    }

    function renderProducts(list) {
      const grid = document.getElementById('catalogGrid');

      if (!list.length) {
        grid.innerHTML = '<div class="empty" style="grid-column: 1 / -1;">Ничего не найдено</div>';
        return;
      }

      grid.innerHTML = list.map(p => `
        <article class="product-card" data-id="${p.id}">
          <div class="product-card__image">
            ${p.image
              ? `<img src="${p.image}" alt="${escapeHtml(p.name)}" />`
              : 'нет изображения'}
          </div>
          <div class="product-card__body">
            <h3 class="product-card__name">${escapeHtml(p.name)}</h3>
            <p class="product-card__desc">${escapeHtml(p.description || '')}</p>
            <div class="product-card__footer">
              <span class="product-card__price">${formatPrice(p.price)}</span>
              <button class="product-card__btn" data-add="${p.id}">В корзину</button>
            </div>
          </div>
        </article>
      `).join('');
    }

    // поиск/сортировка (делегирование событий)
    document.getElementById('catalogSearch').addEventListener('input', applyFiltersAndRender);
    document.getElementById('catalogSort').addEventListener('change', applyFiltersAndRender);

    // клик по «В корзину» — пока просто лог, потом сюда придёт логика
    document.getElementById('catalogGrid').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-add]');
      if (!btn) return;
      const id = Number(btn.dataset.add);
      console.log('Добавить в корзину товар id =', id);
      // TODO: тут будет store.addToCart(id) или запрос к бэкенду
    });
</script>

<template>
	<HeaderApi />
	<main class="page">
		<div class="container">
			<section id="page-catalog" class="page" >
				<h1 class="page__title">Каталог</h1>
				<p class="page__subtitle">Все товары нашего магазина</p>

				<div class="catalog__toolbar">
					<input id="catalogSearch" class="input catalog__search" type="search"
						placeholder="Поиск по названию..." />
					<select id="catalogSort" class="select catalog__sort">
						<option value="default">Сортировка: по умолчанию</option>
						<option value="price-asc">Сначала дешёвые</option>
						<option value="price-desc">Сначала дорогие</option>
						<option value="name-asc">По названию (А–Я)</option>
					</select>
				</div>

				<div id="catalogStatus" class="form__status"></div>

				<div id="catalogGrid" class="products"></div>
			</section>
		</div>
	</main>
	<FooterApi />
</template>











<!-- <template>
    <router-link to="/">Главная</router-link>
  <form @submit.prevent="submit">
    <input v-model.number="form.id" type="number" placeholder="ID" />
    <input v-model="form.name" type="text" placeholder="Название" />
    <input v-model.number="form.quantity" type="number" placeholder="Кол-во" />
    <button type="submit" :disabled="store.isSending">
      {{ store.isSending ? 'Отправка...' : 'Отправить' }}
    </button>
  </form>
</template> -->
