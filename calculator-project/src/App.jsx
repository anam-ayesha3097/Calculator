import { useReducer } from 'react'
import './styleSheets/style.css'
import DigitButton  from './reactComponents/DigitButton'
import OperationButton  from './reactComponents/OperationButton'


export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'del-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }){

  switch(type){
    case ACTIONS.ADD_DIGIT : 
      if( state. overwrite ){
        return{
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") 
        return state;
      if( payload.digit === "." && state.currentOperand.includes(".") )
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""} ${payload.digit}`.trim()
        }
    
        case ACTIONS.CLEAR :
          //Empty State
          return {}

        case ACTIONS.CHOOSE_OPERATION: 

          if( state.currentOperand == null )
            return {
              ...state,
              operation: payload.operation
          }

          if ( state.currentOperand == null && state.previousOperand == null)
            return state;
          if( state.previousOperand == null || state.previousOperand === undefined ){
            return {
              ...state,
              operation: payload.operation,
              previousOperand: state.currentOperand,
              currentOperand: null,
            }
          }
          return {
            ...state,
            currentOperand: null,
            previousOperand: evaluate(state),
            operation: payload.operation,
          }
        
        case ACTIONS.EVALUATE:
          if( state.operation == null || state.currentOperand == null || state.previousOperand == null )
            return state

          return{
            ...state,
            overwrite: true,
            previousOperand: null,
            currentOperand: evaluate(state),
            operation: null
          }
        
        case ACTIONS.DELETE_DIGIT:
          if( state.overwrite ){
            return {
              ...state,
              overwrite: false,
              currentOperand: null
            }
          }

          if( state.currentOperand == null) return state
          if( state.currentOperand.length === 1 ){
            return{
              ...state,
              currentOperand: null
            }
          }
          return{
            ...state,
            currentOperand:  state.currentOperand.slice(0, -1) //removes the last digit from the current operand
          }
  } 
}

function evaluate({ currentOperand, previousOperand, operation }){

  //currentOperand and previousOperand have spaces between the digits
  //thus parseFloat() takes only 1st digit which waas incorrect
  //replace(/\s/g, '') removes all spaces between the digits
  
  const previous = parseFloat(previousOperand.replace(/\s/g, ''));
  const current = parseFloat(currentOperand.replace(/\s/g, ''));

  if ( isNaN(previous) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = previous + current;
      break;
    case "-":
      computation = previous - current;
      break;
    case "+":
      computation = previous * current;
      break;
    case "÷":
      computation = previous /current;
      break;
  } 

  return computation.toString();
} 

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0, //no fractions
})


function formatOperand(operand){
  if ( operand == null) return
  const[ integer, decimal ] = operand.split('.');
  if ( decimal == null )
    return INTEGER_FORMATTER.format(integer);

  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}
function App() {

  const[{ currentOperand, previousOperand, operation }, dispatch ] = useReducer(reducer, {})
   
  return (
    <div className='calculator-grid'>
      <div className='output'>
        <div className='previous-operand'>{previousOperand}{operation}</div>
          <div className='current-operand'>{currentOperand}</div>
      </div>
      <button className='span-two' onClick={ () => dispatch({ type: ACTIONS.CLEAR }) }>AC</button>
      <button className='text'onClick={ () => dispatch({ type: ACTIONS.DELETE_DIGIT }) }>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit= "1" dispatch= {dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className='span-two' onClick={ () => dispatch({ type: ACTIONS.EVALUATE}) }>=</button>
    </div>
    
  )
}

export default App
