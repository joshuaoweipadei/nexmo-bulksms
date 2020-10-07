const SET_ALERT = 'SET_ALERT';
const REMOVE_ALERT = 'REMOVE_ALERT';

export default (state, action) => {
  switch(action.type){
    case SET_ALERT:
      const aaa = state.find(alert => alert.message === action.payload.message && alert.type === action.payload.type);
      if(!aaa){
        return [...state, action.payload];
      }
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload);
    default:
      return state;
  }
}