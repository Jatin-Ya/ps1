import React from 'react';
import { Card, Box,CardContent, Button, Typography, List, ListItem, TextField, InputAdornment, Icon } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import DescriptionIcon from '@mui/icons-material/Description';

const handleDownload = () => {
  // Your download logic goes here
};

const Queries: React.FC = () => {
  return (
    <Card sx={{ border: '1px solid black', marginBottom: '20px' }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" padding="8px" marginLeft="10px">
        <Box display="flex" alignItems="center" sx={{ maxWidth: '150px', border: '1px solid black', padding: '4px' }}>
          WEBSITE.zip
          <Icon color="primary" sx={{ marginLeft: 'auto' }}>
            <DescriptionIcon />
          </Icon>
        </Box>
        <Button variant="contained" onClick={handleDownload}>
          Download File
        </Button>
      </Box>
      <Typography sx={{ fontSize: '15px', marginTop: '10px', paddingLeft: '20px' }}>
        <strong>AI Generated Response :</strong> <br/>
        <List sx={{ listStyleType: 'disc', lineHeight: '1' }}>
          <ListItem>Variables not defined as guided</ListItem>
          <ListItem>Model efficiency lower than guided</ListItem>
        </List>
      </Typography>
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
    </Card>
  );
};

export default Queries;
