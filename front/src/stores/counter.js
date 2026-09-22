// src/stores/useUserStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '../api/api.js'; // поправь путь под свой проект

export const useUserStore = defineStore('userStore', () => {
  const users = ref([]);
  const isLoading = ref(false);
  const isSending = ref(false);
  const error = ref(null);

  // GET
  async function loadUsers() {
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await api.get('/');
      users.value = data;
    } catch (e) {
      error.value = e.message;
      console.error('Ошибка загрузки:', e);
    } finally {
      isLoading.value = false;
    }
  }

  // POST
  async function createItem(payload) {
    // payload = { id, name, quantity }
    isSending.value = true;
    error.value = null;
    try {
      const { data } = await api.post('/butaforia', payload);
      // можно добавить в локальный список, чтобы UI обновился сразу
      // users.value.push(...) — если структура совпадает
      return data;
    } catch (e) {
      error.value = e.message;
      console.error('Ошибка отправки:', e);
      throw e; // пробрасываем, чтобы компонент знал об ошибке
    } finally {
      isSending.value = false;
    }
  }

  return { users, isLoading, isSending, error, loadUsers, createItem };
});