import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "Add_Todo"
const DELETE_TODO = "delete_Todo"

const AddToDo = text => {
  return {
    type: ADD_TODO, 
    text
  }
}
const DeleteToDo = id => {
  return {
    type: DELETE_TODO, 
    id
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case ADD_TODO:
      const newToDoObj = { text : action.text, id: Date.now() }
      return [...state, newToDoObj];
    case DELETE_TODO:
      return state.filter(toDo => toDo.id !== action.id);
  }
}

const dispatchAddToDo = (text) => {
  store.dispatch(AddToDo(text))
}
const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(DeleteToDo(id))
}

const store = createStore(reducer);

// const createToDo = toDo => {
//   const li = document.createElement("li");
//   li.innerText = toDo;
//   ul.appendChild(li);
// }
const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    li.innerText = toDo.text;
    btn.innerText = "DELETE"
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id
    li.appendChild(btn);
    ul.appendChild(li);
  });
}
// store.subscribe(() => console.log(store.getState()));
store.subscribe(paintToDos);
const handleSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  // createToDo(toDo)
  dispatchAddToDo(toDo);
  paintToDos();
}

form.addEventListener("submit", handleSubmit);