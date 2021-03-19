import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  //listagem
  public async index ({}: HttpContextContract) {
    const posts = await Post.all()
  
    return posts
  }
  //armazenamento
  public async store ({request}: HttpContextContract) {
    const data = request.only(['title', 'description'])
    const post = await Post.create(data)

    return post
  }
  //listagem especifica
  public async show ({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    return post
  }
  //atualização
  public async update ({ request, params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const data = request.only(['title', 'description'])
    
    post.merge(data)

    await post.save()

    return post
  }
  //exclusão
  public async destroy({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    await post.delete()
  }
}
