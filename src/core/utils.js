// pure functions

export function capitalize(string) {
  if (typeof string != 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index)
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(prevKey, currentKey) {
  if (typeof prevKey === 'object' && typeof currentKey === 'object') {
    return JSON.stringify(prevKey) === JSON.stringify(currentKey)
  }
  return prevKey === currentKey
}

export function camelToDashCase(str) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
      .map(k => `${camelToDashCase(k)}: ${styles[k]}`)
      .join(';')
}

export function debounce(fn, ms) {
  let timeout
  return function(...args) {
    const after = () => {
      clearTimeout(timeout)
      fn(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(after, ms)
  }
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}