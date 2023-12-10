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
const managerModel_1 = __importDefault(require("../models/managerModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const router = (0, express_1.Router)();
router.get("/getById/:id", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const project = yield projectModel_1.default
            .findById(id)
            .populate("users");
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
            const role = req.query.role;
            // return res.send([]);
            console.log(userid, role);
            if (role === "Manager") {
                const projects = yield projectModel_1.default
                    .find({ manager: userid })
                    .populate("users");
                return res.send(projects);
            } else if (role === "User") {
                const projects = yield projectModel_1.default
                    .find({
                        $or: [{ manager: userid }, { users: { $all: userid } }],
                    })
                    .populate("users");
                return res.send(projects);
            }
        } catch (err) {
            res.status(401).send("Invalid response");
        }
    })
);
router.post("/", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, description, guidlines, manager_email, users } =
                req.body;
            const manager = yield userModel_1.default.findOne({
                email: manager_email,
            });
            const project = yield projectModel_1.default.create({
                title,
                description,
                guidlines,
                manager,
            });
            manager.projects.push(project);
            yield manager.save();
            if (users) {
                for (let i = 0; i < users.length; i++) {
                    const user = users[i];
                    yield userModel_1.default.findByIdAndUpdate(user, {
                        $push: { projects: project },
                    });
                    project.users.push(user);
                    yield project.save();
                }
            }
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
