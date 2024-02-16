import {toInlineStyles} from '@core/utils';
import {defaultStyles} from '@/constans';
import {parse} from '@core/parse';

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(state, row) {
  return function(_, col) {
    const width = getWidth(state.colState, col)
    const id = `${row + 1}:${col + 1}`
    const data = state.dataState[id]
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]})
    return `
      <div
         style="${styles}; width: ${width}"
         class="cell"
         contenteditable
         data-col="${col}"
         data-type="cell"
         data-id="${id}"
         data-value="${data || ''}"
      >${parse(data) || ''}</div>
  `
  }
}

function toColumn(col, index, width) {
  return `
      <div 
      style="width: ${width}" 
      class="column" data-type="resizable" data-col="${index}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
      </div>
  `
}

function createRow(index, content, state) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const height = getHeight(state, index)
  return `
      <div 
      style="height: ${height}" 
      class="row" 
      data-row="${index}" 
      data-type="resizable">
          <div class="row-info">
            ${index ? index : ''}
            ${resize}
          </div>
          <div class="row-data">${content}</div>
      </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function columnWithWidth(state) {
  return (col, index) => {
    const width = getWidth(state, index)
    return toColumn(col, index, width)
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(columnWithWidth(state.colState))
      .join('')

  rows.push(createRow(null, cols, {}))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('')

    rows.push(createRow(row + 1, cells, state.rowState))
  }

  return rows.join('')
}