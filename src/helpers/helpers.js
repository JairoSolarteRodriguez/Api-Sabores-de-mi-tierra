import jwt from "jsonwebtoken"
import { transporter } from "../config/mail.config.js"

import "dotenv/config"

const { ACTIVATION_TOKEN_SECRET, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, EMAIL, FRONT_BASE_URL } = process.env

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,:\s@\"]+(\.[^<>()[\]\\.,:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export const ActivationToken = (payload) => {
  return jwt.sign(payload, ACTIVATION_TOKEN_SECRET, {
    expiresIn: "30m",
  })
}

export const AccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  })
}

export const RefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  })
}

export const sendMail = async (user_email, subject, AccessToken) => {
  try {
    await transporter.sendMail({
      from: `Activar cuenta ${EMAIL}`,
      to: user_email,
      subject: subject,
      html: `
        <h2>Activa tu cuenta</h2>
        <p>Bienvenidos a sabores de mi tierra, gracias por registrarte a continuación podras encontrar un botón para activar tu cuenta. Si usted no se registro haga caso omiso a este mensaje</p>
        <a href=${FRONT_BASE_URL}/activate/${AccessToken}>Click para activar</a>
        <p>O puedes copiar y pegar la siguiente url en tu navegador.</p>
        <a href=${FRONT_BASE_URL}/activate/${AccessToken}>${FRONT_BASE_URL}/activate/${AccessToken}</a>
      `,
    })
  } catch (error) {
    return `No se pudo enviar el mensaje error: ${error}`
  }
}