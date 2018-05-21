'use strict'

class invoicecheck {
  get rules () {
    return {
      // validation rules
      'invoice_num':'required'
    }
  }

  get messages(){
    return {
      'required':'發票號碼為必填欄位'
    }
  }
  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages)
    .flashAll();
    this.ctx.response.redirect('back')
  }
}

module.exports = invoicecheck
