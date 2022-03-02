exports.LoginStatus = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("로그인 해주세요.");
  }
};

exports.NotLoginStatus = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("로그인이 되어있지 않은 유저만 접근 가능합니다.");
  }
};
