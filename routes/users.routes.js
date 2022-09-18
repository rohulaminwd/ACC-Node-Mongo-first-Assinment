const express = require("express");
const { getRandomUser, getAllUsers, saveUser, updateUser, manyUpdateUser, deleteUser } = require("../controllers/user.controllers");
const router = express.Router();

router.get("/random", getRandomUser );
router.get("/all", getAllUsers );
router.post("/save", saveUser );
router.patch("/update/:id", updateUser );
router.patch("/bulk-update", manyUpdateUser );
router.delete("/delete/:id", deleteUser );


module.exports = router;