import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import Add from '@mui/icons-material/Add';


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
  };

export default function Footer() {
    const [value, setValue] = React.useState(0);

    return (
        <div style={styles.container}>
            <Box sx={{ width: '80%',  }}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                    <BottomNavigationAction label="Start" icon={<Add />} />
                </BottomNavigation>
            </Box>
        </div>
    );
}