import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react';
import { AuthContext } from '../Context/AuthContext';
import { BeatLoader } from 'react-spinners';
  
  export default function SimpleCard() {
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({username: '', password: ''});
    const [isLoading, setIsLoading] = useState(false);
    const { logAuth } = useContext(AuthContext)

    const handleChange = e => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    let toast = useToast()
    let navigate = useNavigate();
    const handleClick = () => {
       setIsLoading(true)
        
 
    axios({    method: 'post',
        url: 'https://app.syntizen.com/api/sws/userauthentication',
        data : {
            username: userData.username,
            password: userData.password
        },
        headers: { 
            apikey: '0', 
            'Content-Type': 'application/json'
        }})
  
 
    .then((res)=>{
        if(res.data.respcode!=200){
            toast({
                title: 'Wrong login credentials.',
                description: "Enter correct email or password.",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
              setIsLoading(false)
        }
        else{
            toast({
                title: 'Welcome',
                description: "Login Successful",
                status: 'success',
                duration: 1000,
                isClosable: true,
              })
              logAuth(res.data.authkey)
              sessionStorage.setItem('authkey',res.data.authkey)
              setIsLoading(false)
              navigate('/consent',{ replace: true })
        }
    })
   
    .catch(function (error) {
     console.log(error);
    });
}


    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        className={`${isLoading ? "opague" : ''}`}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" name="username" onChange={handleChange}/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" name='password' onChange={handleChange}/>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button onClick={handleClick}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
        {/* {
        isLoading && <BeatLoader className='loading' size={12} color="black" />
      } */}
      </Flex>
    );
  }