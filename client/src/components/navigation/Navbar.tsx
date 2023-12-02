import { Stack } from "@mui/material";
import MainAppbar from "./MainAppbar";

interface NavbarProps {
    children?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
    return (
        <Stack>
            <MainAppbar />
            {children}
        </Stack>
    );
};

export default Navbar;
