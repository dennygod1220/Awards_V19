'use strict'

const Schema = use('Schema')

class StoreInfoSchema extends Schema {
  up () {
    this.create('store_infos', (table) => {
      table.increments()
      table.string('store_area').comment('店櫃區域')
      table.string('store_name').comment('店櫃名稱')
      table.string('sotre_address').comment('店櫃地址')
      table.string('store_phone').comment('店櫃電話')
      table.string('can_reserve_time').comment('可預約時段')
      table.integer('time_id').comment('可預約時段代號')
      table.integer('store_num').comment('店櫃編號')
      table.timestamps()
    })
  }

  down () {
    this.drop('store_infos')
  }
}

module.exports = StoreInfoSchema
