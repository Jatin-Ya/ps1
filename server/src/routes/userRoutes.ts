import { Router } from "express";
import User from "../models/userModel";

const router = Router();

router.get("/:id", (req, res) => {
    const id = req.params.id;

    const user = User.findById(id).populate("projects");
    return res.send(user);
});

router.get("/", (req, res) => {
    const filters = req.query;
    const users = User.find(filters).populate("projects");
    return res.send(users);
});

router.post("/", (req, res) => {
    const { email, password } = req.body;

    const user = User.create({ email, password });
    return res.send(user);
});

router.delete("/", (req, res) => {
    const email = req.query.email;

    const user = User.findOneAndDelete({ email });
    return res.send(user);
});

export default router;