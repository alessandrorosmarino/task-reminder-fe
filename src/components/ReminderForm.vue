<template>
  <div>
    <h1>Reminder Form</h1>
    <form>
      <label for="reminderTime">Reminder Time</label>
      <input type="time" id="reminderTime" name="reminderTime" v-model="reminderTime"/>

      <label for="reminderText">Reminder Text</label>
      <input type="text" id="reminderText" name="reminderText" v-model="reminderText"/>

      <label for="monday">monday</label>
      <input type="checkbox" id="monday" name="monday" value="monday" v-model="reminderWeekday"/>
      <label for="tuesday">tuesday</label>
      <input type="checkbox" id="tuesday" name="tuesday" value="tuesday" v-model="reminderWeekday"/>
      <label for="wednesday">wednesday</label>
      <input type="checkbox" id="wednesday" name="wednesday" value="wednesday" v-model="reminderWeekday"/>
      <label for="thursday">thursday</label>
      <input type="checkbox" id="thursday" name="thursday" value="thursday" v-model="reminderWeekday"/>
      <label for="friday">friday</label>
      <input type="checkbox" id="friday" name="friday" value="friday" v-model="reminderWeekday"/>
      <label for="saturday">saturday</label>
      <input type="checkbox" id="saturday" name="saturday" value="saturday" v-model="reminderWeekday"/>
      <label for="sunday">sunday</label>
      <input type="checkbox" id="sunday" name="sunday" value="sunday" v-model="reminderWeekday"/>

      <label for="isRecurring">Recurring Reminder</label>
      <input type="checkbox" id="isRecurring" name="isRecurring" v-model="isRecurring"/>
      <button @click="addReminder">Add</button>
    </form>
  </div>
</template>

<script setup>
import {ref} from "vue";

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
    alert("sending: " + JSON.stringify(json));
    const httpOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json)
    };
    fetch("http://localhost:8080/reminders", httpOptions)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

</script>

<style scoped>

</style>