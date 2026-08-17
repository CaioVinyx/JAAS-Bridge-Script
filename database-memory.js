import { randomUUID } from "node:crypto" //UUID = id unico

export class DatabaseMemory{
    #pacientes = new Map()

    create(paciente){
        const pacienteID = randomUUID()
        this.#pacientes.set(pacienteID, paciente)
    }

    list(){
        return Array.from(this.#pacientes.entries()).map((pacienteArray) => {
            const id = pacienteArray [0]
            const data = pacienteArray [1]

            return{
                id,
                ...data
            }
        })
    }

}