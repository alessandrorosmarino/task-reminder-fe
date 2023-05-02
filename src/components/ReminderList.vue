<template>
  <div>
    <h1>Reminders</h1>
    <div class="grid">
      <ReminderCard v-for="reminder in reminders" :key="reminder.id" :reminder="reminder" @updateData="getAllReminders"/>
    </div>
    <button @click="getAllReminders">Get Reminders</button>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import ReminderCard from "@/components/ReminderCard";
  import {getReminders} from "@/js/reminderService";

  const reminders = ref([]);

  getAllReminders();

  function getAllReminders() {
    getReminders( (response) => response.json(), (data) => {
      reminders.value = data;
      return data;
    });
  }
</script>

<style scoped>
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
  }
</style>