import {
  ACTION_QUIZ_ADD,
  ACTION_QUIZ_LIST,
  ACTION_QUIZ_REMOVE,
  ACTION_ANSWER_LIST
} from "../actionTypes/quiz";

export const initialState = {
  quizData: [],
  answerData:[],
};

const quiz = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_QUIZ_ADD:
      return {
        ...state,
        quizData: [...state.quizData, action.payload],
      };
    case ACTION_QUIZ_LIST:
      return {
        ...state,
        quizData: action.payload,
      };
    case ACTION_QUIZ_REMOVE:
      return {
        ...state,
        quizData: state.quizData.filter((item) => {
            return item.id != action.payload
        }),
      };
    case ACTION_ANSWER_LIST:
      return {
        ...state,
        answerData: action.payload,
      };
    default:
      return state;
  }
};
export default quiz;
