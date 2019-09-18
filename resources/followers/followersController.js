const go = require('../utils/crud');
const db = require('../../data/dbConfig');

//test

exports.getAllFollowers = async (req, res) => {
  try {
    const data = await go.getMany('user_followers');
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "couldn't get users" });
  }
};

exports.createFollow = async (req, res) => {
  if (!req.body.userId) {
    res
      .status(400)
      .json({ message: 'userId was not attached to the req.body' });
  }
  if (!req.body.followerId) {
    res
      .status(400)
      .json({ message: 'followerId was not attached to the req.body' });
  }

  try {
    const [id] = await go.createOne('user_followers', 'id', req.body);
    const data = await go.getById('user_followers', id);
    res.status(201).json({ message: 'Follow successfully created!', data });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Couldn't create the follow", error: error });
  }
};

exports.getFollowingCount = async (req, res) => {
  if (!req.params.userId) {
    res
      .status(400)
      .json({ message: 'userId was not attached to the req.params' });
  }

  const { userId } = req.params;

  try {
    const data = await db('user_followers')
      .count('id')
      .where('userId', userId);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Couldnt find following count' });
  }
};

exports.getFollowersCount = async (req, res) => {
  if (!req.params.userId) {
    res
      .status(400)
      .json({ message: 'userId was not attached to the req.params' });
  }

  const { userId } = req.params;

  try {
    const data = await db('user_followers')
      .count('id')
      .where('followerId', userId);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Couldnt find followers count' });
  }
};

exports.unfollow = async (req, res) => {
  if (!req.body.userId) {
    res
      .status(400)
      .json({ message: 'userId was not attached to the req.body' });
  }

  if (!req.params.followerId) {
    res
      .status(400)
      .json({ message: 'followerId was not attached to the req.params' });
  }

  const { followerId } = req.params;
  const { userId } = req.body;

  try {
    await db('user_followers')
      .del()
      .where('followerId', followerId)
      .andWhere('userId', userId);
    res.status(200).json({ message: 'Follow successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Couldn't delete follow.", error: error });
  }
};
