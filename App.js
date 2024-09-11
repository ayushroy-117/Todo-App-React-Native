import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from "react-native";

const App = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [greeting, setGreeting] = useState("");

    // Effect to set the greeting based on time
    useEffect(() => {
        const updateGreeting = () => {
            const currentHour = new Date().getHours();
            if (currentHour >= 5 && currentHour < 12) {
                setGreeting("Good Morning");
            } else if (currentHour >= 12 && currentHour < 17) {
                setGreeting("Good Afternoon");
            } else if (currentHour >= 17 && currentHour < 21) {
                setGreeting("Good Evening");
            } else {
                setGreeting("Good Night");
            }
        };

        updateGreeting(); // Set the greeting when component mounts
        const intervalId = setInterval(updateGreeting, 60 * 60 * 1000); // Update greeting every hour

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []);

    const handleAddTask = () => {
        if (task) {
            if (editIndex !== -1) {
                const updatedTasks = [...tasks];
                updatedTasks[editIndex] = task;
                setTasks(updatedTasks);
                setEditIndex(-1);
            } else {
                setTasks([...tasks, task]);
            }
            setTask("");
        }
    };

    const handleEditTask = (index) => {
        const taskToEdit = tasks[index];
        setTask(taskToEdit);
        setEditIndex(index);
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.task}>
            <Text style={styles.itemList}>{item}</Text>
            <View style={styles.taskButtons}>
                <TouchableOpacity onPress={() => handleEditTask(index)}>
                    <Text style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteTask(index)}>
                    <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
      <View style={styles.container}>
          {/* Ensure the greeting is wrapped in a <Text> component */}
          <Text style={styles.heading}>{greeting}</Text> 
          <Text style={styles.title}>What's your planning?</Text>
          <TextInput
              style={styles.input}
              placeholder="Enter task"
              value={task}
              onChangeText={(text) => setTask(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
              <Text style={styles.addButtonText}>
                  {editIndex !== -1 ? "Update Task" : "Add Task"}
              </Text>
          </TouchableOpacity>
          <FlatList
              data={tasks}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
          />
      </View>
  );
  
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        marginTop: 40,
        backgroundColor: "#FFF8F3", // Ensure white background
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#405D72", // Black text for title
    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 7,
        color: "#987D9A", // Color for greeting text
    },
    input: {
        borderWidth: 3,
        borderColor: "#405D72",
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 18,
        color: "black", // Input text color
    },
    addButton: {
        backgroundColor: "#758694",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    addButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
    },
    task: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
        fontSize: 18,
    },
    itemList: {
        fontSize: 19,
        color: "black", // Ensure task list item text is black
    },
    taskButtons: {
        flexDirection: "row",
    },
    editButton: {
        marginRight: 10,
        color: "green",
        fontWeight: "bold",
        fontSize: 18,
    },
    deleteButton: {
        color: "red",
        fontWeight: "bold",
        fontSize: 18,
    },
});

export default App;
