$(function () {
 //=====================挑選時段部分==================================
 
const StoreAndTime_len = $("#invisible_storetime").children().length;
var StoreAndTime_time = [];
var StoreAndTime_store = [];
for(let x=0;x< StoreAndTime_len;x++){
  StoreAndTime_store[x] = $("#invisible_storetime option").eq(x).val();
  StoreAndTime_time[x] = $("#invisible_storetime option").eq(x).text();
  // console.log("陣列ID:"+x+"店櫃"+StoreAndTime_store[x]+"; 時間:" + StoreAndTime_time[x])
}

var time_stack = [
  ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"],
  ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
  ['12:00','13:00','14:00','15:00','16:00','17:00','18:00'],
  ['12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00'],
  ['13:00','14:00','15:00','16:00','17:00'],
  ['13:00','14:00','15:00','16:00','17:00','18:00'],
  ['13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'],
  ['13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00'],
  ['14:00','15:00','16:00','17:00','18:00','19:00'],
  ['14:00','15:00','16:00','17:00','18:00','19:00','20:00'],  
  ['16:00','17:00','18:00','19:00','20:00'],
  ['13:00','14:00','15:00','16:00','17:00','18:00'],
  ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00','21:00']
]

$("#store_id").change(function(){
  $("#select_time option").remove();  
  var store = $("#store_id").val()-1;
  var IDtoStack = time_stack[StoreAndTime_time[store]];
  var stack_len = IDtoStack.length;
  // console.log(IDtoStack,stack_len);
  $("#select_time").append($("<option></option>").attr("value", "請挑選時段").text("請挑選時段"));
  for(let j=0;j<stack_len;j++){
    $("#select_time").append($("<option></option>").attr("value",IDtoStack[j]).text(IDtoStack[j]));
  }

})


// $("#select_time").change(function () {
//   if ($('#select_time').val() == "請挑選時段") {
//     alert("請選擇一個時段");
//     $("#inputTime").val("");
//   } else {
//     $("#inputTime").val($("#select_time").text());
//   }
// })


//==================立即預約按鈕==========================

  //=====================================將商店的地區名稱資訊儲存於前端js中==============================
  //取得option的方法
  // $("#invisible_storeid").children(i).text()
  //儲存地區資訊
  const store_area = [];
  //儲存商店名稱資訊
  const store_name = [];
  //儲存地址
  const store_address = [];
  //儲存電話
  const store_phone = [];  
  //儲存精簡過的地區資料
  //取得隱形select 中含有多少個 option 將值存入陣列中方便操作
  var store_len = $("#invisible_storearea").children().length;
  for (var i = 0; i < store_len; i++) {
    let reg = {
      id: $("#invisible_storearea option").eq(i).val(),
      area: $("#invisible_storearea option").eq(i).text()
    }
    store_area.push(reg);

    let reg2 ={
      id: $("#invisible_storenamed option").eq(i).val(),
      name: $("#invisible_storenamed option").eq(i).text()
    }
    store_name.push(reg2)

    let reg3 ={
      id: $("#invisible_storeaddress option").eq(i).val(),
      address: $("#invisible_storeaddress option").eq(i).text()
    }
    store_address.push(reg3)

    let reg4 ={
      id: $("#invisible_storephone option").eq(i).val(),
      phone: $("#invisible_storephone option").eq(i).text()
    }
    store_phone.push(reg4)
  }
  //======================當使用者選擇了商店地區=========================
  $("#store_area").change(function () {
    $("#storeadd").text("");
    let guest_select = $("#store_area").val();
    $("#store_id option").remove();
    $("#store_id").append($("<option></option>").attr("value", "").text("請選擇店櫃"));
    for(let i=0;i<store_len;i++){
      if(guest_select == store_area[i].area){
       
        $("#store_id").append($("<option></option>").attr("value", i+1).text(store_name[i].name));
      }
    }
    $("#real_store_id").val($("#store_id").val());
  })
//使用者選了商店
  $("#store_id").change(function(){
    $("#storeadd").text("");
    $("#real_store_id").val("");
    $("#real_store_id").val($("#store_id").val());
    var sel_id = $("#store_id").val();

    var store_len2 = $("#invisible_storeaddress").children().length;
    for(let i = 0;i<store_len2; i++){
      if(sel_id == store_address[i].id){
        $("#storeadd").text(store_address[i].address)
        $("#storephone").text(store_phone[i].phone)        
      }
    }
  })

//======================當使用者直接按下送出個人資料假按鈕時====================
  $("#cannotSubmit").click(function(){
    alert("請先輸入您的發票號碼並點擊送出")
  })
 
  //========================生日選單部分========================
  const birthday_Y = ["年"];
  const birthday_M = ["月"];
  const birthday_D = ["日"];
  for (var i = 1919; i < 2006; i++) {
    birthday_Y.push(i);
  }
  for (var i = 1; i < 13; i++) {
    birthday_M.push(i);
  }
  for (var i = 1; i < 32; i++) {
    birthday_D.push(i);
  }
  const birthdaydata = {
    birthday_Y: birthday_Y,
    birthday_M: birthday_M,
    birthday_D: birthday_D,
    birthday_Y2: "年",
    birthday_M2: "月",
    birthday_D2: "日"
  }
  const birdaybody = new Vue({
    delimiters: ['[[', ']]'],
    el: '#birdaybody',
    data: birthdaydata,
    computed: {
      combination_birthday: function () {
        if(this.birthday_Y2 == "年" || this.birthday_M2== "月"||this.birthday_D2=="日"){
          return ""
        }else{
          return this.birthday_Y2 + "-" + this.birthday_M2 + "-" + this.birthday_D2
        }
      }
    }
  })

//==========================尺寸大小======================
const size = {
  size_in: ['請挑選您的尺寸','C70', 'C75', 'C80', 'D70', 'D75', 'D80', 'E70', 'E75','其他尺寸'],
  selectsize:""
}
const size_select = new Vue({
  //更改vue的模板語法，不然會跟edge模板衝突
  delimiters: ['[[', ']]'],
  el: '#size',
  data: size,
  methods:{
    checksize:function(event){
      var count = 0;
      console.log(event.target.value)
      for(let i = 0 ; i < this.size_in.length ; i++){
        if(event.target.value == this.size_in[i]){
          count++;
        }
      }
      if(event.target.value == '其他尺寸'){
        // alert("『提醒您：本次體驗試穿之新品罩杯尺寸為 CD70-80;E70-75，如無法成功完成體驗試穿並填寫問券,恕無法享有免費送內衣!』");
        // window.location.replace("/");
        $("#exampleModalCenter6").modal('show');  
      }
       return this.selectsize = event.target.value;
      
    }
  }
})


//===============鎖定元件讓使用者照順序填入=======================

//店櫃
$("#store_id").change(function(){
  $("#select_time").removeAttr("disabled","true")
  $("#datepart").css("display","inline")
  $("#whattime").css("display","inline")
})
//預約時段
$("#select_time").change(function(){
  $("#size").css("display","inline")  
  $("#selectsize").removeAttr("disabled","true")
})
//尺寸
$("#selectsize").change(function(){
  $("#rightpart").css("display","block")
  $("#namepart").css("display","inline")  
  $("#inputname").removeAttr("readonly","true")
})
//姓名
$("#inputname").change(function(){
  $("#phonepart").css("display","inline")  
  $("#inputcellphone").removeAttr("readonly","true")
})
//電話
$("#inputcellphone").change(function(){
  $("#birdaybody").css("display","inline")  
})
//選完生日才出現email輸入框，此動作方法使用v-if方式完成

//================行動電話提醒===========
// $("#inputcellphone").change(function(){
//   $("#phonealert").css("display","inline")
// })

})

