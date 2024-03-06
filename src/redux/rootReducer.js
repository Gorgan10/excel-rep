import {
  CHANGE_STYLES,
  CHANGE_TEXT,
  CURRENT_STYLES,
  TABLE_RESIZE,
  TABLE_TITLE, UPDATE_DATE
} from '@/redux/types';

export function rootReducer(state, action) {
  let field
  let val
  // console.log('Action: ', action)
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      return {...state, [field]: value(state, field, action)}
    case CHANGE_TEXT:
      field = 'dataState'
      return {
        ...state,
        currentText: action.data.value,
        dataState: value(state, field, action)
      }
    case CURRENT_STYLES:
      return {...state, currentStyles: action.data}
    case CHANGE_STYLES:
      field = 'stylesState'
      val = state[field] || {}
      action.data.ids.forEach(id => {
        val[id] = {...val[id], ...action.data.value}
      })
      return {
        ...state,
        [field]: val,
        currentStyles: {...state.currentStyles, ...action.data.value}
      }
    case TABLE_TITLE:
      field = 'title'
      return {...state, [field]: action.data}
    case UPDATE_DATE:
      field = 'lastOpened'
      return {...state, [field]: new Date().toJSON()}
    default: return state
  }
}

function value(state, field, action) {
  const prevState = state[field] || {}
  prevState[action.data.id] = action.data.value
  return prevState
}