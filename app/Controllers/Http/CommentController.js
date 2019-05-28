'use strict'
const Hash = use('Hash')
const User = use('App/Models/User')
const Tilawa = use('App/Models/Tilawa')
const Comment = use('App/Models/Comment')
const { validate } = use('Validator')


class CommentController {
    async add({ auth, request, response, params }) {
        const validation = await validate(request.all(), {
            statement: 'required'
        })

        if (validation.fails()) {
            console.log(validation.message);
            return response.status(403).json(validation.messages())
        }

        try {
            let comment = new Comment()
            const tilawa = await Tilawa.find(params.id);
            const user = await auth.user

            // get new data entered
            //tilawa.record = request.input('record')
            comment.statement = request.input('statement')
            comment.user_id = user.id
            comment.tilawa_id = tilawa.id

            await comment.save()

            return response.json({
                status: 'success',
                message: 'Comment added!',
                //"accessToken": accessToken,
                data: comment
            })
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                message: 'There was a problem adding Comment.'
            })
        }
    }

    async update({ auth, request, response, params }) {
        const validation = await validate(request.all(), {
            statement: 'required'
        })

        if (validation.fails()) {
            console.log(validation.message);
            return response.status(403).json(validation.messages())
        }

        try {
            // get currently authenticated user
            const tilawa = await Tilawa.find(params.id);
            const user = await auth.user
            const comment = await Comment.find(params.comment_id)
            console.log(comment)

            if (user.id === tilawa.user_id) {
                // update with new data entered
                comment.statement = request.input('statement')
                comment.user_id = user.id
                comment.tilawa_id = tilawa.id

                await comment.save()

                return response.json({
                    status: 'success',
                    message: 'Comment updated!',
                    data: comment
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
                message: 'There was a problem updating comment.'
            })
        }
    }

    async delete({ auth, request, response, params }) {
        try {
            // get currently authenticated user
            const user = await auth.user
            const tilawa = await Tilawa.find(params.id)
            const comment = await Comment.find(params.comment_id)

            if (user.id === tilawa.user_id) {
                await comment.delete();
                return response.json({
                    status: 'success',
                    message: 'Comment deleted!',
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
                message: 'There was a problem deleting comment.'
            })
        }
    }

    async index({ params, response }) {
        try {
            const tilawa = await Tilawa.find(params.id)
            const comments = await Comment.query()
                .where('tilawa_id', tilawa.id)
                .fetch()

            console.log(comments)
            return response.json({
                status: 'success',
                message: 'Comment deleted!',
                data: comments
            })

        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                message: 'There was a problem finding comments.'
            })
        }
    }
}

module.exports = CommentController
