import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
 import TodoList from './component/TodoList';

function App() {
  return (
    <ChakraProvider theme={theme}>
     <TodoList/>
    </ChakraProvider>
  );
}

export default App;
