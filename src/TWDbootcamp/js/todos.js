setTimeout(() => {}, 1000);
const todoList = [];

while(true){
    setTimeout(() => {}, 1000);
    let command = prompt("What would you do?");
    if( command === 'new'){
        let todo = prompt("Enter what is new to do : ");
        todoList.push(todo);
    } else if ( command === 'list'){
        console.log("*************************");
        for(let index in todoList){
            console.log(`${index} : ${todoList[index]}`);
        }
        console.log("*************************");
    } else if ( command === 'delete'){
        let index = parseInt(prompt("Enter an index to delete : "));
        if(!Number.isNaN(index)) { // validation 체크
            let deletedItem = todoList.splice(index, 1);
            console.log(`Ok, deleted ${deletedItem}`);
        } else {
            console.log(`Invalid Index`);
        }
    } else if ( command === 'quit' || command === 'q'){
        break;
        console.log("OK QUIT THE APP!")
    }
}
