import {
  Flex,
  Heading,
  Input,
  Button,
  Image,
  Text,
  AspectRatio,
  Box,
} from '@chakra-ui/react';
import Map from './Map';

import { ChevronRightIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import banner from '../images/pattern-bg.png';
import React from 'react';
import { useMap } from 'react-leaflet';

const IpTracker = () => {
  const [input, setInput] = useState('');
  const [location, setLocation] = useState(null);
  const [sendLocation, setSendLocation] = useState(null);
  const [sendInput, setSendInput] = useState(null);
  const [boolean, setBoolean] = useState(true);

  const ipKey = '3466e3b6e512458d95767e7fb242b8ec';

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${ipKey}&ip=${
          sendInput || '181.81.52.122'
        }`
      );
      const dataJson = await data.json();
      console.log('dataJson', dataJson);

      setLocation(dataJson);
    };
    fetchData();
  }, [sendInput]);

  const dateObj = new Date(location?.time_zone?.current_time_unix * 1000);
  const utcString = dateObj.toUTCString();
  const time = utcString.slice(-11, -4);

  const endLocation = () => {
    setBoolean(false);
    setSendInput(input);
  };

  return (
    <>
      <Flex
        justifyContent="flex-start"
        paddingTop="20px"
        alignItems="center"
        flexDir="column"
        height="200px"
        backgroundSize="cover"
        backgroundImage={banner}
        backgroundPosition="center"
        position="relative"
      >
        <Heading>IP Addres Tracker</Heading>
        <Flex w="612px" paddingTop="20px">
          <Input
            type="text"
            placeholder="Search for any IP addres or domain"
            value={input}
            onChange={e => setInput(e.target.value)}
          ></Input>
          <Button onClick={endLocation}>
            <ChevronRightIcon fontSize="25px" />
          </Button>
        </Flex>
        <Flex
          gap="45px"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          top="80%"
          backgroundColor="white"
          padding="10px"
          rounded="10px"
          zIndex={999}
        >
          <Flex flexDir="column" justifyContent="center" alignItems="center">
            <Text>IP ADDRES</Text>
            <Heading as="h4" fontSize="20px">
              {location?.ip}
            </Heading>
          </Flex>
          <Flex flexDir="column" justifyContent="center" alignItems="center">
            <Text>LOCATION</Text>
            <Heading as="h4" fontSize="20px">
              {location?.country_name}, <br />
              {location?.country_capital}
            </Heading>
          </Flex>
          <Flex flexDir="column" justifyContent="center" alignItems="center">
            <Text>TIMEZONE</Text>
            <Heading as="h4" fontSize="20px">
              GMT - {time}
            </Heading>
          </Flex>
          <Flex flexDir="column" justifyContent="center" alignItems="center">
            <Text>ISP</Text>
            <Heading as="h4" fontSize="20px">
              {location?.isp}
            </Heading>
          </Flex>
        </Flex>
      </Flex>
      {location && <Map location={location} />}
    </>
  );
};

export default IpTracker;
