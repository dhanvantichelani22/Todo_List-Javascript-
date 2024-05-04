const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const errorInput = document.getElementById("error");
const countValue = document.getElementById("count-value");
const taskValue = document.getElementById("tasks");

let taskCount=0;

const displayCount = (taskCount)=>{
  // taskName =   document.getElementById('pendingTask').innerText = `You have ${countValue} task(s) to complete`;
  countValue.innerText= taskCount;
};

function addTask(){
  
  error.style.display="none";
  const taskName = inputBox.value.trim(); 

  if(inputBox.value === '' || !taskName){
  //  alert("You Must Enter Task");
  setTimeout(()=>{
    error.style.display="block";
  },200);
  return;
}
else{
    let li = document.createElement("li");
    li.innerHTML=inputBox.value; // adding text in input field
    listContainer.appendChild(li); //li will be displayed in list Container
    // let trash = document.createElement('span');
    // trash.textContent = "\u00d7"; - for cross symbol
    // li.appendChild(trash);
    // let task = document.createElement('span');
    // task.className = 'taskName';
    // task.innerText= `You have ${countValue} task(s) to complete`; // Set the text content of the span
    // li.appendChild(task);
    
    // li.appendChild(task);
   
    // Now create the edit icon and append it to the list item
    let editIcon = document.createElement('i');
    editIcon.className = "fa fa-pen-to-square";
    li.appendChild(editIcon); 

    // Create the trash icon and append it to the list item
    let trashIcon = document.createElement('i');
    trashIcon.className = "fa fa-trash";
    li.appendChild(trashIcon);

    editIcon.addEventListener('click', function(e) {
      
      let input = document.createElement('input');
      input.value = li.textContent;
      li.textContent = '';
      li.appendChild(input);
  
  input.addEventListener('keypress', function (e) {
    
    if (e.key === 'Enter') {
      li.textContent = input.value;
      li.appendChild(editIcon);
      li.appendChild(trashIcon);  // Append the trash icon again
      // taskCount-=1;
      // displayCount(taskCount);
    }
  });
})
 inputBox.value = '';
 taskCount++;
 saveData();
}


// editIcon.addEventListener('click', function(e) {
//   let li = this.parentNode;
//   let text = li.firstChild.nodeValue;

//   let input = document.createElement("input");
//   input.type = "text";
//   input.value = text;

//   li.innerHTML = '';
//   li.appendChild(input);

//   input.focus();

//   input.onblur = function() {
//       let newText = input.value;
//       li.innerHTML = newText;
//       li.appendChild(editIcon);
//   }
// });


listContainer.addEventListener("click", function(e){
  if(e.target.tagName === "LI"){
   e.target.classList.toggle("checked");
   saveData();
  }
  else if(e.target.tagName === "I"){
   e.target.parentElement.remove();
   taskCount-=1;
   displayCount(taskCount);
   saveData();
  }
},false);
}


//Saving data in browser of list
function saveData(){
   localStorage.setItem("data",listContainer.innerHTML);
}

function showTask(){
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();