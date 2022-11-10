const { User } = require("../model/User");

let auth = (req, res, next) => {
  //인증 처리 부분
  //client cookie에서 token을 가져와 복호화하여 유저를 찾음
  let token = req.cookies.x_auth;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    //req. token,user에 token,user를 넣어주는 이유 : auth 다음 단계 cb에서 token과 user값을 사용할 수 있도록 하기 위해
    req.token = token;
    req.user = user;
    //auth는 중간 단계이므로 next를 사용하여 다음 단계인 cb로 넘겨줌
    next();
  });
  //있으면 인증 O
  //없으면 인증 X
};
module.exports = { auth };
