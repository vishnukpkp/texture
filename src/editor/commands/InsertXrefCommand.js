import InsertInlineNodeCommand from './InsertInlineNodeCommand'

export default class InsertXrefCommand extends InsertInlineNodeCommand {

  getType() {
    return 'xref'
  }

  createNode(tx) {
    let refType = this.config.refType
    let xref = tx.createElement('xref')
    xref.attr('ref-type', refType)
    xref.attr('rid', '')
    return xref
  }
}
