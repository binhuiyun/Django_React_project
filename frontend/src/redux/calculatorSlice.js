import {createSlice} from '@reduxjs/toolkit';


export const calculatorSlice = createSlice({
    name: 'calculator',
    initialState: {
        currentOperand: '',
        previousOperand: '',
        operation: null,
    },
    reducers: {
        addDigit: (state, action) => { 
            console.log("payload:", action.payload)
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: action.payload.digit,
                }
            }
            if (action.payload.digit === '0' && state.currentOperand === '0') {
                return state
            }
            if (action.payload.digit === '.' && state.currentOperand.includes('.')) {
                return state
            } 
            return {
                ...state,
                currentOperand: `${state.currentOperand || ''}${action.payload.digit}`,
            }
        },
        chooseOperation: (state, action) => {
            if (state.currentOperand == null && state.previousOperand == null) {
                return state
            }

            if (state.currentOperand == null) {
                return {
                    ...state,
                    operation: action.payload.operation,
                }
            }

            if (state.previousOperand == null) {
                return {
                    ...state,
                    operation: action.payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null,
                }
            }

            return {
                ...state,
                previousOperand: calc(state),
                operation: action.payload.operation,
                currentOperand: null,
            }
        },
        clear: () => ({}),
        deleteDigit: (state) => {
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: null,
                }
            }
            if (state.currentOperand == null) {
                return state
            }
            if (state.currentOperand.length === 1) {
                return {
                    ...state,
                    currentOperand: null,
                }
            }

            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1),
            }
        },
        evaluate: (state) => {
            if (
                state.operation == null ||
                state.currentOperand == null ||
                state.previousOperand == null
            ) {
                return state
            }

            return {
                ...state,
                overwrite: true,
                previousOperand: null,
                operation: null,
                currentOperand: calc(state),
            }
        },
    },
});

function calc({currentOperand, previousOperand, operation}) {
    const current = parseFloat(currentOperand);
    const previous = parseFloat(previousOperand);
    if (isNaN(current) || isNaN(previous)) {
        return '';
    }
    let computation = 0; 
    switch (operation) {
        case '+':
            computation = previous + current;
            break;
        case '-':
            computation = previous - current;
            break;
        case '*':
            computation = previous * current;
            break;
        case '÷':
            computation = previous / current;
            break;
    }
    return computation.toString();
}

export const {addDigit, chooseOperation, clear, deleteDigit, evaluate} = calculatorSlice.actions;
export default calculatorSlice.reducer;