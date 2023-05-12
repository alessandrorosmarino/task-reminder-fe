<template>
  <table>
    <caption>Reminders</caption>
    <thead>
      <tr>
        <th>Time</th>
        <th>Text</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="reminder in reminders" :key="reminder.id">
        <td>{{ reminder.reminderTime }}</td>
        <td>{{ reminder.reminderText}}</td>
        <td><button v-on:click="openDialog(reminder.id)">Details</button></td>
        <dialog v-bind:id="'reminder' + reminder.id">
          <ReminderCard :reminder="reminder" @updateData="getAllReminders"/>
        </dialog>
      </tr>
    </tbody>
  </table>
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

  function openDialog(id){
    const dialog = document.getElementById('reminder' + id);
    dialog.showModal();
  }
</script>

<style scoped>

  table {
    --border-radius: 10px;
    width: 100%;
    border-spacing: 0;
  }

  table > caption{
    font-size: 2em;
    font-weight: bold;
    padding: 5px;
    color: var(--text-color);
  }
  thead > tr > th:first-of-type{
    background-color: var(--primary-color);
    color: var(--text-color-contrast);
    border-top-left-radius: var(--border-radius);
  }

  thead > tr > th{
    background-color: var(--primary-color);
    color: var(--text-color-contrast);
    border: 1px solid var(--primary-color);
    font-weight: bold;
    font-size: 1.2em;
    text-align: center;
  }

  thead > tr > th:last-of-type{
    background-color: var(--primary-color);
    color: var(--text-color-contrast);
    border-top-right-radius: var(--border-radius);
  }

  tbody > tr > td:first-of-type{
    border-left: 1px solid var(--primary-color);
  }

  tbody > tr > td:not(:first-of-type):not(:last-of-type){
    border-left: 1px solid var(--primary-color);
    border-right: 1px solid var(--primary-color);
  }

  tbody > tr > td:last-of-type{
    border-right: 1px solid var(--primary-color);
  }

  tbody > tr:last-of-type > td:first-of-type{
    border-bottom-left-radius: var(--border-radius);
  }

  tbody > tr > td{
    border-bottom: 1px solid var(--primary-color);
  }
  tbody > tr:last-of-type > td:last-of-type{
    border-bottom-right-radius: var(--border-radius);
  }

  dialog {
    border-radius: 30px;
    border: 0;
  }
</style>