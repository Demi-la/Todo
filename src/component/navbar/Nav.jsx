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
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { IoIosSearch } from 'react-icons/io';
import { FcMenu } from 'react-icons/fc';
import SideNav from './SideNav';
import AddTodo from '../modal/AddTodo';

const Nav = ({
  handleCategoryFilterChange,
  handleDeadlineFilterChange,
  setSearchTerm,
  searchTerm,
  onOpen,
  isOpen,
  onClose,
  isSidebarOpen,
  toggleSideBar,
  addTask,
}) => {
  return (
    <Box>
      <Flex
        justifyContent={'space-between'}
        background={'#352121'}
        boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
        zIndex={999}
        p={{ base: '1rem', lg: '2rem' }}
        color={'white'}
      >
        <Box fontSize={{ base: '1.4rem', lg: '1.5rem' }} fontWeight={'700'}>
          TODO LIST
        </Box>
        <Flex gap={'5rem'} display={{ base: 'none', lg: 'flex' }}>
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
          <Box position={'relative'}>
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
          <Button onClick={onOpen}>Add Task</Button>
          <AddTodo isOpen={isOpen} onClose={onClose} addTask={addTask} />
        </Flex>
        <Box display={{ base: 'block', lg: 'none' }}>
          <Button onClick={toggleSideBar} fontSize={'1.4rem'}>
            {isSidebarOpen ? (
              <Box>
                <SideNav isSidebarOpen={toggleSideBar} />
              </Box>
            ) : (
              <FcMenu />
            )}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Nav;
