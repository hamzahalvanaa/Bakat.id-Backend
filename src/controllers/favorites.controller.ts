import { Request, Response } from 'express';
import { Favorite } from '../models/favorites.model';
import { LIMIT } from '../config/server.config';

const FAVORITES_CTRL: any = {};

// READ
FAVORITES_CTRL.getFavoritesByUser = async (req: Request, res: Response) => {

  const user = req.user;

  const page = Number(req.query.page) || 1;
  let skip = page - 1;
  skip = skip * LIMIT;

  const favorites = await Favorite.find({ user: user._id }, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: "Error loading Favorites",
        err
      });
    }
  }).sort({ _id: -1 })
    .limit(LIMIT)
    .skip(skip)
    .populate({
      path: 'post',
      populate: { path: 'user'}
    });

  res.status(200).json({
    ok: true,
    message: 'Favorites by User',
    page,
    favorites
  });
}

// CREATE
FAVORITES_CTRL.addFavorite = async (req: Request, res: Response) => {

  const user = req.user;
  const id: string = req.body.id;
  const favorite = new Favorite({
    user: user._id,
    post: id
  });

  const exist = await Favorite.find({user: user._id,
                                     $and: [{post: id}]}, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error finding Favorite',
        err
      });
    }
  });

  if (exist.length != 0) {
    return res.status(406).json({
      ok: false,
      message: 'Post already on Favorites'
    });
  }

  favorite.save((err, favorite) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error adding Favorite',
        err
      });
    }

    res.status(201).json({
      ok: true,
      message: 'Post added to Favorites!',
      favorite
    });
  });
}

// REMOVE

FAVORITES_CTRL.removeFavorite = async (req: Request, res: Response) => {

  const id = req.query.id;

  Favorite.findByIdAndRemove(id, (err, favorite) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error removing Favorite',
        err
      });
    }

    if (!favorite) {
      return res.status(400).json({
        ok: false,
        message: "Favorite with Id " + id + " doesn't exist",
      });
    }

    res.status(200).json({
      ok: true,
      message: 'Favorite removed',
      favorite
    });
  });
}

export default FAVORITES_CTRL;