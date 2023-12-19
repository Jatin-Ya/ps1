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
  List,
  ListItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  MenuItem,
} from "@mui/material";
import Queries from "../components/project-support/EscalatedQueries";
import QueriesRes from "../components/project-support/QueryResponse";
import RepoVelner2 from "../components/project-support/quality-check/RepoVelner2";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Vulnerability } from "../hooks/use-vulnerabilities";
import MandatoryQualityCheck from "../components/project-support/quality-check/MandatoryQualityCheck";
import QualityCheckCard from "../components/project-support/quality-check/QualityCheckCard";
import { useSelector } from "react-redux";
import { ProjectData } from "../store/project/types";
import { StoreData } from "../store/store";
import { useRoadmap } from "../hooks/use-roadmap";
import { useProject } from "../hooks/use-project";
import { useRepos } from "../hooks/use-repos";
import { getBackendBaseUrl } from "../utils/backendFunctions";
import axios from "axios";
import { useState } from "react";
import LinkIcon from "@mui/icons-material/Link";
import RepoVulnerabilities from "../components/project-support/quality-check/RepoVulnerabilities";
import RepoFiles from "../components/project-support/quality-check/RepoFiles";

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
  const project = useSelector<StoreData, ProjectData>((state) => state.project);
  const location = useLocation();

  const navigate = useNavigate();

  const repoVulnerabilitiesSelectHandler = (vulnerability: Vulnerability) => {
    navigate(`${location.pathname}/vulnerability-support`, {
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

  const estimateDeadline = new Date(
    Date.now() +
      milestones.filter((milestone) => milestone.status === "PENDING").length *
        1000 *
        60 *
        60 *
        24 *
        7
  );
  const estimateDeadlineString = estimateDeadline.toLocaleDateString();

  const email = useSelector<StoreData, string>((state) => state.user.email);
  const [selectedRepoId, setSelectedRepoId] = useState(
    project.repoDetails ? project.repoDetails.repoId : ""
  );

  const { repos } = useRepos(email);

  const connectRepoHandler = async () => {
    const repoToConnect = repos.find((repo) => repo.id === selectedRepoId);
    if (!repoToConnect) return;

    const projectId = project.id;

    const baseUrl = getBackendBaseUrl();

    try {
      const response = await axios.patch(`${baseUrl}/projects/connectRepo`, {
        id: projectId,
        repoName: repoToConnect.name,
        repoOwner: repoToConnect.owner,
        repoUrl: repoToConnect.url,
        repoId: repoToConnect.id,
      });
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }

    console.log({ connectRepo: repoToConnect });
  };

  const menuItems = repos.map((repo) => (
    <MenuItem key={repo.id} value={repo.id}>
      {repo.name}
    </MenuItem>
  ));

  return (
    <>
      {/* Poject overview section ..........................................................*/}

      <Typography variant="h5" marginX={2} marginY={2}>
        {project.title.toUpperCase()}
      </Typography>

      <Grid container spacing={0}>
        <Grid item xs mx={2}>
          <Box>
            <Typography component="h5" fontWeight="bold">
              PROJECT OVERVIEW
            </Typography>
            <Divider />
            <FormControl fullWidth size="small" sx={{ marginY: 1 }}>
              <InputLabel id="demo-simple-select-label">Repo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedRepoId}
                onChange={(e) => setSelectedRepoId(e.target.value)}
                label="Age"
                startAdornment={
                  <IconButton
                    size="small"
                    onClick={connectRepoHandler} //connect repo here
                  >
                    <LinkIcon />
                  </IconButton>
                }
              >
                {menuItems}
              </Select>
            </FormControl>
            <Divider />
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
            <TableContainer sx={{ maxHeight: "200px", marginBottom: "30px" }}>
              <Table aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ bgcolor: "white" }}>Member</TableCell>
                    <TableCell sx={{ bgcolor: "white" }}>Role</TableCell>
                    <TableCell sx={{ bgcolor: "white" }}>Progress</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {membersData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.member}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell>{row.progress}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Typography component="h5">MILESTONES</Typography>
            <Typography sx={{ fontSize: "12px" }}>
              {" "}
              ESTIMATED DEADLINE: {estimateDeadlineString}{" "}
            </Typography>
            <TableContainer sx={{ maxHeight: "400px", marginTop: "30px" }}>
              <Table aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ bgcolor: "white" }}></TableCell>
                    <TableCell sx={{ bgcolor: "white" }}>STATUS</TableCell>
                  </TableRow>
                </TableHead>
                {project.aiSupport ? (
                  <TableBody>
                    {milestones.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.milestone}</TableCell>
                        {row.status == "Completed" ? (
                          <div></div>
                        ) : (
                          <TableCell>{row.status}</TableCell>
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
          <Button
            variant="contained"
            sx={{
              borderRadius: 28,
              width: "100%",
              backgroundColor: "#619FD8",
              color: "white",
              marginBottom: "18px",
              "&:hover": {
                backgroundColor: "#619FD8",
                color: "white",
                boxShadow: "none",
              },
            }}
            disableElevation
            disableRipple
          >
            AI SUPPORT CHECKS
          </Button>
          <Stack spacing={4}>
            <Box>
              <Typography>VULNERABILITY DETECTED</Typography>
              <Box sx={{ maxHeight: "400px", overflow: "auto" }}>
                <RepoVulnerabilities
                  onSelect={repoVulnerabilitiesSelectHandler}
                />
              </Box>
            </Box>
            <Stack maxHeight={300} overflow="scroll" spacing={2}>
              <Typography>QUERIES RESPONSED</Typography>
              <List>
                {resolvedQueries.map((query) => (
                  <ListItem disablePadding sx={{ marginY: 1 }}>
                    <QueriesRes
                      query={query.query}
                      id={query.id}
                      key={query.id}
                      response={query.solution}
                    />
                  </ListItem>
                ))}
              </List>
            </Stack>
            <Typography component="h5">ESCALATED QUERIES</Typography>
            <Box
              sx={{
                margin: "4px",
                maxHeight: "450px",
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
          </Stack>
        </Grid>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ mx: 2, borderLeft: "1px solid black" }}
        />

        {/* AI support section ..........................................................*/}

        <Grid item xs mx={1}>
          <Box marginTop="25px">
            <Box>
              <Typography>QUALITY CHECK</Typography>
              {/* <QualityCheckCard />
               */}
              <RepoFiles onSelect={() => {}} />
            </Box>
            {/* <Typography>MANDATORY QUALITY CHECK</Typography>
            <MandatoryQualityCheck /> */}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
