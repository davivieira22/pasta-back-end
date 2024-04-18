const express = require("express")
const app = express()
const uuid = require("uuid")
const poit = 3001
import cors from 'cors'

app.use(express.json())
app.use(cors())

const users = []

const SmartHeader = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ messagem: "usuario nao encontrado" })
    }
    request.userindex = index
    request.userid = id
    next()
}

app.get("/protect", (request, response) => {
    return response.json(users)
})

app.post("/protect", (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age  }
    users.push(user)

    return response.status(201).json(user)
})


app.put("/protect/:id", SmartHeader, (request, response) => {
    const { name, age } = request.body
    const index = request.userindex
    const id = request.userid

    const UpdateUser = { name, age }

    users[index] = UpdateUser

    return response.json(UpdateUser)
})


app.delete("/protect/:id", SmartHeader, (request, response) => {
    const index = request.userid


    users.splice(index, 1)



    return response.status(204).json()
})





app.listen(poit, () => {
    console.log(`minha porta foi aberta ${poit}`)
})