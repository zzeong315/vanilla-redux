import React, { useState } from 'react'
import { connect } from 'react-redux';
import ToDo from '../components/ToDo';
import { actionCreators } from '../store';

const Home = ({toDos, addToDo}) => {
  const [text, setText] = useState("");
  const handleChange = (event) => {
    const {value} = event.target;
    setText(value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(text);
    addToDo(text);
    setText("");
  }
  return (
    <div>
      <h1>Todo</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          placeholder='write your to do...'
          onChange={handleChange}
          value={text}
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map(toDo => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { toDos: state };
}
function mapDispatchProps(dispatch) {
  return {
    addToDo: text => dispatch(actionCreators.addToDo(text))
  }
}
// connet(null, mapDispatchProps) => state가 필요 없을 경우 null 사용
export default connect(mapStateToProps, mapDispatchProps)(Home);
