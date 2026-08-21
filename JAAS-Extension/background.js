//Request JSON from scripCatch.js and post to API
chrome.runtime.onMessage.addListener((request, sendResponse) =>{
    if (request.action === "send_data") {
        fetch("http://localhost:3333/*", {
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: request.payload
        })
        .then(response => response.text())
        .then(data => sendResponse({ status: true, response: data}))
        .catch(erro => sendResponse({ status: false, erro: erro.message }));
                        
        return true;
    }
//Request JSON from API and send form scripDataEntry.js
    if (request.action === "search_data") {
        fetch("http://localhost:3333/*", {
            method: "GET",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
        })
        .then(response => response.json())
        .then(data => sendResponse({ status: true, payloadAPI: data}))
        .catch(erro => sendResponse({ status: false, erro: erro.message }));

        return true;    
    }
});