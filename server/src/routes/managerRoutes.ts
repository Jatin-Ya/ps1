import { Router } from "express";
import Manager from "../models/managerModel";

const router = Router();

router.get("/:id", (req, res) => {
    const id = req.params.id;

    const manager = Manager.findById(id).populate("projects");
    return res.send(manager);
});

router.get("/", (req, res) => {
    const filters = req.query;
    const managers = Manager.find(filters).populate("projects");
    return res.send(managers);
});

router.post("/", (req, res) => {
    const { name, email, password } = req.body;

    const manager = Manager.create({ name, email, password });
    return res.send(manager);   
});

export default router;

