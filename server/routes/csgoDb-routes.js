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


router.post("/data/getPrice",
  catchAsyncErrors(async (req, res, next) => {
    const { item } = req.body 
    try {
      // const response = await axios.get(
      //     `http://csgobackpack.net/api/GetItemPrice/?currency=USD&id=${item}&time=7&icon=1`
      //   );
      // if(response.data.success){
      //   res.status(201).json({
      //     success: true,
      //     data: response.data,
      //   });
      // }else{
      //   res.status(404).json({
      //     success: false,
      //     data: {
      //       user: 'NotFound err 404 chech api http://csgobackpack.net/api/GetItemPrice'
      //     },
      //   });
      // }
      res.status(201).json({
            success: true,
            data: {
              "success": true,
              "average_price": "1.83",
              "median_price": "1.88",
              "amount_sold": "261",
              "standard_deviation": "6.94",
              "lowest_price": "0.85",
              "highest_price": "1.9",
              "first_sale_date": "1584918000",
              "time": "7",
              "icon": "http://cdn.steamcommunity.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsQ1xgJgxoprumIDho3_LEaCUMuY_vkILbwfX3ZuPUwzsGsZIiibiSporz21HnrxE6aziiJoKUelA_N0aQpAZKASuIOw/",
              "currency": "USD"
            }
          });

    } catch (error) {
      return next(new ErrorHandler(error.message , 500));

    }
  })
);
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