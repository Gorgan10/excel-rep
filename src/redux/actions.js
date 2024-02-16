import {
  CHANGE_STYLES,
  CHANGE_TEXT,
  CURRENT_STYLES,
  TABLE_RESIZE, TABLE_TITLE
} from '@/redux/types';

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  }
}

export function changeText(data) {
  // console.log('Data from action: ', data)
  return {
    type: CHANGE_TEXT,
    data
  }
}

export function currentStyles(data) {
  return {
    type: CURRENT_STYLES,
    data
  }
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data
  }
}

export function changeTitle(data) {
  return {
    type: TABLE_TITLE,
    data
  }
}