import { SplitPanePackage, ScrollPane, SplitPane, Layout } from 'substance'
import AbstractWriter from '../../common/AbstractWriter'
// import AuthorTOCProvider from './AuthorTOCProvider'

class Author extends AbstractWriter {

  render($$) {
    let el = $$('div').addClass('sc-author')
    el.append(
      $$(SplitPane, {splitType: 'vertical', sizeB: '400px'}).append(
        this._renderMainSection($$),
        this._renderContextSection($$)
      )
    )
    return el
  }

  _renderContextSection($$) {
    return $$('div').addClass('se-context-section').append(
      // $$(TOC)
    )
  }

  _renderMainSection($$) {
    let mainSection = $$('div').addClass('se-main-section')
    let splitPane = $$(SplitPane, {splitType: 'horizontal'}).append(
      this._renderToolbar($$),
      this._renderContentPanel($$)
    )
    mainSection.append(splitPane)
    return mainSection
  }

  _renderContentPanel($$) {
    const doc = this.editorSession.getDocument()
    const ArticleComponent = this.getComponent('article')
    // const Overlay = this.getComponent('overlay')
    // const ContextMenu = this.getComponent('context-menu')
    // const Dropzones = this.componentRegistry.get('dropzones', 'strict')

    const article = doc.get('article')

    let contentPanel = $$(ScrollPane, {
      tocProvider: this.tocProvider,
      scrollbarType: 'substance',
      scrollbarPosition: 'left',
      highlights: this.contentHighlights,
    }).ref('contentPanel')

    let layout = $$(Layout, {
      width: 'large'
    })

    layout.append(
      $$(ArticleComponent, {
        node: article,
        disabled: this.props.disabled
      })
    )

    contentPanel.append(
      layout
      // $$(Overlay),
      // $$(ContextMenu),
      // $$(Dropzones)
    )
    return contentPanel
  }

  _scrollTo(nodeId) {
    this.refs.contentPanel.scrollTo(nodeId)
  }

  getConfigurator() {
    return this.props.editorSession.configurator
  }

  _getExporter() {
    // return this.getConfigurator().createExporter('texture-jats')
    return null
  }

  _getTOCProvider() {
    return null
  }

}

export default Author