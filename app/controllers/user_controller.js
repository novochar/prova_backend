const User = require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function get_token(user) {
  return jwt.sign({ id: user.id, email: user.email  }, process.env.JWT_SECRET, {
    expiresIn: 3000 // expires in 50 min
  });
}

exports.create = (req, res) => {
  const body = req.body
  let encrypted_password = null
  if(body.password){
    encrypted_password = bcrypt.hashSync(body.password, 10);
  }

  let user = new User({
    email: req.body.email,
    encrypted_password
  });

  user.save(function (err) {
    if (err) {
      return res.status(500).json(err);
    }
    const token = get_token(user);
    res.json({success: true, token});
  })
};

exports.login = (req, res) => {
  if(!req.body.email){
    return res.status(400).json({error: "Email address is required."});
  }
  User.findOne({email: req.body.email}, function (err, user) {
    if(err) {
      return res.status(400).json(err);
    }
    if(!user){
      return res.status(400).json({error: "User not find."});
    }

    if(bcrypt.compareSync(req.body.password, user.encrypted_password)) {
      res.json({success: true, token: get_token(user)});
    } else {
      res.status(401).json({error: "Error Passwords don't match."});
    }
  });
}