<template>
  <ReminderList/>
  <ReminderForm/>
  <ReminderCard/>
</template>

<script setup>
import ReminderList from "./components/ReminderList.vue";
import ReminderForm from "./components/ReminderForm.vue";
import ReminderCard from "@/components/ReminderCard";

function urlBuilder(relativeUrl) {
  return "http://localhost:8080" + relativeUrl;
}

function deleteEntity(url, id, responseFunction, dataFunction) {
  const httpOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  };
  httpCall(url, httpOptions, responseFunction, dataFunction);
}

function httpCall(url,httpOptions, responseFunction, dataFunction){
  fetch(urlBuilder(url), httpOptions)
      .then((response) => responseFunction(response))
      .then((data) => dataFunction(data));
}

function updateEntity(url, id, responseFunction, dataFunction, json) {
  const httpOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json)
  };
  httpCall(url, httpOptions, responseFunction, dataFunction);
}

function saveEntity(url, responseFunction, dataFunction, json) {
  const httpOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json)
  };
  httpCall(url, httpOptions, responseFunction, dataFunction);
}

function getEntity(url,id, responseFunction, dataFunction) {
  const httpOptions = {
    method: "GET"
  };
  httpCall(url, httpOptions, responseFunction, dataFunction);
}
</script>

<style>
.flex{
  display: flex;
}

.vertical{
  flex-direction: column;
}
</style>