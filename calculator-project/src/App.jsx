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
      console.log(`${payload.digit}`);
      console.log(`${state.currentOperand}`);
      if (payload.digit === "0" && state.currentOperand === "0") 
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""} ${payload.digit}`.trim()
        }
  }
}

function App() {

  const[{ currentOperand, previousOperand, operation }, dispatch ] = useReducer(reducer, 
    {})
   
  return (
    <div className='calculator-grid'>
      <div className='output'>
        <div className='previous-operand'>{previousOperand}{operation}</div>
          <div className='current-operand'>{currentOperand}</div>
      </div>
      <button className='span-two'>AC</button>
      <button className='text'>DEL</button>
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
      <button className='span-two'>=</button>
    </div>
    
  )
}

export default App
