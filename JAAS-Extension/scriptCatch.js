//Pacient object configuration
setTimeout(() =>{
    const dataPacient = {

    cpf: document.querySelector('[data-testid=""]')?.textContent?.trim(),                          
    Name: document.querySelector('[data-testid=""]')?.textContent?.trim().split(" ")[0],
    sobreName: document.querySelector('[data-testid=""]')?.textContent?.trim().split(" ").slice(1).join(" "),
    NameMom: document.querySelector('[data-testid=""]')?.textContent?.trim(),
    email: document.querySelector('[data-testid=""]')?.textContent?.trim(),
    Cel: document.querySelector('[data-testid=""]')?.textContent?.trim(),
    cep: document.querySelector('[data-testid=""]')?.textContent?.trim(),
    End: document.querySelector('[data-testid=""]')?.textContent?.trim(),
    NumEnd: document.querySelector('[data-testid=""]')?.textContent?.trim(),
    ComplementoEnd: document.querySelector('[data-testid=""]')?.textContent?.trim(),
    BairroEnd: document.querySelector('[data-testid=""]')?.textContent?.trim(),
    CityEnd: document.querySelector('[data-testid=""]')?.textContent?.trim(),
    StateEnd: document.querySelector('[data-testid=""]')?.textContent?.trim(),

    //documento.queryElector = Comando nativo que varre o HTML da page procurando oque for passado nos parâmetros
    //.innerText = Extrai o texto visivel que está na tag ><
    //.trim() = limpa os espaços em branco

}
//Json Initialize and send from background validation
const jsonArch = JSON.stringify(dataPacient, null , 2)
console.log(jsonArch)

    chrome.runtime.sendMessage({
    action: "send_data",
    payload: jsonArch
    });
},10000)


