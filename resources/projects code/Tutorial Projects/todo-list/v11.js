var todolist = {
  todos: [],
  // add method
  addTodo: function (todoText) {
    // add objects instead of plain text
    this.todos.push(
      // this object have two properties (todoText and completed)
      {
        // the first todoText is the name of a property on this object
        // the second todoText is refering to the todoText that is a parameter (line 7),
        // so this can change based on what you pass in when you use the method.
        todoText: todoText,
        // completed property will have a boolean value
        completed: false
      }
    );
  },
  // change method
  changeTodo: function (position, todoText) {
    // selects the position of the todo object 
    // and grab the todoText property(*) of that todo object 
    // then set it to a new value that is passed in when you run the function

    // (*) the dot (.) is used to just grab the todoText property
    // this will change the property todoText rather than the entire object
    this.todos[position].todoText = todoText;
  },
  // delete method
  deleteTodo: function (position) {
    this.todos.splice(position, 1);
  },
  // toggle complete method    
  // function needs a position so it knows which todo needs to modify 
  toggleCompleted: function (position) {
    // grab and save a reference to my todo
    // grab an specific position of todo object
    let todo = this.todos[position];
    // grab todo completed and set it to the oposite status
    // right now True to False
    todo.completed = !todo.completed;
  },
  // toggle all function
  toggleAll: function () {
    // create totalTodos variable and asign it all items inside the array
    let totalTodos = this.todos.length;
    // create completedTodos variable and asign it value 0 (it's empty)
    let completedTodos = 0;

    // Get number of completed todos

    // [New code]
    this.todos.forEach(function (todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });

    // [Old code]
    // for (let i = 0; i < totalTodos; i++) {
    //   if (this.todos[i].completed === true) {
    //     completedTodos++;
    //   }
    // }

    // Case 1: if everything is true, make everything false

    //[Old New code]
    // if (completedTodos == totalTodos) {
    //   this.todos.forEach(function (todo) {
    //     todo.completed = false;
    //   });
    // }

    // [Old code]
    // if (completedTodos === totalTodos) {
    //   for (let i = 0; i < totalTodos; i++) {
    //     this.todos[i].completed = false;
    //   }
    // }

    // Case 2: else, make everything true

    //[Old New code]
    // else {
    //   this.todos.forEach(function (todo) {
    //     todo.completed = true;
    //   })
    // }

    //[Old code]
    // } else {
    // for(let i = 0; i<totalTodos; i++) {
    //   this.todos[i].completed = true;
    //   }
    // }

    // [New code]
    this.todos.forEach(function (todo) {
    // Case 1: if everything is true, make everything false
    if (completedTodos === totalTodos) {
      todo.completed = false;

    // Case 2: else, make everything true
    } else {
      todo.completed = true;
    }
    })
  }
};

//Created handlers objects to handle different events
//In this case the events are different clicks
//Inside the object there are two methods
//These methods will get executed once the user clicks a button(html)
let handlers = {
  addTodo: function() {
    //grab the text input from the button and store it on the a varible named addTodoTextInput 
    let addTodoTextInput = document.getElementById('addTodoTextInput');

    //run todolist object with the addTodo method
    //addTodo method takes one argument(todoText) so it can pass that in
    //addTodoTextInput element can't be passed directly in, but something similar can be done
    //so it passes the value from addTodoTextInput as an argument, this will give you the value of whatever was typed in that input
    todolist.addTodo(addTodoTextInput.value);
    //grab the addTodoTextInput
    //grab the value property
    //and set it to an empty string
    //this way the box gets cleared so a new value can be input
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    let changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    let changeTodoTextInput = document.getElementById('changeTodoTextInput');
    //run todolist object with the changeTodo method
    //the first argument passes the position of the input
    //valueAsNumber is used to ensure that the first argument is a number
    //the second argument passes the text of the input
    todolist.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    //clear the inputs value
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  // every call on deleteTodo on handlers object an argument position is passed
  deleteTodo: function(position) {
    //take that position and delete that item
    todolist.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    let toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todolist.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todolist.toggleAll();
    view.displayTodos();
  }
};

//object responsible of handling view functions
let view = {
  displayTodos: function () {
    //grab a reference to the todos using ul
    let todosUL = document.querySelector('ul');
    //grab the innerHTML property from todosUL and set it to nothing
    //this will clear out the unordered list before it starts adding the new list elements 
    todosUL.innerHTML = '';
    //create a list item for each item in the todos array
    //[Old code]
    // for (let i = 0; i < todolist.todos.length; i++) {
    //   let todoLi = document.createElement('li');
    //   let todo = todolist.todos[i];
    //   let todoTextWithCompletion = '';
    //   if (todo.completed === true) {
    //     todoTextWithCompletion = '(x) ' + todo.todoText;
    //   } else {
    //     todoTextWithCompletion = '( ) ' + todo.todoText;
    //   }
    //   todoLi.id = i;
    //   todoLi.textContent = todoTextWithCompletion;
    //   todoLi.appendChild(this.createDeleteButton());
    //   todosUL.appendChild(todoLi);
    // }

    todolist.todos.forEach(function(todo, position) {
      let todoLi = document.createElement('li');
      let todoTextWithCompletion = '';

      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }

      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUL.appendChild(todoLi);
    }, this)
  },
  createDeleteButton: function() {
    let deleteButton = document.createElement('button');
    //text inside the button
    deleteButton.textContent = 'Delete';
    //assing the deleteButton class for the button
    deleteButton.className = 'deleteButton';
    //very important to return a value
    return deleteButton;
  },
  setUpEventHandlers: function () {
    let todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function (event) {
      //get the event element that was clicked on
      let elementClicked = event.target;
      //check if elementClicked is a delete button
      if (elementClicked.className === 'deleteButton') {
        //run handlers to delete todo
        //parseInt converts a string to a number
        //check the elementClicked parentNode(li) id
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventHandlers();