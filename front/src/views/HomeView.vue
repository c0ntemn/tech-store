<!-- src/components/UserList.vue -->
<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '../stores/counter';
import HeaderApi from "../components/Header.vue"
import FooterApi from "../components/Footer.vue"

// Подключаем стор
const userStore = useUserStore();

// Запускаем Python-запрос сразу при загрузке этой страницы
onMounted(() => {
    userStore.loadUsers();
});
</script>

<template>
    <HeaderApi />
    <main class="page">
        <div class="container">
            <section id="page-catalog" class="page">
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

<style scoped>
.user-page {
    padding: 20px;
    font-family: sans-serif;
}

li {
    margin-bottom: 8px;
}
</style>


<!-- <ul v-else-if="userStore.users.length > 0">
                    <li v-for="user in userStore.users" :key="user.id">
                        <strong>{{ user.name }}</strong> — Роль: {{ user.role }}
                    </li>
                </ul> -->