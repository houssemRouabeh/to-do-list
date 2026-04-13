import React, { useRef, useState, useCallback } from 'react';
import {
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  useColorModeValue,
  Box,
  Tr,
  Td,
  Tbody,
  Table,
  TableContainer,
  Checkbox,
  Badge,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

export default function Tasks() {
  const inputRef = useRef(null);
  const [nextId, setNextId] = useState(0);
  const [toDoList, setToDoList] = useState([]);
  const [finishedList, setFinishedList] = useState([]);
  const [deletedList, setDeletedList] = useState([]);
  const [visibleTasks, setVisibleTasks] = useState(4);
  const [visibleFinished, setVisibleFinished] = useState(4);
  const [visibleDeleted, setVisibleDeleted] = useState(4);

  const handleAddTask = useCallback(() => {
    const value = inputRef.current?.value?.trim();
    if (!value) {
      alert('Please write a task before');
      return;
    }
    setToDoList(prev => [...prev, { id: nextId, task: value }]);
    setNextId(prev => prev + 1);
    inputRef.current.value = '';
  }, [nextId]);

  const handleCompleteTask = useCallback(index => {
    setFinishedList(prev => [...prev, toDoList[index]]);
    setToDoList(prev => prev.filter((_, i) => i !== index));
  }, [toDoList]);

  const handleDeleteTask = useCallback(index => {
    setDeletedList(prev => [...prev, toDoList[index]]);
    setToDoList(prev => prev.filter((_, i) => i !== index));
  }, [toDoList]);

  const bgCard = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.200');
  const inputBg = useColorModeValue('gray.100', 'gray.600');
  const inputFocusBg = useColorModeValue('gray.200', 'gray.800');
  const columnTextColor = useColorModeValue('gray.600', 'gray.800');

  return (
    <>
      <Flex>
        <Stack
          boxShadow={'2xl'}
          bg={bgCard}
          rounded={'xl'}
          p={10}
          spacing={8}
          align={'center'}
        >
          <Stack align={'center'} spacing={2}>
            <Heading
              textTransform={'uppercase'}
              fontSize={'3xl'}
              color={textColor}
            >
              To Do List
            </Heading>
            <Text fontSize={'lg'} color={textColor}>
              Enter a task and click save !
            </Text>
          </Stack>
          <Stack
            spacing={1}
            direction={{ base: 'column', md: 'row' }}
            w={'full'}
          >
            <Input
              type={'text'}
              placeholder={'write your task here'}
              color={textColor}
              bg={inputBg}
              rounded={'full'}
              border={0}
              _focus={{ bg: inputFocusBg, outline: 'none' }}
              ref={inputRef}
            />
            <Button
              bg={'blue.400'}
              rounded={'full'}
              color={'white'}
              flex={'1 0 auto'}
              _hover={{ bg: 'blue.500' }}
              _focus={{ bg: 'blue.500' }}
              onClick={handleAddTask}
            >
              Save me
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex>
        <Stack direction={['column', 'row']} spacing="24px">
          <Box w="350px" h="auto" bg="yellow.200">
            <Text
              textTransform={'uppercase'}
              fontSize={'2xl'}
              color={columnTextColor}
            >
              New Tasks
              <Badge ml="1" mb={'1'} colorScheme="yellow.200" fontSize="1em">
                {toDoList.length}
              </Badge>
            </Text>
            <TableContainer>
              <Table variant="striped" fontSize={'sm'} w={'auto'}>
                <Tbody>
                  {toDoList.slice(0, visibleTasks).map((item, index) => (
                    <Tr key={item.id}>
                      <Td w={'90%'}>{item.task}</Td>
                      <Td w={'5%'}>
                        <Checkbox
                          pr={4}
                          mt={1}
                          colorScheme="green"
                          isInvalid
                          onChange={() => handleCompleteTask(index)}
                        />
                        <DeleteIcon
                          boxSize={4}
                          color="red.500"
                          cursor={'pointer'}
                          onClick={() => handleDeleteTask(index)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            {toDoList.length > visibleTasks && (
              <Button
                colorScheme="blue"
                size={'sm'}
                ml={'250px'}
                variant="link"
                onClick={() => setVisibleTasks(v => v + 4)}
              >
                Show More
              </Button>
            )}
          </Box>

          <Box w="350px" h="auto" bg="green.200">
            <Text
              textTransform={'uppercase'}
              fontSize={'2xl'}
              color={columnTextColor}
            >
              Finished Tasks
              <Badge ml="1" mb={'1'} colorScheme="yellow.200" fontSize="1em">
                {finishedList.length}
              </Badge>
            </Text>
            <TableContainer>
              <Table variant="striped" fontSize={'sm'}>
                <Tbody>
                  {finishedList.slice(0, visibleFinished).map(item => (
                    <Tr key={item.id}>
                      <Td w={'100%'}>{item.task}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            {finishedList.length > visibleFinished && (
              <Button
                colorScheme="blue"
                size={'sm'}
                ml={'250px'}
                variant="link"
                onClick={() => setVisibleFinished(v => v + 4)}
              >
                Show More
              </Button>
            )}
          </Box>

          <Box w="350px" h="auto" bg="red.200">
            <Text
              textTransform={'uppercase'}
              fontSize={'2xl'}
              color={columnTextColor}
            >
              Deleted Tasks
              <Badge ml="1" mb={'1'} colorScheme="yellow.200" fontSize="1em">
                {deletedList.length}
              </Badge>
            </Text>
            <TableContainer>
              <Table variant="striped" fontSize={'sm'}>
                <Tbody>
                  {deletedList.slice(0, visibleDeleted).map(item => (
                    <Tr key={item.id}>
                      <Td w={'100%'}>{item.task}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            {deletedList.length > visibleDeleted && (
              <Button
                colorScheme="blue"
                size={'sm'}
                ml={'250px'}
                variant="link"
                onClick={() => setVisibleDeleted(v => v + 4)}
              >
                Show More
              </Button>
            )}
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
