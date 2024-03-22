const express = require('express');
const router = express.Router();
const {list, detail, update, store, destroy} = require("../../controllers/api/productsController")

router.get('/', list);

router.get('/detail/:id', detail);

router.put("/formEdit/:id", update);

router.post('/create', store)

router.delete('/delete/:id', destroy);

module.exports = router;