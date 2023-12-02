import { Box, Stack } from "@mui/material";
import MainAppbar from "./MainAppbar";

interface NavbarProps {
    children?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
    return (
        <Stack>
            <MainAppbar />
            <Box
                sx={{
                    height: "calc(100vh - 64px)",
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {children}
            </Box>
        </Stack>
    );
};

export default Navbar;
