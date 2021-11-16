const queryString = require('query-string');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { User } = require('../../models');

const SECRET_KEY = process.env.SECRET_KEY;

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/api/user/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });

  //   console.log(tokenData);
  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const { id, email, name } = userData.data;
  const user = await User.findOne({ email });
  console.log(user);

  if (!user) {
    const newUser = await User.create({
      name,
      password: id,
      email,
    });
    const { _id } = newUser;
    const payload = {
      _id,
    };
    const token = jwt.sign(payload, SECRET_KEY);
    await User.findByIdAndUpdate(_id, { token });
    const userToken = await User.findOne({ token });
    return res.redirect(`${process.env.FRONTEND_URL}?token=${userToken.token}`);
  }

  const { _id } = user;
  const payload = { _id };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(_id, { token });
  const userToken = await User.findOne({ token });
  res.redirect(`${process.env.FRONTEND_URL}?token=${userToken.token}`);
};

//   const newUser = new User({ name, email });
//   newUser.setVerifyToken(nanoid(10));
//   newUser.setPassword(id);
// newUser.setAvatar(gravatar.url(email));

//   const { verifyToken } = await newUser.save();
//   await newUser.save();
//   console.log(userData);
// userData.data.email
// ...
// ...
// ...
//   return res.redirect(
//     `${process.env.FRONTEND_URL}?email=${userData.data.email}`,
//   );
// };

module.exports = googleRedirect;
