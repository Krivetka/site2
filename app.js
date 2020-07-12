let addTitle = document.querySelector('#inputTitle');
let addText = document.querySelector('#inputText');
let addButton = document.querySelector('#btn');
let todo = document.querySelector('#currentTasks');
let completed = document.querySelector('#completedTasks');
let up = document.querySelector('#up');
let down = document.querySelector('#down');
let blue =  document.querySelector('#blue');
let green =  document.querySelector('#green');
let red =  document.querySelector('#red');
let yellow =  document.querySelector('#yellow');
let white =  document.querySelector('#white');
let heavenly =  document.querySelector('#heavenly');
let date = new Date();
let color="white";

var month = date.getMonth()+1;
if(month<10){
    month ='0'+month;
}
var minutes = date.getMinutes();
if(minutes<10){
    minutes ='0'+minutes;
}

function tame(date){
    return date.getHours()+':'+minutes+' '+date.getDate()+'.'+month+'.'+date.getFullYear();
}

let todoList = [];
let completedList = [];

if(localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}
if(localStorage.getItem('complete')){
    completedList = JSON.parse(localStorage.getItem('complete'));
    completeMessages();
}


notdoneTasks = document.getElementById("not-done-tasks"),
doneTasks = document.getElementById("done-tasks"),
notdoneTasks.innerHTML=todoList.length;
doneTasks.innerHTML=completedList.length;

blue.addEventListener('click',function () {
    color="#007bff";
});
green.addEventListener('click',function () {
    color="#28a745";
});
red.addEventListener('click',function () {
    color="#dc3545";
});
yellow.addEventListener('click',function () {
    color="#ffc107";
});
white.addEventListener('click',function () {
    color="#fff";
});
heavenly.addEventListener('click',function () {
    color="#17a2b8";
});


addButton.addEventListener('click',function () {
    function checkRadio(){
        var m = document.getElementsByName('gridRadios');
        for(var i=0; i<m.length;i++){
            if(m[i].checked){
                return (m[i].value);
            }
        }
    }


    let newTodo={
        title: addTitle.value,
        text:addText.value,
        important: checkRadio(),
        data: tame(date),
        color: color,
    };

    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo',JSON.stringify(todoList));
    window.location.reload();
});
let i=-1;

    up.addEventListener('click', function () {
        if(i !== 1){
            todoList = todoList.reverse();
            displayMessages();
            completedList = completedList.reverse();
            completeMessages();
            i=1;
        }
    });

    down.addEventListener('click',function () {
        if(i !==-1){
        todoList=todoList.reverse();
        displayMessages();
        completedList=completedList.reverse();
        completeMessages();
        i=-1;
        }
    });



function displayMessages() {
    let displayMessage =``;
    todoList.forEach(function (item, i){
        displayMessage += `
        <li class="list-group-item d-flex w-100 mb-2" style="background:${item.color}">
            <div class="w-100 mr-2">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1" for="item_${i}">${item.title}</h5>
                        <div>
                            <small class="mr-2" >${item.important}</small>
                            <small >${item.data}</small>
                       </div>
                        </div>
                        <p class="mb-1 w-100"  id="item_${i}">${item.text}</p>
                    </div>
                    <div class="dropdown m-2 dropleft">
                        <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
                            <button type="button" class="btn btn-success w-100"  id="complete_${i}">Complete</button>
                            <button type="button" class="btn btn-info w-100 my-2"  id="edit_${i}">Edit</button>
                            <button type="button" class="btn btn-danger w-100"   id="delete_${i}"}>Delete</button>
                        </div>
                    </div>
                </li>
        `;
        todo.innerHTML=displayMessage;
    });
}

function completeMessages() {
    let completeMessage =``;
    completedList.forEach(function (item, i){
        completeMessage += `
        <li class="list-group-item d-flex w-100 mb-2" style="background:${item.color}">
            <div class="w-100 mr-2">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1" for="item_${i}">${item.title}</h5>
                        <div>
                            <small class="mr-2" >${item.important}</small>
                            <small >${item.data}</small>
                       </div>
                        </div>
                        <p class="mb-1 w-100"  id="item_${i}">${item.text}</p>
                    </div>
                    <div class="dropdown m-2 dropleft">
                        <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
                         <button type="button" class="btn btn-success w-100"  id="notcomplete_${i}">Not Complete</button>
                            <button type="button" class="btn btn-danger w-100"   id="comdelete_${i}"}>Delete</button>
                        </div>
                    </div>
                </li>
        `;
        completed.innerHTML=completeMessage;
    });
}

todo.addEventListener('click', function (event) {
    let id=event.target.getAttribute('id');
    figures = /[0-9]/gi ;
    letters = /[a-z]/gi;
    let action = (id.match(letters)).join('');
    let valueTitle = todo.querySelector('[for='+"item_"+(id.match(figures)).join('')+']').innerHTML;
    todoList.forEach(function (item,i) {
        if(item.title === valueTitle){
            if(action === "delete"){
                todoList.splice(i,1);
                window.location.reload();
            } else if (action === "complete"){
                c = todoList[i];
                todoList.splice(i,1);
                completedList.push(c);
                localStorage.setItem('complete',JSON.stringify(completedList));
                window.location.reload();
            }  else if (action === "edit"){
                alert("Not work")
            }
            displayMessages();
            completeMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});
completed.addEventListener('click', function (event) {
    let id=event.target.getAttribute('id');
    figures = /[0-9]/gi ;
    letters = /[a-z]/gi;
    let action = (id.match(letters)).join('');
    let valueTitle = completed.querySelector('[for='+"item_"+(id.match(figures)).join('')+']').innerHTML;
    completedList.forEach(function (item,i) {
        if(item.title === valueTitle){
            if(action === "comdelete"){
                completedList.splice(i,1);
                window.location.reload();
            } else if (action === "notcomplete"){
                c = completedList[i];
                completedList.splice(i,1);
                todoList.push(c);
                localStorage.setItem('todo',JSON.stringify(todoList));
                window.location.reload();
            }
            displayMessages();
            completeMessages();
            localStorage.setItem('complete', JSON.stringify(completedList));
        }
    });
});

