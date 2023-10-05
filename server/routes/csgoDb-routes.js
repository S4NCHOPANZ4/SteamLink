const express = require("express");
const passport = require("passport");
const router = express.Router();
const cookie = require("cookie");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const steamUrls = require("../SteamUrl.js");
const axios = require("axios");


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


const cache = {};
router.post("/data/getPrice", async (req, res, next) => {
  const { item } = req.body;

  try {
    // Realiza la solicitud a la API externa desde el servidor usando fetch
    const response = await fetch(
      `https://csgobackpack.net/api/GetItemPrice/?currency=USD&id=${item}&time=7&icon=1`
    );

    // Verifica si la solicitud fue exitosa (código de estado 200)
    if (response.ok) {
      // Parsea la respuesta como JSON
      const data = await response.json();

      if (data.success) {
        res.status(201).json({
          success: true,
          data: data,
        });
      } else {
        res.status(404).json({
          success: false,
          data: {
            user: 'NotFound err 404 check api http://csgobackpack.net/api/GetItemPrice'
          },
        });
      }
    } else {
      // Si la solicitud no fue exitosa, maneja el error
      res.status(response.status).json({
        success: false,
        data: {
          error: `Error from external API: ${response.statusText}`
        },
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
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