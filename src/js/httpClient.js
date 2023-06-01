async function urlBuilder(relativeUrl) {
    let ip;
    await fetch("../ip.json").then((response) => response.json())
        .then((data) => ip = data.ip);
    console.log(ip);
    return "http://" + ip + "/" + relativeUrl;
}

function deleteEntity(url, responseFunction, dataFunction) {
    const httpOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    };
    httpCall(url, httpOptions, responseFunction, dataFunction);
}

async function httpCall(url,httpOptions, responseFunction, dataFunction){
    let builded = await urlBuilder(url);
    fetch(builded, httpOptions)
        .then((response) => responseFunction(response))
        .then((data) => dataFunction(data));
}

function updateEntity(url, responseFunction, dataFunction, json) {
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

function getEntity(url, responseFunction, dataFunction) {
    const httpOptions = {
        method: "GET"
    };
    httpCall(url, httpOptions, responseFunction, dataFunction);
}

export {deleteEntity, updateEntity, saveEntity, getEntity};