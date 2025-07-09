const add=document.getElementsByClassName(".add-plan");
const remove=document.getElementsByClassName(".remove-plan");
let plans=[];

function addPlan(){
const textInput=document.querySelector(".text-input");
let plan=textInput.value;
if(!plan)return;
plans.push({text:plan,completed:false});
showPlans();
textInput.value='';
}

function Delete(i){
plans.splice(i,1);
showPlans();
}
function toggle(i){
  plans[i].completed=!plans[i].completed;
  showPlans();
}
function showPlans(){
  const list=document.querySelector(".plansList");
  let data='';

  for(let i=0; i<plans.length ; i++){
    data+=`<li>
    <input type="checkbox" ${plans[i].completed?'checked':''} onchange='toggle(${i})'/>
    <span>${plans[i].text}</span>
    <button onclick='Delete(${i})' class="remove-plan">X</button>
  </li>`
  }
  list.innerHTML=data;
}
