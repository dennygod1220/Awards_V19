'use strict'
//node-shcedule排程module
const schedule = use('node-schedule');


const gestmodel = use('App/Models/Guestinfo')
const storemodel = use('App/Models/StoreInfo')
const Database = use('Database')

const moment2 = use('moment')

class GuestinfoController {

  async invoiceok({view,session}) {
    const invoicenum = session.get('invoicenum')
    //一進來就把session清掉
    // session.clear();

     // this.testsql();    

    const storeinfo_1 =await storemodel.all()
    const storeinfo = storeinfo_1.toJSON()
    //取得store info 資料
    const restructur_storeinfo = await Database.select('id', 'store_area','store_name','time_id','sotre_address','store_phone').from('store_infos')
    //取得store_area並用sql 直接去除重複丟到前端去
    const store_area_distinct = await Database.select('store_area').from('store_infos').distinct('store_area')
    //取得目前各店櫃預約的狀況，每天的每個時段只能有一組客人
    const store_status = await Database.select('store_id','date','time').from('guestinfos').where('status','已發送').orWhere('status','未審核').orWhere('status','不符合')
    // console.log(store_status)
    
    //格式化日期，不然用DBbulider查出來的日期會被轉成nodejs的格式
    for(let i=0;i<store_status.length;i++){
      store_status[i].date = moment2(store_status[i].date).format("YYYY-MM-DD");
    }
    return view.render('guestinfo.guestinfo', {
      invoicenum: invoicenum,
      restructur_storeinfo:restructur_storeinfo,
      store_area_distinct:store_area_distinct,
      store_status:store_status
    })
  }


  async store( { request,response,session,view } ){
    const guest_data = request.only(['store_id','date','time','guest_name','cell_phone','birthday','email','guest_invoice','guest_size'])

    function getCode(n) {
      var all = "azxcvbnmsdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP0123456789";
      var b = "";
      for (var i = 0; i < n; i++) {
       var index = Math.floor(Math.random() * 62);
       b += all.charAt(index);
    
      }
      return b;
     };

    guest_data.validator_num = getCode(5);

    //驗證此客戶是否已存在資料庫中，若是有就將其狀態改為 資料重複 沒有就判斷是否為其他尺寸
    const repeat_gu = await Database.select('*').from('guestinfos').where('guest_name',guest_data.guest_name).andWhere('cell_phone',guest_data.cell_phone).andWhere('birthday',guest_data.birthday);
    // console.log(repeat_gu); 
    if(repeat_gu.length >= 1 ){
      guest_data.status = "客資重複";
     }else{
        guest_data.status = "未審核";
     }
    // console.log(repeat_gu)
    //將客戶資料存進table中
    await gestmodel.create(guest_data)
    session.clear();
    return view.render('guestinfo.sucess')
  }
  
}


module.exports = GuestinfoController
