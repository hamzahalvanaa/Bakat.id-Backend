import { Request, Response } from 'express';
import { POST, Post } from '../models/post.model';
import { Favorite } from '../models/favorites.model';
import { Like } from '../models/likes.model';
import { LIMIT } from '../config/server.config';

const POST_CTRL: any = {};

// READ
POST_CTRL.getPosts = async (req: Request, res: Response) => {

  const page = Number(req.query.page) || 1;
  let skip = page - 1;
  skip = skip * LIMIT;

  const posts = await Post.find({}, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error loading Posts",
        err
      });
    }
  }).sort({ _id: -1 })
    .limit(LIMIT)
    .skip(skip)
    .populate('user');

  res.status(200).json({
    ok: true,
    message: 'Posts',
    page,
    posts
  });
}

POST_CTRL.getAllPosts = async (req: Request, res: Response) => {

  const posts = await Post.find({}, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error loading Posts",
        err
      });
    }
  }).sort({ _id: -1 })
    .populate('user');

  res.status(200).json({
    ok: true,
    message: 'All Posts',
    posts
  });
}

POST_CTRL.getPostsByUser = async (req: Request, res: Response) => {

  const user = req.user;
  const page = Number(req.query.page) || 1;
  let skip = page - 1;
  skip = skip * LIMIT;

  const posts = await Post.find({ user: user._id }, {}, (err, posts) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error loading Posts',
        err
      });
    }

    if (!posts) {
      return res.status(400).json({
        ok: false,
        message: "User with Id " + user._id + " doesn't have Post",
      });
    }
  }).sort({ _id: -1 })
    .limit(LIMIT)
    .skip(skip);

  res.status(200).json({
    ok: true,
    message: 'Posts by User',
    page,
    posts
  });
}

POST_CTRL.getTotalLikes = async (req: Request, res: Response) => {

  const user = req.user;

  const posts = await Post.find({ user: user._id },
    { likes: 1, _id: 0 }, (err, posts) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'Error loading Posts',
          err
        });
      }

      if (!posts) {
        return res.status(400).json({
          ok: false,
          message: "User with Id " + user._id + " doesn't have Post",
        });
      }
    });

  res.status(200).json({
    ok: true,
    message: 'Posts by User',
    posts
  });
}

// CREATE
POST_CTRL.createPost = async (req: Request, res: Response) => {

  const body: POST = req.body;
  body.user = req.user._id;

  if (body.message == '') {
    return res.status(400).json({
      ok: false,
      message: 'Post needs Message',
    });
  }

  Post.create(body).then(async post => {
    await post.populate('user').execPopulate();
    res.status(201).json({
      ok: true,
      message: 'Post created',
      post
    });
  }).catch(err => {
    return res.status(500).json({
      ok: false,
      message: 'Error creating Post',
      err
    });
  });
}

// DELETE
POST_CTRL.deletePost = async (req: Request, res: Response) => {

  const id = req.params.id;

  Promise.all([
    deletePost(id),
    deleteFavoritesByPost(id),
    deleteLikesByPost(id)
  ]).then(result => {
    res.status(200).json({
      ok: true,
      message: 'Post deleted successfully!',
      post: result[0],
      like: result[1],
      favorite: result[2]
    });
  }).catch(err => {
    res.status(500).json({
      ok: false,
      message: 'Error deleting Post',
      err
    });
  });
}


function deletePost(id: string) {
  return new Promise((res, rej) => {
    Post.findByIdAndRemove(id, (err, post) => {
      if (err) { rej('Error Finding Post'); }
      if (!post) { rej("Post with Id " + id + " doesn't exist"); }
      res(post);
    });
  });
}

function deleteFavoritesByPost(id: string) {
  return new Promise((res, rej) => {
    Favorite.findOneAndDelete({ post: id }, (err, favorite) => {
      if (err) { rej('Error Finding Favorite by Post'); }
      if (!favorite) { res("This Post wasn\'t on Favorites"); }
      res(favorite);
    });
  });
}

function deleteLikesByPost(id: string) {
  return new Promise((res, rej) => {
    Like.findOneAndDelete({ post: id }, (err, like) => {
      if (err) { rej('Error Finding Like by Post'); }
      if (!like) { res("This Post wasn\'t liked"); }
      res(like);
    });
  });
}

export default POST_CTRL;