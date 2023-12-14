import React, { useState } from 'react';
import { Card, CardContent, CardActions, Button, Grid, TextField, InputAdornment, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const Queries: React.FC = () => {
    const [active, setActive] = useState(false);

    const activeHandler = () => {
        setActive(!active);
    };

    return (
        <Card sx={{ border: '1px solid black' }}>
            <CardContent>
                <Typography sx={{ fontSize: '15px' }}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.<br />
                    <strong>AI Generated Response :</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente hic nemo exercitationem laboriosam?
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Button variant="outlined" color="primary" sx={{ borderRadius: 28, color: 'black', borderColor: 'black' }}>
                            Validate AI Response
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="secondary" sx={{ borderRadius: 28, color: 'black', borderColor: 'black' }} onClick={activeHandler}>
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
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        onClick={() => console.log('Submit')}
                                        sx={{ border: 'none', '&:hover': { border: 'none' } }}
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
