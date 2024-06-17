import { generateCode } from "../helper/fn";
import db from "../models";

import { Op } from "sequelize";

// ================== createNewPost ================
export const createNewCategory = (req) =>
  new Promise(async (resolve, reject) => {
    const { label } = req;
    const categoryCode = generateCode(label)
    console.log("🚀 ~ newPromise ~ categoryCode:", categoryCode)
    try {
      const [post, created] = await db.Category.findOrCreate({
        where: { value: label },
        defaults: {
          value: label,
          code: categoryCode
        },
      });

      resolve({
        err: created ? 0 : 1,
        mes: created ? "Create new category successfully" : "Cannot crate new category",
      });
    } catch (error) {
      console.log("🚀 ~ newPromise ~ error:", error)
      reject(error);
    }
  });

// ================== UpdatePost ================
export const updateCategory = ({ id, ...body }) =>
  new Promise(async (resolve, reject) => {
    console.log("id - body", id, body);
    try {
      const [response] = await db.Post.update(body, {
        where: { id },
      });

      resolve({
        err: response > 0 ? 0 : 1,
        mes: response > 0 ? "Updated category successfully" : "Cannot update category",
      });
    } catch (error) {
      console.log("🚀 ~ newPromise ~ error:", error);
      reject(error);
    }
  });

// ================== Delete Post ================
export const deleteCategory = ({ id }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.destroy({
        where: { id },
      });

      resolve({
        err: response > 0 ? 0 : 1,
        mes: response > 0 ? `${response} row(s) deleted.` : "Cannot delete category",
      });
    } catch (error) {
      reject(error);
    }
  });

// ================== GetPosts ================

export const getCategories = ({ page, limit, order, title, ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      const queries = { raw: true, nest: true };
      const offset = !page || +page <= 1 ? 0 : +page - 1;
      const fLimit = +limit || +process.env.LIMIT_POST;
      queries.offset = offset * fLimit;
      queries.limit = fLimit;
      if (order) queries.order = [order];
      if (title) query.title = { [Op.substring]: title };

      const { count, rows: data } = await db.Category.findAndCountAll({
        where: query,
        ...queries
      });
      resolve({
        err: data ? 0 : 1,
        mes: data ? "Get Categories successfully" : "Cannot get posts",
        count,
        dataPosts: data,
      });
    } catch (error) {
      reject(error);
    }
  });