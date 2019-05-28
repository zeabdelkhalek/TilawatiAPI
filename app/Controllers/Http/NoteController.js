'use strict'
const User = use('App/Models/User')
const Tilawa = use('App/Models/Tilawa')
const Comment = use('App/Models/Comment')
const Note = use('App/Models/Note')
const { validate } = use('Validator')


class NoteController {
    async add({ params, auth, response }) {
        try {
            const tilawa = await Tilawa.find(params.id)
            const user = await auth.user
            let note = new Note()

            console.log(user.id)
            console.log(tilawa.id)

            note.star = 1
            note.user_id = user.id
            console.log(note.user_id)
            note.tilawa_id = tilawa.id
            console.log(note.tilawa_id)

            console.log(note)

            await note.save()
            console.log(note)

            return response.json({
                status: 'success',
                message: 'Note added!',
                data: note
            })
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                message: 'There was a problem adding Note.'
            })
        }
    }
}

module.exports = NoteController
