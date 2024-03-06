export function toHTML(key) {
  const link = key.split(':')[1]
  const state = JSON.parse(localStorage.getItem(key))
  return `
    <li class="db__record">
       <a href="#excel/${link}">${state.title}</a>
       <strong>
          ${new Date(state.lastOpened).toLocaleDateString()}
          ${new Date(state.lastOpened).toLocaleTimeString()}
       </strong>
    </li>
  `
}

function getAllKey() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }

    keys.push(key)
  }
  return keys
}

export function createTableRecords() {
  const keys = getAllKey()
  console.log('keys: ', keys)
  if (!keys.length) {
    return `You have not created any sheets`
  }
  return `
    <div class="db__list-header">
        <span>Name</span>
        <span>Last Opened</span>
    </div>

    <ul class="db__list">
        ${keys.map(toHTML).join('')}
    </ul>
  `
}

// function getKeyId(keys) {
//   keys.split(':')
//   keys.map(key => {
//     key
// }