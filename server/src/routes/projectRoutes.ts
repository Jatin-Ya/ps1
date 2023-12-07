import { Router } from "express";
import Project from "../models/projectModel";
import Manager from "../models/managerModel";
import User from "../models/userModel";

const router = Router();

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    const project = await Project.findById(id).populate("users");
    return res.send(project);
});

router.get("/", async (req, res) => {
    const filters = req.query;
    const projects = await Project.find(filters).populate("users");
    return res.send(projects);
});

router.post("/", async (req, res) => {
    const { title, description, guidlines, manager_email, users } = req.body;

    const manager: any = await Manager.findOne({ email: manager_email });

    const project = await Project.create({ title, description, guidlines, manager });

    manager.projects.push(project);
    await manager.save();

    if (users) {
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            await User.findByIdAndUpdate(user, { $push: { projects: project } });
            project.users.push(user);
            await project.save();
        }
    }

    return res.send(project);
});

router.delete("/", async (req, res) => {
    const id = req.query.id;

    const project = await Project.findByIdAndDelete(id);
    return res.send(project);
});

router.patch("/connectRepo", async (req, res) => {
    const { id, repoName, repoOwner, repoUrl, repoId } = req.body;

    const project = await Project.findByIdAndUpdate(id, { repoDetails: { repoName, repoOwner, repoUrl, repoId } });
    return res.send(project);
});

export default router;