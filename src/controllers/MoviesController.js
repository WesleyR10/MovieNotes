const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class MoviesController {
  async create(req, res) {
    const { title, description, rating, tags } = req.body
    const user_id = req.user.id

    if (!rating) {
      throw new AppError("Gentileza inserir uma avaliação")
    }

    if (rating > 5 || rating < 0) {
      throw new AppError("Avaliação invalida, gentileza avaliar entre 0 e 5")
    }

    const [movie_id] = await knex("movie").insert({
      title,
      description,
      rating,
      user_id
    });

    const tagsInsert = tags.map(name => {
      return {
        movie_id,
        user_id,
        name: name
      }
    });

    await knex("tags").insert(tagsInsert);

    res.json()
  }

  async show(req, res) {
    const { id } = req.params

    const movie = await knex("movie").where({ id }).first();
    const tags = await knex("tags").where({ movie_id: id }).orderBy("name");
    return res.json({
      ...movie,
      tags
    })
  }

  async delete(req, res) {
    const { id } = req.params

    await knex("movie").where({ id }).delete();

    return res.json();
  }

  async index(req, res) {
    const { title, tags } = req.query
    const user_id = req.user.id

    let movies;

    if (tags) {
      const filterTags = tags.split(',').map(tag => tag.trim())

      movies = await knex("movie").select([
        "movie.id",
        "movie.title",
        "movie.user_id"
      ]).where("movie.user_id", user_id).whereLike("movie.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("tags", "movie.id", "tags.movie_id")
        .orderBy("movie.title")
    } else {
      movies = await knex("movie").where({ user_id }).whereLike("title", `%${title}%`)
        .orderBy("title")
    }

    const userTags = await knex("tags").where({ user_id });
    const moviesWithTags = movies.map(movie => {
      const movieTags = userTags.filter(tag => tag.movie_id === movie.id)

      return {
        ...movie,
        tags: movieTags
      }
    })

    return res.json(moviesWithTags)
  }
}

module.exports = MoviesController