import * as React from 'react'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import styled from 'styled-components';


type Props = {
    setGradient: Function;
  }

const gradient = {
    "retire" : {
        'color': '#000000',
        'image': 'linear-gradient(315deg, #000000 0%, #414141 74%)'
    },
    "genghis" : {
        'color': '#637081',
        'image': 'linear-gradient(315deg, #637081 0%, #7c98b3 74%)'
    },
    "suspects" : {
        'color': '#000000',
        'image': 'linear-gradient(315deg, #000000 0%, #7f8c8d 74%)'
    },
    "pyramid" : {
        'color': '#ba9a8e',
        'image': 'linear-gradient(315deg, #ba9a8e 0%, #96705b 74%)'
    },
    
}

const ColorBox = styled(Box) `
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap : 1em;
    margin-top: 1em;
`


export default function ColorChooser(props: Props){
    const {setGradient} = props;
    return (
        <Box display = 'flex' flexDirection = 'column'>
        <ColorBox>
            <Button variant = 'contained' sx = {{
                width: '100%',
                color: 'white',
                textShadow: '2px 4px 3px rgba(0,0,0,0.2)',
                backgroundColor: '#000000',
                backgroundImage: 'linear-gradient(315deg, #000000 0%, #414141 74%)'
            }}
            onClick={() => {setGradient(gradient.retire)}}
            >
            Early Retirement (Default)
            </Button>
            <Button variant = 'contained' sx = {{
                width: '100%',
                color: 'white',
                textShadow: '2px 4px 3px rgba(0,0,0,0.2)',
                backgroundColor: '#637081',
                backgroundImage: 'linear-gradient(315deg, #637081 0%, #7c98b3 74%)'
            }}
            onClick={() => {setGradient(gradient.genghis)}}
            >
            Relative of Genghis Khan
            </Button>
            <Button variant = 'contained' sx = {{
                width: '100%',
                color: 'white',
                textShadow: '2px 4px 3px rgba(0,0,0,0.2)',
                backgroundColor: '#000000',
                backgroundImage: 'linear-gradient(315deg, #000000 0%, #7f8c8d 74%)'
            }}
            onClick={() => {setGradient(gradient.suspects)}}
            >
            Usual Suspects
            </Button>
            <Button variant = 'contained' sx = {{
                width: '100%',
                color: 'white',
                textShadow: '2px 4px 3px rgba(0,0,0,0.2)',
                backgroundColor: '#ba9a8e',
                backgroundImage: 'linear-gradient(315deg, #ba9a8e 0%, #96705b 74%)'
            }}
            onClick={() => {setGradient(gradient.pyramid)}}
            >
            Pyramid Brick
            </Button>
        </ColorBox>
        </Box>
    )
}