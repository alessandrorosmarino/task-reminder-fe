<template>
  <div>
    <h1>Reminder Form</h1>
    <form>
      <p>
        <label for="reminderTime">Alert Time</label>
        <input type="time" id="reminderTime" name="reminderTime" v-model="reminderTime"/>
      </p>
      <p>
        <label for="reminderText">Description</label>
        <textarea id="reminderText" name="reminderText" v-model="reminderText"/>
      </p>
      <p>
        <label for="reminderWeekday">Days of the week</label>
        <select v-model="reminderWeekday" id="reminderWeekday" name="reminderWeekday" multiple>
          <option value="" disabled>Select Option</option>
          <option value="monday">Monday</option>
          <option value="tuesday">Tuesday</option>
          <option value="wednesday">Wednesday</option>
          <option value="thursday">Thursday</option>
          <option value="friday">Friday</option>
          <option value="saturday">Saturday</option>
          <option value="sunday">Sunday</option>
        </select>
      </p>
      <p>
        <label for="isRecurring">Recurring every week?</label>
        <input type="checkbox" id="isRecurring" name="isRecurring" v-model="isRecurring"/>
      </p>
      <p>
        <button @click="addReminder">Add</button>
      </p>
    </form>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {saveReminder} from "@/js/reminderService";

  const reminderText = ref("");
  const reminderTime = ref("");
  const isRecurring = ref(false);
  const reminderWeekday = ref([]);

  function addReminder() {
    const json = {
      reminderText: reminderText.value,
      creationDate: new Date(),
      reminderTime: reminderTime.value,
      recurring: isRecurring.value,
      reminderWeekday: reminderWeekday.value,
      done:false
    };
    saveReminder((response) => response.json(), data => console.log(data), json);
  }

</script>

<style scoped>

</style>