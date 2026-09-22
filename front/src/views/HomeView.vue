<!-- src/components/UserList.vue -->
<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '../stores/counter';

// Подключаем стор
const userStore = useUserStore();

// Запускаем Python-запрос сразу при загрузке этой страницы
onMounted(() => {
  userStore.loadUsers();
});
</script>

<template>
  <div class="user-page">
    <router-link to="/catalog">Каталог</router-link>

    <h2>Список пользователей из FastAPI:</h2>

    <!-- Пока данные летят из Python, показываем заглушку -->
    <p v-if="userStore.isLoading">Загрузка данных...</p>

    <!-- Если данные загрузились и массив не пустой — выводим список -->
    <ul v-else-if="userStore.users.length > 0">
      <li v-for="user in userStore.users" :key="user.id">
        <strong>{{ user.name }}</strong> — Роль: {{ user.role }}
      </li>
    </ul>

    <!-- Если Python вернул пустой массив -->
    <p v-else>Пользователи не найдены.</p>
  </div>
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
