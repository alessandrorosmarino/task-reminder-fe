import {getEntity, saveEntity, deleteEntity, updateEntity} from "@/js/httpClient";

let basePath = "reminders";

function saveReminder(addReminderResponse, addReminderData, json) {
    saveEntity(basePath, addReminderResponse, addReminderData, json);
}

function getReminders(getReminderResponse, getReminderData) {
    getEntity(basePath, getReminderResponse, getReminderData);
}

function getReminder(id, getReminderResponse, getReminderData) {
    getEntity(joinPaths(basePath,id), getReminderResponse, getReminderData);
}

function deleteReminder(id, deleteReminderResponse, deleteReminderData) {
    deleteEntity(joinPaths(basePath,id), deleteReminderResponse, deleteReminderData);
}

function updateReminder(id, updateReminderResponse, updateReminderData, json) {
    updateEntity(joinPaths(basePath,id), updateReminderResponse, updateReminderData, json);
}

function joinPaths() {
    let array = [];
    for (const argument of arguments) {
        array.push(argument);
    }
    return array.join("/");
}

export {saveReminder, getReminder, deleteReminder, updateReminder ,getReminders};