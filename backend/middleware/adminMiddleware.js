const User = require('../models/User')

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId)
    if (!user) return res.status(401).json({ message: 'User not found' })
    if (user.role !== 'admin') return res.status(403).json({ message: 'Access denied' })
    next()
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = adminMiddleware
