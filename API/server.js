import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const server = fastify()
const database = new DatabaseMemory()

server.post('/pacientes', (request, reply) => {
    const {cpf, Name, sobreName,  NameMom, email, Cel, cep, End, NumEnd, ComplementoEnd, CityEnd, StateEnd} = request.body

    database.create({
        cpf: cpf,
        Name: Name,
        sobreName: sobreName,
        NameMom: NameMom,
        email: email,
        Cel: Cel,
        cep: cep,
        End: End,
        NumEnd: NumEnd,
        ComplementoEnd: ComplementoEnd,
        CityEnd: CityEnd,
        StateEnd: StateEnd,
    })

    return reply.status(201).send()
    
})

server.get('/pacientes', (request, reply) => {
        const listPacientes = database.list();
        return reply.status(200).send(listPacientes)

    })
    

server.listen({
    port: 3333,
})