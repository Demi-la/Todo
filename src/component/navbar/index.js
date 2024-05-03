import { Box, useDisclosure } from '@chakra-ui/react';
import React, {useState} from 'react'
import Nav from './Nav'
import SideNav from './SideNav';

const Navbar = ({
  handleCategoryFilterChange,
  handleDeadlineFilterChange,
  setSearchTerm,
  searchTerm,
  addTask,
  
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
   const { isOpen, onOpen, onClose } = useDisclosure();

  const toggleSideBar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <Box>
      <Nav
        handleCategoryFilterChange={handleCategoryFilterChange}
        handleDeadlineFilterChange={handleDeadlineFilterChange}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        onOpen={onOpen}
        isOpen={isOpen}
        toggleSideBar={toggleSideBar}
        addTask={addTask}
        onClose={onClose}
      />
      <SideNav
        handleCategoryFilterChange={handleCategoryFilterChange}
        handleDeadlineFilterChange={handleDeadlineFilterChange}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        onOpen={onOpen}
        isOpen={isOpen}
        toggleSideBar={toggleSideBar}
        isSidebarOpen={isSidebarOpen}
        addTask={addTask}
        onClose={onClose}
      />
    </Box>
  );
};

export default Navbar
