<template>
  <div>
    <h1>Reminders</h1>
    <!--table>
      <tr>
        <th v-for="item in reminderKeys" :key="item">{{ item }}</th>
        <th>Delete</th>
        <th>Done</th>
      </tr>
      <tr v-for="reminder in reminders" :key="reminder.id">
        <td v-for="val in reminder" :key="val">{{ val }}</td>
        <td>
          <button @click="deleteReminder(reminder.id)">Delete</button>
        </td>
        <td>
          <button @click="updateReminder(reminder)">Toggle Done</button>
        </td>
      </tr>
    </table-->

    <div class="grid">
      <ReminderCard v-for="reminder in reminders" :key="reminder.id" :reminder="reminder"/>
    </div>
    <button @click="getReminders">Get Reminders</button>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import ReminderCard from "@/components/ReminderCard";

  const reminders = ref([]);
  const reminderKeys = ref([]);

  getReminders();

  function getReminders() {
    fetch("http://localhost:8080/reminders")
        .then((response) => response.json())
        .then((data) => {
          reminders.value = data;
          if (reminders.value.length > 0)
          {
            reminderKeys.value = Object.keys(reminders.value[0]);
          }
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