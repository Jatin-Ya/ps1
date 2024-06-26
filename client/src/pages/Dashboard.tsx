import React, { useEffect, useState } from "react";
import {
    Typography,
    Grid,
    Box,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Divider,
    Stack,
} from "@mui/material";
import axios from "axios";
import Queries from "../components/project-support/EscalatedQueries";
import QueriesRes from "../components/project-support/QueryResponse";
import RepoVelner2 from "../components/project-support/quality-check/RepoVelner2";
import { useNavigate } from "react-router-dom";
import { Vulnerability } from "../hooks/use-vulnerabilities";
import MandatoryQualityCheck from "../components/project-support/quality-check/MandatoryQualityCheck";
import QualityCheckCard from "../components/project-support/quality-check/QualityCheckCard";
import { useSelector } from "react-redux";
import { ProjectData } from "../store/project/types";
import { StoreData } from "../store/store";
import AssignUserComponent from "../components/assign-user/AssignUserComponent";
import { useRoadmap } from "../hooks/use-roadmap";
const tableData = [
    {
        id: 1,
        member: "Mirabel",
        role: "McGlone",
        progress: 10,
    },
    {
        id: 2,
        member: "Elbert",
        role: "Standon",
        progress: 30,
    },
    {
        id: 3,
        member: "Shandy",
        role: "Towersey",
        progress: 24,
    },
    {
        id: 4,
        member: "Bryce",
        role: "Brehat",
        progress: 22,
    },
];
const miltableData = [
    {
        id: 1,
        milestone: "Milestone 1",
        status: "COMPLETED - 1st November 2023",
    },
    {
        id: 2,
        milestone: "Milestone 2",
        status: "COMPLETED - 15th November 2023",
    },
    {
        id: 3,
        milestone: "Milestone 3",
        status: "ONGOING",
    },
    {
        id: 4,
        milestone: "Milestone 4",
        status: "PENDING",
    },
    {
        id: 5,
        milestone: "Completed",
        status: "Completed",
    },
];

const DUMMY_VULNERABILITIES: Vulnerability[] = [
    {
        id: "1",
        title: "title1",
        description: "description1",
        severity: "high",
        status: "open",
        remediation: "remediation1",
        repo: "repo1",
        file: "file1",
        line: 1,
        commit: "commit1",
        date: "date1",
    },
    {
        id: "2",
        title: "title2",
        description: "description2",
        severity: "low",
        status: "open",
        remediation: "remediation2",
        repo: "repo2",
        file: "file2",
        line: 2,
        commit: "commit2",
        date: "date2",
    },
    {
        id: "3",
        title: "title3",
        description: "description3",
        severity: "medium",
        status: "open",
        remediation: "remediation3",
        repo: "repo3",
        file: "file3",
        line: 3,
        commit: "commit3",
        date: "date3",
    },
];

const Dashboard = () => {
    const project = useSelector<StoreData, ProjectData>(
        (state) => state.project
    );
    const navigate = useNavigate();

    const repoVulnerabilitiesSelectHandler = (vulnerability: Vulnerability) => {
        navigate(`${location}/vulnerability-support`, {
            state: { vulnerability },
        });
    };

    const membersData = project.users.map((user) => ({
        id: user.id,
        member: user.name,
        role: "User",
        progress: Math.floor(Math.random() * 100),
    }));

    const escalatedQueries = project.queries.filter(
        (query) => query.status === "escalated"
    );
    const resolvedQueries = project.queries.filter(
        (query) => query.status === "resolved"
    );

    const { roadmapData } = useRoadmap(project.id);
    const milestones = roadmapData.map((_, index) => ({
        id: index,
        milestone: `Milestone ${index + 1}`,
        status: "PENDING",
    }));

    return (
        <>
            {/* Poject overview section ..........................................................*/}

            <Typography variant="h5" marginX={2} marginY={2}>
                {project.title.toUpperCase()}
            </Typography>

            <Grid container spacing={0}>
                <Grid item xs mx={2}>
                    <Box>
                        <Typography component="h5">PROJECT OVERVIEW</Typography>
                        <Typography
                            sx={{
                                fontSize: "15px",
                                lineHeight: "18px",
                                letterSpacing: "0em",
                                textAlign: "left",
                            }}
                        >
                            {project.description}
                        </Typography>
                    </Box>

                    <Box my={2}>
                        <Typography component="h5">TEAM</Typography>
                        <TableContainer
                            sx={{ maxHeight: "200px", marginBottom: "30px" }}
                        >
                            <Table aria-label="simple table" stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ bgcolor: "white" }}>
                                            Member
                                        </TableCell>
                                        <TableCell sx={{ bgcolor: "white" }}>
                                            Role
                                        </TableCell>
                                        <TableCell sx={{ bgcolor: "white" }}>
                                            Progress
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {membersData.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.member}</TableCell>
                                            <TableCell>{row.role}</TableCell>
                                            <TableCell>
                                                {row.progress}%
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Typography component="h5">MILESTONES</Typography>
                        <Typography sx={{ fontSize: "12px" }}>
                            {" "}
                            ESTIMATED DEADLINE: 20th January 2024{" "}
                        </Typography>
                        <TableContainer
                            sx={{ maxHeight: "400px", marginTop: "30px" }}
                        >
                            <Table aria-label="simple table" stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            sx={{ bgcolor: "white" }}
                                        ></TableCell>
                                        <TableCell sx={{ bgcolor: "white" }}>
                                            STATUS
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                {project.aiSupport ? (
                                    <TableBody>
                                        {milestones.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>
                                                    {row.milestone}
                                                </TableCell>
                                                {row.status == "Completed" ? (
                                                    <div></div>
                                                ) : (
                                                    <TableCell>
                                                        {row.status}
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                ) : (
                                    <Typography variant="body1">
                                        AI Support not enabled
                                    </Typography>
                                )}
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>

                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ mx: 2, borderLeft: "1px solid black" }}
                />

                {/* Escalated queries section ..........................................................*/}

                <Grid item xs>
                    <Typography component="h5">ESCALATED QUERIES</Typography>
                    <Box
                        sx={{
                            margin: "4px",
                            height: "450px",
                            overflowY: "auto",
                        }}
                    >
                        <Stack spacing={1}>
                            {escalatedQueries.map((query) => (
                                <Queries
                                    key={query.id}
                                    id={query.id}
                                    query={query.query}
                                    response={query.solution}
                                />
                            ))}
                        </Stack>
                    </Box>
                    <Box marginTop="25px">
                        <Typography>MANDATORY QUALITY CHECK</Typography>
                        <MandatoryQualityCheck />
                    </Box>
                </Grid>

                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ mx: 2, borderLeft: "1px solid black" }}
                />

                {/* AI support section ..........................................................*/}

                <Grid item xs mx={1}>
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: 28,
                            width: "100%",
                            backgroundColor: "#619FD8",
                            color: "white",
                            marginBottom: "18px",
                        }}
                    >
                        AI SUPPORT CHECKS
                    </Button>
                    <Stack spacing={4}>
                        <Stack maxHeight={300} overflow="scroll" spacing={2}>
                            <Typography>QUERIES RESPONSED</Typography>
                            {resolvedQueries.map((query) => (
                                <QueriesRes
                                    query={query.query}
                                    id={query.id}
                                    key={query.id}
                                    response={query.solution}
                                />
                            ))}
                        </Stack>
                        <Box>
                            <Typography>VULNERABILITY DETECTED</Typography>
                            <Box sx={{ maxHeight: "200px", overflow: "auto" }}>
                                <RepoVelner2
                                    onSelect={repoVulnerabilitiesSelectHandler}
                                    vulnerabilities={DUMMY_VULNERABILITIES}
                                />
                            </Box>
                        </Box>
                        <Box>
                            <Typography>QUALITY CHECK</Typography>
                            <QualityCheckCard />
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
};

export default Dashboard;
