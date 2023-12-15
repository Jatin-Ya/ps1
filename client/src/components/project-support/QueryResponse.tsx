import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from "@mui/material";

type Props = {
    query: string,
    id: string,
    response: string
}

const Queries: React.FC<Props> = ({id, query, response}) => {
    return (
        <Card sx={{ border: '1px solid black'}}>
            <CardContent>
                <Typography sx={{ fontSize: '15px' }}>
                    {query}<br />
                    <strong>AI Generated Response :</strong>{response}
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
