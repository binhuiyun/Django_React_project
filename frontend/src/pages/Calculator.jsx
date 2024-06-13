import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { clear, deleteDigit, evaluate} from "../redux/calculatorSlice";
import DigitButton from "../components/DigitButton"
import OperationButton from "../components/OperationButton"
import "../styles/Calculator.css"
import Header from "../components/Header";

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function Calculator() {
  const dispatch = useDispatch();
  const {currentOperand, previousOperand, operation} = useSelector((state) => state.calculator);

  return (
    <>
    <Header/>
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch(clear())}
      >
        AC
      </button>
      <button onClick={() => dispatch(deleteDigit())}>
        DEL
      </button>
      <OperationButton operation="÷" />
      <DigitButton digit = "1" />
      <DigitButton digit="2" />
      <DigitButton digit="3" />
      <OperationButton operation="*"/>
      <DigitButton digit="4"  />
      <DigitButton digit="5"  />
      <DigitButton digit="6" />
      <OperationButton operation="+"  />
      <DigitButton digit="7"  />
      <DigitButton digit="8"  />
      <DigitButton digit="9"  />
      <OperationButton operation="-"/>
      <DigitButton digit="."  />
      <DigitButton digit="0"  />
      <button
        className="span-two"
        onClick={() => dispatch(evaluate())}
      >
        =
      </button>
    </div>
    </>
  )
}

export default Calculator