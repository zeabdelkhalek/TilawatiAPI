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

            note.star = 1
            note.tilawa_id = tilawa.id
            note.user_id = user.id
            
            await note.save()
            
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

    async delete ({response, auth, params}) {
        try {
            const tilawa = await Tilawa.find(params.id)
            const user = await auth.user
            const note = await Note.find(params.note_id)

            if (user.id === note.user_id) {
                await note.delete();
                return response.json({
                    status: 'success',
                    message: 'Note removed!',
                    data: tilawa
                })
            } else {
                return response.status(400).json({
                    status: 'error',
                    message: "You don't have permission to delete this comment."
                })
            }
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
