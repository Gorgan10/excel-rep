import {range} from '@core/utils';
import {$} from '@core/dom';

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function matrix($target, $current) {
  const target = $target.id(true)
  const current = $current.id(true)
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export function nextSelector(key, {col, row}) {
  const border = 1
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      col = col - 1 < border ? border : col - 1
      break
    case 'ArrowUp':
      row = row - 1 < border ? border : row - 1
      break
  }

  return `[data-id="${row}:${col}"]`
}

export function getCellDiv($cell) {
  return $($cell.$el).hasClass('cell')
}