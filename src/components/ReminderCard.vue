<template>
  <div class="flex vertical card">
    <div class="flex close">
      <div class="flex vertical">
        <span>{{ reminder.reminderTime }}</span>
        <span>{{ reminder.done }}</span>
        <span>{{ reminder.recurring }}</span>
      </div>
      <button class="close-button">x</button>
    </div>
    <div class="flex days">
       <span>{{reminder.reminderWeekday}}</span>
    </div>
    <div class="flex description">
      {{ reminder.reminderText }}
    </div>
    <div class="flex creationDate">
      <span>{{ reminder.creationDate }}</span>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from "vue";

defineProps({
  reminder: Object
});

function deleteReminder(id) {
  //TODO: importare script in modo da poter referenziare il metodo e aggiornare la lista dei reminder dopo la cancellazione getReminders()
  deleteEntity("reminders/", id, (response) => response.json(), (data) => console.log(data));
}

function updateReminder(reminder) {
  const json = {
    reminderText: reminder.reminderText,
    creationDate: reminder.creationDate,
    reminderTime: reminder.reminderTime,
    recurring: reminder.recurring,
    reminderWeekday: reminder.reminderWeekday,
    done:!reminder.done
  };
  //TODO: importare script in modo da poter referenziare il metodo e aggiornare la lista dei reminder dopo la modifica getReminders()
  updateEntity("reminders/", reminder.id, (response) => response.json(), (data) => console.log(data), json);
}
</script>

<style scoped>

.close{
  width: 100%;
  justify-content: space-between;
  flex: 0 0 3em;
}

.close-button{
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 25%;
  border: 0;
  cursor: pointer;
}

.close-button:active{
  background-color: lightgray;
}

.days{
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  flex: 0 0 2em;
}

.creationDate{
  width: 100%;
  justify-content: flex-start;
  flex: 0 0 1em;
}

.description{
  flex: 1 1 auto;
  justify-content: center;
}

.card {
  width: 250px;
  height: 400px;
  align-items: center;
  background-color: #333333;
  border-radius: 20px;
  border: 1px solid white;
  color: white;
  padding: 10px 15px;
  margin: 10px;
}
</style>