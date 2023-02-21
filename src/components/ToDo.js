import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store';

const ToDo = ({text, onBtnClick, id}) => {
  return (
    <div>
      <li>
        <Link to={`/${id}`}>
          {text} <button onClick={onBtnClick}>DEL</button>
        </Link> 
      </li>
    </div>
  )
};

const mapDispatchProps = (dispatch, ownProps) => {
  return {
    onBtnClick: () => dispatch(actionCreators.deleteToDo(ownProps.id))
  }
}

export default connect(null, mapDispatchProps)(ToDo);
