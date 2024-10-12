import { Button, Typography } from '@mui/material';
import React from 'react';
import { Box } from '@mui/system';
import { trackingInContractBck } from './HomeAnimations';
import { Link } from 'react-router-dom';
import quotes from '../../quotes.json';

export default function Home() {
    // Get a random quote from the quotes array
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    // Determine font size based on quote length
    const isLongQuote = randomQuote.quote.length > 100;
    const quoteFontSize = isLongQuote ? '1.5rem' : '2.5rem';

    return (
        <Box position="relative" width="100%" height="100vh">
            <img
                src="https://as2.ftcdn.net/v2/jpg/08/09/48/25/1000_F_809482598_iFY3RUsAXrpaJAuFh2UijLuLhGMQYJDb.jpg"
                alt="Full Screen Image"
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 1 }}
            />
            <Box
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                bgcolor="rgba(0, 0, 0, 0.5)"
                zIndex="2"
            />
            <Box
                position="absolute"
                top="20%"
                left="10%"
                transform="translate(0, -50%)"
                sx={{
                    textAlign: 'left',
                    color: 'white',
                    flexDirection: 'column',
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: '600px',
                    animation: `${trackingInContractBck} 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) 0.5s both`,
                    zIndex: 3,
                }}
            >
                <Typography
                    variant="h3"
                    gutterBottom
                    fontFamily={'"Segoe UI"'}
                    style={{
                        fontWeight: 'bold',
                        marginRight: '3rem',
                        fontSize: quoteFontSize
                    }}
                >
                    {randomQuote.quote}
                </Typography>
                <Typography
                    variant="h6"
                    gutterBottom
                    fontFamily={'"Segoe UI"'}
                    style={{
                        fontStyle: 'italic',
                        marginRight: '3rem'
                    }}
                >
                    – {randomQuote.author}
                </Typography>

                <Button variant='contained' style={{marginRight:'3rem'}} LinkComponent={Link} to='/start-workout'>Start your workout</Button>
            </Box>
        </Box>
    );
}
