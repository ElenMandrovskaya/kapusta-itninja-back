const queryString = require('query-string');
const axios = require('axios');
const { User } = require('../../models');

require('dotenv').config();
const { GOOGLE_CLIENT_ID, BASE_URL, SECRET_KEY } = process.env;

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  console.log(code);

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${BASE_URL}/user/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });
  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const { email, name, id } = userData.data;
  const user = await User.findOne({ email });

  if (!user) {
    const newUser = await User.create({
      email,
      name,
      password: id,
    });

    const { _id } = newUser;
    const payload = {
      _id,
    };
    const token = jwt.sign(payload, SECRET_KEY);
    await User.findByIdAndUpdate(_id, { token });
    const userToken = await User.findOne({ token });
    return res.redirect(`${FRONTEND_URL}?token=${userToken.token}`);
  }

  const { _id } = user;
  const payload = { _id };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(_id, { token });
  const userToken = await User.findOne({ token });
  res.redirect(`${FRONTEND_URL}?token=${userToken.token}`);
};

module.exports = googleRedirect;
