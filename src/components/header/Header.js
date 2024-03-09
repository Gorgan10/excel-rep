import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import * as actions from '@/redux/actions';
import {defaultTitle} from '@/constans';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    });
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
    <input id="header" class="input" type="text" value="${title}"/>

       <div>

          <div data-type="delete" class="button">
            <span data-type="delete" class="material-icons">delete</span>
          </div>

          <div data-type="exit" class="button">
            <span data-type="exit" class="material-icons">logout</span>
          </div>

       </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(actions.changeTitle($target.text()))
  }

  onClick(e) {
    const $target = $(e.target)
    if ($target.data.type === 'exit') {
      ActiveRoute.navigate('')
    } else if ($target.data.type === 'delete') {
      const warning = confirm('Do you want to delete this sheet?')
      if (warning) {
        localStorage.removeItem(`excel:${ActiveRoute.param}`)
        ActiveRoute.navigate('')
      }
    }
  }
}