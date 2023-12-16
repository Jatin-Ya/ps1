import { Router } from "express";
import User from "../models/userModel";

const router = Router();

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    const user = await User.findById(id).populate("projects");
    return res.send(user);
});

router.get("/projects/:id", async (req, res) => {
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
    const { name, email, password, role } = req.body;

    const user = await User.create({ email, password, name, role });
    return res.send(user);
});

router.delete("/", async (req, res) => {
    const email = req.query.email;

    const user = await User.findOneAndDelete({ email });
    return res.send(user);
});

router.get("/github/:id", async (req, res) => {
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user) return res.status(404).send("User not found");
    if (!user.githubId)
        return res
            .status(200)
            .send({ msg: "Github not linked", linked: false });
    return res.status(200).send({ msg: "Github linked", linked: true });
});

export default router;
