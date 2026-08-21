//Pacient object configuration
setTimeout(() =>{
    const dataPacient = {

    cpf: document.querySelector('[data-testid="field-input-number-view-77"]')?.textContent?.trim(),                          
    Name: document.querySelector('[data-testid="field-input-text-short-view-78"]')?.textContent?.trim().split(" ")[0],
    sobreName: document.querySelector('[data-testid="field-input-text-short-view-78"]')?.textContent?.trim().split(" ").slice(1).join(" "),
    NameMom: document.querySelector('[data-testid="field-input-text-long-view-83"]')?.textContent?.trim(),
    email: document.querySelector('[data-testid="field-input-email-view-88"]')?.textContent?.trim(),
    Cel: document.querySelector('[data-testid="field-input-number-view-90"]')?.textContent?.trim(),
    cep: document.querySelector('[data-testid="field-input-number-view-42"]')?.textContent?.trim(),
    End: document.querySelector('[data-testid="field-input-text-long-view-43"]')?.textContent?.trim(),
    NumEnd: document.querySelector('[data-testid="field-input-number-view-44"]')?.textContent?.trim(),
    ComplementoEnd: document.querySelector('[data-testid="field-input-text-short-view-45"]')?.textContent?.trim(),
    BairroEnd: document.querySelector('[data-testid="field-input-text-short-view-50"]')?.textContent?.trim(),
    CityEnd: document.querySelector('[data-testid="field-input-text-short-view-48"]')?.textContent?.trim(),
    StateEnd: document.querySelector('[data-testid="field-input-text-short-view-49"]')?.textContent?.trim(),

    //documento.queryElector = Comando nativo que varre o HTML da page procurando oque for passado nos parâmetros
    //.innerText = Extrai o texto visivel que está na tag ><
    //.trim() = limpa os espaços em branco

}
const jsonArch = JSON.stringify(dataPacient, null , 2)
console.log(jsonArch)

    chrome.runtime.sendMessage({
    action: "send_data",
    payload: jsonArch
    });
},10000)


