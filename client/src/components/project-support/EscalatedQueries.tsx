import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardActions,
    Button,
    Grid,
    TextField,
    InputAdornment,
    Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import useQuery from "../../hooks/use-query";
import { useSelector } from "react-redux";
import { StoreData } from "../../store/store";

type Props = {
    query: string;
    id: string;
    response: string;
};

const Queries: React.FC<Props> = ({ id, query, response }) => {
    const [active, setActive] = useState(false);
    const [clientResponse, setClientResponse] = useState(response);
    const [answeredManualy, setAnsweredManualy] = useState(false);
    const [inputText, setInputText] = useState("");
    const projectId = useSelector<StoreData, string>(
        (state) => state.project.id
    );

    const { resolveQuery } = useQuery(projectId);

    const activeHandler = () => {
        setActive(!active);
    };

    useEffect(() => setClientResponse(response), [response]);

    return (
        <Card sx={{ border: "1px solid black" }}>
            <CardContent>
                <Typography sx={{ fontSize: "15px" }}>
                    {query}
                    <br />
                    <strong>AI Generated Response :</strong> {clientResponse}
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container justifyContent="space-between" spacing={1}>
                    <Grid item>
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{
                                borderRadius: 28,
                                color: "black",
                                borderColor: "black",
                            }}
                            onClick={() => resolveQuery(id, clientResponse)}
                        >
                            Validate Response
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            color="secondary"
                            sx={{
                                borderRadius: 28,
                                color: "black",
                                borderColor: "black",
                            }}
                            onClick={activeHandler}
                        >
                            Answer Manually
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
            {active && (
                <CardContent>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                        onChange={(e) => setInputText(e.target.value)}
                        value={inputText}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        onClick={() => {
                                            setClientResponse(inputText);
                                            setAnsweredManualy(true);
                                        }}
                                        sx={{
                                            border: "none",
                                            "&:hover": { border: "none" },
                                        }}
                                    >
                                        <SendIcon />
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                </CardContent>
            )}
        </Card>
    );
};

export default Queries;
