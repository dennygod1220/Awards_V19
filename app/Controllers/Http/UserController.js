'use strict'

const User = use('App/Models/User')
const Database = use('Database')

class UserController {

    async store( {request,response,auth} ){

        const user = await User.create( request.only(['username','email','password']) );


        await auth.login(user);
        // await auth.logout();
        return response.redirect('/AudreySP/auth/signup')
    }
    
    async signIn( { request ,response , auth, session } ){
        //取得sign-in.edge 畫面中，使用者輸入的email 和 password
        const {
            email,
            password
        } = request.all();

        try {
            // auth.attempt (uid,password) 方法能夠用來進行登錄，如果找不到email或是密碼不對會引發錯誤
            await auth.remember(true).attempt(email, password);

            const usename = await Database.select('username').from('users').where('email', email)

            const usename1 = usename[0].username;
            session.flash({
                loginsucess: 'Login Sucessful'
            })

            // return response.redirect('/uploadfile')
            //將這個測試使用者放入session
            session.put('username', usename1)

            return response.route('/AudreySP/HiAudrey', {
                email: email
            })
        } catch (error) {
            if (error.name == "RuntimeException") {
                session.flash({
                    error: '您已經登入過了喔!! 請直接選擇您要進行的操作!!'
                })

                return response.redirect('back');
            } else {
                console.log("錯誤:"+error)
                session.flash({
                    error: '帳號或密碼有誤，請重新輸入!!'
                })

                return response.redirect('back');
            }
        }
    }

    show ({ auth, params }) {
        if (auth.user.id == 1) {

          return "user id = "+auth.user.id + " params.id = "+params.id 
        }
        return auth.user
      }
}

module.exports = UserController
