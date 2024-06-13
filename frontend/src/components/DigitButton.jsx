import { addDigit } from "../redux/calculatorSlice";
import { useDispatch } from "react-redux";

export default function DigitButton({digit}) {
    const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(addDigit({digit}))}
    >
      {digit}
    </button>
  )
}
