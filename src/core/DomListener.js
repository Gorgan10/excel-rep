import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners= []) {
    if (!$root) {
      throw new Error('Not provided $root for DOMListener!')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (this[method]) {
        this[method] = this[method].bind(this)
        this.$root.on(listener, this[method])
      } else {
        throw new Error(
            `Method ${method} does not exist in ${this.name} Component!`)
      }
    })
  }
  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}