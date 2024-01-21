import db from "../models";


// ================== createNewPost ================
export const createNewPost = (req) =>
  new Promise(async (resolve, reject) => {
    const { title } = req

    try {
      const [post, created] = await db.Post.findOrCreate({
        where: { title: title },
        defaults: req,
      });
     

      resolve({
        err: created ? 0 : 1,
        mes: created ? "Create new post successfully" : "Cannot crate new post",
      });
    } catch (error) {
      reject(error);
    }
  });
