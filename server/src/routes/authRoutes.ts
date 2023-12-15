import e, { Router } from "express";
import axios from "axios";
import User from "../models/userModel";
import Manager from "../models/managerModel";

const router = Router();

// TODO : Test and fix github auth

router.post("/login", async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const user = await User.findOne({ email: email });
        if(user?.password !== password) {
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
});

router.get("/github", async (req, res) => {
    try {
        const id = req.query.id;
        console.log(id);
        const githubOauthUrl = "https://github.com/login/oauth/authorize";
        const clientId = process.env.GITHUB_CLIENT_ID;
        // const redirectUri = process.env.GITHUB_CALLBACK_URI;
        const redirectUri = "http://localhost:8080/api/v1/auth/github/callback";
        const scope = "repo%20user%20write:org%20repo_deployment";
        const state = id;

        const url = `${githubOauthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

        console.log(url);

        res.redirect(url);
    } catch (err) {
        res.status(401).send("Invalid response");
    }
});

router.get("/github/callback", async (req, res) => {
    try {
        const { code, state } = req.query;
        const clientId = process.env.GITHUB_CLIENT_ID;
        const clientSecret = process.env.GITHUB_CLIENT_SECRET;
        const redirectUri = process.env.GITHUB_CALLBACK_URI;
        // const redirectUri = "http://localhost:3001/api/v1/auth/github/callback";

        const url = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&redirect_uri=${redirectUri}`;
        const response = await axios.post(url, {
            headers: {
                Accept: "application/json",
            },
        });

        // access_token=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&scope=repo%2Cuser%2Cwrite%3Aorg&token_type=bearer
        const access_token = response.data.split("&").split("=")[1];
        console.log(access_token);
        console.log(response.data);
        const resp = await axios.get("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const githubUserName = resp.data.name;

        const user = await User.findByIdAndUpdate(state, {
            githubId: { accessToken: access_token, userName: githubUserName },
        });
        res.send("Success");
        res.redirect(`http://localhost:5173/`);
    } catch (err) {
        res.status(401).send("Invalid response");
    }
});

export default router;
