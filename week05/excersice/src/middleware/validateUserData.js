
// app.post("/cars", validateMiddleware, (req, res) => {
//   // Add the new carr to the database or in an array
// });

// app.use((err, _req, res, _next) => {
//   console.log(err.message ?? err);
//   if (err instanceof ServerError) {
//     res.status(err.status).json({
//       error: {
//         message: err.message,
//       },
//     });
//     return;
//   }
//   res.status(500).json({
//     error: {
//       message: "Something went wrong",
//     },
//   });
// });

// const middlewareFn = (req, _res, next) => {
//   if (req.query.test) {
//     return next();
//   }
//   next(new Error("Expected test in the query parameters"));
// };

// class ServerError extends Error {
//   status = 500;
//   constructor(message) {
//     super(message);
//   }
// }

// class UnauthorizedError extends ServerError {
//   status = 400;
// }
// class UnauthorizedError extends ServerError {
//   status = 401;
// }

// class ForbiddenError extends ServerError {
//   status = 403;
// }

// class NotFoundError extends ServerError {
//   status = 404;
// }

// module.exports = {
//   ServerError,
//   BadRequestError,
//   UnauthorizedError,
//   ForbiddenError,
//   NotFoundError,
// };

// module.exports = middlewareFn;

////////////////////////////////////////////////////////////////////////
  const validateMiddleware = (req, res, next) => {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).send({ error: "Name and email required" });
    }
    next();
  };



module.exports = validateUserData;