'use strict'
const Hash = use('Hash')
const Helpers = use('Helpers')
const Drive = use('Drive')
const User = use('App/Models/User')
const Tilawa = use('App/Models/Tilawa')
const Surah = use('App/Models/Surah')
const { validate } = use('Validator')


class TilawaController {
    async add({ auth, request, response }) {
        const validation = await validate(request.all(), {
            record: 'min:3|max:50',
            title: 'min:3|max:50',
            description: 'min:20|max:500'
        })

        if (validation.fails()) {
            console.log(validation.message);
            return response.status(403).json(validation.messages())
        }

        try {
            let tilawa = new Tilawa()
            const user = await auth.user

            //console.log(user)

            /*let surah = new Surah()
            surah.name = 'Al_Nisaa'
            await surah.save()*/

            const record = request.file('record', {
                types: ['audio']
            })
            //console.log(record)
            tilawa.record = new Date().getTime() + '.' + record.subtype
            await record.move(Helpers.publicPath('upload/post'), {
                name: tilawa.record
            })

            // get new data entered
            //tilawa.record = request.input('record')
            tilawa.title = request.input('title')
            tilawa.description = request.input('description')
            tilawa.surah_id = request.input('surah')
            tilawa.user_id = user.id

            if (!record.moved()) {
                return profilePic.error()
            }

            await tilawa.save()

            return response.json({
                status: 'success',
                message: 'Tilawa added!',
                //"accessToken": accessToken,
                data: tilawa
            })
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                message: 'There was a problem adding Tilawa.'
            })
        }
    }

    async update({ auth, params, request, response }) {
        const validation = await validate(request.all(), {
            record: 'min:3|max:50',
            title: 'min:3|max:50',
            description: 'min:20|max:500'
        })

        if (validation.fails()) {
            console.log(validation.message);
            return response.status(403).json(validation.messages())
        }

        try {
            // get currently authenticated user
            const tilawa = await Tilawa.find(params.id);
            const user = await auth.user

            if (user.id === tilawa.user_id) {
                // update with new data entered
                const record = request.file('record', {
                    types: ['audio']
                })
                //console.log(record)
                tilawa.record = new Date().getTime() + '.' + record.subtype
                await record.move(Helpers.publicPath('upload/post'), {
                    name: tilawa.record
                })
                tilawa.title = request.input('title')
                tilawa.description = request.input('description')
                //tilawa.surah_id = request.input('surah')
                tilawa.user_id = user.id
                //user.password = request.input('password')

                if (!record.moved()) {
                    return profilePic.error()
                }

                await tilawa.save()

                return response.json({
                    status: 'success',
                    message: 'Tilawa updated!',
                    data: tilawa
                })
            } else {
                return response.status(400).json({
                    status: 'error',
                    message: "You don't have permission to delete this tilawa."
                })
            }
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                message: 'There was a problem updating tilawa.'
            })
        }
    }

    async delete({ auth, params, response }) {
        try {
            // get currently authenticated user
            const tilawa = await Tilawa.find(params.id)
            const user = await auth.user

            if (user.id === tilawa.user_id) {
                //console.log('/public/upload/post/' + tilawa.record)
                const file = './public/upload/post/' + tilawa.record;
                console.log(file)
                const exists = await Drive.exists(tilawa.record)
                console.log(exists)
                await Drive.delete(file)
                /*await tilawa.delete();*/
                return response.json({
                    status: 'success',
                    message: 'Tilawa deleted!',
                    data: tilawa
                })
            } else {
                return response.status(400).json({
                    status: 'error',
                    message: "You don't have permission to delete this tilawa."
                })
            }
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                message: 'There was a problem deleting tilawa.'
            })
        }
    }
}

module.exports = TilawaController
