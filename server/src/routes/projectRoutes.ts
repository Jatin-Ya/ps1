import { Router } from "express";
import Project from "../models/projectModel";
import Manager from "../models/managerModel";
import User from "../models/userModel";
import Query from "../models/queriesModel";

const router = Router();

router.get("/getById/:id", async (req, res) => {
    const id = req.params.id;

    const project = await Project.findById(id)
        .populate("users")
        .populate("queries");

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
        // return res.send([]);
        const user = await User.findById(userid);
        if (!user) return res.send([]);

        console.log({ user });

        const projectQueries = user.projects.map((project) => {
            return Project.findById(project).exec();
        });

        console.log({ projectQueries });

        const projects = await Promise.all(projectQueries);
        console.log({ projects });
        return res.send(projects);
    } catch (err) {
        res.status(401).send("Invalid response");
    }
});

router.post("/", async (req, res) => {
    try {
        const {
            title,
            description,
            guidlines,
            manager_email,
            users_email,
            aiSupport,
        } = req.body;

        users_email.push(manager_email);

        console.log({ body: req.body });

        const manager = await User.findOne({ email: manager_email });
        if (!manager) return res.status(401).send("Manager not found");

        const project = await Project.create({
            title,
            description,
            guidlines,
            manager: manager._id,
            users: [],
            aiSupport,
        });

        console.log({ project });

        const usersQuery = users_email
            .map((email: string) => User.findOne({ email }))
            .filter((u: any) => u !== null && u !== undefined);

        const users = await Promise.all(usersQuery);
        console.log({ users });
        project.users = users.map((user: any) => user._id);
        project.save();

        users.forEach((user: any) => {
            user.projects.push(project._id);
            user.save();
        });
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

router.post("/query/escalate", async (req, res) => {
    try {
        console.log(req.body);
        const { projectId, query, solution } = req.body;

        const createdQuery = await Query.create({
            status: "escalated",
            query,
            solution,
        });

        const project = await Project.findByIdAndUpdate(
            projectId,
            {
                $push: { queries: createdQuery._id },
            },
            { new: true }
        )
            .populate("queries")
            .populate("users");

        return res.send(project);
    } catch (err) {
        console.log(err);
        return res.status(401).send("Invalid response");
    }
});

router.post("/query/resolve", async (req, res) => {
    try {
        const { projectId, queryId, solution } = req.body;

        console.log({ projectId, queryId, solution });

        await Query.findByIdAndUpdate(queryId, {
            status: "resolved",
            solution,
        });

        const project = await Project.findById(projectId)
            .populate("queries")
            .populate("users");

        return res.send(project);
    } catch (err) {
        return res.status(401).send("Invalid response");
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
