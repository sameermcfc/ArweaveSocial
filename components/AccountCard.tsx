import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import EthLogo from "../public/eth.svg";
import CardChip from "../public/cardchip.svg";
import Planet from '../public/planet.svg'
import CircularProgress from '@mui/material/CircularProgress';

type Gradient = {
  color: string;
  image: string
}
type Props = {
    address: string;
    ens: string;
    loading: boolean;
    error?: any;
    gradient: Gradient;
}

const StyledCard = styled(Card)<{ gradient: Gradient}>`
    && { 
    position: relative;
    height: 320px;
    width: 600px;
    max-width: 80vw;
    max-height: 45vh;
    border: 1px solid grey;
    border-radius: 30px;
    background-color: ${p => p.gradient.color};
    background-image: ${p => p.gradient.image};
    }
    `


const StyledETHLogo = styled(EthLogo)`
  width: 50px;
`

const StyledCardChip = styled(CardChip)`
  width: 60px;
`


const StyledPlanet = styled(Planet)`
    
  position: absolute;
  right: 6%;
  top: 40%;
`


export default function AccountCard(props: Props){
    const {address, ens, loading, error, gradient} = props;
    return(
        <StyledCard
        gradient = {gradient}
        >
       {loading ?  <CircularProgress /> : 
        <CardContent sx= {{display: 'flex', flexDirection: 'column', gap: '1.5em' }}>
          <Box
          sx = {{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
          >
          <StyledETHLogo/>
          <StyledPlanet/>
          </Box>
          <Box
          sx = {{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
          >
          <Typography 
          variant="h5" color="text.secondary"
          sx= 
          {{maxWidth: '37vh' , 
          overflowWrap: 'break-word', 
          fontWeight: '900',
          letterSpacing: '5px',
          fontFamily: 'Montserrat',
          fontSize: '1.5em', 
          }}
          >
            {address}
          </Typography>
          <StyledCardChip/>
          </Box>
          <Box
          sx = {
            {
              display: 'flex',
              flexDirection: 'row',
              gap: '2em',
              marginTop: '1em'
            }
          }>
          <Typography
          variant = 'h5'
          color="text.secondary"
          sx = {
            {
              fontSize: '1.3em', 
              letterSpacing: '3px',
              textTransform: 'capitalize',
              fontWeight: '450',
              fontFamily: 'Montserrat'
            }
          }
          >
            {ens}
          </Typography>
          </Box>
        </CardContent>
        } 
        <CardActions>
          
        </CardActions>
      </StyledCard>
    )
}

