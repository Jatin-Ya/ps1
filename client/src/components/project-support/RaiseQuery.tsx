import {
  Button,
  FormControl,
  IconButton,
  List,
  ListItem,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useRef } from "react";
import useQuery from "../../hooks/use-query";
import { useSelector } from "react-redux";
import { StoreData } from "../../store/store";
import { ProjectData } from "../../store/project/types";

const RaiseQuery = () => {
  const queryInputRef = useRef<HTMLTextAreaElement>(null!);
  const solutionInputRef = useRef<HTMLTextAreaElement>(null!);

  const projectId = useSelector<StoreData, string>((state) => state.project.id);

  const project = useSelector<StoreData, ProjectData>((state) => state.project);

  const { escalateQuery, queries } = useQuery(projectId);

  console.log(queries);
  const previousQueries = queries
    ? queries.filter((query) => query.status !== "escalated")
    : [];
  const handleRaiseQuery = () => {
    solutionInputRef.current.value = `In a Node.js application, the index.js file is commonly used as an entry point or main file for the application. The naming convention "index.js" has no inherent functionality tied to it; it's simply a common convention that developers use for the main file of their Node.js modules or applications.

            Here are some reasons why index.js is frequently used as the main file:
            
            Convention over Configuration: Many developers follow certain naming conventions to make their projects more understandable and maintainable. Using index.js as the main entry point is a widely recognized convention in the Node.js ecosystem.
            
            Entry Point: When you're working with Node.js packages, especially when using tools like require() or import, the default behavior is to look for an index.js file if no specific file is specified. For example, if you have a directory named myModule and you want to import it in another file using require('./myModule'), Node.js will look for myModule/index.js by default.
            
            Clean Structure: Organizing your codebase with a clear entry point like index.js can make it easier for other developers (or even yourself, in the future) to understand where to start reading or making modifications.`;
  };

  const handleEscalate = () => {
    escalateQuery(queryInputRef.current.value, solutionInputRef.current.value);
  };

  const handleReopen = (query: {
    id: string;
    query: string;
    solution: string;
  }) => {
    queryInputRef.current.value = query.query;
    solutionInputRef.current.value = query.solution;
  };

  const previousQueriesList = previousQueries.map((query) => (
    <ListItem disablePadding>
      <Paper
        variant="outlined"
        sx={{ borderRadius: 4, padding: 2, margin: 1, width: "100%" }}
        key={query.id}
      >
        <Typography variant="body1" fontWeight="bold">
          {query.query}
        </Typography>
        <Typography variant="body1" mt={2}>
          {query.solution}
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          sx={{ borderRadius: 16, marginTop: 2 }}
          onClick={handleReopen.bind(this, query)}
        >
          Re-Open Query
        </Button>
      </Paper>
    </ListItem>
  ));

  return (
    <Stack
      direction={"row"}
      width={"100%"}
      height={"100%"}
      padding={2}
      spacing={4}
    >
      <Stack flex={1} spacing={4}>
        <FormControl>
          <Typography variant={"h5"}>Raise Query</Typography>
          <OutlinedInput
            inputRef={queryInputRef}
            rows={4}
            multiline
            endAdornment={
              <Stack direction={"column-reverse"} height={"100%"}>
                <IconButton onClick={handleRaiseQuery}>
                  <SendIcon color="primary" />
                </IconButton>
              </Stack>
            }
          />
        </FormControl>

        <FormControl>
          <Typography variant={"h5"}>Suggested Solutions</Typography>
          <OutlinedInput inputRef={solutionInputRef} rows={8} multiline />
        </FormControl>
        <Stack direction={"row"} spacing={2} justifyContent={"space-evenly"}>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ borderRadius: 16 }}
            onClick={handleEscalate}
          >
            Escalate
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            sx={{ borderRadius: 16 }}
            onClick={handleRaiseQuery}
            disabled={!project.aiSupport}
          >
            Re-Generate
          </Button>
        </Stack>
      </Stack>
      <Stack flex={1}>
        <Typography variant={"h5"}>Previous Queries</Typography>
        <List>{previousQueriesList}</List>
      </Stack>
    </Stack>
  );
};

export default RaiseQuery;
