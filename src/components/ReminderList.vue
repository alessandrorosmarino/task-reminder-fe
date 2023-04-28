<template>
  <div>
    <h1>Reminders List</h1>
    <ul>
      <li v-for="reminder in reminders" :key="reminder.id">
        {{ reminder }}
      </li>
    </ul>
    <button @click="getReminders">Get Reminders</button>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  const reminders = ref([]);

  getReminders();

  function getReminders() {
    fetch("http://localhost:8080/reminders")
        .then((response) => response.json())
        .then((data) => {
          reminders.value = data;
          return data;
        });
  }
</script>

<style scoped>
  div {
    background-color: #333333;
    color: #ffffff;
  }
</style>