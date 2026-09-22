<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/counter.js';

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
</script>

<template>
    <router-link to="/">Главная</router-link>
  <form @submit.prevent="submit">
    <input v-model.number="form.id" type="number" placeholder="ID" />
    <input v-model="form.name" type="text" placeholder="Название" />
    <input v-model.number="form.quantity" type="number" placeholder="Кол-во" />
    <button type="submit" :disabled="store.isSending">
      {{ store.isSending ? 'Отправка...' : 'Отправить' }}
    </button>
  </form>
</template>