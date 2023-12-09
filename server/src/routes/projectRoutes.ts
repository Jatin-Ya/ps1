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
        const { id, user } = req.body;

        console.log(id, user);

        const userDoc = await User.findOne({ email: user });
        if (!userDoc) return res.status(401).send("User not found");

        const project = await Project.findByIdAndUpdate(id, {
            $push: { users: userDoc._id },
        });

        if (!project) return res.status(401).send("Project not found");

        console.log({ project });

        userDoc.projects.push(project?._id);
        await userDoc.save();

        // await User.findOneAndUpdate(
        //     { email: user },
        //     { $push: { projects: project?._id } }
        // );

        return res.send(project);
    } catch (err) {
        console.log(err);
    }
});

router.patch("/removeUser", async (req, res) => {
    try {
        const { id, user } = req.body;

        console.log(id, user);

        const userDoc = await User.findOne({ email: user });
        if (!userDoc) return res.status(401).send("User not found");

        const project = await Project.findByIdAndUpdate(id, {
            $pull: { users: userDoc._id },
        });

        if (!project) return res.status(401).send("Project not found");

        console.log({ project });

        userDoc.projects.filter((project) => project !== id);
        await userDoc.save();

        // await User.findOneAndUpdate(
        //     { email: user },
        //     { $push: { projects: project?._id } }
        // );

        return res.send(project);
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
