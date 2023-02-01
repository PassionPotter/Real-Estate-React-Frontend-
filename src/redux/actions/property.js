import {
  ACTION_PROPERTY_ADD,
  ACTION_PROPERTY_UPDATE,
  ACTION_PROPERTY_LIST,
  ACTION_PROPERTY_LIST_FAIL,
  ACTION_PROPERTY_GET,
  ACTION_PROPERTY_GET_FAIL,
  ACTION_SELL_TOKEN_PROPERTIES_LIST_FAIL,
  ACTION_SELL_TOKEN_PROPERTIES_LIST,
} from '../actionTypes/property'

import { callGet, callPost, } from '../../services/axios'
import { Notification } from 'element-react'

var token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['accessToken'] : null

export const actionPropertyCreate = (propertyData) => (dispatch) => {
  token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['accessToken'] : null
  callPost('/api/admin/property', propertyData, token)
    .then((response) => {
      Notification.success({
        title: 'Success',
        message: 'House Properties Submit Success!',
        type: 'success',
      })
      dispatch({
        type: ACTION_PROPERTY_ADD,
        payload: propertyData,
      })
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

export const actionPropertyUpdate = (propertyData) => (dispatch) => {
  // console.log('token', token);
  token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['accessToken'] : null;
  console.log('token', token);
  callPost('/api/admin/property/update', propertyData, token)
    .then((response) => {
      Notification.success({
        title: 'Success',
        message: 'House Properties Update Success!',
        type: 'success',
      })
      dispatch({
        type: ACTION_PROPERTY_UPDATE,
        payload: propertyData,
      })
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

export const actionPropertyList = (count, sortFilter = 'generic') => (dispatch) => {
  return callGet(`/api/property?count=${count}&sortFilter=${sortFilter}`)
    .then(function (response) {
      let result = response.data
      // console.log("result",result);
      let negativeArray = [];
      for (let i = 0; i < result.length; i ++) {
        result[i].monthlyNetRent = result[i].monthlyGrossRent - result[i].monthlyCosts;
        result[i].yearlyNetRent = (result[i].monthlyGrossRent - result[i].monthlyCosts) * 12
        // result[i].totalInvestment = result[i].generatedToken * result[i].tokenValue        
        result[i].fee = result[i].generatedToken * result[i].tokenValue * 10 / 100
        result[i].totalInvestment = result[i].assetPrice + result[i].renovationUpgrade + result[i].operatingExpenseReimbursement +
        result[i].vacancyReserve + result[i].administrativeFee + result[i].initMaintainanceReserve + result[i].initialRenovationReserve;
        // console.log(`${result[i].id} totalInvestment: ${result[i].totalInvestment}`);
        // result[i].expectedYield = (result[i].monthlyGrossRent - result[i].monthlyCosts) * 12 / parseFloat(result[i].totalInvestment) * 100;
        
        result[i].expectedYield = (result[i].yearlyNetRent/result[i].generatedToken)/result[i].tokenValue * 100;
    
        result[i].yearlyRentPerToken = (result[i].monthlyGrossRent - result[i].monthlyCosts) / result[i].generatedToken * 12
        result[i].imageData = result[i].imageData.split(',');

        const tokensAvaliable = result[i].available
        const totalTokens = result[i].generatedToken
        let available = tokensAvaliable > 0 ? tokensAvaliable : totalTokens + tokensAvaliable;
        if(available < 0 || isNaN(available)) negativeArray.push(i);

      }
      for (let i = 0; i < negativeArray.length; i ++) {
        result.push(result.splice(negativeArray[i], 1)[0]);
      }
      dispatch({
        type: ACTION_PROPERTY_LIST,
        payload: result,
      })

        //       console.log(i);
        //       result[i].monthlyNetRent = result[i].monthlyGrossRent - result[i].monthlyCosts;
        //       result[i].yearlyNetRent = (result[i].monthlyGrossRent - result[i].monthlyCosts) * 12
        //       // result[i].totalInvestment = result[i].generatedToken * result[i].tokenValue        
        //       result[i].fee = result[i].generatedToken * result[i].tokenValue * 10 / 100
        //       result[i].totalInvestment = result[i].assetPrice + result[i].renovationUpgrade + result[i].operatingExpenseReimbursement +
        //       result[i].vacancyReserve + result[i].administrativeFee + result[i].initMaintainanceReserve + result[i].initialRenovationReserve;
        //       // console.log(`${result[i].id} totalInvestment: ${result[i].totalInvestment}`);
        //       // result[i].expectedYield = (result[i].monthlyGrossRent - result[i].monthlyCosts) * 12 / parseFloat(result[i].totalInvestment) * 100;
              
        //       result[i].expectedYield = (result[i].yearlyNetRent/result[i].generatedToken)/result[i].tokenValue * 100;
          
        //       result[i].yearlyRentPerToken = (result[i].monthlyGrossRent - result[i].monthlyCosts) / result[i].generatedToken * 12
        //       result[i].imageData = result[i].imageData.split(',');
  
        //       const tokensAvaliable = result[i].available
        //       const totalTokens = result[i].generatedToken
        //       let available = tokensAvaliable > 0 ? tokensAvaliable : totalTokens + tokensAvaliable;
        //       if(available < 0 || isNaN(available)) negativeArray.push(i);
        //   }
        //   for await ( let i of negativeArray.keys()) {
        //     result.push(result.splice(negativeArray[i], 1)[0]);
        //   }
      // (async () => {
          
      //     for await (const i of result.keys()) {
      //       console.log(i);
      //       result[i].monthlyNetRent = result[i].monthlyGrossRent - result[i].monthlyCosts;
      //       result[i].yearlyNetRent = (result[i].monthlyGrossRent - result[i].monthlyCosts) * 12
      //       // result[i].totalInvestment = result[i].generatedToken * result[i].tokenValue        
      //       result[i].fee = result[i].generatedToken * result[i].tokenValue * 10 / 100
      //       result[i].totalInvestment = result[i].assetPrice + result[i].renovationUpgrade + result[i].operatingExpenseReimbursement +
      //       result[i].vacancyReserve + result[i].administrativeFee + result[i].initMaintainanceReserve + result[i].initialRenovationReserve;
      //       // console.log(`${result[i].id} totalInvestment: ${result[i].totalInvestment}`);
      //       // result[i].expectedYield = (result[i].monthlyGrossRent - result[i].monthlyCosts) * 12 / parseFloat(result[i].totalInvestment) * 100;
            
      //       result[i].expectedYield = (result[i].yearlyNetRent/result[i].generatedToken)/result[i].tokenValue * 100;
        
      //       result[i].yearlyRentPerToken = (result[i].monthlyGrossRent - result[i].monthlyCosts) / result[i].generatedToken * 12
      //       result[i].imageData = result[i].imageData.split(',');

      //       const tokensAvaliable = result[i].available
      //       const totalTokens = result[i].generatedToken
      //       let available = tokensAvaliable > 0 ? tokensAvaliable : totalTokens + tokensAvaliable;
      //       if(available < 0 || isNaN(available)) negativeArray.push(i);
      //   }
      //   for await ( let i of negativeArray.keys()) {
      //     result.push(result.splice(negativeArray[i], 1)[0]);
      //   }
      //   console.log(result);
      //   dispatch({
      //     type: ACTION_PROPERTY_LIST,
      //     payload: result,
      //   })
    })
    .catch((error) => {
      dispatch({
        type: ACTION_PROPERTY_LIST_FAIL,
      })
    }
    )
}

export const actionPropertyGet = (ID) => (dispatch) => {
  return callGet(`/api/property/id?ID=${ID}`)
    .then(function (response) {
      let result = response.data
      console.log('getpropbyid', ID, result);
      result.monthlyGrossRent = result.monthlyGrossRent
      result.monthlyNetRent = result.monthlyGrossRent - result.monthlyCosts;
      result.yearlyNetRent = (result.monthlyGrossRent - result.monthlyCosts) * 12
      // result.totalInvestment = result.generatedToken * result.tokenValue
      result.fee = result.generatedToken * result.tokenValue * 10 / 100
      result.totalInvestment = result.assetPrice + result.renovationUpgrade + result.operatingExpenseReimbursement +
         result.vacancyReserve + result.administrativeFee + result.initMaintainanceReserve + result.initialRenovationReserve;
      result.expectedYield = (result.yearlyNetRent / result.generatedToken) / result.tokenValue * 100;
      //result.expectedYield = (result.monthlyGrossRent - result.monthlyCosts) * 12 / parseFloat(result.totalInvestment) * 100;
      result.yearlyRentPerToken = (result.monthlyGrossRent - result.monthlyCosts) / result.generatedToken * 12
      result.imageData = result.imageData.split(',')
      console.log(result.monthlyGrossRent - result.monthlyCosts, result.generatedToken, result.yearlyRentPerToken)
      return dispatch({
        type: ACTION_PROPERTY_GET,
        payload: result,
      })
    })
    .catch((error) => {
      return dispatch({
        type: ACTION_PROPERTY_GET_FAIL,
      })
    }
    )
}

export const actionPropertiesSellTokenList = ({ ID, period }) => (dispatch) => {
  return callGet(`/api/getSellTokenProperties?ID=${ID}&period=${period}`)
    .then(function (response) {
      let result = response.data
      console.log('getprop for sell tokens', ID, result);
      // result.monthlyGrossRent = result.monthlyGrossRent
      // result.monthlyNetRent = result.monthlyGrossRent - result.monthlyCosts;
      // result.yearlyNetRent = (result.monthlyGrossRent - result.monthlyCosts) * 12
      // // result.totalInvestment = result.generatedToken * result.tokenValue
      // result.fee = result.generatedToken * result.tokenValue * 10 / 100
      // result.totalInvestment = result.generatedToken * result.tokenValue + result.initMaintainanceReserve + result.fee;
      // result.expectedYield = (result.monthlyGrossRent - result.monthlyCosts) * 12 / parseFloat(result.generatedToken * result.tokenValue) * 100;
      // result.imageData = result.imageData.split(',')

      return dispatch({
        type: ACTION_SELL_TOKEN_PROPERTIES_LIST,
        payload: result,
      })
    })
    .catch((error) => {
      return dispatch({
        type: ACTION_SELL_TOKEN_PROPERTIES_LIST_FAIL,
      })
    }
    )
}