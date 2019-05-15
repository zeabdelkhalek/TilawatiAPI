'use strict'
const Hash = use('Hash')
const User = use('App/Models/User')

class UserController {


    async register ({auth , request , response}) {
        const body = request.post() 
        if(!body.password) return response.status(404).send("No password !")
        const safePassword = await Hash.make(request.input('password'))
        const user = await User.create({ 
                ...body ,
                password : safePassword 
            }).catch(err => {
                if (err) return response.status(500).send({error : err , message : " Error on the server "})
        })
        if (!user) {
            return response.status(404).send(" Error on the server ")
        }
        const token = await auth.generate(user)
        return response.status(200).send({auth : true , token : token , message : "User Created Sucessfully" })
    }


    async login ({auth , request , response}) {
        const body = request.post() 
        if(!body) return response.status(404).send("No data !")

        const user = await User.findBy('email', body.email)
        
        .catch(err => {
                if (err) return response.status(500).send({error : err , message : " Error on the server "})
        })
        
        if ( !user ) {
            return response.status(404).send(" No user found ")
        }
        const isPasswordValid = await Hash.verify( user.password , body.password  )
        
        if(!isPasswordValid) return response.status(401).send({auth : false , token : null , message : " Password Incorrect " })

        const token = await auth.generate(user)
        return response.status(200).send({auth : true , token : token , message : "User Login Sucessfully" })
    }

}

module.exports = UserController
