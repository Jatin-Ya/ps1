import { Router } from "express";
import Project from "../models/projectModel";
import Manager from "../models/managerModel";
import User from "../models/userModel";

const router = Router();

router.get("/getById/:id", async (req, res) => {
    const id = req.params.id;

    const project = await Project.findById(id).populate("users");
    return res.send(project);
});

router.get("/", async (req, res) => {
    const filters = req.query;
    const projects = await Project.find(filters).populate("users");
    return res.send(projects);
});

router.get("/belongsTo", async (req, res) => {
    try {
        const userid = req.query.userid;
        const role = req.query.role;
        // return res.send([]);

        console.log(userid, role);

        if (role === "Manager") {
            const projects = await Project.find({ manager: userid }).populate(
                "users"
            );
            return res.send(projects);
        } else if (role === "User") {
            const projects = await Project.find({
                users: { $all: userid },
            }).populate("users");
            return res.send(projects);
        }
    } catch (err) {
        res.status(401).send("Invalid response");
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, description, guidlines, manager_email, users } =
            req.body;

        const manager: any = await Manager.findOne({ email: manager_email });

        const project = await Project.create({
            title,
            description,
            guidlines,
            manager,
        });

        manager.projects.push(project);
        await manager.save();

        if (users) {
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                await User.findByIdAndUpdate(user, {
                    $push: { projects: project },
                });
                project.users.push(user);
                await project.save();
            }
        }

        return res.send(project);
    } catch (err) {
        console.log(err);
    }
});

router.patch("/addUsers", async (req, res) => {
    try {
        const { id, user: useremail } = req.body;

        const userDoc = await User.findOne({ email: useremail });
        const projectDoc = await Project.findOne({ _id: id });

        if (!userDoc) return res.status(401).send("User not found");
        if (!projectDoc) return res.status(401).send("Project not found");

        if (projectDoc.users.includes(userDoc._id))
            return res.status(401).send("User already exists in project");

        projectDoc.users.push(userDoc._id);
        userDoc.projects.push(projectDoc._id);

        const [project, user] = await Promise.all([
            projectDoc.save(),
            userDoc.save(),
        ]);

        const p = await project.populate("users");

        console.log({ project, user });

        return res.send(p);
    } catch (err) {
        console.log(err);
    }
});

router.patch("/removeUser", async (req, res) => {
    try {
        const { id, user: useremail } = req.body;

        const userDoc = await User.findOne({ email: useremail });
        const projectDoc = await Project.findOne({ _id: id });

        if (!userDoc) return res.status(401).send("User not found");
        if (!projectDoc) return res.status(401).send("Project not found");

        if (!projectDoc.users.includes(userDoc._id))
            return res.status(401).send("User doesn't exists in project");

        projectDoc.users = projectDoc.users.filter(
            (u) => u.toString() !== userDoc._id.toString()
        );
        userDoc.projects = userDoc.projects.filter(
            (p) => p.toString() !== projectDoc._id.toString()
        );

        const [project, user] = await Promise.all([
            projectDoc.save(),
            userDoc.save(),
        ]);

        console.log({ project, user });
        const p = await project.populate("users");

        res.send(p);
    } catch (err) {
        console.log(err);
    }
});

router.delete("/", async (req, res) => {
    const id = req.query.id;

    const project = await Project.findByIdAndDelete(id);
    return res.send(project);
});

router.patch("/connectRepo", async (req, res) => {
    const { id, repoName, repoOwner, repoUrl, repoId } = req.body;

    const project = await Project.findByIdAndUpdate(id, {
        repoDetails: { repoName, repoOwner, repoUrl, repoId },
    });
    return res.send(project);
});

export default router;
