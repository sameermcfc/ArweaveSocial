import * as React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import ColorChooser from './ColorChooser';
import { TextField, Typography } from '@mui/material';

type Props = {
  setGradient: Function;
  ens: string;
  handleChange: Function
}



export default function CustomiseBar(props: Props){
  const {setGradient, ens, handleChange} = props;
    return (
        <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
          width: '35vw',
          minWidth: '600px',
          height: '35vh',
          minHeight: '280px'
        },
      }}
    >
            <Paper elevation={6}>
              <Typography 
              variant= "h5" 
              textAlign={'center'}
              marginTop={1}
              fontFamily={'Montserrat'}
              fontWeight={100}
              >
                Customise Your Card
                </Typography>
                
              <Box display = {'flex'} alignItems={'center'} justifyContent={'center'} gap= {3}>
                <ColorChooser
                setGradient = {setGradient}
                />
                <TextField label= "Edit ENS" value = {ens} onChange = {(e) => handleChange(e)}/>
            </Box>
            </Paper>
            
        </Box>
    )
}