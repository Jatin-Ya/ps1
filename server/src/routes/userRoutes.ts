import { Router } from "express";
import User from "../models/userModel";

const router = Router();

router.get("/:id", async(req, res) => {
    const id = req.params.id;

    const user = await User.findById(id).populate("projects");
    return res.send(user);
});

router.get("/projects/:id", async(req, res) => {
    const id = req.params.id;

    const user = await User.findById(id).populate("projects");
    return res.send(user?.projects);
});

router.get("/", async (req, res) => {
    const filters = req.query;
    const users = await User.find(filters).populate("projects");
    return res.send(users);
});

router.post("/", async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.create({ email, password, name });
    return res.send(user);
});

router.delete("/", async(req, res) => {
    const email = req.query.email;

    const user = await User.findOneAndDelete({ email });
    return res.send(user);
});

export default router;