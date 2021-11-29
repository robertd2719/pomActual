import Task from "./task.js";
let time_display = document.querySelector("#time-display");
let long_timer_reset = document.querySelector("#reset_long_button");
let medium_timer_reset = document.querySelector("#reset_medium_button");
let start_button = document.querySelector("#start_button");


// describe and define basic 'time' parameters
let minutes=0;
let seconds=0;
let intervalID;

// HELPER FUNCTION TO SET TIME DISPLAY
const set_time_display = (mins,secs)=>{
    console.log(mins,seconds);
    minutes = mins;
    seconds = secs;
    let minuteString;
    let secondString;
    minuteString = (mins < 10) ? "0"+mins : mins.toString();
    secondString = (secs < 10) ? "0"+secs : secs.toString();

    time_display.textContent = minuteString + ":" + secondString;
}

// COUNTER FUNCTION TO DECREMENT REAL TIME
const counter = ()=>{
    console.log(`minutes: ${minutes} seconds: ${seconds}`);
    if (minutes == 0 && seconds == 0){
        set_time_display(minutes,seconds);
        clearInterval(intervalID);
        alert("Congratulations, work cycle is complete");
    } if (minutes >=1 && seconds == 0){
        minutes -= 1;
        seconds = 59;
        set_time_display(minutes,seconds);
    } else {
        seconds -=1;
        set_time_display(minutes,seconds);
    }
}

const pulseDown = () =>{
    intervalID = setInterval(counter,1000)
}
//EVENT LISTENERS
long_timer_reset.addEventListener('click',(e) =>set_time_display(25,0));
medium_timer_reset.addEventListener('click',(e) =>set_time_display(10,0));
start_button.addEventListener('click',()=>pulseDown());

// we can use the simple act of clicking on the 'time' display to 'stop' the timer.
time_display.addEventListener('click',()=>clearInterval(intervalID));


//----------------------TASK LIST --------------------------------->
// DOM elements to VARIABLES and VARIABLES
const add_task_button = document.querySelector("#addTaskButton");
const new_task = document.querySelector('#new_task');
const ul_task_list = document.querySelector('.task-list');

const task_list = [];


// EVENT LISTENERS
add_task_button.addEventListener('click',e=> createNewTask(new_task.value));

// FUNCTIONS
const createNewTask = (task)=>{
    task_list.push(new Task(task_list.length+1,task));
    // Create a node to be added to the UL dynamically.
    const task_node = document.createElement('LI');
    task_node.classList.add("task-node");
    // Create a paragraph node to be added to the li to attach to
    const task_para = document.createElement("p")
    task_para.textContent = task.toUpperCase();
    task_node.appendChild(task_para);
    // Create buttons to be able to delete and set tasks complete
    const complete_button = document.createElement('BUTTON');
    complete_button.textContent = "DONE";
    complete_button.classList.add('button_done');
    complete_button.addEventListener('click',ev => {
        task_para.classList.toggle("strike-through");
    })
    const delete_button = document.createElement('BUTTON');
    delete_button.textContent = "DELETE"
    delete_button.classList.add('button_delete');
    delete_button.addEventListener('click',ev => {
        delete_button.parentElement.remove();
    })
    // add buttons to our li node
    task_node.appendChild(complete_button);
    task_node.appendChild(delete_button);
    // finally add our node to the actual list
    ul_task_list.appendChild(task_node);
    new_task.value = "";
}