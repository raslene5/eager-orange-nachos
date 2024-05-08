import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TextInput, ScrollView, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const ProjectManagementScreen = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [newProjectStartDate, setNewProjectStartDate] = useState('');
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [assignedProject, setAssignedProject] = useState('');
  const [rerenderKey, setRerenderKey] = useState(0); // Key to force re-rendering FlatList
  const [starRating, setStarRating] = useState(0); // State variable for star rating

  const createProject = () => {
    if (newProjectName.trim() !== '' && newProjectDescription.trim() !== '' && newProjectStartDate.trim() !== '') {
      const newProject = {
        id: projects.length + 1,
        name: newProjectName,
        description: newProjectDescription,
        startDate: newProjectStartDate,
        tasks: [],
        starRating: starRating // Assigning star rating to the project
      };
      setProjects([...projects, newProject]);
      setNewProjectName('');
      setNewProjectDescription('');
      setNewProjectStartDate('');
      setShowProjectModal(false);
    }
  };

  const createTask = () => {
    if (newTaskName.trim() !== '' && newTaskDescription.trim() !== '' && assignedProject) {
      const task = {
        id: Math.random().toString(),
        name: newTaskName,
        description: newTaskDescription,
      };
      const updatedProjects = projects.map(project => {
        if (project.id === assignedProject) {
          return { ...project, tasks: [...project.tasks, task] };
        }
        return project;
      });
      setProjects(updatedProjects);
      setNewTaskName('');
      setNewTaskDescription('');
      setShowTaskModal(false);
      setRerenderKey(prevKey => prevKey + 1); // Incrementing key to force re-rendering
    }
  };

  const renderProjectItem = ({ item }) => (
    <TouchableOpacity style={styles.projectItem} onPress={() => setSelectedProject(item)}>
      <Text style={styles.projectName}>{item.name}</Text>
      <Text style={styles.projectDescription}>{item.description}</Text>
      <Text style={styles.projectStartDate}>Start Date: {item.startDate}</Text>
      <View style={styles.starContainer}>
        <FontAwesome name="star" size={20} color={item.starRating >= 1 ? 'gold' : '#ccc'} onPress={() => setStarRating(1)} />
        <FontAwesome name="star" size={20} color={item.starRating >= 2 ? 'gold' : '#ccc'} onPress={() => setStarRating(2)} />
        <FontAwesome name="star" size={20} color={item.starRating >= 3 ? 'gold' : '#ccc'} onPress={() => setStarRating(3)} />
        <FontAwesome name="star" size={20} color={item.starRating >= 4 ? 'gold' : '#ccc'} onPress={() => setStarRating(4)} />
        <FontAwesome name="star" size={20} color={item.starRating >= 5 ? 'gold' : '#ccc'} onPress={() => setStarRating(5)} />
      </View>
      <View style={styles.taskCountContainer}>
        <FontAwesome name="tasks" size={20} color="#333" />
        <Text style={styles.taskCount}>{item.tasks.length}</Text>
      </View>
      <View style={styles.taskList}>
        {item.tasks.map(task => (
          <View key={task.id} style={styles.taskItem}>
            <Text style={styles.taskName}>{task.name}</Text>
            <Text style={styles.taskDescription}>{task.description}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.addTaskButton} onPress={() => { setAssignedProject(item.id); setShowTaskModal(true); }}>
        <FontAwesome name="plus" size={20} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        {/* Add your sidebar content here */}
        {/* For example, you can add the star rating control here */}
        <View style={styles.starRatingContainer}>
          <FontAwesome name="star" size={20} color={starRating >= 1 ? 'gold' : '#ccc'} onPress={() => setStarRating(1)} />
          <FontAwesome name="star" size={20} color={starRating >= 2 ? 'gold' : '#ccc'} onPress={() => setStarRating(2)} />
          <FontAwesome name="star" size={20} color={starRating >= 3 ? 'gold' : '#ccc'} onPress={() => setStarRating(3)} />
          <FontAwesome name="star" size={20} color={starRating >= 4 ? 'gold' : '#ccc'} onPress={() => setStarRating(4)} />
          <FontAwesome name="star" size={20} color={starRating >= 5 ? 'gold' : '#ccc'} onPress={() => setStarRating(5)} />
        </View>
      </View>
      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Your main content goes here */}
        <Text style={styles.title}>Project Management</Text>
        <FlatList
          data={projects}
          renderItem={renderProjectItem}
          keyExtractor={(item, index) => item.id.toString() + index.toString()} // Using unique key to force re-rendering
          extraData={rerenderKey} // ExtraData to trigger re-rendering
          contentContainerStyle={{ paddingBottom: 20 }}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => setShowProjectModal(true)}>
          <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>
        {/* Modals for creating projects and tasks */}
        <Modal visible={showProjectModal} animationType="slide">
          <ScrollView contentContainerStyle={styles.modalContainer}>
            <Text style={styles.modalTitle}>Create Project</Text>
            <TextInput
              style={styles.input}
              value={newProjectName}
              onChangeText={setNewProjectName}
              placeholder="Project Name"
            />
            <TextInput
              style={[styles.input, { height: 100 }]}
              value={newProjectDescription}
              onChangeText={setNewProjectDescription}
              placeholder="Project Description"
              multiline
            />
            <TextInput
              style={styles.input}
              value={newProjectStartDate}
              onChangeText={setNewProjectStartDate}
              placeholder="Start Date"
            />
            <View style={styles.buttonContainer}>
              <Button title="Create Project" onPress={createProject} color="#FF5733" />
              <Button title="Cancel" onPress={() => setShowProjectModal(false)} color="#FF5733" />
            </View>
          </ScrollView>
        </Modal>
        <Modal visible={showTaskModal} animationType="slide">
          <ScrollView contentContainerStyle={styles.modalContainer}>
            <Text style={styles.modalTitle}>Create Task</Text>
            <TextInput
              style={styles.input}
              value={newTaskName}
              onChangeText={setNewTaskName}
              placeholder="Task Name"
            />
            <TextInput
              style={[styles.input, { height: 100 }]}
              value={newTaskDescription}
              onChangeText={setNewTaskDescription}
              placeholder="Task Description"
              multiline
            />
            <Picker
              selectedValue={assignedProject}
              style={styles.picker}
              onValueChange={(itemValue) => setAssignedProject(itemValue)}
            >
              <Picker.Item label="Select Project" value="" />
              {projects.map(project => (
                <Picker.Item key={project.id} label={project.name} value={project.id} />
              ))}
            </Picker>
            <View style={styles.buttonContainer}>
              <Button title="Create Task" onPress={createTask} color="#FF5733" />
              <Button title="Cancel" onPress={() => setShowTaskModal(false)} color="#FF5733" />
            </View>
          </ScrollView>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Layout as row to display sidebar and main content side by side
  },
  sidebar: {
    flex: 1, // Take 1/4 of available space
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 20,
    paddingTop: 20,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  sidebarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  mainContent: {
    flex: 3, // Take 3/4 of available space
    backgroundColor: '#FFF', // Adjust as needed
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  projectItem: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    position: 'relative',
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  projectDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  projectStartDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  taskCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskCount: {
    marginLeft: 5,
  },
  taskList: {
    marginTop: 10,
  },
  taskItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  taskName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF5733',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTaskButton: {
    position: 'absolute',
    bottom: 10,
    right: 70,
    backgroundColor: '#FF5733',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flexGrow: 1,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProjectManagementScreen;
