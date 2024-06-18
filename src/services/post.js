import db from "../models";

import { Op } from "sequelize";
const Sequelize = require("sequelize");
// ================== createNewPost ================
export const createNewPost = (req) =>
  new Promise(async (resolve, reject) => {
    const { title } = req;

    try {
      const [post, created] = await db.Post.findOrCreate({
        where: { title: title },
        defaults: req,
      });
      console.log(created);
      resolve({
        err: created ? 0 : 1,
        mes: created
          ? "Post created successfully"
          : "Cannot create new post - Title already in use",
      });
    } catch (error) {
      reject(error);
    }
  });

// ================== UpdatePost ================
export const updatePost = ({ id, ...body }) =>
  new Promise(async (resolve, reject) => {
    console.log("id - body", id, body);
    try {
      const [response] = await db.Post.update(body, {
        where: { id },
      });

      resolve({
        err: response > 0 ? 0 : 1,
        mes: response > 0 ? "Updated post successfully" : "Cannot update post",
      });
    } catch (error) {
      console.log("🚀 ~ newPromise ~ error:", error);
      reject(error);
    }
  });

// ================== Delete Post ================
export const deletePost = ({ id }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.destroy({
        where: { id },
      });

      resolve({
        err: response > 0 ? 0 : 1,
        mes:
          response > 0 ? `${response} row(s) deleted.` : "Cannot delete post",
      });
    } catch (error) {
      reject(error);
    }
  });

// ================== GetPosts ================

// export const getPosts = ({ page, limit, order, title, category, ...query }) =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const queries = { raw: true, nest: true };
//       const offset = !page || +page <= 1 ? 0 : +page - 1;
//       const fLimit = +limit || +process.env.LIMIT_POST;
//       queries.offset = offset * fLimit;
//       queries.limit = fLimit;
//       if (order) queries.order = [order];
//       if (title) query.title = { [Op.substring]: title };
//       const whereCategory = category ? { code: { [Op.eq]: category } } : {};
//       const { count, rows: data } = await db.Post.findAndCountAll({
//         where: query,
//         ...queries,
//         attributes: {
//           exclude: ["category_code"],
//         },
//         include: [
//           {
//             model: db.Category,
//             attributes: { exclude: ["createdAt", "updatedAt"] },
//             as: "categoryData",
//             where: whereCategory,
//           },
//         ],
//       });

//       resolve({
//         err: data ? 0 : 1,
//         mes: data ? "Get posts successfully" : "Cannot get posts",
//         count,
//         data: data,
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
export const getPostDetail = ({ id }) =>
  new Promise(async (resolve, reject) => {
    try {
      const post = await db.Post.findByPk(id, {
        raw: true,
        nest: true,
        attributes: {
          exclude: ["category_code", "status_code", "author_code"],
        },
        include: [
          {
            model: db.Category,
            as: "categoryData",
            attributes: ["id", "code", "value"],
            // where: whereCategory,
          },
          {
            model: db.Status,
            as: "statusData",
            attributes: ["id", "code", "value"],
            // where: whereStatus,
          },
          {
            model: db.User,
            as: "authorData",
            attributes: ["id", "name", "email"],
          },
        ],
      });

      if (post) {
        resolve({
          err: 0,
          mes: "Get post detail successfully",
          data: post,
        });
      } else {
        resolve({
          err: 1,
          mes: "Post not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
export const getPosts = ({
  page,
  limit,
  order,
  title,
  category,
  status_ac,
  ...query
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const queries = { raw: true, nest: true };
      const offset = !page || +page <= 1 ? 0 : +page - 1;
      const fLimit = +limit || +process.env.LIMIT_POST;
      queries.offset = offset * fLimit;
      queries.limit = fLimit;
      if (order) queries.order = [order];
      if (title) query.title = { [Op.substring]: title };
      // const whereCategory = category ? { code: { [Op.eq]: category } } : {};
      // const whereStatus = status ? { code: { [Op.eq]: status } } : {};
      const whereClause = {
        ...query,
      };

      if (category) {
        whereClause.category_code = { [Op.eq]: category };
      }

      if (status_ac) {
        whereClause.status_code = { [Op.eq]: status_ac };
      }
      const { count, rows: data } = await db.Post.findAndCountAll({
        where: whereClause,
        ...queries,
        attributes: {
          exclude: ["category_code", "status_code", "author_code"],
        },
        include: [
          {
            model: db.Category,
            as: "categoryData",
            attributes: ["id", "code", "value"],
            // where: whereCategory,
          },
          {
            model: db.Status,
            as: "statusData",
            attributes: ["id", "code", "value"],
            // where: whereStatus,
          },
          {
            model: db.User,
            as: "authorData",
            attributes: ["id", "name", "email"],
          },
        ],
      });
      resolve({
        err: data ? 0 : 1,
        mes: data ? "Get Posts successfully" : "Cannot get posts",
        count,
        data,
      });
    } catch (error) {
      reject(error);
    }
  });
