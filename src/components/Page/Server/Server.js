const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Mock JWT secret
const JWT_SECRET = 'your_jwt_secret';

// Login endpoint
server.post('/v1/api/auth/login', (req, res) => {
  const { userCode, password } = req.body;
  const user = router.db.get('users').find({ userCode }).value();

  if (!user) {
    return res.status(401).json({ errorStatus: 901, message: 'Invalid credentials' });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ errorStatus: 901, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userCode: user.userCode, roleId: user.roleId }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({
      errorStatus: 900,
      token,
      userCode: user.userCode,
      roleId: user.roleId,
    });
  });
});

// Register endpoint
server.post('/v1/api/auth/register', (req, res) => {
  const {
    userCode,
    name,
    email,
    password,
    confirmPassword,
    phone,
    address,
    dateOfBirth,
    roleId,
    statusCode,
    gender,
    createdBy,
    experience,
    certification,
  } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ errorStatus: 905, message: 'Mật khẩu xác nhận không khớp' });
  }

  const existingUser = router.db.get('users').find(u => u.userCode === userCode || u.email === email).value();
  if (existingUser) {
    return res.status(400).json({ errorStatus: 901, message: 'Email hoặc tên đăng nhập đã tồn tại' });
  }

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/.test(password)) {
    return res.status(400).json({
      errorStatus: 906,
      message: 'Mật khẩu phải có ít nhất 12 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt',
    });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ errorStatus: 902, message: 'Lỗi hệ thống' });
    }

    const newUser = {
      id: router.db.get('users').value().length + 1,
      userCode,
      name,
      email,
      password: hashedPassword,
      phone,
      address: address || null,
      dateOfBirth: dateOfBirth || null,
      roleId,
      statusCode: statusCode || 'ACTIVE',
      gender,
      createdBy: createdBy || 'SYSTEM',
      experience: experience || null,
      certification: certification || null,
    };

    router.db.get('users').push(newUser).write();

    const token = jwt.sign({ userCode: newUser.userCode, roleId: newUser.roleId }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({
      errorStatus: 900,
      token,
      userCode: newUser.userCode,
      roleId: newUser.roleId,
    });
  });
});

// Use json-server router for other routes
server.use(jsonServer.rewriter(require('./routes.json')));
server.use(router);

server.listen(8081, () => {
  console.log('JSON Server is running on http://localhost:8081');
});