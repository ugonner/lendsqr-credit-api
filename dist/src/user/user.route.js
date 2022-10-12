"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const userController = new user_controller_1.UserController();
const router = (0, express_1.Router)();
router.post("/register", (req, res) => {
    userController.createUser(req, res);
});
router.post("/login", (req, res) => {
    userController.login(req, res);
});
router.get("/:userId", (req, res) => {
    userController.getUser(req, res);
});
router.get("/:userId", (req, res) => {
    userController.getUser(req, res);
});
exports.default = router;
