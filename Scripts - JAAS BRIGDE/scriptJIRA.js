//Pacient object configuration
const dataPacient = {

    CPF: document.querySelector('[data-testid="field-input-number-view-77"').innerText.trim(),                          
    Name: document.querySelector('[data-testid="field-input-text-short-view-78"').innerText.trim(),
    //Sex: document.querySelector('[data-testid="field-input-number-view-77"').innerText.trim(),
    Nascimento: document.querySelector('[data-testid="field-input-date-view-80"').innerText.trim(),
    NameMom: document.querySelector('[data-testid="field-input-text-long-view-83"').innerText.trim(),
    email: document.querySelector('[data-testid="field-input-email-view-88"').innerText.trim(),
    Cel: document.querySelector('[data-testid="field-input-number-view-90"').innerText.trim(),
    cep: document.querySelector('[data-testid="field-input-number-view-42"').innerText.trim(),
    End: document.querySelector('[data-testid="field-input-text-long-view-43"').innerText.trim(),
    NumEnd: document.querySelector('[data-testid="field-input-number-view-44"').innerText.trim(),
    ComplementoEnd: document.querySelector('[data-testid="field-input-text-short-view-45"').innerText.trim(),
    BairroEnd: document.querySelector('[data-testid="field-input-text-short-view-50"').innerText.trim(),
    CityEnd: document.querySelector('[data-testid="field-input-text-short-view-48"').innerText.trim(),
    StateEnd: document.querySelector('[data-testid="field-input-text-short-view-49"').innerText.trim(),

    //documento.queryElector = Comando nativo que varre o HTML da page procurando oque for passado nos parâmetros
    //.innerText = Extrai o texto visivel que está na tag ><
    //.trim() = limpa os espaços em branco

}

//JSON Configuration
const jsonArch = JSON.stringify(dataPacient, null , 2)
const urlAPI = "http://localhost:3333/pacientes";


fetch(urlAPI, {
    method: "POST",
    mode: "cors",
    headers: {
    "Content-Type": "application/json"
  },
  body: jsonArch
})
.then(resposta =>{
    if(resposta.ok){
        console.log("Sucess");
    
    }else{
        console.log("Error" + resposta.status);
    }
})
.catch(erro => {
    console.error("Fail:", erro)
})