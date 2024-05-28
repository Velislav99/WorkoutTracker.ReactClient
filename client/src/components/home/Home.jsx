

import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';


export default function Home() {

    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        fetch('https://type.fit/api/quotes')
            .then(response => {
                return response.json();
            })
            .then(data => {
                const randomIndex = Math.floor(Math.random() * data.length);
                const { text, author } = data[randomIndex];
                const newAuthor = author.split(',')[0];
                setQuote(text);
                setAuthor(newAuthor);

            })
    }, [])

    return (

        
        <Box position="relative" width="100%" height="100vh">
            <img
                src="../../images/ArnoldCover3.jpg"
                alt="Full Screen Image"
                style={{ width: '100%', height: '100%', objectFit: 'cover',  }}
            />
            <Box
                position="absolute"
                top="50%"
                left="20px"
                transform="translate(-50%, -50%)"
                sx={{ textAlign: 'left', 
                color: 'primary.main', display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                maxWidth: '600px'}}
            >
                <Typography variant="h3" gutterBottom fontFamily={'"Segoe UI"'} style={{ fontWeight: 'bold' }}>
                    {quote}
                </Typography>
                
                <Typography variant="h5" gutterBottom>
                    - {author}
                </Typography>
            </Box>
        </Box>
    
    );
}

