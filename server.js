const express = require("express");
const request = require("request");
const { check, validationResult } = require("express-validator");

const channelsPath = "./data/channels.json";
const channelsData = require(channelsPath);
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.json());

// @route    GET api/channels
// @desc     Get channel list
app.get("/channels", async (req, res) => {
  try {
    const data = await channelsData.map((channel) => {
      return { id: channel.id, title: channel.title };
    });
    return res.json(data);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route    GET api/channels/:id
// @desc     Get messages
app.get("/channels/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await channelsData.find((channel) => channel.id === id);
    return res.json(data);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/:id
// @desc     Add a message to channel

app.put(
  "/:id",
  check("message", "Message is required").notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { id } = req.params;
      const message = req.body;
      const index = channelsData.findIndex((channel) => channel.id === id);
      channelsData[index].messages.push(message);
      if (index !== -1) {
        fs.writeFile(
          path.join(__dirname, channelsPath),
          JSON.stringify(channelsData, null, 2),
          function (err) {
            if (err) {
              return res.status(422).send(err);
            }

            return res.json("File Sucesfully Updated");
          }
        );
      } else {
        return res.status(422).send({ error: "Post cannot be updated!" });
      }
    } catch (err) {
      res.status(402).send(err);
    }
  }
);
const PORT = 3100;

app.listen(PORT, () => console.log(`Server started ${PORT}`));
