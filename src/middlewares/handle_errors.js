
import createError from 'http-errors';

export const badRequest = ( res ,err) => {
    
    const error = createError.BadRequest(err);
    return res.status(error.status).json({
        err: 1,
        mes: error.message
    })
}
export const badRequestNew = (res, err) => {
    const error = createError(400, err);
    return res.status(error.status).json({
        err: 1,
        mes: error.message
    });
};
export const interalServerError = ( res) => {
    const error = createError.InternalServerError();
    console.log("🚀 ~ interalServerError ~ error:", error.status)
  return res.status(error.status).json({
        err: 1,
        mes: error.message,
        // errText
    })
}

export const notFound = (req, res) => {
    const error = createError.NotFound();
   
   return res.status(error.status).json({
        err: 1,
        mes: error.message
    })
}

export const notAuth = ( err, res) => {
    const error = createError.Unauthorized(err);
    return res.status(error.status).json({
        err: 1,
        mes: error.message
    })
}