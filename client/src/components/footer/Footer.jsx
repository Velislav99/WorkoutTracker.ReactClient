import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import AddIcon from '@mui/icons-material/Add';

const styles = {
    container: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 1000, // Adjust the z-index if necessary
    },
    footer: {
        width: '100%', // Adjust the width of the footer as needed
        height: 80, // Adjust the height of the footer as needed
    },
    icon: {
        fontSize: 60, // Adjust the size of the icons as needed
    },
};

export default function Footer() {
    const [value, setValue] = React.useState(0);

    return (
        <div style={styles.container}>
            <Box sx={{ width: '100%', height: '100%' }}>
                <BottomNavigation
                    sx={styles.footer}
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Recents" icon={<RestoreIcon sx={styles.icon} />} />
                    <BottomNavigationAction label="Create" icon={<AddIcon sx={styles.icon} />} />
                </BottomNavigation>
            </Box>
        </div>
    );
}
