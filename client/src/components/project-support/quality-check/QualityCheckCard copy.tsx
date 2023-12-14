import React from 'react';
import { Card,Box,Icon, CardContent, List, ListItem, Button, Typography } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';

const Queries: React.FC = () => {
    return (
        <Card sx={{ border: '1px solid black', marginBottom: '20px' }}>
            <CardContent>
            <Box display="flex" alignItems="center" sx={{ maxWidth: '150px', border: '1px solid black', padding: '4px'}} marginBottom="10px" >
          WEBSITE.zip
          <Icon color="primary" sx={{ marginLeft: 'auto' }}>
            <DescriptionIcon />
          </Icon>
        </Box>
                <Typography sx={{ fontSize: '15px' }}> 
                    <List sx={{ listStyleType: 'disc', paddingLeft: '20px', lineHeight: '0.5' }}>
                        <ListItem sx={{ display: 'list-item' }}>
                            Variables not defined as guided
                        </ListItem>
                        <ListItem sx={{ display: 'list-item' }}>
                            Model efficiency lower than guided
                        </ListItem>
                    </List>
                </Typography>
                <Button variant="outlined" color="primary" sx={{ borderRadius: 28, color: 'black', borderColor: 'black' }}>
                            Validate AI Response
                </Button>
            </CardContent>
            
        </Card>
    );
};

export default Queries;
