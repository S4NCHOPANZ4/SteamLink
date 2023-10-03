const express = require("express");
const passport = require("passport");
const router = express.Router();
const cookie = require("cookie");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const steamUrls = require("../SteamUrl.js");
const axios = require("axios");
const redis = require('redis');
const util = require('util');

//==================fetch cs item================



router.post(
  "/data/itemData",
  catchAsyncErrors(async (req, res, next) => {
    const { item_id } = req.body 

    try {
      const response = await axios.get(
          `https://cs2-api.vercel.app/api/items?id=${item_id}`
        );
      if(response.data){
        res.status(201).json({
          success: true,
          data: response.data,
        });
      }else{
        res.status(404).json({
          success: false,
          data: {
            user: 'NotFound err 404 chech api https://cs2-api.vercel.app'
          },
        });
      }
      
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));

    }
  })
);



//=================get cases=================
router.get(
    "/data/cases",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const response = await axios.get(
            `https://bymykel.github.io/CSGO-API/api/en/crates/cases.json`
          );
        if(response.data){
          res.status(201).json({
            success: true,
            data: response.data,
          });
        }else{
          res.status(404).json({
            success: false,
            data: {
              user: 'NotFound err 404 chech api https://bymykel.github.io'
            },
          });
        }
        
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));

      }
    })
  );
//=====================patches============================
router.get(
  "/data/patches",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const response = await axios.get(
          `https://bymykel.github.io/CSGO-API/api/en/crates/capsules/patches.json`
        );
      if(response.data){
        res.status(201).json({
          success: true,
          data: response.data,
        });
      }else{
        res.status(404).json({
          success: false,
          data: {
            user: 'NotFound err 404 chech api https://bymykel.github.io'
          },
        });
      }
      
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));

    }
  })
);
//=============MUSIC===================================
router.get(
  "/data/music",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const response = await axios.get(
          `https://bymykel.github.io/CSGO-API/api/en/crates/music_kit_boxes.json`
        );
      if(response.data){
        res.status(201).json({
          success: true,
          data: response.data,
        });
      }else{
        res.status(404).json({
          success: false,
          data: {
            user: 'NotFound err 404 chech api https://bymykel.github.io'
          },
        });
      }
      
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));

    }
  })
);
//=============souvenir===================================
router.get(
  "/data/souvenir",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const response = await axios.get(
          `https://bymykel.github.io/CSGO-API/api/en/crates/souvenir.json`
        );
      if(response.data){
        res.status(201).json({
          success: true,
          data: response.data,
        });
      }else{
        res.status(404).json({
          success: false,
          data: {
            user: 'NotFound err 404 chech api https://bymykel.github.io'
          },
        });
      }
      
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));

    }
  })
);
//=============grafitis===================================
router.get(
  "/data/graffiti",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const response = await axios.get(
          `https://bymykel.github.io/CSGO-API/api/en/crates/graffiti.json`
        );
      if(response.data){
        res.status(201).json({
          success: true,
          data: response.data,
        });
      }else{
        res.status(404).json({
          success: false,
          data: {
            user: 'NotFound err 404 chech api https://bymykel.github.io'
          },
        });
      }
      
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));

    }
  })
);


router.post('/data/getPrice', async (req, res) => {
  const { item } = req.body;

  try {
    // Intentar obtener datos de la caché
    const cachedData = await util.promisify(redisClient.get).bind(redisClient)(item);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      res.status(201).json({
        success: true,
        data: parsedData,
      });
    } else {
      // Si no hay datos en caché, realizar la solicitud a la API
      const response = await axios.get(`https://csgobackpack.net/api/GetItemPrice/?currency=USD&id=${item}&time=7&icon=1`);

      // Almacenar la respuesta en caché por un tiempo determinado (por ejemplo, 10 minutos)
      redisClient.setex(item, 600, JSON.stringify(response.data));

      // Enviar la respuesta al cliente con la estructura deseada
      res.status(201).json({
        success: true,
        data: response.data,
      });
    }
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    if (error.response && error.response.status === 500) {
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        errorMessage: 'Error en la API externa. Por favor, inténtalo de nuevo más tarde.',
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        errorMessage: error.message,
      });
    }
  }
});

router.get("/data/agents",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const response = await axios.get(
          `https://bymykel.github.io/CSGO-API/api/en/agents.json`
        );
      if(response.data){
        res.status(201).json({
          success: true,
          data: response.data,
        });
      }else{
        res.status(404).json({
          success: false,
          data: {
            user: 'NotFound err 404 chech api /api/en/agents.json'
          },
        });
      }
      
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));

    }
  })
);



module.exports = router;