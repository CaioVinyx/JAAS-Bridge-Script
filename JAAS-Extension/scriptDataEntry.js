setTimeout(() => {
    chrome.runtime.sendMessage({ action: "search_data"}, (response) =>{
        //Received from API data JSON
        if(response.status){
            const listPacientes = response.payloadAPI
            const objPaciente = listPacientes[listPacientes.length - 1];
            console.log("Dados do paciente recebidos:", objPaciente);

            //Configure data entry
            //NameMom
            const NameMomCamp = document.querySelector('input[formcontrolname="nomeMae"]');
            NameMomCamp.value = objPaciente.NameMom;
            const campomomevent = new Event('input', { bubbles: true });
            NameMomCamp.dispatchEvent(campomomevent);
            //Name
            const NameCamp = document.querySelector('input[formcontrolname="nome"]');
            NameCamp.value = objPaciente.Name;
            const campnameevent = new Event('input', { bubbles: true });
            NameCamp.dispatchEvent(campnameevent);
            //SobreName
            const sobreNameCamp = document.querySelector('input[formcontrolname="sobrenome"]');
            sobreNameCamp.value = objPaciente.sobreName;
            const campsobrenameevent = new Event('input', { bubbles: true });
            sobreNameCamp.dispatchEvent(campsobrenameevent);
            //email
            const emailCamp = document.querySelector('input[formcontrolname="email"]');
            emailCamp.value = objPaciente.email;
            const campemailevent = new Event('input', { bubbles: true });
            emailCamp.dispatchEvent(campemailevent);
            //Cel
            const celCamp = document.querySelector('input[formcontrolname="celular"]');
            celCamp.value = objPaciente.Cel;
            const campcelevent = new Event('input', { bubbles: true });
            celCamp.dispatchEvent(campcelevent);
            //Cep
            const cepCamp = document.querySelector('input[formcontrolname="cep"]');
            cepCamp.value = objPaciente.cep;
            const campcepevent = new Event('input', { bubbles: true });
            cepCamp.dispatchEvent(campcepevent);
            //End
            const endCamp = document.querySelector('input[formcontrolname="endereco"]');
            endCamp.value = objPaciente.End;
            const campendevent = new Event('input', { bubbles: true });
            endCamp.dispatchEvent(campendevent);
            //NumEnd
            const numendCamp = document.querySelector('input[formcontrolname="numero"]');
            numendCamp.value = objPaciente.NumEnd;
            const campnumendevent = new Event('input', { bubbles: true });
            numendCamp.dispatchEvent(campnumendevent);
            //ComplementoEnd
            const complementoEndcamp = document.querySelector('input[formcontrolname="complemento"]');
            complementoEndcamp.value = objPaciente.ComplementoEnd;
            const campcomplementoendevent = new Event('input', { bubbles: true });
            complementoEndcamp.dispatchEvent(campcomplementoendevent);
            //City
            const cityEndCamp = document.querySelector('input[formcontrolname="cidade"]');
            cityEndCamp.value = objPaciente.CityEnd;
            const campcityendevent = new Event('input', { bubbles: true });
            cityEndCamp.dispatchEvent(campcityendevent);
            
            //const radioResidenciaFixa = document.querySelector('input[type="radio"][value="fixa"]');

            //Click Button Save
            setTimeout(() => {
                const allElements = Array.from(document.querySelectorAll('p'));
                const textSave = allElements.find(p => p.textContent.trim() === "Salvar Alterações");

                if (textSave) {
                    const buttonSave = textSave.closest('button'); 
                    if (buttonSave) {
                        if (buttonSave.disabled) {
                            console.error("Block.");
                        } else {
                            console.log("Find");
                            buttonSave.dispatchEvent(new MouseEvent('click', {
                                view: window,
                                bubbles: true,
                                cancelable: true
                            }));
                        }
                    }
                } else {
                    console.error("Not Find");
                }
            }, 800);
        } 
    })

},3000)

