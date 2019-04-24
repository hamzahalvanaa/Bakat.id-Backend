import { Request, Response } from 'express';
import { Like } from '../models/likes.model';
import { Post } from '../models/post.model';

const LIKES_CTRL: any = {};

// CREATE
LIKES_CTRL.like = async (req: Request, res: Response) => {

  const user = req.user;
  const id: string = req.body.id;
  const like = new Like({
    user: user._id,
    post: id
  });

  const exist = await Like.find({user: user._id,
                                 $and: [{post: id}]}, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error finding Like',
        err
      });
    }
  });

  if (exist.length != 0) {
    return res.status(406).json({
      ok: false,
      message: 'This User already liked the Post'
    });
  }

  const post = await Post.find({ _id: id }, (err, post) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error finding Post to like',
        err
      });
    }

    if (!post) {
      return res.status(400).json({
        ok: false,
        message: "Error loading Post with Id " + id,
      });
    }
  });

  post[0].likes++;

  await post[0].save((err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error saving Post with new Like',
        err
      });
    }
  });

  like.save((err, like) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error adding Like',
        err
      });
    }

    res.status(201).json({
      ok: true,
      message: 'Like recieved and added!',
      like
    });
  });
}

export default LIKES_CTRL;