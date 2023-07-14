import types from './types'

const miReducer = (state={}, action) => {
  switch (action.type){
    case types.login:
      return {
        estado: true,
        usuario: action.payload
      }
    case types.logout:
      return {
        estado: false,
        usuario: null
      }
    default:
      return state;
  }
}

export default miReducer