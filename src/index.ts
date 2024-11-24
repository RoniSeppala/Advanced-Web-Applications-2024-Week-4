import {Router, Request, Response} from "express"
import fs from "fs"

const router: Router = Router()

type TUser = {
    name: string,
    todos: string[]
}

router.get("/hello", (req:Request, res:Response) => {
    res.json({"msg":"hello world"})
})

router.post("/add", (req:Request, res:Response) => {
    const reqName = req.body.name
    const reqTodo = req.body.todo

    let todoData: TUser[] = [];

    fs.readFile("data.json", "utf8", (error: NodeJS.ErrnoException | null, data: string) => {
        if (error) {
            console.error(error)
            res.json({"msg":"read file error"})
            return
        }

        try {
            if (data.trim()){
                todoData = JSON.parse(data)
            }
        } catch (parseError: any) {
            console.error(`Json parse error ${parseError}`)
            res.json({"msg":"json parse error"})
            return
        }

        const existingUser = todoData.find(user => user.name === reqName)

        if (existingUser) {
            existingUser.todos.push(reqTodo)
        } else {
            const newUser: TUser = {
                name: reqName,
                todos: [reqTodo]
            }

            todoData.push(newUser)
        }


        fs.writeFile("data.json", JSON.stringify(todoData), (error: NodeJS.ErrnoException | null) => {
            if (error){
                console.error(error)
                res.json({"msg":"file write error"})
                return
            }
            res.json(`/Todo added succesfully to user ${reqName}/i`)
        })
    })
})

export default router