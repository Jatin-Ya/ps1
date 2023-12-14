import React, { useEffect, useState } from "react";
import { Typography, Grid,
     Box,Button,TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Divider, Stack } from "@mui/material";
import axios from "axios";
import Queries from "../components/project-support/EscalatedQueries";
import QueriesRes from "../components/project-support/QueryResponse";
import RepoVelner2 from "../components/project-support/quality-check/RepoVelner2";
import {useNavigate } from "react-router-dom";
import {
    Vulnerability
} from "../hooks/use-vulnerabilities";
import MandatoryQualityCheck from "../components/project-support/quality-check/MandatoryQualityCheck"; 
import QualityCheckCard from "../components/project-support/quality-check/QualityCheckCard";
const tableData = [
    {
        "id": 1,
        "member": "Mirabel",
        "role": "McGlone",
        "progress": 10
    },
    {
        "id": 2,
        "member": "Elbert",
        "role": "Standon",
        "progress": 30
    },
    {
        "id": 3,
        "member": "Shandy",
        "role": "Towersey",
        "progress": 24
    },
    {
        "id": 4,
        "member": "Bryce",
        "role": "Brehat",
        "progress": 22
    }
];
const miltableData = [
    {
        "id": 1,
        "milestone": "Milestone 1",
        "status": "COMPLETED - 1st November 2023",
    },
    {
        "id": 2,
        "milestone": "Milestone 2",
        "status": "COMPLETED - 15th November 2023",
       
    },
    {
        "id": 3,
        "milestone": "Milestone 3",
        "status": "ONGOING",
       
    },
    {
        "id": 4,
        "milestone": "Milestone 4",
        "status": "PENDING",
       
    },
    {
        "id": 5,
        "milestone": "Completed",
        "status": "Completed",
        
    }
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
    const [isProjectConnected, setIsProjectConnected] = useState(false);
    const projectId = "614b0b4b9b0b8e0016f2b0e1";
    const navigate = useNavigate();

    const repoVulnerabilitiesSelectHandler = (vulnerability: Vulnerability) => {
        navigate(`${location}/vulnerability-support`, {
            state: { vulnerability },
        });
    };

    useEffect(() => {
        const fetchProjectStatus = async () => {
            const response = await axios.get(`YOUR_API_URL/projects/${projectId}`);
            const project = response.data.project;
            const repoDetails = project?.repoDetails;

            if (!repoDetails) {
                setIsProjectConnected(false);
            } else {
                setIsProjectConnected(true);
            }
        }
        fetchProjectStatus();
    }, []);

    return (
        <>
        {/* Poject overview section ..........................................................*/}

            <Typography variant="h5" marginX={2} marginY={2}>
                PROJECT NAME
            </Typography>

            <Grid container spacing={0}>
                <Grid item xs mx={2}>
                    <Box>
                        <Typography component="h5">
                            PROJECT OVERVIEW
                        </Typography>
                        <Typography sx={{
                            fontSize: '15px',
                            lineHeight: '18px',
                            letterSpacing: '0em',
                            textAlign: 'left',
                        }}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam dignissimos fugiat, quisquam architecto voluptatibus id dicta consectetur eius dolores voluptas accusantium quas similique ipsum praesentium quo quod laudantium reiciendis porro!
                        </Typography>
                    </Box>

                    <Box my={2}>
                        <Typography component="h5">
                            TEAM
                        </Typography>
                        <TableContainer sx={{ maxHeight: '200px', marginBottom: '30px' }}>
                            <Table aria-label='simple table' stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Member</TableCell>
                                        <TableCell>Role</TableCell>
                                        <TableCell>Progress</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        tableData.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.member}</TableCell>
                                                <TableCell>{row.role}</TableCell>
                                                <TableCell>{row.progress}%</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Typography component="h5">
                            MILESTONES
                        </Typography>
                        <Typography sx={{fontSize: '12px'}}> ESTIMATED DEADLINE: 20th January 2024 </Typography>
                        <TableContainer sx={{ maxHeight: '400px', marginTop: '30px' }}>
                            <Table aria-label='simple table' stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>STATUS</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        miltableData.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.milestone}</TableCell>
                                               {(row.status =='Completed')?<div></div>:(<TableCell>{row.status}</TableCell>)}
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>

                <Divider orientation="vertical" flexItem sx={{ mx: 2, borderLeft: '1px solid black' }} />

                 {/* Escalated queries section ..........................................................*/}

                <Grid item xs>
                    <Typography component="h5">
                        ESCALATED QUERIES
                    </Typography>
                    <Box sx={{ margin: '4px', height: '450px', overflowY: 'auto' }}>
                        <Stack spacing={1}>
                          <Queries />
                            <Queries />
                         <Queries />
                </Stack>
                </Box>
                <Box marginTop="25px">
                <Typography>MANDATORY QUALITY CHECK</Typography>
                <MandatoryQualityCheck/>
                </Box>
               
                </Grid>

                <Divider orientation="vertical" flexItem sx={{ mx: 2, borderLeft: '1px solid black' }} />

                {/* AI support section ..........................................................*/}

                <Grid item xs mx={1}>
                <Button variant="contained"  sx={{ borderRadius: 28, width: '100%', backgroundColor: '#619FD8', color: 'white', marginBottom:'18px'}}>AI SUPPORT CHECKS</Button>
                <Stack spacing={4}>
                    <Box>
                    <Typography>QUERY RESPONSED</Typography>
                    <QueriesRes />
                    </Box>
                    <Box>
                    <Typography>VULNERABILITY DETECTED</Typography>
                     <Box sx={{ maxHeight: '200px', overflow: 'auto' }}>
                    <RepoVelner2 onSelect={repoVulnerabilitiesSelectHandler} vulnerabilities={DUMMY_VULNERABILITIES}/>
                    </Box>
                    </Box>
                    <Box>
                    <Typography>QUALITY CHECK</Typography>
                    <QualityCheckCard/>
                    </Box>
                </Stack>    
                </Grid>
            </Grid>

             {/* <ProjectSupportTabs value={ProjectSupportTabsEnum.ProjectDashboard} onChange={() => {
                console.log("Project dashboard tab clicked");

            }} />
            {
                isProjectConnected ? (
                    <div>
                        <h1>Project connected</h1>
                    </div>
                ) : (
                    <div>
                        <Typography variant="h5" align="center" sx={{ marginTop: "5%" }}>
                            Please connect a github repository to the project
                        </Typography>
                    </div>
                )
            } */}
        </>
    );
}

export default Dashboard;
