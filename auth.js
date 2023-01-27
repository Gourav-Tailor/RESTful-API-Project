const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

const bcrypt = require('bcrypt');

const authenticateUser = async (req, res, next) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).send({ error: 'Invalid credentials' });
    }
    // Compare the plain text password with the hashed password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      res.status(401).send({ error: 'Invalid credentials' });
    }
    // Save the user object to the request object
    req.user = user;
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.authenticateUser = authenticateUser;