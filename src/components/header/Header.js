import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import * as actions from '@/redux/actions';
import {defaultTitle} from '@/constans';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    });
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
    <input id="header" class="input" type="text" value="${title}"/>

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

  onInput(event) {
    const $target = $(event.target)
    console.log($target.text())
    this.$dispatch(actions.changeTitle($target.text()))
  }
}