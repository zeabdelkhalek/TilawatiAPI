'use strict'
const Hash = use('Hash')
const Helpers = use('Helpers')
const Drive = use('Drive')
const User = use('App/Models/User')
const Tilawa = use('App/Models/Tilawa')
const Surah = use('App/Models/Surah')
const { validate } = use('Validator')
const Database = use('Database')
const Env = use('Env')


class TilawaController {
    async add({ auth, request, response }) {
        const validation = await validate(request.all(), {
            title: 'min:3|max:50|unique:tilawas',
            description: 'min:20|max:500'
        })

        if (validation.fails()) {
            return response.status(403).json(validation.messages())
        }

        try {
            let tilawa = new Tilawa()
            const user = await auth.user

            /*let surah = new Surah()
            surah.name = "Fatiha"
            await surah.save()*/

            // get new data entered

            tilawa.title = request.input('title')
            tilawa.description = request.input('description')
            tilawa.surah_id = request.input('surah_id')
            tilawa.user_id = user.id

            const record = request.file('record', {
                types: ['audio']
            })

            tilawa.record = tilawa.title + '.' + record.extname
            await record.move(Helpers.publicPath('uploads/tilawas'), {
                name: tilawa.record
            })

            if (!record.moved()) {
                return record.error()
            }
            await tilawa.save()

            return response.status(200).json({
                status: 'success',
                message: 'Tilawa added!',
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
        const tilawa = await Tilawa.find(params.id)

        const validation = await validate(request.all(), {
            title: `min:3|max:50|unique:tilawas,title,id,${tilawa.id}`,
            description: 'min:20|max:500'
        })

        if (validation.fails()) {
            return response.status(403).json(validation.messages())
        }

        try {
            // get currently authenticated user

            const user = await auth.user

            if (user.id === tilawa.user_id) {
                // update with new data entered
                tilawa.title = request.input('title')
                tilawa.description = request.input('description')
                tilawa.user_id = user.id

                await tilawa.save()

                return response.json({
                    status: 'success',
                    message: 'Tilawa updated!',
                    data: tilawa
                })
            } else {
                return response.status(400).json({
                    status: 'error',
                    message: "You don't have permission to edit this tilawa."
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
                await Drive.delete(Helpers.publicPath(`/uploads/tilawas/${tilawa.record}`))
                await tilawa.delete();
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

    async get({ response, params }) {
        try {
            const tilawa = await Tilawa.find(params.id)

            return response.json({
                status: 'success',
                message: 'Tilawa checked!',
                data: tilawa
            })
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                message: 'There was a problem checking tilawa.'
            })
        }
        // To get the file path use Helpers.tmpPath(`uploads/tilawas/${tilawa.record}`)
        /*console.log(Helpers.tmpPath(`uploads/tilawas/${params.file}`))
        return response.download(Helpers.tmpPath(`uploads/tilawas/${params.file}`))*/
    }

    async index ({request, response}) {
        let tilawas = await Tilawa
            .query()
            .with('comments')
            .with('user')
            .with('likes')
            .with('tags')
            .fetch()
        tilawas = tilawas.toJSON()
        tilawas.forEach(tilawa => {
            tilawa.record = Env.get('APP_URL') + '/uploads/tilawas/' + encodeURI(tilawa.record) 
        });
        return response.json ({
            data: tilawas
        })
    }

    async search({request , response}){
        const query = request.input('q')
        const tilawas = await Database.table('tilawas').where('title','like',`%${query}%`)
        return response.json({
            data : tilawas
        })
    }

    async searchBySurah({request , response}){
        const id = request.input('surah_id')
        const tilawas = await Database.table('tilawas').where('surah_id','=',id)
        return response.json({
            data : tilawas
        })
    }
    
}

module.exports = TilawaController
