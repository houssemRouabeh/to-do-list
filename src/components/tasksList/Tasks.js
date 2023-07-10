import React, { useRef, useState } from 'react';
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
import { DeleteIcon, InfoIcon } from '@chakra-ui/icons';
export default function Tasks() {
  const inputRef = useRef('');
  const checkRef = useRef(false);
  const [id, setId] = useState(0);
  const [toDoList, setToDoList] = useState([]);
  const [finishedList, setFinishedList] = useState([]);
  const [deletedList, setDeletedList] = useState([]);
  const [listCount, setListCount] = useState(0);
  const [finishedCount, setFinishedCount] = useState(0);
  const [deletedCount, setDeletedCount] = useState(0);
  const [moreTasks, setMoreTasks] = useState(4);
  const [tasksVisibility, setTaskVisibility] = useState('hidden');
  const [moreFinished, setMoreFinished] = useState(4);
  const [finishedVisibility, setFinishedVisibility] = useState('hidden');
  const [moreDeleted, setMoreDeleted] = useState(4);
  const [deletedVisibility, setDeletedVisibility] = useState('hidden');
  const [showedTasks, setSowedTasks] = useState(8);
  const [showedFinishedTasks, setSowedFinishedTasks] = useState(8);
  const [showedDeletedTasks, setSowedDeletedTasks] = useState(8);

  const handleClick = () => {
    if (inputRef.current.value) {
      setId(id + 1);
      setListCount(listCount + 1);
      setToDoList([
        ...toDoList,
        {
          id: id,
          task: inputRef.current.value,
        },
      ]);
      inputRef.current.value = '';
      listCount < 4 ? setTaskVisibility('hidden') : setTaskVisibility('true');
    } else {
      alert('Please write a task before');
    }
  };
  const handCheckBoxClick = () => {
    const checkedId = checkRef.current.id;
    const copiedTask = toDoList.slice(checkedId, checkedId + 1);
    setListCount(listCount - 1);
    setFinishedCount(finishedCount + 1);

    setFinishedList([
      ...finishedList,
      { id: copiedTask[0].id, task: copiedTask[0].task },
    ]);
    toDoList.splice(checkedId, 1);
    console.log(listCount);
    listCount < 6 ? setTaskVisibility('hidden') : setTaskVisibility('true');
    finishedCount < 4
      ? setFinishedVisibility('hidden')
      : setFinishedVisibility('true');
  };
  const handleDeletedtasks = () => {
    const checkedId = checkRef.current.id;
    const copiedTask = toDoList.slice(checkedId, checkedId + 1);
    setListCount(listCount - 1);
    setDeletedCount(deletedCount + 1);
    setDeletedList([
      ...deletedList,
      { id: copiedTask[0].id, task: copiedTask[0].task },
    ]);
    toDoList.splice(checkedId, 1);
    console.log(listCount);
    listCount < 6 ? setTaskVisibility('hidden') : setTaskVisibility('true');
    deletedCount < 4
      ? setDeletedVisibility('hidden')
      : setDeletedVisibility('true');
  };
  const handleMoretasks = () => {
    setMoreTasks(moreTasks + 4);
    setSowedTasks(showedTasks + 4);
    console.log(listCount);
    console.log(showedTasks);
    showedTasks >= listCount
      ? setTaskVisibility('hidden')
      : setTaskVisibility('true');
  };
  const handleMoreFinished = () => {
    setMoreFinished(moreFinished + 4);
    setSowedFinishedTasks(showedFinishedTasks + 4);
    showedFinishedTasks >= finishedCount
      ? setFinishedVisibility('hidden')
      : setFinishedVisibility('true');
  };
  const handleMoreDeleted = () => {
    setMoreDeleted(moreDeleted + 4);
    setSowedDeletedTasks(showedDeletedTasks + 4);
    showedDeletedTasks >= deletedCount
      ? setDeletedVisibility('hidden')
      : setDeletedVisibility('true');
  };

  return (
    <>
      <Flex>
        <Stack
          boxShadow={'2xl'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          p={10}
          spacing={8}
          align={'center'}
        >
          <Stack align={'center'} spacing={2}>
            <Heading
              textTransform={'uppercase'}
              fontSize={'3xl'}
              color={useColorModeValue('gray.800', 'gray.200')}
            >
              To Do List
            </Heading>
            <Text
              fontSize={'lg'}
              color={useColorModeValue('gray.800', 'gray.200')}
            >
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
              color={useColorModeValue('gray.800', 'gray.200')}
              bg={useColorModeValue('gray.100', 'gray.600')}
              rounded={'full'}
              border={0}
              _focus={{
                bg: useColorModeValue('gray.200', 'gray.800'),
                outline: 'none',
              }}
              ref={inputRef}
            />
            <Button
              bg={'blue.400'}
              rounded={'full'}
              color={'white'}
              flex={'1 0 auto'}
              _hover={{ bg: 'blue.500' }}
              _focus={{ bg: 'blue.500' }}
              onClick={handleClick}
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
              color={useColorModeValue('gray.600', 'gray.800')}
            >
              New Tasks
              <Badge ml="1" mb={'1'} colorScheme="yellow.200" fontSize="1em">
                {listCount}
              </Badge>
            </Text>

            <TableContainer>
              <Table variant="striped" fontSize={'sm'} w={'auto'}>
                <Tbody>
                  {toDoList.slice(0, moreTasks).map(item => {
                    return (
                      <Tr key={item.id}>
                        <Td w={'90%'}>{item.task}</Td>
                        <Td w={'5%'}>
                          <Checkbox
                            pr={4}
                            mt={1}
                            colorScheme="green"
                            isInvalid
                            ref={checkRef}
                            onChange={handCheckBoxClick}
                            id={toDoList.indexOf(item)}
                          ></Checkbox>
                          <DeleteIcon
                            boxSize={4}
                            color="red.500"
                            cursor={'pointer'}
                            onClick={handleDeletedtasks}
                          ></DeleteIcon>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
            <Button
              colorScheme="blue"
              size={'sm'}
              ml={'250px'}
              visibility={tasksVisibility}
              variant="link"
              onClick={handleMoretasks}
            >
              Show More
            </Button>
          </Box>
          <Box w="350px" h="auto" bg="green.200">
            <Text
              textTransform={'uppercase'}
              fontSize={'2xl'}
              color={useColorModeValue('gray.600', 'gray.800')}
            >
              finished Tasks
              <Badge ml="1" mb={'1'} colorScheme="yellow.200" fontSize="1em">
                {finishedCount}
              </Badge>
            </Text>
            <TableContainer>
              <Table variant="striped" fontSize={'sm'}>
                <Tbody boxSize={'fit-content'}>
                  {finishedList.slice(0, moreFinished).map(item => {
                    return (
                      <Tr key={item.id}>
                        <Td w={'100%'}>{item.task}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
            <Button
              colorScheme="blue"
              size={'sm'}
              ml={'250px'}
              visibility={finishedVisibility}
              variant="link"
              onClick={handleMoreFinished}
            >
              Show More
            </Button>
          </Box>
          <Box w="350px" h="auto" bg="red.200">
            <Text
              textTransform={'uppercase'}
              fontSize={'2xl'}
              color={useColorModeValue('gray.600', 'gray.800')}
            >
              Deleted Tasks
              <Badge ml="1" mb={'1'} colorScheme="yellow.200" fontSize="1em">
                {deletedCount}
              </Badge>
            </Text>
            <TableContainer>
              <Table variant="striped" fontSize={'sm'}>
                <Tbody>
                  {deletedList.slice(0, moreDeleted).map(item => {
                    return (
                      <Tr key={item.id}>
                        <Td w={'100%'}>{item.task}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
            <Button
              colorScheme="blue"
              size={'sm'}
              ml={'250px'}
              visibility={deletedVisibility}
              variant="link"
              onClick={handleMoreDeleted}
            >
              Show More
            </Button>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
