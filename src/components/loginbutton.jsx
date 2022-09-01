import React from 'react'
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Loginbutton = (props) => {
    let navigate = useNavigate()
  return (
        <Button
        colorScheme="red"
        size="sm"
        onClick={props?.login}
      >
        Go to Homepage
      </Button>
  )
}

export default Loginbutton