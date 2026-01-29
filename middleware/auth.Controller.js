const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET;

// Render pages
exports.registerPage = (req, res) => res.render('register')
exports.loginPage = (req, res) => res.render('login');

// Register user
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    username,
    email,
    password: hashedPassword
  });
  res.redirect('/login');

} catch (err) {
    if(err.code === 11000) {
        return res.render('register', { error: 'Username or email already exists'})
    }

    return res.render('register', { error: 'Something went wrong. Please try again.'})
}
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
  const user = await User.findOne({ email });
  if (!user) return res.render('login', { error: 'Invalid email or password' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.render('login', { error: 'Invalid email or password' });

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.cookie('token', token, { httpOnly: true });
  res.redirect('/');
} catch (err){
    return res.render('login', { error: 'Something went wrong. Please try again.' })
}
};

// Logout User
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};
