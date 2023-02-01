import {
  ACTION_ANSWER_LIST,
  ACTION_QUIZ_ADD,
  ACTION_QUIZ_LIST,
  ACTION_QUIZ_LIST_FAIL,
  ACTION_QUIZ_REMOVE,
} from "../actionTypes/quiz";

import { callGet, callPost } from "../../services/axios";
import { Notification } from "element-react";

const token = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))["accessToken"]
  : null;

export const actionQuizCreate = (quizData) => (dispatch) => {
  callPost("/api/admin/quiz", quizData, token)
    .then((response) => {
      Notification.success({
        title: "Success",
        message: "Submit Success!",
        type: "success",
      });
      dispatch({
        type: ACTION_QUIZ_ADD,
        payload: quizData,
      });
    })
    .catch((err) => {
      console.log(err);
      Notification.error({
        title: "Failed",
        message: "Please try again.",
        type: "Warning",
      });
    });
};

export const actionQuizList = () => (dispatch) => {
  return callGet(`/api/quiz`)
    .then(function (response) {
      let result = response.data;
      dispatch({
        type: ACTION_QUIZ_LIST,
        payload: result,
      });
    })
    .catch((error) => {
      dispatch({
        type: ACTION_QUIZ_LIST_FAIL,
      });
    });
};



export const actionQuizRemove = (id) => (dispatch) => {
  callPost("/api/admin/quiz/remove", { id }, token)
    .then((response) => {
      Notification.success({
        title: "Success",
        message: "Remove Success!",
        type: "success",
      });
      dispatch({
        type: ACTION_QUIZ_REMOVE,
        payload: id,
      });
    })
    .catch((err) => {
      console.log(err);
      Notification.error({
        title: "Failed",
        message: "Please try again.",
        type: "Warning",
      });
    });
};


  
export const actionCreateAnswer = (answerData, history) => (dispatch) => {
  
  const id = localStorage.getItem("user")? JSON.parse(localStorage.getItem("user"))["id"]: null;
  const name = localStorage.getItem("user")? JSON.parse(localStorage.getItem("user"))["username"]: null;
  callPost('/api/sellproperty/answer', {data:JSON.stringify(answerData), id, name} , token)
    .then((response) => {
      Notification.success({
        title: 'Success',
        message: 'Submit Success!',
        type: 'success',
      })
      history.goBack();
    }).catch(err => {
      console.log(err);
      Notification.error({
        title: 'Failed',
        message: 'Please try again.',
        type: 'Warning',
      })
    }
  )
}

export const actionAnswerList = () => (dispatch) => {
  return callPost(`/api/sellproperty/answerList`, {}, token)
    .then(function (response) {
      let result = response.data;
      dispatch({
        type: ACTION_ANSWER_LIST,
        payload: result,
      });
    })
    .catch((error) => {
      dispatch({
        type: ACTION_QUIZ_LIST_FAIL,
      });
    });
};
