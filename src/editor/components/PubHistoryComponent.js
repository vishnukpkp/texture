import { NodeComponent } from 'substance'

/*
  Edit publication history in this MetadataSection
*/
export default class PubHistoryComponent extends NodeComponent {

  render($$) {
    let el = $$('div').addClass('sc-publication-history')
    let history = this.props.node
    let dates = history.findAll('date')
    dates.forEach((date) => {
      const type = date.attr('date-type')
      el.append(
        this._renderDateEditor($$, date, this.getLabel(type))
      )
    })
    return el
  }

  _renderDateEditor($$, metaEl, name) {
    let id = metaEl.id
    let value = metaEl.getAttribute('iso-8601-date')
    let el = $$('div').addClass('se-metadata-item').append(
      $$('div').addClass('se-label').append(name),
      $$('input').attr({type: 'date', value: value})
        .addClass('se-text-input')
        .ref(id)
        .on('change', this._updateDateProp.bind(this, metaEl))
    )
    return el
  }

  _updateDateProp(metaEl) {
    let id = metaEl.id
    let value = this.refs[id].val()
    let editorSession = this.context.editorSession
    editorSession.transaction(doc => {
      let metaProp = doc.get(id)
      metaProp.setAttribute('iso-8601-date', value)
    })
  }

  _toggle() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

}
