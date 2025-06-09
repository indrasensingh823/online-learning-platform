// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;  // email se login kar rahe hain, username nahi

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Yahan password compare kar rahe hain using matchPassword method from model
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Agar sahi password hai to token generate karo
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
