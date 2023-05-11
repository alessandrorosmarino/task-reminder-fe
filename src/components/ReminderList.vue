<template>
  <div>
    <h1>Reminders</h1>
      <div class="grid" v-for="reminder in reminders" :key="reminder.id">
        <span>{{ reminder.reminderTime }}</span>
        <span>{{ reminder.reminderText}}</span>
        <button v-on:click="openDialog(reminder.id)">Details</button>
        <dialog v-bind:id="'reminder' + reminder.id">
          <ReminderCard :reminder="reminder" @updateData="getAllReminders"/>
        </dialog>
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

  function openDialog(id){
    const dialog = document.getElementById('reminder' + id);
    dialog.showModal();
  }
</script>

<style scoped>
  .grid {
    display: grid;
    grid-template-columns: 100px 300px 100px 1fr;
  }

  .grid > span {
    border: 1px solid black;
  }

  dialog {
    border-radius: 30px;
    border: 0;
  }
</style>