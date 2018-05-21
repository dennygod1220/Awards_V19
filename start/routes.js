'use strict'

const Route = use('Route')
const Helpers = use('Helpers')

//首頁
Route.on('/AudreySP').render('awardsindex.index')

//20180421_因不須跳到別的頁面輸入發票號碼，因此直接從'/'發送post請求到invoiceok頁面
// Route.on('/reservationnow').render('awardsindex.reservationnow')
Route.post('/AudreySP','AwardsIndexController.check').validator('invoicecheck')
// Route.post('/AudreySP',async ({ params }) => {return "hello"})
//填個人資料，發票符合資格才能到達此頁
//0509不擋發票了，所以拿掉middleware
// Route.get('/invoiceok','GuestinfoController.invoiceok').middleware(['Checkinvoice'])
Route.get('/AudreySP/invoiceok','GuestinfoController.invoiceok')

Route.post('/AudreySP/invoiceok','GuestinfoController.store').validator('guestinfo') 
// Route.post('/invoiceok','GuestinfoController.store') 
  

//預約試穿
Route.on('/AudreySP/testdress').render('testdress')
//內衣密碼 
Route.on('/AudreySP/underwearsecrect1').render('underwearsecrect/1')
Route.on('/AudreySP/underwearsecrect2').render('underwearsecrect/2')
Route.on('/AudreySP/underwearsecrect3').render('underwearsecrect/3')
Route.on('/AudreySP/underwearsecrect4').render('underwearsecrect/4')

//門市活動
Route.on('/AudreySP/storeactive').render('storeactive')
//新品介紹
Route.on('/AudreySP/newproduct').render('newproduct')
//影片欣賞
Route.on('/AudreySP/watchVideo').render('watchVideo')

//===============================================後台====================================
//===============使用者驗證相關(給奧黛莉上傳檔案用驗證)=================

Route.group(()=>{
//=============創建使用者=======================================
    Route.on('/signup').render('auth.sign-up')

    Route.post('/signup','UserController.store').validator('SignUp')    
//==============登出===============================
    Route.get('/logout',async({ auth,response }) =>{
        await auth.logout();
        return response.redirect('/AudreySP/auth/signin');
    } )
//================登入=================================
    
    Route.on('/signin').render('auth.sign-in')
    
    Route.post('/signin','UserController.signIn').validator('SignIn')
}).prefix('/AudreySP/auth')

//後台首頁
Route.get('/AudreySP/HiAudrey','HiAudreyController.index').middleware('auth')
// Route.get('/AudreySP/HiAudrey','UserController.show').middleware('auth')

//刪除客戶資料
Route.get('/AudreySP/HiAudrey/delete/:id', 'HiAudreyController.delete').middleware('auth')
//手動新增客戶資料
Route.get('/AudreySP/createguest','CreateguestinfoController.index').middleware('auth')

Route.post('/AudreySP/createguest','CreateguestinfoController.store').middleware('auth')
//奧黛莉他們上傳用的路徑
Route.get('/AudreySP/uploadfile','UploadFileController.index').middleware('auth')

Route.post('/AudreySP/upload', 'UploadFileController.store').middleware('auth')

//問卷調查
Route.get('/AudreySP/question','QuestionController.index').middleware('auth')
Route.get('/AudreySP/writequestion','QuestionController.writequestion')
//新增問卷
Route.post('/AudreySP/writequestion', 'QuestionController.store').middleware('auth')
//刪除問卷
Route.get('/AudreySP/question/delete/:id', 'QuestionController.delete').middleware('auth')

//錯誤頁面
Route.on('/AudreySP/errorpage').render('error.404')

//更新資料庫
Route.get('/AudreySP/updatedb','UpdatedbController.index').middleware('auth')
Route.get('/AudreySP/updatedbstart/:id','UpdatedbController.start')
Route.get('/AudreySP/updatedbcancel','UpdatedbController.cancel')

//下載問卷
Route.get('/AudreySP/downloadQu','QuestionController.downloadguestinfo')
//下載客戶資料
Route.get('/AudreySP/downloadGu','HiAudreyController.downloadguestinfo')

// Route.get('/report', async({request, response, next})=> {

// //    response.download('./public/download/book.xlsx','Hello');
//    response.attachment('./public/download/book.xlsx','Hello.xlsx');

// });

Route.get('/qu_aja','QuestionController.ajatime')
Route.get('/qu_aja2','QuestionController.ajatime2')

