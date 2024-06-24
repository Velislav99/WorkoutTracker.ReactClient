import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { trackingInContractBck } from './HomeAnimations';
import { Link } from 'react-router-dom';

export default function Home() {

    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        fetch('https://type.fit/api/quotes')
            .then(response => response.json())
            .then(data => {
                const randomIndex = Math.floor(Math.random() * data.length);
                const { text, author } = data[randomIndex];
                const newAuthor = author ? author.split(',')[0] : 'Unknown';
                setQuote(text);
                setAuthor(newAuthor);
            });
    }, []);

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
                <Typography variant="h3" gutterBottom fontFamily={'"Segoe UI"'} style={{ fontWeight: 'bold' }}>
                    {quote}
                </Typography>

                <Typography variant="h5" gutterBottom fontFamily={'"Segoe UI"'}>
                    - {author}
                </Typography>
                <Button variant='contained' LinkComponent={Link} to = '/start-workout'>Start your workout</Button>

            </Box>
        </Box>
    );
}
