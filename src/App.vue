

<template>
  <Calendar/>   <!-- Используем компонент "Календарь" -->
</template>



<script>
import Calendar from './components/Calendar.vue'    // Импортируем компонент "Календарь"

export default {
  name: 'App',
  components: {
   Calendar  // Описание используемых компонентов: "Календарь"
  }
}
</script>

