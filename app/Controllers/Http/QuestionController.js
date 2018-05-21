'use strict'
const questionM = use('App/Models/Questionnaire')
const moment2 = use('moment')
const XlsxPopulate = use('xlsx-populate')
const storemodel = use('App/Models/StoreInfo')
const Database = use('Database')

class QuestionController {
    async index({ view,session,auth }){
        // 管理者
        if(auth.user.id == 1){
            const question_data = await questionM.all();
            const question_data2 = question_data.toJSON();
    
            for(let i=0;i<question_data2.length;i++){
                question_data2[i].qu_test_date = moment2(question_data2[i].qu_test_date).format("YYYY-MM-DD");
            }
    
            return view.render('hiaudrey.questionindex',{
                SessionUser:auth.user.username+"你好",
                question_data:question_data2
            })
        }
        // 一般使用者
        else{
            const question_data = await questionM.all();
            const question_data2 = question_data.toJSON();
    
            for(let i=0;i<question_data2.length;i++){
                question_data2[i].qu_test_date = moment2(question_data2[i].qu_test_date).format("YYYY-MM-DD");
            }
    
            return view.render('hiaudrey.questionindex2',{
                SessionUser:auth.user.username+"你好",
                question_data:question_data2
            })
        }
    }

    async writequestion({ view,session }){
        const store_info = await Database.select('store_num','store_name').from('store_infos')
        // const store_data = store_info.toJSON();

        return view.render('hiaudrey.question',{
            store_data:store_info,
            SessionUser:session.get('username')+"你好"
        })
    }

//新增
    async store({ view,session,request,response }){
        const guest_data = request.only([
          'qu_store_num',
          'qu_store_name',
          'qu_test_date',
          'qu_test_size',
          'qu_size',
          'qu_1_1_1',
          'qu_2_1',
          'qu_1_1_2',
          'qu_1_1_3',
          'qu_1_2_2',
          'qu_1_2_1',
          'qu_1_2_3'
        ])

        await questionM.create(guest_data)
        session.flash({
          addsucess: "新增成功"
        })
        return response.redirect('/AudreySP/question')

    }

        //刪除
        async delete({params,session,response}){
            const delMem = await questionM.find(params.id)
            await delMem.delete()
            session.flash({ notification:'刪除成功' })
            return response.redirect('/AudreySP/question')
            
        }

        async downloadguestinfo({request,response,next}) {
          //==================下載的excel標題部分
          var hello = await XlsxPopulate.fromBlankAsync()
            .then(async workbook => {

              const r = workbook.sheet(0).range("B1:AA1");
              r.value([
                ["櫃號", "櫃名", "試穿日期", "試穿尺寸", "尺碼", "未完成原因", "是否完成"],
              ]);
              workbook.sheet(0).range("B1:I1").style({
                fontColor: "ffffff",
                fill: "272727",
                horizontalAlignment: 'center'
              });

              //===================抓資料
              const question_data = await questionM.all();
            //   const question_data2 = question_data.toJSON();
             const question_data2 = await Database.select('qu_store_num','qu_store_name','qu_test_date','qu_test_size','qu_size','qu_1_1_1','qu_2_1').from('questionnaires');
      
              for(let i=0;i<question_data2.length;i++){
                  question_data2[i].qu_test_date = moment2(question_data2[i].qu_test_date).format("YYYY-MM-DD");
              }

              var datacount = question_data2.length;
              var arr = [];
              var arr2 =[];
              var rr = [];
              for(let i =0;i<datacount;i++){
                rr[i] =  workbook.sheet(0).range("B"+(i+2)+":I"+(i+2));

                  var qus = question_data2[i];
                  for(var ob in qus){
                      arr2.push(qus[ob]);
                  }
                  arr.push(arr2);
                  rr[i].value(arr);
                  arr.length=0;
                  arr2.length=0;
              }
              

              //建立此excel檔案到server
              // Write to file.
              return workbook.toFileAsync("./public/download/book.xlsx");
            });

          return await response.attachment('./public/download/book.xlsx', 'Hello.xlsx');


        }

        async ajatime({ request,response}){

            const time_id = await Database.select('time_id').from('store_infos').where('store_name',request.all().store_name);            
            console.log(time_id[0].time_id)
            return time_id[0].time_id
        }

        async ajatime2({ request,response}){
            const store_id = await Database.select('id').from('store_infos').where('store_name',request.all().store_name);
            // console.log(store_id[0].id);
            const guest_info = await Database.select('guest_name','validator_num','guest_size','cell_phone').from('guestinfos').where('store_id',store_id[0].id).andWhere('date',request.all().date).andWhere('time',request.all().time).andWhere('status','已發送');
            console.log(guest_info)
            return guest_info
        }

}

module.exports = QuestionController
