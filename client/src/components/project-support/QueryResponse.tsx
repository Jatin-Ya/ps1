import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from "@mui/material";

const Queries: React.FC = () => {
    return (
        <Card sx={{ border: '1px solid black'}}>
            <CardContent>
                <Typography sx={{ fontSize: '15px' }}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.<br />
                    <strong>AI Generated Response :</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente hic nemo exercitationem laboriosam?
                </Typography>
            </CardContent>
            <CardActions>
                        <Button variant="outlined" color="primary" sx={{ borderRadius: 28, color: 'black', borderColor: 'black' }}>
                                CHANGE RESPONSE
                        </Button>
            </CardActions>
        </Card>
    );
};

export default Queries;
