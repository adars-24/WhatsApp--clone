import { useState } from 'react'
import { Box } from '@mui/material'

import Header from './Header'
import Search from './search'
import Conversations from './Conversations'
// import <Conversations> from './Conversations'
// import <Conversations> from '.'

const Menu = () => {

const [text, setText] = useState('');

  return (
    <Box>
<Header/>
<Search setText={setText}/>
<Conversations text={text}/>
    </Box>
  )
}

export default Menu