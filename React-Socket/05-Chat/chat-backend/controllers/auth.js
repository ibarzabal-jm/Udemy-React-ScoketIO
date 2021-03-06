const { response } = require("express");
const Usuario = require("../models/usuario");

const crearUsuario = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya existe",
      });
    }

    // Todo: encriptar contraseña

    // Guardar usuario en BD
    const usuario = new Usuario(req.body);
    await usuario.save();

    res.json({usuario});

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador",
    });
  }
};

const login = async (req, res = response) => {
  const body = req.body;
  res.json({
    ok: true,
    msg: "login",
    body,
  });
};

const renewToken = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "renewToken",
  });
};

module.exports = { crearUsuario, login, renewToken };
