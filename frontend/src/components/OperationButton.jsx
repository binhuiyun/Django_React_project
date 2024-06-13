import { chooseOperation} from "../redux/calculatorSlice";
import { useDispatch } from "react-redux";

export default function OperationButton({ operation }) {
    const dispatch = useDispatch();
  return (
    <button
      onClick={() =>
        dispatch(chooseOperation({ operation })) }
      
    >
      {operation}
    </button>
  )
}
