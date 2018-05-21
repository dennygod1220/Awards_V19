'use strict'

//node-shcedule排程module
const schedule = use('node-schedule');

const req = use('request');
const utf8 = use('utf8');
const moment2 = use('moment');
const gestmodel = use('App/Models/Guestinfo')
const Database = use('Database')
const Awards = use('App/Models/AdonisInvoice')
const storemodel = use('App/Models/StoreInfo')

class UpdatedbController {
    async index({request,response,session,view}) {
        return view.render('updatedb')
    }

    //Batch ，一旦開始了就不能停，除非重啟server 
    async start({ params }) {
        console.log("開始")
        var j = schedule.scheduleJob('0 0 12 * * *', async function () {
            console.log("batch running==========================================")
            //取得未審核、不符和的狀態所有人
            var unaudited_guest = await Database.select('id', 'guest_invoice', 'guest_name', 'status').from('guestinfos').andWhere('status', '未審核').orWhere('status', '不符合');

            for (var i = 0; i < unaudited_guest.length; i++) {
                var arr1 = [];
                arr1[i] = await Database.select('id', 'invoice_status').from('adonis_invoices').where('invoice_num', unaudited_guest[i].guest_invoice)
                if (arr1[i] == "") {
                    //客戶狀態改為不符合
                    const gu = await gestmodel.find(unaudited_guest[i].id);
                    console.log(gu.toJSON().guest_name + "_不符合");
                    gu.status = "不符合";
                    await gu.save();
                }
                //客人發票為未審核且與他相同的發票號碼狀態為未兌換
                else if (arr1[i][0].invoice_status == 1) {
                    const gu = await gestmodel.find(unaudited_guest[i].id);
                    console.log(gu.toJSON().guest_name + "_符合");
                    const inv = await Awards.find(arr1[i][0].id);
                    //發送簡訊
                    const gu_name = gu.toJSON().guest_name;
                    const phone = gu.toJSON().cell_phone;
                    const date2 = moment2(gu.toJSON().date).format("YYYYMMDD");
                    const time = gu.toJSON().time;
                    const validatornum = gu.toJSON().validator_num;
                    const storeid = gu.toJSON().store_id;
                    const storename2 = await Database.select('store_name').from('store_infos').where('id', storeid);
                    const storename = storename2[0].store_name;
                    const org_msg1 = "感謝您預約『Audrey愛情從試穿開始』魔塑W弦試穿體驗，您的兌換碼是「" + validatornum + "」，請憑此碼依預約時間及店櫃試穿。";

                    const msg1 = utf8.encode(org_msg1);
                    //預約前一天發送簡訊
                    const date = moment2(moment2(date2).subtract(3, 'days')).format("YYYYMMDD");

                    const org_msg2 = "感謝您預約『Audrey魔塑W弦試穿體驗』，提醒您於" + date2 + " " + time + "至" + storename + "報到，我們將準時為您服務。";
                    const msg2 = utf8.encode(org_msg2);
                    req("http://api.message.net.tw/send.php?id=0905273575&password=C27198500&tel=" + phone + ";&mtype=G&encoding=utf8&msg=" + msg1, function (error, response, body) {
                        console.log(body);
                    });
                    req("http://api.message.net.tw/send.php?id=0905273575&password=C27198500&tel=" + phone + ";&mtype=G&encoding=utf8&sdate=" + date + "120000&msg=" + msg2, function (error, response, body) {
                        console.log(body);
                    });
                    //將此客戶狀態改為已發送
                    gu.status = "已發送";
                    //發票狀態改為2
                    inv.invoice_status = 2;

                    await gu.save();
                    await inv.save();
                }
                //客人發票為未審核且與她相同的發票號碼狀態為已兌換
                else if (arr1[i][0].invoice_status == 2) {
                    const gu = await gestmodel.find(unaudited_guest[i].id);
                    console.log(gu.toJSON().guest_name + "_發票重覆");
                    gu.status = "發票重覆";
                    await gu.save();
                }

            }
        });
    }

}

module.exports = UpdatedbController
