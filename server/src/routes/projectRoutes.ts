import { Router } from "express";
import Project from "../models/projectModel";
import Manager from "../models/managerModel";

const router = Router();

router.get("/:id", (req, res) => {
    const id = req.params.id;

    const project = Project.findById(id).populate("users");
    return res.send(project);
});

router.get("/", (req, res) => {
    const filters = req.query;
    const projects = Project.find(filters).populate("users");
    return res.send(projects);
});

router.post("/", (req, res) => {
    const { title, description, guidlines, manager_email } = req.body;

    const manager = Manager.findOne({ email: manager_email });

    const project = Project.create({ title, description, guidlines, manager });
    return res.send(project);
});

router.delete("/", (req, res) => {
    const id = req.query.id;

    const project = Project.findByIdAndDelete(id);
    return res.send(project);
});

router.patch("/connectRepo", (req, res) => {
    const { id, repoName, repoOwner, repoUrl, repoId } = req.body;

    const project = Project.findByIdAndUpdate(id, { repoDetails: { repoName, repoOwner, repoUrl, repoId } });
    return res.send(project);
});

export default router;