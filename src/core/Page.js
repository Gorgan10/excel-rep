export class Page {
  constructor(params) {
    this.params = params
  }

  getRoot() {
    throw new Error('method getRoot() must be implemented')
  }

  afterRender() {}

  destroy() {}
}