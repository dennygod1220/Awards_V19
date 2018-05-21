$(function () {
    //取得option的方法
    // $("#invisible_storeid").children(i).text()
    //儲存地區資訊
    //   const store_area = [];
    //   //儲存商店名稱資訊
    //   const store_name = [];
    //   //儲存精簡過的地區資料
    //   //取得隱形select 中含有多少個 option 將值存入陣列中方便操作
    //   const store_len = $("#invisible_storearea").children().length;
    //   for (var i = 0; i < store_len; i++) {
    //     let reg = {
    //       id: $("#invisible_storearea option").eq(i).val(),
    //       area: $("#invisible_storearea option").eq(i).text()
    //     }
    //     store_area.push(reg);

    //     let reg2 ={
    //       id: $("#invisible_storenamed option").eq(i).val(),
    //       name: $("#invisible_storenamed option").eq(i).text()
    //     }
    //     store_name.push(reg2)
    //   }

    //==================================
    const store_status_arr = []; //store_status_arr 儲存了所有在guestinfo DB內的店櫃id、預約時段、預約日期
    const store_len = $("#invisible_store_status_date").children().length;
    for (var i = 0; i < store_len; i++) {
        let reg = {
            id: $("#invisible_store_status_date option").eq(i).val(),
            date: $("#invisible_store_status_date option").eq(i).text(),
            time: $("#invisible_store_status_time option").eq(i).text()
        }
        store_status_arr.push(reg);

    }
    // console.log(store_status_arr[0].id)
    //============================================
    // const guesttime = $("#inputTime").val();
    // const guestdate = $("#inpdate").val();
    // const gueststoreid = $("#real_store_id").val();
    $("#select_time").change(function () {
        guesttime = $("#select_time").val();
        guestdate = $("#inpdate").val();
        gueststoreid = $("#real_store_id").val();
        mapping(gueststoreid, guestdate, guesttime);
    })

    //mapping 用來判斷同時段、日期、店櫃是否超過兩次
    function mapping(gueststoreid, guestdate, guesttime) {
        // console.log(store_status_arr[0].id,store_status_arr[0].date,store_status_arr[0].time);
        // console.log(gueststoreid, guestdate, guesttime)
        var key2 = 0;
        const store_len = $("#invisible_store_status_date").children().length;
        console.log(store_status_arr)
        for (var i = 0; i < store_len; i++) {
        console.log("time:"+guesttime+",date:"+guestdate+",storeid:"+gueststoreid)
    
            if (store_status_arr[i].id == gueststoreid && store_status_arr[i].date == guestdate && store_status_arr[i].time == guesttime) {
                key2++;
                
            }
        }
        if (key2 >= 1) {
            // alert("此時段預約已滿，請重新選擇，謝謝")
            $("#exampleModalCenter4").modal('show')
            $("#inputTime").val("");
            $("#select_time").val("請挑選時段");
        }

    }

    //判斷某店櫃是否已經超過100組客人預約了，使用者選擇店櫃2時觸發
    $("#store_id").change(function () {
        var this_guest_stid = $("#store_id").val();
        
        var now_stid_count = 0;
        for (var i = 0; i < store_len; i++) {
            if (store_status_arr[i].id == this_guest_stid) {
                now_stid_count++;
            }
        }
        //判斷是否超過的地方
        if (now_stid_count >= 100) {
            alert("此店櫃所有的預約都已經滿了歐，請換店櫃，或是下次請早");
            $("#real_store_id").val("");
            $("#store_id").val("");
        }

    })
//同意隱私權按鈕點擊後
    $("#invisible_ag").click(function(){
        $("#exampleModalLong").modal('hide');
        var inStore = $("#store_id :selected").text();
        var inDate = $("#inpdate").val();
        var inTime = $("#select_time :selected").text();
        var inSize = $("#input_size").val();
        var inName = $("#inputname").val();
        var inPhone = $("#inputcellphone").val();
        var inBirthday = $("#inBirth").val();
        var inEmail = $("#inputemail").val();
        var storeAdd = $("#storeadd").text();
        var storephone = $("#storephone").text();
        

        $("#confirm_data").append("<div id='confirmData'><h6>請務必填寫正確資訊，若因資料不正確或非本人以致無法完成試穿流程，將無法獲贈免費內衣！台灣奧黛莉(股)公司保留活動內容解釋及調整權力。</h6><p>您預約的店櫃為:" + inStore + 
        "</p><p>日期:" + inDate +
        "</p><p>時間:" + inTime +
        "</p><p>您的尺寸:" + inSize +
        "</p><p>您的姓名:" + inName +
        "</p><p>您的連絡電話:" + inPhone +
        "</p><p>生日:" + inBirthday +
        "</p><p>Email:" + inEmail+
        "</p><p>店櫃地址:" + storeAdd +
        "</p><p>店櫃電話:" + storephone +
        "</p></div>")
    })
    $(".btnleave").click(function(){
        $("#confirmData").remove();
    })

    //========預約==========
    $("#submitbtn").click(function () {
        document.forms[1].submit();
    })
    $("#submitbtn2").click(function () {
        document.forms[1].submit();
    })
//================當客人點擊 確認預約按鈕時  做一個基本的資料都有填寫確認 ，若是資歷都填完了就會跳出 隱私權同意
    $("#confirm1").click(function(){
        var inStore = $("#store_id :selected").text();
        var inDate = $("#inpdate").val();
        var inTime = $("#select_time :selected").text();
        var inSize = $("#input_size").val();
        var inName = $("#inputname").val();
        var inPhone = $("#inputcellphone").val();
        var inBirthday = $("#inBirth").val();
        var inEmail = $("#inputemail").val();
        if (inEmail == "" || inBirthday=="" || inPhone==""||inName==""||inSize==""||inTime==""||inDate==""||inStore=="") {
            $("#exampleModalCenter3").modal('show')
        }
        else{

        $("#exampleModalLong").modal('show');  

        }
    })



    $("#exportPDF").click(function(){
        var inStore = $("#store_id :selected").text();
        var inDate = $("#inpdate").val();
        var inTime = $("#select_time :selected").text();
        var inSize = $("#input_size").val();
        var inName = $("#inputname").val();
        var inPhone = $("#inputcellphone").val();
        var inBirthday = $("#inBirth").val();
        var inEmail = $("#inputemail").val();

        $("#guest_infomation").append("<div id='guest_infomation_data'><p>您預約的店櫃為:" + inStore + 
        "</p><p>日期為:" + inDate +
        "</p><p>時間為:" + inTime +
        "</p><p>您的尺寸:" + inSize +
        "</p><p>您的姓名:" + inName +
        "</p><p>您的連絡電話:" + inPhone +
        "</p><p>生日:" + inBirthday +
        "</p><p>Email:" + inEmail+"</p></div>")
    })

    $("#pdfclose").click(function(){
        $("#guest_infomation_data").remove();
    })
})



    //===============================
    // document.getElementById('exportPDF').addEventListener('click', function() {

    //     var doc = new jsPDF('p', 'px', 'a4');
    //     html2canvas(document.getElementById('test123'), {
    //       onrendered: function(canvas) {
    //         var image = canvas.toDataURL("image/png");
    //         var width = $(window).width();    
    //         var height = $(window).height();
    //         console.log(width)
    //         doc.addImage(image, 'JPEG', 0, 0, width, height);
    //         doc.save('test.pdf');
    //       }
    //     });
    //   });
    document.getElementById('pdf').addEventListener('click', function() {
    let el = document.getElementById('exampleModalLong2'); // 获得目标元素
    html2canvas(el, {
       background: '#fff',  // 背景设置
        //Whether to attempt to load cross-origin images as CORS served, 
        //before reverting back to proxy ,此参数对页面中包含跨域图片时至关重要
       useCORS: true,    
       onrendered (can) { // html到canvas渲染完成时执行
         let doc = new jsPDF('p', 'px', 'a4'); // 设置生成pdf的相关参数，''纵向，单位，纸张类型"
         let data = can.toDataURL('image/jpeg'); // 将canvas转成dataURL，不通的图片类型data的大小差别较大，也可以设置图片的质量，以控制生成文件的大小
         let createPdf = (function (can, doc, data) {  //创建PDF
          /*
            通过canvas生成PDF
            @can    {object}     canvas对象
            @doc    {object}     使用jsPDF创建的对象
            @data   {string}     canvas通过toDataURL生成的数据
          */
          // 获得一页pdf和滚动整个页面生成canvas的高度和宽度，
           let [ph, ch, pw, cw] = [doc.internal.pageSize.height, can.height, doc.internal.pageSize.width, can.width]
           let h = pw * ch / cw; // 按根据pdf的页面宽度计算canvas的高度
           return function getPdf (imgData, k) {
             if (ph * k > h) {  // 如果pdf页面的总长度大于canvas的高度，跳出递归
               doc.deletePage(k + 1);  // 删除最后一页的空白
               doc.save('test.pdf'); // 保存生成的pdf
               return;
             }
             doc.addImage(imgData, 'PNG', 1, -k * ph + 10, pw, h); //将图片转成PDF，后四个参数分别为左边距，上边距，图片宽度，图片高度，这里将上边距设为负值，是为了将片上移，达到分页的效果 
             doc.addPage(); // 增加新页面
             getPdf(imgData, k + 1); // 递归调用
           }
         }(can, doc, data));
         createPdf(data, 0); // 调用该函数
      }
    });
});
