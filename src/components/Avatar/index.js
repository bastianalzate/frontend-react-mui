import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

export default function LetterAvatars({letter, color="purple"}) {
  return (
    <Stack direction="row" spacing={2}>
        {   
            letter && color == "orange" ? (
                <Avatar sx={{ bgcolor: deepOrange[500] }}>{letter}</Avatar>
            ) :  (
                <Avatar sx={{ bgcolor: deepPurple[500] }}>{letter}</Avatar>
            )
        }
      
    </Stack>
  );
}