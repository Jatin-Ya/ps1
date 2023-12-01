import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/github", async (req, res) => {
    const githubOauthUrl = "https://github.com/login/oauth/authorize";
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = process.env.GITHUB_CALLBACK_URI;
    // const redirectUri = "http://localhost:3001/api/v1/auth/github/callback";
    const scope = "repo%20user%20write:org%20repo_deployment";
    const state = "123456789";

    const url = `${githubOauthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

    res.redirect(url);
});

router.get("/github/callback", async (req, res) => {
    const { code, state } = req.query;
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const redirectUri = process.env.GITHUB_CALLBACK_URI;
    // const redirectUri = "http://localhost:3001/api/v1/auth/github/callback";

    if (state !== "123456789") {
        res.send("Error: invalid source of request");
    }

    const url = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&redirect_uri=${redirectUri}`
    const response = await axios.post(url, {
        headers: {
            accept: "application/json",
        },
    });

    const accessToken = response.data.access_token;
    console.log(accessToken);
    console.log(response.data);
    res.send("Success");
    // res.redirect(`http://localhost:3000/homepage`);
});

export default router;