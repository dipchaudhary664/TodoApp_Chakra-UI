import React, { useState } from "react";
import {
  Flex,
  Text,
  Input,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Checkbox,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

function App() {
  const [newTask, setNewTask] = useState();
  const [tasks, setTasks] = useState([]);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.length > 0) {
      setTasks((prevState) => [
        ...prevState,
        { text: newTask, newTask, isChecked: false },
      ]);
      setNewTask("");
    }
  };

  const updateTask = (index, checked) => {
    let newTasks = [...tasks];
    newTasks[index].isChecked = checked;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <>
      <Flex w="100%" h="100vh">
        <Flex
          w="100%"
          flexDirection="column"
          ml="20%"
          mr="20%"
          mt="5%"
          color="black"
        >
          <Text fontSize="3xl" fontWeight="bold">
            Tasks
          </Text>
          <form onSubmit={addTask}>
            <Flex mt="2%">
              <Input
                variant="flushed"
                placeholder="Add Task"
                w="50%"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <Button ml="4%" colorScheme="teal" onClick={addTask}>
                Add Task
              </Button>
            </Flex>
          </form>
          <Tabs mt="4%" w="100%">
            <TabList>
              <Tab>InComplete Tasks</Tab>
              <Tab>Complete Tasks</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                {/* <Text>InComplete tasks go here</Text> */}
                {tasks.map((task, index) =>
                  !task.isChecked ? (
                    <TaskItem
                      deleteTask={deleteTask}
                      updateTask={updateTask}
                      key={index}
                      task={task}
                      index={index}
                    />
                  ) : null
                )}
              </TabPanel>
              <TabPanel>
                {/* <Text py="5">Complete tasks go here</Text> */}
                {tasks.map((task, index) =>
                  !task.isChecked ? (
                    <TaskItem
                      deleteTask={deleteTask}
                      key={index}
                      task={task}
                      index={index}
                    />
                  ) : null
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </>
  );
}

const TaskItem = ({ task, index, updateTask, deleteTask }) => {
  return (
    <Checkbox
      onChange={(e) => updateTask(index, e.target.checked)}
      colorScheme="teal"
      mb="10"
      w="100%"
      style={{ flexDirection: "row", borderColor: "teal", color: "teal" }}
      isChecked={task.isChecked}
    >
      <Flex w="100%" flexDirection="row">
        <Text>{task.text}</Text>
        <IconButton
          bg="red.500"
          pos="absolute"
          right="0"
          icon={<DeleteIcon />}
          onClick={() => deleteTask(index)}
        />
      </Flex>
    </Checkbox>
  );
};

export default App;
