import React from 'react';
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  Box,
  Button,
  Text,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { IoIosSearch } from 'react-icons/io';
import { FaTimes } from 'react-icons/fa';
import AddTodo from '../modal/AddTodo';

const SideNav = ({
  handleCategoryFilterChange,
  handleDeadlineFilterChange,
  setSearchTerm,
  searchTerm,
  onOpen,
  isOpen,
  onClose,
  isSidebarOpen,
  toggleSideBar,
  addTask
}) => {
  const sideNavStyles = {
    width: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s ease',
  };
  return (
    <Box
      style={sideNavStyles}
      position={'fixed'}
      top={'0'}
      left={'0'}
      zIndex="50"
      display={{ base: isSidebarOpen ? 'flex' : 'none', lg: 'flex' }}
      transition="all 300ms"
    >
      {isSidebarOpen && (
        <Box
          gap={'30%'}
          background={'#352121'}
          boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
          color={'white'}
          p={'1rem'}
          w={{ base: '100vw', md: '50vw' }}
          h="100vh"
        >
          <Flex justifyContent={'space-between'}>
            <Box fontSize={'1.5rem'} fontWeight={'700'}>
              <Text>TODO LIST</Text>
            </Box>
            <Box>
              <Button onClick={toggleSideBar}>
                {' '}
                <FaTimes className="text-[#746c6c]  text-[1.5rem] mt-4" />
              </Button>
            </Box>
          </Flex>
          <Box gap={'5rem'} mt={'1rem'}>
            <Menu background={'#352121'}>
              <MenuButton color="white" fontSize={'1.3rem'} fontWeight={'600'}>
                Category <ChevronDownIcon />
              </MenuButton>
              <MenuList color={'white'} background={'#352121'}>
                <MenuItem
                  onClick={() => handleCategoryFilterChange('All')}
                  background={'#352121'}
                >
                  All
                </MenuItem>
                <MenuItem
                  onClick={() => handleCategoryFilterChange('Work')}
                  background={'#352121'}
                >
                  Work
                </MenuItem>
                <MenuItem
                  onClick={() => handleCategoryFilterChange('Personal')}
                  background={'#352121'}
                >
                  Personal
                </MenuItem>
                <MenuItem
                  onClick={() => handleCategoryFilterChange('Health')}
                  background={'#352121'}
                >
                  Health
                </MenuItem>
                <MenuItem
                  onClick={() => handleCategoryFilterChange('Family')}
                  background={'#352121'}
                >
                  Family
                </MenuItem>
                <MenuItem
                  onClick={() => handleCategoryFilterChange('Finance')}
                  background={'#352121'}
                >
                  Finance
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Box mt={'1rem'}>
            <Menu background={'#352121'}>
              <MenuButton color="white" fontSize={'1.3rem'} fontWeight={'600'}>
                Deadline <ChevronDownIcon />
              </MenuButton>
              <MenuList color={'white'} background={'#352121'}>
                <MenuItem
                  onClick={() => handleDeadlineFilterChange('All')}
                  background={'#352121'}
                >
                  All
                </MenuItem>
                <MenuItem
                  onClick={() => handleDeadlineFilterChange('Passed')}
                  background={'#352121'}
                >
                  Passed
                </MenuItem>
                <MenuItem
                  onClick={() => handleDeadlineFilterChange('Today')}
                  background={'#352121'}
                >
                  Today
                </MenuItem>
                <MenuItem
                  onClick={() => handleDeadlineFilterChange('Tomorrow')}
                  background={'#352121'}
                >
                  Tomorrow
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Box position={'relative'} mt={'1rem'}>
            <Input
              placeholder="search"
              onChange={e => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <Box
              position={'absolute'}
              right={'0'}
              top={'0.7rem'}
              fontSize={'1.3rem'}
              pr={'0.6rem'}
            >
              <IoIosSearch />
            </Box>
          </Box>
          <Button onClick={onOpen} mt={'1rem'}>
            Add Task
          </Button>
          <AddTodo isOpen={isOpen} onClose={onClose} addTask={addTask} />
        </Box>
      )}
    </Box>
  );
};

export default SideNav;
