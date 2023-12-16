"use strict";
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            );
        });
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectModel_1 = __importDefault(require("../models/projectModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const queriesModel_1 = __importDefault(require("../models/queriesModel"));
const router = (0, express_1.Router)();
router.get("/getById/:id", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        console.log({ params: req.params });
        const project = yield projectModel_1.default
            .findById(id)
            .populate("users")
            .populate("queries");
        return res.send(project);
    })
);
router.get("/", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const filters = req.query;
        const projects = yield projectModel_1.default
            .find(filters)
            .populate("users");
        return res.send(projects);
    })
);
router.get("/belongsTo", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userid = req.query.userid;
            // return res.send([]);
            const user = yield userModel_1.default.findById(userid);
            if (!user) return res.send([]);
            console.log({ user });
            const projectQueries = user.projects.map((project) => {
                return projectModel_1.default.findById(project).exec();
            });
            console.log({ projectQueries });
            const projects = yield Promise.all(projectQueries);
            console.log({ projects });
            return res.send(projects);
        } catch (err) {
            res.status(401).send("Invalid response");
        }
    })
);
router.post("/", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
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
            const manager = yield userModel_1.default.findOne({
                email: manager_email,
            });
            if (!manager) return res.status(401).send("Manager not found");
            const project = yield projectModel_1.default.create({
                title,
                description,
                guidlines,
                manager: manager._id,
                users: [],
                aiSupport,
            });
            console.log({ project });
            const usersQuery = users_email
                .map((email) => userModel_1.default.findOne({ email }))
                .filter((u) => u !== null && u !== undefined);
            const users = yield Promise.all(usersQuery);
            console.log({ users });
            project.users = users.map((user) => user._id);
            project.save();
            users.forEach((user) => {
                user.projects.push(project._id);
                user.save();
            });
            return res.send(project);
        } catch (err) {
            console.log(err);
        }
    })
);
router.patch("/addUsers", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, user: useremail } = req.body;
            const userDoc = yield userModel_1.default.findOne({
                email: useremail,
            });
            const projectDoc = yield projectModel_1.default.findOne({
                _id: id,
            });
            if (!userDoc) return res.status(401).send("User not found");
            if (!projectDoc) return res.status(401).send("Project not found");
            if (projectDoc.users.includes(userDoc._id))
                return res.status(401).send("User already exists in project");
            projectDoc.users.push(userDoc._id);
            userDoc.projects.push(projectDoc._id);
            const [project, user] = yield Promise.all([
                projectDoc.save(),
                userDoc.save(),
            ]);
            const p = yield project.populate("users");
            console.log({ project, user });
            return res.send(p);
        } catch (err) {
            console.log(err);
        }
    })
);
router.patch("/removeUser", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, user: useremail } = req.body;
            const userDoc = yield userModel_1.default.findOne({
                email: useremail,
            });
            const projectDoc = yield projectModel_1.default.findOne({
                _id: id,
            });
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
            const [project, user] = yield Promise.all([
                projectDoc.save(),
                userDoc.save(),
            ]);
            console.log({ project, user });
            const p = yield project.populate("users");
            res.send(p);
        } catch (err) {
            console.log(err);
        }
    })
);
router.post("/query/escalate", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const { projectId, query, solution } = req.body;
            const createdQuery = yield queriesModel_1.default.create({
                status: "escalated",
                query,
                solution,
            });
            const project = yield projectModel_1.default
                .findByIdAndUpdate(
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
    })
);
router.post("/query/resolve", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { projectId, queryId, solution } = req.body;
            console.log({ projectId, queryId, solution });
            yield queriesModel_1.default.findByIdAndUpdate(queryId, {
                status: "resolved",
                solution,
            });
            const project = yield projectModel_1.default
                .findById(projectId)
                .populate("queries")
                .populate("users");
            return res.send(project);
        } catch (err) {
            return res.status(401).send("Invalid response");
        }
    })
);
router.delete("/", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const id = req.query.id;
        const project = yield projectModel_1.default.findByIdAndDelete(id);
        return res.send(project);
    })
);
router.patch("/connectRepo", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const { id, repoName, repoOwner, repoUrl, repoId } = req.body;
        const project = yield projectModel_1.default.findByIdAndUpdate(id, {
            repoDetails: { repoName, repoOwner, repoUrl, repoId },
        });
        return res.send(project);
    })
);
exports.default = router;
