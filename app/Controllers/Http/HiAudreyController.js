'use strict'
const Guestinfo = use('App/Models/Guestinfo')
const moment2 = use('moment')
const XlsxPopulate = use('xlsx-populate')
const Database = use('Database')
class HiAudreyController {
    async index({ view,session,auth }){
      //管理者
    if(auth.user.id == 1){
        //關聯式查詢
        const all_guestinfo = await Guestinfo
          .query()
          .with('StoreInfo')
          .fetch()
        const guestdata = all_guestinfo.toJSON()

        for (let i = 0; i < guestdata.length; i++) {
          guestdata[i].date = moment2(guestdata[i].date).format("YYYY-MM-DD");
          guestdata[i].birthday = moment2(guestdata[i].birthday).format("YYYY-MM-DD");
        }

        return view.render('hiaudrey/index', {
          guestdata: guestdata,
          SessionUser: auth.user.username + "你好"
        })
        }
        // 一般店長
        else {
          //關聯式查詢
          const all_guestinfo = await Guestinfo
            .query()
            .with('StoreInfo')
            .fetch()
          const guestdata = all_guestinfo.toJSON()

          for (let i = 0; i < guestdata.length; i++) {
            guestdata[i].date = moment2(guestdata[i].date).format("YYYY-MM-DD");
            guestdata[i].birthday = moment2(guestdata[i].birthday).format("YYYY-MM-DD");
          }

          return view.render('hiaudrey/index2', {
            guestdata: guestdata,
            SessionUser: session.get('username') + "你好"
          })
        }
    }


        //刪除
        async delete({params,session,response}){
            console.log("delete");
            const delMem = await Guestinfo.find(params.id)
            await delMem.delete()
            session.flash({ notification:'刪除成功' })
            return response.redirect('/AudreySP/HiAudrey')
            
        }

        async downloadguestinfo( {request, response, next} ) {
//==================下載的excel標題部分
            var hello = await XlsxPopulate.fromBlankAsync()
              .then(async workbook => {

                const r = workbook.sheet(0).range("A1:L1");
                r.value([
                  ["店櫃", "預約日期", "預約時間", "姓名", "電話", "生日", "Email", "狀態", "驗證碼" ,"發票號碼", "尺寸", "建立時間"],
                  ["店櫃", "預約日期", "預約時間", "姓名", "電話", "生日", "Email", "狀態", "驗證碼" ,"發票號碼", "尺寸", "建立時間"],
                ]);
                workbook.sheet(0).range("A1:L1").style({
                  fontColor: "ffffff",
                  fill: "272727",
                  horizontalAlignment: 'center'
                });

                //===================抓資料
                const all_guestinfo = await Guestinfo
                  .query()
                  .with('StoreInfo')
                  .fetch()
                var guestdata2 = all_guestinfo.toJSON()
                var guestdata = await Database.select('store_id','date','time','guest_name','cell_phone','birthday','email','status','validator_num','guest_invoice','guest_size','created_at').from('guestinfos');
                // console.log(guestdata2);
                // console.log(guestdata[0]);
                
                // console.log(guestdata[15].StoreInfo.store_name)
                // var guestdata2 = [];
                // for(var x=0;x<guestdata.length;x++){
                //   guestdata2[x] = await Database.select('store_name').from('store_infos').where('id',guestdata[x].store_id);
                // }
                // r.value([ [1,2,3],[1,2,3] ])
                for(var i=0;i<guestdata.length;i++){
                  guestdata[i].date = moment2(guestdata[i].date).format("YYYY-MM-DD");
                  guestdata[i].birthday = moment2(guestdata[i].birthday).format("YYYY-MM-DD"); 
                  guestdata[i].created_at = moment2(guestdata[i].created_at).format("YYYY-MM-DD HH:mm:ss");                  
                                   
                  workbook.sheet("Sheet1").cell("A"+(i+2)).value(guestdata2[i].StoreInfo.store_name);
                  workbook.sheet("Sheet1").cell("B"+(i+2)).value(guestdata[i].date); 
                  workbook.sheet("Sheet1").cell("C"+(i+2)).value(guestdata[i].time);                  
                  workbook.sheet("Sheet1").cell("D"+(i+2)).value(guestdata[i].guest_name);                  
                  workbook.sheet("Sheet1").cell("E"+(i+2)).value(guestdata[i].cell_phone);                  
                  workbook.sheet("Sheet1").cell("F"+(i+2)).value(guestdata[i].birthday);                  
                  workbook.sheet("Sheet1").cell("G"+(i+2)).value(guestdata[i].email);                  
                  workbook.sheet("Sheet1").cell("H"+(i+2)).value(guestdata[i].status);                  
                  workbook.sheet("Sheet1").cell("I"+(i+2)).value(guestdata[i].validator_num);                  
                  workbook.sheet("Sheet1").cell("J"+(i+2)).value(guestdata[i].guest_invoice);                  
                  workbook.sheet("Sheet1").cell("K"+(i+2)).value(guestdata[i].guest_size);                  
                  workbook.sheet("Sheet1").cell("L"+(i+2)).value(guestdata[i].created_at);                      
                }
                
                //建立此excel檔案到server
                // Write to file.
                return workbook.toFileAsync("./public/download/guestinfo.xlsx");
              });

            return await response.attachment('./public/download/guestinfo.xlsx', 'Hello.xlsx');

          }

} 

module.exports = HiAudreyController
