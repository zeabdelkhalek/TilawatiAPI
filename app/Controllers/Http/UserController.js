'use strict'
const Hash = use('Hash')
const User = use('App/Models/User')
const { validate } = use('Validator')

class UserController { 
    async register ({request , auth , response}) {
        const validation = await validate(request.all(), {
            first_name: 'required|min:3|max:50',
            last_name: 'required|min:3|max:50',
            email: 'required|email|unique:users',
            password: 'required|min:8|max:50|confirmed'
        })
        
        if (validation.fails()){
            return response.status(403).json(validation.messages())
        }
        
        let user = new User()
        user.first_name = request.input('last_name')
        user.last_name = request.input('first_name')
        user.email = request.input('email')
        user.password = request.input('password')
        
        await user.save()
        
        let accessToken = await auth.generate(user)
        
        return response.status(200).json({
            "user": user,
            "accessToken": accessToken
        })
    }
      
    async login ({auth , request , response}) {
        const validation = await validate(request.all(), {
            email: 'required',
            password: 'required'
        })

        if (validation.fails()) {
            return response.status(403).json(validation.messages())
        }

        const email = request.input('email')
        const password = request.input('password')
        try {
            if (await auth.attempt(email, password)) {
                let user = await User.findBy('email', email)
                let accessToken = await auth.generate(user)
                return response.status(200).json({
                    'user': user,
                    'access_token': accessToken
                })
            }
        }
        catch (e) {
            return response.status(403).json([{
                message: 'Email and password does not match with any account !'
            }])
        } 
    }
    
}

module.exports = UserController
