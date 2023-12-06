import { Router } from "express";
import Manager from "../models/managerModel";

const router = Router();

router.get("/:id", async(req, res) => {
    const id = req.params.id;

    const manager = await Manager.findById(id).populate("projects");
    return res.send(manager);
});

router.get("/", async (req, res) => {
    const filters = req.query;
    const managers = await Manager.find(filters).populate("projects");
    return res.send(managers);
});

router.post("/", async(req, res) => {
    const { name, email, password } = req.body;

    const manager = await Manager.create({ name, email, password });
    return res.send(manager);   
});

export default router;

