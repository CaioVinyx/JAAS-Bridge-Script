//Nome Mae
const urlAPI = "http://localhost:3333/pacientes";

fetch(urlAPI, {
    method: "GET",
    mode: "cors"
})
.then(resposta => resposta.json())
.then(listPacientes =>{
    if(listPacientes.length === 0){
        return
    }
})

const pacientObj = listPacientes[0]


const NameMom = pacientObj.NameMom;
const campomom = document.querySelector('input[formcontrolname="nomeMae"]');
campomom.value = NameMom;
const eventmom = new Event('input', { bubbles: true });
campomom.dispatchEvent(eventmom);

//email
const Email = pacientObj.email;
const campomail = document.querySelector('input[formcontrolname="nomeMae"]');
campomail.value = Email;
const eventmail = new Event('input', { bubbles: true });
campomail.dispatchEvent(eventmail);

//Cel
const Cel = pacientObj.Cel;
const campocel = document.querySelector('input[formcontrolname="nomeMae"]');
campocel.value = Cel;
const eventcel = new Event('input', { bubbles: true });
campocel.dispatchEvent(eventcel);

//CEP
const CEP = pacientObj.cep;
const campocep = document.querySelector('input[formcontrolname="nomeMae"]');
campocep.value = CEP;
const eventcep = new Event('input', { bubbles: true });
campocep.dispatchEvent(eventcep);

//NumEnd
const NumEnd = pacientObj.NumEnd;
const camponumend = document.querySelector('input[formcontrolname="nomeMae"]');
camponumend.value = NumEnd;
const eventend = new Event('input', { bubbles: true });
camponumend.dispatchEvent(eventend);

//ComplementoEnd
const ComplementoEnd = pacientObj.ComplementoEnd;
const campocomplentend = document.querySelector('input[formcontrolname="nomeMae"]');
campocomplentend.value = ComplementoEnd;
const eventcompleend = new Event('input', { bubbles: true });
campocomplentend.dispatchEvent(eventcompleend);
