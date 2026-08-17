import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { DatabaseMemory } from './database-memory.js'

const server = fastify()

const database = new DatabaseMemory()

await server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400
     
})

server.post('/pacientes', (request, reply) => {
    const {CPF, Name, NameMom, email, Cel, cep, End, NumEnd, ComplementoEnd, CityEnd, StateEnd} = request.body

    database.create({
        CPF: CPF,
        Name: Name,
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