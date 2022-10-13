"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const role_guard_1 = require("../guards/role.guard");
const auth_guard_1 = require("../guards/auth.guard");
const validation_guard_1 = require("../guards/validation.guard");
const user_dto_1 = require("./user.dto");
const userController = new user_controller_1.UserController();
const router = (0, express_1.Router)();
router.post("/register", validation_guard_1.DTOValidationGuard.validationSchema(user_dto_1.UserDTO), (req, res) => {
    userController.createUser(req, res);
});
router.post("/login", validation_guard_1.DTOValidationGuard.validationSchema(user_dto_1.UserDTO), (req, res) => {
    userController.login(req, res);
});
router.get("/:userId", (req, res) => {
    userController.getUser(req, res);
});
router.put("/assign-role", auth_guard_1.AuthGuard.isLoggedIn(), role_guard_1.RoleGuard.allowRoles(["admin"]), validation_guard_1.DTOValidationGuard.validationSchema(user_dto_1.UpdateUserRoleDTO), (req, res) => {
    userController.assignRole(req, res);
});
router.get("/:userId", (req, res) => {
    userController.getUser(req, res);
});
exports.default = router;
