import { Router } from "express"
import { UserController } from "./user.controller";
import { Request, Response } from "express";
import { RoleGuard } from "../guards/role.guard";
import { AuthGuard } from "../guards/auth.guard";
import { DTOValidationGuard } from "../guards/validation.guard";
import { UpdateUserRoleDTO, UserDTO } from "./user.dto";
const userController = new UserController();
const router = Router();
router.post(
  "/register",
  DTOValidationGuard.validationSchema(UserDTO),
  (req: Request, res: Response) => {
    userController.createUser(req, res);
  }
);
router.post(
  "/login",
  DTOValidationGuard.validationSchema(UserDTO),
  (req: Request, res: Response) => {
    userController.login(req, res);
  }
);
router.get("/:userId", (req: Request, res: Response) => {
  userController.getUser(req, res);
});

router.put(
  "/assign-role",
  AuthGuard.isLoggedIn(),
  RoleGuard.allowRoles(["admin"]),
  DTOValidationGuard.validationSchema(UpdateUserRoleDTO),
  (req: Request, res: Response) => {
    userController.assignRole(req, res);
  }
);
router.get("/:userId", (req: Request, res: Response) => {
  userController.getUser(req, res);
});
export default router