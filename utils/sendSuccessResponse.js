const sendSuccessResponse = (res, result, status = 200) => {
  res.status(status).json({
    status: 'success',
    code: status,
    result,
  });
};

module.exports = sendSuccessResponse;
