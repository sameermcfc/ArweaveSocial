import type { NextPage } from 'next'
import Button from '@mui/material/Button'
import Web3Modal from 'web3modal';
import { Web3Provider, JsonRpcSigner } from '@ethersproject/providers';
import CyberConnect, { Env } from '@cyberlab/cyberconnect';
import React, { useState, useCallback } from 'react';
import { useQuery} from "@apollo/client";
import { TextField, Typography, Box } from '@mui/material';
import { GET_ENS } from '../graphql/queries';
import AccountCard from '../components/AccountCard';
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import useEagerConnect from '../hooks/useEagerConnect';
import useInactiveListener from '../hooks/useInactiveListener';
import {injected} from '../connectors'
import useCyberConnect from '../hooks/useCyberConnect';
import CustomiseBar from '../components/CustomiseBar';
import DownloadTwoToneIcon from '@mui/icons-material/DownloadTwoTone';
import * as htmlToImage from 'html-to-image'
import html2canvas from 'html2canvas'

const Home: NextPage = () => {
  const context = useWeb3React<Web3Provider>()
  const [gradient, setGradient] = React.useState({color: '#000000', 
    image:'linear-gradient(315deg, #000000 0%, #414141 74%)'
    })
  const ref = React.useRef<HTMLDivElement>(null);  
  const [ens, setEns] = React.useState('');
  const { connector, library, chainId, account, activate, deactivate, active } = context;
  const { data, loading, error } = useQuery(GET_ENS, {
    variables: { account },
  });
  async function connect () {
    try {
      await activate(injected)
      console.log(data?.identity?.ens);
      setEns(data?.identity?.ens ? data?.identity?.ens: "No ENS");
      console.log(ens);
    }
    catch(ex){
      console.log(ex);
    }
  }
  async function disconnect () {
    try {
      deactivate()
      setEns("");
    }
    catch(ex){
      console.log(ex);
    }
  }
  function handleChange(e: any){
    setEns(e.target.value)
  }

  const handleDownload = useCallback(() => {
    if (ref.current === null) {
      return
    }

    htmlToImage.toPng(ref.current, { cacheBust: true, width: 600, height: 320, canvasWidth: 600 , canvasHeight: 320})
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = `${ens}ETHCard.png`
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [ref])

  const saveAs = (blob: string, fileName: string) =>{
    var elem = window.document.createElement('a');
    elem.href = blob;
    elem.download = fileName;
    elem.setAttribute('style', 'display: none;');
    (document.body || document.documentElement).appendChild(elem);
    if (typeof elem.click === 'function') {
      elem.click();
    } else {
      elem.target = '_blank';
      elem.dispatchEvent(new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      }));
    }
    URL.revokeObjectURL(elem.href);
    elem.remove()
  }

  const html2canvasDownload = useCallback(() => {
    if (ref.current === null) {
      return
    }
    html2canvas(ref.current, {windowWidth: 1000, windowHeight: 800, width: 600, height: 320 }).then((canvas) => {
      var image = canvas.toDataURL('image/png', 1.0);
      var fileName = "test";
      saveAs(image, fileName)
    })
  }, [ref])


  return (
    <div>
      <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      gap = {'1em'}
      marginTop={'2em'}
      >
       <Button 
          onClick={connect}
          size="small">
            Connect to Metamask
          </Button>
          {active ? <Typography>Connected with <b>{account}</b></Typography> : <Typography>Not connected</Typography>}
          <Button 
          onClick={disconnect}
          size="small">
            Disconnect
          </Button>
       <div ref={ref}>  
      <AccountCard
      address = {account === null
        ? '-'
        : account
        ? `${account}`
        : ''}
        ens = {ens ? ens: "No ENS" }
        loading = {loading}
        error = {error}
        gradient = {gradient}
      />
      </div> 
      <Button variant='contained'
      disabled = {!active}
      size = 'large'
      sx = {{
        backgroundImage: `${gradient.image}`,
        color: 'white'
      }}
      endIcon =  {<DownloadTwoToneIcon />}
      onClick = {html2canvasDownload}
      >
          Download Card
        </Button> 
      <CustomiseBar
        setGradient = {setGradient}
        ens = {ens}
        handleChange = {handleChange}
      />
      
    </Box>
        
    </div>
  )
}

export default Home
