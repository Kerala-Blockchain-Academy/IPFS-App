var express = require("express");
var router = express.Router();
const { create } = require('ipfs-http-client')

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/uploadFile", async function (req, res, next) {
  uid = req.body.uid;
  fileBytes = req.files.fileData.data;

  const ipfs = create('/ip4/127.0.0.1/tcp/5001'); // IPFS API

  const result = await ipfs.add(fileBytes);
  console.log(result.path);

  FS.methods
    .setFileHash(uid, web3.utils.toHex(result.path))
    .send({ from: accountAddress, gasLimit:  967000 })
    .then(function (result) {
      res.send("File Uploaded");
    });
});

router.get("/viewFile", function (req, res, next) {
  data = req.query;
  console.log(data);
  FS.methods
    .fileHash(data.uid)
    .call({ from: accountAddress })
    .then((val) => {
      console.log(val);
      ipfspath = "https://ipfs.io/ipfs/" + web3.utils.hexToUtf8(val);
      res.redirect(ipfspath);
    });
});

module.exports = router;
