'use strict'
const storemodel = use('App/Models/StoreInfo')
const gestmodel = use('App/Models/Guestinfo')
const Database = use('Database')

const moment2 = use('moment')

class CreateguestinfoController {


    async index({view,session}) {
        //一進來就把session清掉
        // session.clear();
    
        const storeinfo_1 =await storemodel.all()
        const storeinfo = storeinfo_1.toJSON()
        //取得store info 資料
        const restructur_storeinfo = await Database.select('id', 'store_area','store_name','time_id','sotre_address','store_phone').from('store_infos')
        //取得store_area並用sql 直接去除重複丟到前端去
        const store_area_distinct = await Database.select('store_area').from('store_infos').distinct('store_area')
        //取得目前各店櫃預約的狀況，每天的每個時段只能有一組客人
        const store_status = await Database.select('store_id','date','time').from('guestinfos').where('status','已發送').andWhere('status','未審核')
        //格式化日期，不然用DBbulider查出來的日期會被轉成nodejs的格式
        for(let i=0;i<store_status.length;i++){
          store_status[i].date = moment2(store_status[i].date).format("YYYY-MM-DD");
        }
    
        return view.render('hiaudrey.createguest', {
          restructur_storeinfo:restructur_storeinfo,
          store_area_distinct:store_area_distinct,
          store_status:store_status
        })
      }


    async store( { request,response,session } ){
    
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
      

      guest_data.status = "未審核";
      
      //將客戶資料存進table中
      await gestmodel.create(guest_data)
  
        session.flash({addsucess:"新增成功"})
        return response.redirect('/AudreySP/HiAudrey')
      }
}

module.exports = CreateguestinfoController
