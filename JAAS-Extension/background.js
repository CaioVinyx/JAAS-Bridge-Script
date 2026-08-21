chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>{
    if (request.action === "send_data") {
        fetch("http://localhost:3333/pacientes", {
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
    
    if (request.action === "search_data") {
        fetch("http://localhost:3333/pacientes", {
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