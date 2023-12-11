import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: [],
      ...options
    });
  }
  toHTML() {
    return `
    <input class="input" type="text" value="New Sheet"/>

       <div>

          <div class="button">
            <span class="material-icons">delete</span>
          </div>

          <div class="button">
            <span class="material-icons">logout</span>
          </div>

       </div>
    `
  }
}