'use strict'

const Schema = use('Schema')

class AdonisInvoiceSchema extends Schema {
  up () {
    this.create('adonis_invoices', (table) => {
      table.increments()
      table.string('invoice_num').notNullable()
      table.string('file_name')
      table.integer('invoice_status').comment('發票狀態')
      table.timestamps()
    })

  }

  down () {
    this.drop('adonis_invoices')
  }
}

module.exports = AdonisInvoiceSchema
