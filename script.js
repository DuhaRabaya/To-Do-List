//   const input = document.querySelector('input');
//   const addBtn = document.querySelector('.add-btn');
//   const tasksList = document.querySelector('.tasks');

//   const addPlan = () => {
//     const task = input.value; 
//     if (task === '') return;

//     const li = document.createElement('li');
//     li.className = 'd-flex justify-content-between align-items-center mx-3 mb-3 list-group-item bg-light';
//     li.innerHTML = `
//       <span class="ps-3">${task}</span>
//       <button class="delete-btn btn btn-danger">Delete</button>
//     `;
//     tasksList.appendChild(li);
//     li.querySelector('.delete-btn').addEventListener('click', () => {
//       li.remove();
//     });
//     input.value = '';
//   };

const input = document.querySelector('input');          
const addBtn = document.querySelector('.add-btn');     
const tasksList = document.querySelector('.tasks');   
let currentFilter = "all";  
let plans = JSON.parse(localStorage.getItem('plans')) || []; //stored as a json string in the local string 

const save = ()=>localStorage.setItem('plans', JSON.stringify(plans));

const addPlan = ()=> {
  const text = input.value.trim();   
  if (text === "") return;         
  plans.push({
    text: text,
    completed: false
  });
  input.value = "";   
  save();        
  render();    
}

const deletePlan =(index)=> {
  plans.splice(index, 1); //start at position index, Remove 1 item 
  save();
  render();
}

const togglePlan =(index)=> {
  plans[index].completed = !plans[index].completed;
  save();
  render();
}

const getFilteredPlans=() =>
    currentFilter === "completed" ? plans.filter(p => p.completed) : //new array containing only elements that are completed
    currentFilter === "pending"   ? plans.filter(p => !p.completed) :
    plans;
  

const render =()=>{
  tasksList.innerHTML = "";

  getFilteredPlans().forEach((plan, i) => {
    const li = document.createElement("li");
    li.className = "d-flex align-items-center mb-3 bg-white rounded p-2 ms-0";
    li.innerHTML = `
    <input type="checkbox" ${plan.completed ? "checked" : ""} onchange='togglePlan(${i})' class="checkbox me-2">
      <span class="${plan.completed ? "completed" : ""} w-100">
        ${plan.text}
      </span>
      <button class="delete-btn btn btn-danger btn-sm ms-2" onclick='deletePlan(${i})'>Delete</button>
    `;
    tasksList.appendChild(li); 
  });
}
render();//when loading the bage for the local stored array

document.querySelector('.all').addEventListener('click', () => {
    currentFilter = "all";
    render();
  });
  
  document.querySelector('.done').addEventListener('click', () => {
    currentFilter = "completed";
    render();
  });
  
  document.querySelector('.pending').addEventListener('click', () => {
    currentFilter = "pending";
    render();
  });
  
