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
const axios_1 = __importDefault(require("axios"));
const userModel_1 = __importDefault(require("../models/userModel"));
const router = (0, express_1.Router)();
// TODO : Test and fix github auth
router.post("/login", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password, role } = req.body;
            const user = yield userModel_1.default.findOne({ email: email });
            if (
                (user === null || user === void 0 ? void 0 : user.password) !==
                password
            ) {
                return res.status(401).send("Incorrect Password");
            }
            res.send(user);
            // if (role === "User") {
            //     const user = await User.findOne({ email: email });
            //     if (user?.password !== password) {
            //         return res.status(401).send("Incorrect Password");
            //     }
            //     res.send(user);
            // } else if (role == "Manager") {
            //     const manager = await Manager.findOne({ email: email });
            //     if (manager?.password !== password) {
            //         return res.status(401).send("Incorrect Password");
            //     }
            //     res.send(manager);
            // } else {
            //     return res.status(401).send("Incorrect Role");
            // }
        } catch (err) {
            res.status(401).send("Invalid response");
        }
    })
);
router.get("/github", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.query.id;
            console.log(id);
            const githubOauthUrl = "https://github.com/login/oauth/authorize";
            const clientId = process.env.GITHUB_CLIENT_ID;
            const redirectUri = process.env.GITHUB_CALLBACK_URI;
            // const redirectUri =
            //     "http://localhost:8080/api/v1/auth/github/callback";
            const scope = "repo%20user%20write:org%20repo_deployment";
            const state = id;
            const url = `${githubOauthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
            console.log(url);
            res.json({ url: url });
        } catch (err) {
            res.status(401).send("Invalid response");
        }
    })
);
router.get("/github/callback", (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { code, state } = req.query;
            const clientId = process.env.GITHUB_CLIENT_ID;
            const clientSecret = process.env.GITHUB_CLIENT_SECRET;
            const redirectUri = process.env.GITHUB_CALLBACK_URI;
            // const redirectUri = "http://localhost:3001/api/v1/auth/github/callback";
            const url = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&redirect_uri=${redirectUri}`;
            const response = yield axios_1.default.post(url, {
                headers: {
                    Accept: "application/json",
                },
            });
            // access_token=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&scope=repo%2Cuser%2Cwrite%3Aorg&token_type=bearer
            const access_token = response.data.split("&")[0].split("=")[1];
            console.log(access_token);
            console.log(response.data);
            const resp = yield axios_1.default.get(
                "https://api.github.com/user",
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );
            const githubUserName = resp.data.name;
            const user = yield userModel_1.default.findByIdAndUpdate(state, {
                githubId: {
                    accessToken: access_token,
                    userName: githubUserName,
                },
            });
            // res.send("Success");
            res.redirect(`https://ps1-test.onrender.com/`);
        } catch (err) {
            res.status(401).send("Invalid response");
        }
    })
);
exports.default = router;
