<template>
  <div class="flex vertical card">
    <div class="flex close">
      <div class="flex vertical">
        <span>{{ reminder.reminderTime.substring(0,5) }}</span>
        <span v-bind:class="(reminder.done ? '' : 'in') +'complete'"> {{reminder.done ? 'C' : 'Not c'}}ompleted </span>
      </div>
      <form>
        <button formmethod="dialog" class="close-button">x</button>
      </form>
    </div>
    <div class="flex days">
      <span v-if="reminder.recurring">Every</span>
      <span class="day" v-for="weekday in weekdays" :key="weekday"
            v-bind:class="(weekday.scheduled.value?'':'not-') +'scheduled'">
        {{ weekday.placeholder }}
      </span>
    </div>
    <div class="flex description">
      {{ reminder.reminderText }}
    </div>
    <div class="flex buttons">
      <button @click="toggleDone(reminder)">Toggle Done</button>
      <button @click="remove(reminder.id)">Delete</button>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits, ref} from "vue";
import {deleteReminder,updateReminder} from "@/js/reminderService";

let props = defineProps({
  reminder: Object
});

let emits = defineEmits(["updateData"]);

let weekdays = [
  {day: "monday", scheduled: ref(false), placeholder: "Mo"},
  {day: "tuesday", scheduled: ref(false), placeholder: "Tu"},
  {day: "wednesday", scheduled: ref(false), placeholder: "We"},
  {day: "thursday", scheduled: ref(false), placeholder: "Th"},
  {day: "friday", scheduled: ref(false), placeholder: "Fr"},
  {day: "saturday", scheduled: ref(false), placeholder: "Sa"},
  {day: "sunday", scheduled: ref(false), placeholder: "Su"}
];

setWeekdays(props.reminder);

function remove(id) {
  deleteReminder(id, () => {
    emits("updateData");
  }, () => null);
}

function toggleDone(reminder) {
  const json = {
    reminderText: reminder.reminderText,
    creationDate: reminder.creationDate,
    reminderTime: reminder.reminderTime,
    recurring: reminder.recurring,
    reminderWeekday: reminder.reminderWeekday,
    done:!reminder.done
  };
  updateReminder( reminder.id, () => {
    emits("updateData");
  }, () => null, json);
}

function setWeekdays(reminder) {
  reminder.reminderWeekday.forEach((day) => {
    for (const weekday of weekdays) {
      if (weekday.day === day) {
        weekday.scheduled.value = true;
      }
    }
  });
}
</script>

<style scoped>

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  --primary-color: #0B0014;
  --secondary-color: #F5E9E2;
  --accent-color: #E3B5A4;
}

.complete{
  color: green;
}

.incomplete{
  color: red;
}

.scheduled{
  color: var(--secondary-color);
}

.not-scheduled{
  color: #464341;
}

.day{
  margin: 0 1px;
  padding: 0 2px;
  border: 1px solid var(--secondary-color);
  border-radius: 5px;
}

.close{
  justify-content: space-between;
  flex: 0 0 3em;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 10px;
  border-bottom: 1px solid var(--secondary-color);
}

.close-button{
  width: 20px;
  height: 20px;
  font-family: monospace;
  font-weight: bold;
  line-height: 0;
}

.days{
  justify-content: flex-end;
  align-items: center;
  flex: 0 0 2em;
  border-bottom: 1px solid var(--secondary-color);
}

.buttons{
  justify-content: flex-end;
  flex: 0 0 2em;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 10px;
  border-top: 1px solid var(--secondary-color);
}

.description{
  flex: 1 1 auto;
  justify-content: center;
  padding: 5px;
}

.card {
  width: 250px;
  height: 400px;
  align-items: center;
  background-color: transparent;
  color: var(--secondary-color);
}

.card > div{
  width: 100%;
  background-color: var(--primary-color);
}

button{
  background-color: var(--secondary-color);
  color: var(--primary-color);
  border: 0;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  cursor: pointer;
}
button:active{
  background-color: var(--accent-color);
}
</style>