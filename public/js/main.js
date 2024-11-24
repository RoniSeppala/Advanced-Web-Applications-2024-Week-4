const form = document.getElementById("todoForm")

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
    }).then((response) => response.json()).then((data) => console.log(data))
})