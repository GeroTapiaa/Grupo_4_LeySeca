const db = require("../../database/models");
const fs = require("fs");
const path = require("path");
const { literal } = require("sequelize");
const sendSequelizeError = require("../../helpers/SendSequelizeError");
const createError = require("../../helpers/createError");

module.exports = {
  loginPrueba: async (req, res) => {
    return res.status(200).send(true)
  },
  getAllUsers: async (req, res) => {
    try {
      let { limit = 10, page = 1 } = req.query;
      limit = limit > 10 ? 10 : +limit;
      page = +page;
      let offset = +limit * (+page - 1);

      // NUMERO DE USUARIO
      let count = await db.User.count();

      // TRAE A TODOS LOS USUARIO
      const users = await db.User.findAll({
        limit,
        offset,

        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "avatar"],
          include: [
            [
              literal(
                `CONCAT('${req.protocol}://${req.get(
                  "host"
                )}/api/users/avatar/',avatar)`
              ),
              "url-avatar",
            ],
          ],
        },
      });
      //SE CREA UNA URL PARA ACCEDER AL USUARIO.
      users.forEach((user) => {
        user.setDataValue(
          "link",
          `${req.protocol}://${req.get("host")}${req.originalUrl}/${user.id}`
        );
      });

      // const existPrev = page > 1;
      // const existNext = offset + limit < count;

      // const prev = existPrev ? `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${page - 1}${queryUrl}` : null;
      // const next = existNext ? `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${page + 1}${queryUrl}` : null;

      // lo que devuelve
      return res.status(200).json({
        ok: true,
        status: 200,
        meta: {
          total: count,
          page,
        },
        data: {
          users,
        },
      });

      // captura los errores
    } catch (error) {
      let errors = sendSequelizeError(error);

      return res.status(error.status || 500).json({
        ok: false,
        errors,
      });
    }
  },
  getUser: async (req, res) => {
    const { id } = req.params;
    try {
      if (isNaN(id)) {
        throw createError(400, "El ID debe ser un numero");
      }

      const user = await db.User.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
          include: [
            [
              literal(
                `CONCAT('${req.protocol}://${req.get(
                  "host"
                )}/api/users/avatar/',avatar)`
              ),
              "url-avatar",
            ],
          ],
        },
      });

      if (!user) {
        throw createError(404, "No se encontró un Usuario con ese ID");
      }

      return res.status(200).json({
        meta: {
          ok: true,
          status: 200,
        },
        data: user,
      });
    } catch (error) {
      let errors = sendSequelizeError(error);

      return res.status(error.status || 500).json({
        ok: false,
        errors,
      });
    }
  },
  getAvatar: async (req, res) => {
    //    DEVUELVE EL AVATAR DEL USUARIO
    return res.sendFile(
      path.join(
        __dirname,
        "..",
        "..",
        "..",
        "public",
        "images",
        "users",
        req.params.avatar
      )
    );
  },
  verifyEmail: async (req, res) => {
    try {
      const { email } = req.body;
      let user = await db.User.findOne({
        where: {
          email,
        },
      });

      return res.status(200).json({
        ok: true,
        verified: user ? true : false,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        error: error.message,
      });
    }
  },
  verifyUser: async (req, res) => {
    try {
      const { user } = req.body;
      let userVerify = await db.User.findOne({
        where: {
          user,
        },
      });

      return res.status(200).json({
        ok: true,
        verified: userVerify ? true : false,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        error: error.message,
      });
    }
  },

};
