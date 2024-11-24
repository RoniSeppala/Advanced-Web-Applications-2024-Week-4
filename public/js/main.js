const form = document.getElementById("todoForm")
const searchForm = document.getElementById("searchForm")
const output = document.getElementById("output")
const searchOutput = document.getElementById("todoOutput")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const user = form.elements["userInput"].value
    const todo = form.elements["todoInput"].value

    const data = {
        "name": user,
        "todo": todo
    }

    console.log(data)

    fetch("http://localhost:3000/add", {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((response) => response.json()).then((data) => {
        console.log(data)
        output.innerText = ""
        const outputPElement = document.createElement("p")
        outputPElement.textContent = data
        output.appendChild(outputPElement)
    })
})

searchForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const searchedUser = searchForm.elements["searchInput"].value

    searchOutput.innerText = ""

    fetch("http://localhost:3000/todos/" + searchedUser).then((response) => response.json()).then((data) => {
        if (data == "User not found"){
            const outputListelement = document.createElement("li")
            outputListelement.innerText = "User not found"
            searchOutput.appendChild(outputListelement)
        } else {
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                const newListElement = document.createElement("li")
                newListElement.innerText = element
                searchOutput.appendChild(newListElement)
            }
        }
    })
})