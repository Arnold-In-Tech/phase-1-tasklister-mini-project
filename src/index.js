
document.addEventListener("DOMContentLoaded", () => {
  // your code here
  
  let form = document.querySelector('form');

  // addValueOptions adds a dropdown list of options
  addValueOptions(form);  
  
  addInp(form,"Due-Date");
  addInp(form,"Duration");
  addInp(form,"User");

  form.addEventListener( 'submit', (ev) => { 
      
      ev.preventDefault();
      
      // Access the input value obtained from the dropdown options 
      
      description = ev.target['new-task-description'].value; 
      user = ev.target['User'].value; 
      duration = ev.target['Duration'].value;
      dueDate = ev.target['Due-Date'].value;

      taskValue = `${description}, ${user}, ${duration}, ${dueDate}`

      //console.log(ev.target);

      // build new tasks alongside a delete button option
      buildNewTask(taskValue);
      
      // reset the value of elements (form) after builiding our new task
      form.reset();
    })

});



function buildNewTask(taskValue){

  /*
   * Builds and displays the task value alongside a delete button option
   */

  // create a list and button elements 
  let listItem = document.createElement('li');
  let deleteButton = document.createElement('button');
  let editInput = document.createElement("input");
  let editButton = document.createElement("button");

  // assign the task value to list text 
  listItem.textContent = `${taskValue}`;
  deleteButton.textContent = ' x';
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";

  // add an event listener to the button
  // listen to a click event that allows the user to delete its parentNode ('li')
  // 'btn' will be appended as a child of 'li' 
  deleteButton.addEventListener('click', handleDelete);
  
  // bind handleEdit to edit button
  editButton.onclick = handleEdit;
  
  // append the button as a child of 'li'
  listItem.appendChild(deleteButton);
  listItem.appendChild(editButton);

  // append the newly created node (<li>) to the existing unorderd list (ul)
  document.querySelector('#tasks').appendChild(listItem);
  
}



function handleDelete(ev){
  /*
   * Grabs the target (btn) and its entire parentNode (i.e. <p>) and deletes 
   */ 
  ev.target.parentNode.remove();

}



function addValueOptions(form){

  /**
   * Will create a dropdown menu with options to select from.
   * Options selected will be set as input values
   */

  // create a select parent node
  select = document.createElement('select');
  select.id = 'select_task';

  // populate the node with option elements
  optionList = ['--Please choose an option--','Cook Breakfast', 'Clean Utensils', 'Do Laundry'];

  priority = {0: 'black', 1: 'red', 2: 'yellow', 3: 'green' };

  count = 0;
  for (let element of optionList){
    opt = document.createElement('option');
    opt.value = element;
    opt.textContent = element;

    // add a id and color based on priority 1===high, 2===medium, 3===low;
    opt.id = priority[count];
    opt.style.color = priority[count]; 
    count+=1;

    // append each option as a child to the select parentNode
    select.appendChild(opt);
  }
  
  // append the datalist as a child to the 'form' parentNode
  // and in between the input tags

  form.insertBefore(select, form.children[2]);   

  // set an onchange attribute to obtain the value and text of the selected options on change
  select.setAttribute('onchange', 'selOnChange();');

}



function selOnChange() {

  /**
   * Obtains the value of the selected option and sssigns the value to the input
   */

  let selVal;

  const select = document.getElementById("select_task");

  // get selected VALUE even outside event handler
  selVal = select.options[select.selectedIndex].value;

  // Assign the value as the input text on the DOM
  document.getElementById("new-task-description").value = selVal;
  
};


function addInp(form, description){
  
  // Inserts an additional input fields (e.g. user, duration, date due)

  let newInp = document.createElement('input');
  
  newInp.type = 'text';
  newInp.id = `${description}`;
  newInp.name = `${description}`;
  newInp.size = 20;
  newInp.placeholder = `${description}`;


  form.insertBefore(newInp, form.children[3]);
  
}


function handleEdit(ev){

  /**
   * Adds ability to Edit
  */  

  let listItem = this.parentNode;

  let editInput = document.createElement("input");
  let submitButton = document.createElement("button");

  editInput.type = "text";
  editInput.name = "edit-task"
  submitButton.id = "submit";
  submitButton.textContent = "submit";

  listItem.appendChild(editInput);
  listItem.appendChild(submitButton);

  // replace the input value in text box with the current one 
  editInput.value = listItem.firstChild.textContent; // The input text of the list
    
  submitButton.onclick = function(){  
    // after editing when the user clicks, it should set the list text to the newly edited text
    listItem.firstChild.textContent = editInput.value;

    // finally delete the submitButton and the editInput functionalities 
    submitButton.remove();
    editInput.remove();
  };
  
  // if the user presses the "Enter" key on the keyboard if should trigger the submit button
  editInput.addEventListener("keypress", function(ev) {
    if (ev.key === "Enter") {
      // Cancel the default action, if needed
      ev.preventDefault();
      // Trigger the button element with a click
      submitButton.click();
      };
    });
  }



