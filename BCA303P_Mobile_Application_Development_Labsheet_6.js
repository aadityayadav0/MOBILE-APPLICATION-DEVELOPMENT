// BCA303P - Mobile Application Development
// LAB SHEET 6: Data Storage and Persistence
// React Native JavaScript Implementation

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  StyleSheet
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const ACTIVE_PRACTICAL = 1;

const s = StyleSheet.create({
  page: { flex: 1, padding: 16, backgroundColor: '#f4f6f9' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#222' },
  text: { fontSize: 16, color: '#333', marginVertical: 6 },
  card: { backgroundColor: 'white', padding: 14, marginVertical: 6, borderRadius: 8 },
  button: { backgroundColor: '#2563eb', padding: 12, marginVertical: 6, borderRadius: 7 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  input: { backgroundColor: 'white', borderWidth: 1, borderColor: '#aaa', padding: 11, marginVertical: 7, borderRadius: 7 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }
});

function Page({ title, children }) {
  return (
    <ScrollView style={s.page}>
      <Text style={s.title}>{title}</Text>
      {children}
    </ScrollView>
  );
}

function T({ children }) {
  return <Text style={s.text}>{children}</Text>;
}

function B({ title, onPress }) {
  return (
    <TouchableOpacity style={s.button} onPress={onPress}>
      <Text style={s.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

// 1. Store student details in a Map.
function P1() {
  const student = new Map([
    ['Name', 'Aman Kumar'],
    ['Roll Number', '101'],
    ['Course', 'BCA']
  ]);

  return (
    <Page title="1. Student Details Using Map">
      {[...student.entries()].map(([key, value]) => (
        <View style={s.card} key={key}>
          <T>{key}: {value}</T>
        </View>
      ))}
    </Page>
  );
}

// 2. Convert Student object to Map and Map back to Student.
class Student {
  constructor(name, roll, course) {
    this.name = name;
    this.roll = roll;
    this.course = course;
  }

  toMap() {
    return new Map([
      ['name', this.name],
      ['roll', this.roll],
      ['course', this.course]
    ]);
  }

  static fromMap(map) {
    return new Student(
      map.get('name'),
      map.get('roll'),
      map.get('course')
    );
  }
}

function P2() {
  const original = new Student('Priya', '102', 'BBA');
  const studentMap = original.toMap();
  const restored = Student.fromMap(studentMap);

  return (
    <Page title="2. Student Object and Map">
      <T>Original Student:</T>
      <T>{original.name} - {original.roll} - {original.course}</T>
      <T>Map Entries:</T>
      {[...studentMap.entries()].map(([key, value]) => (
        <View style={s.card} key={key}>
          <T>{key}: {value}</T>
        </View>
      ))}
      <T>Restored Student:</T>
      <T>{restored.name} - {restored.roll} - {restored.course}</T>
    </Page>
  );
}

// 3. Convert Map into JSON string and JSON back into Map.
function P3() {
  const data = new Map([
    ['name', 'Rahul'],
    ['roll', '103'],
    ['course', 'BCA']
  ]);

  const jsonString = JSON.stringify(Object.fromEntries(data));
  const restoredMap = new Map(
    Object.entries(JSON.parse(jsonString))
  );

  return (
    <Page title="3. Map and JSON Conversion">
      <T>Original Map:</T>
      {[...data.entries()].map(([key, value]) => (
        <T key={key}>{key}: {value}</T>
      ))}
      <T>JSON String:</T>
      <View style={s.card}>
        <T>{jsonString}</T>
      </View>
      <T>Restored Map:</T>
      {[...restoredMap.entries()].map(([key, value]) => (
        <T key={key}>{key}: {value}</T>
      ))}
    </Page>
  );
}

// 4. Save user's name using AsyncStorage.
function P4() {
  const [name, setName] = useState('');
  const [savedName, setSavedName] = useState('');

  useEffect(() => {
    loadName();
  }, []);

  const loadName = async () => {
    try {
      const value = await AsyncStorage.getItem('userName');
      if (value !== null) setSavedName(value);
    } catch (error) {
      Alert.alert('Error loading name');
    }
  };

  const saveName = async () => {
    try {
      if (!name.trim()) {
        Alert.alert('Enter your name');
        return;
      }
      await AsyncStorage.setItem('userName', name.trim());
      setSavedName(name.trim());
      setName('');
      Alert.alert('Name saved successfully');
    } catch (error) {
      Alert.alert('Error saving name');
    }
  };

  return (
    <Page title="4. Save Name Using AsyncStorage">
      <TextInput
        style={s.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <B title="Save Name" onPress={saveName} />
      <B title="Load Name" onPress={loadName} />
      <T>Saved Name: {savedName || 'No name saved'}</T>
    </Page>
  );
}
// 5. Store and retrieve an integer counter using AsyncStorage.
function P5() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    loadCount();
  }, []);

  const loadCount = async () => {
    try {
      const value = await AsyncStorage.getItem('savedCounter');
      if (value !== null) setCount(Number(value));
    } catch (error) {
      Alert.alert('Error loading counter');
    }
  };

  const saveCount = async (value) => {
    try {
      await AsyncStorage.setItem('savedCounter', String(value));
      setCount(value);
    } catch (error) {
      Alert.alert('Error saving counter');
    }
  };

  return (
    <Page title="5. Save Counter">
      <T>Counter Value: {count}</T>
      <B title="Increment and Save" onPress={() => saveCount(count + 1)} />
      <B title="Load Counter" onPress={loadCount} />
      <B title="Reset" onPress={() => saveCount(0)} />
    </Page>
  );
}

// 6. Save Dark Mode ON/OFF setting.
function P6() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadSetting();
  }, []);

  const loadSetting = async () => {
    try {
      const value = await AsyncStorage.getItem('darkMode');
      setDarkMode(value === 'true');
    } catch (error) {
      Alert.alert('Error loading setting');
    }
  };

  const changeSetting = async (value) => {
    try {
      await AsyncStorage.setItem('darkMode', String(value));
      setDarkMode(value);
    } catch (error) {
      Alert.alert('Error saving setting');
    }
  };

  return (
    <View style={[
      s.page,
      { backgroundColor: darkMode ? '#222' : '#f4f6f9' }
    ]}>
      <Text style={[
        s.title,
        { color: darkMode ? 'white' : '#222' }
      ]}>
        6. Dark Mode Setting
      </Text>

      <View style={s.row}>
        <Text style={{ color: darkMode ? 'white' : '#222' }}>
          Dark Mode
        </Text>
        <Switch value={darkMode} onValueChange={changeSetting} />
      </View>

      <Text style={[
        s.text,
        { color: darkMode ? 'white' : '#333' }
      ]}>
        Dark Mode is {darkMode ? 'ON' : 'OFF'}
      </Text>
    </View>
  );
}

// 7. Remember Me checkbox on login screen.
function P7() {
  const [username, setUsername] = useState('');
  const [remember, setRemember] = useState(false);
  const [savedUser, setSavedUser] = useState('');

  useEffect(() => {
    loadLogin();
  }, []);

  const loadLogin = async () => {
    try {
      const value = await AsyncStorage.getItem('rememberedUser');
      if (value !== null) {
        setUsername(value);
        setSavedUser(value);
        setRemember(true);
      }
    } catch (error) {
      Alert.alert('Error loading login');
    }
  };

  const login = async () => {
    if (!username.trim()) {
      Alert.alert('Enter username');
      return;
    }

    try {
      if (remember) {
        await AsyncStorage.setItem('rememberedUser', username.trim());
        setSavedUser(username.trim());
      } else {
        await AsyncStorage.removeItem('rememberedUser');
        setSavedUser('');
      }
      Alert.alert('Login Successful', `Welcome ${username}`);
    } catch (error) {
      Alert.alert('Error saving login');
    }
  };

  return (
    <Page title="7. Remember Me Login">
      <TextInput
        style={s.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <View style={s.row}>
        <T>Remember Me</T>
        <Switch value={remember} onValueChange={setRemember} />
      </View>

      <B title="Login" onPress={login} />
      <T>Saved User: {savedUser || 'None'}</T>
    </Page>
  );
}

// 8. Save and display name, email and age.
function P8() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    loadDetails();
  }, []);

  const saveDetails = async () => {
    if (!name.trim() || !email.trim() || !age.trim()) {
      Alert.alert('Please fill all fields');
      return;
    }

    const details = {
      name: name.trim(),
      email: email.trim(),
      age: age.trim()
    };

    try {
      await AsyncStorage.setItem('userDetails', JSON.stringify(details));
      setSaved(details);
      Alert.alert('Details Saved');
    } catch (error) {
      Alert.alert('Error saving details');
    }
  };

  const loadDetails = async () => {
    try {
      const value = await AsyncStorage.getItem('userDetails');
      if (value !== null) setSaved(JSON.parse(value));
    } catch (error) {
      Alert.alert('Error loading details');
    }
  };

  return (
    <Page title="8. Save Multiple Values">
      <TextInput
        style={s.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={s.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={s.input}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <B title="Save Details" onPress={saveDetails} />
      <B title="Load Details" onPress={loadDetails} />

      {saved && (
        <View style={s.card}>
          <T>Name: {saved.name}</T>
          <T>Email: {saved.email}</T>
          <T>Age: {saved.age}</T>
        </View>
      )}
    </Page>
  );
}
// 9. Store and display a list of strings using AsyncStorage.
function P9() {
  const [subjects, setSubjects] = useState([
    'JavaScript', 'Database', 'Computer Networks'
  ]);
  const [value, setValue] = useState('');

  useEffect(() => {
    loadSubjects();
  }, []);

  const saveSubjects = async (list) => {
    try {
      await AsyncStorage.setItem('subjects', JSON.stringify(list));
      setSubjects(list);
    } catch (error) {
      Alert.alert('Error saving subjects');
    }
  };

  const loadSubjects = async () => {
    try {
      const data = await AsyncStorage.getItem('subjects');
      if (data !== null) setSubjects(JSON.parse(data));
    } catch (error) {
      Alert.alert('Error loading subjects');
    }
  };

  const addSubject = () => {
    if (!value.trim()) {
      Alert.alert('Enter a subject');
      return;
    }
    saveSubjects([...subjects, value.trim()]);
    setValue('');
  };

  return (
    <Page title="9. Favourite Subjects">
      <TextInput
        style={s.input}
        placeholder="Enter subject"
        value={value}
        onChangeText={setValue}
      />
      <B title="Add Subject" onPress={addSubject} />
      <B title="Load Subjects" onPress={loadSubjects} />
      {subjects.map((subject, index) => (
        <View style={s.card} key={index}>
          <T>{subject}</T>
        </View>
      ))}
    </Page>
  );
}

// 10. Remove stored AsyncStorage data using Clear button.
function P10() {
  const [value, setValue] = useState('');

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('sampleData', value);
      Alert.alert('Data Saved');
    } catch (error) {
      Alert.alert('Error saving data');
    }
  };

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem('sampleData');
      setValue(data || '');
    } catch (error) {
      Alert.alert('Error loading data');
    }
  };

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem('sampleData');
      setValue('');
      Alert.alert('Stored Data Cleared');
    } catch (error) {
      Alert.alert('Error clearing data');
    }
  };

  return (
    <Page title="10. Clear Stored Data">
      <TextInput
        style={s.input}
        placeholder="Enter data to save"
        value={value}
        onChangeText={setValue}
      />
      <B title="Save Data" onPress={saveData} />
      <B title="Load Data" onPress={loadData} />
      <B title="Clear Data" onPress={clearData} />
      <T>Current Data: {value || 'No data'}</T>
    </Page>
  );
}

// 11. Show welcome screen only on first application launch.
function P11() {
  const [firstLaunch, setFirstLaunch] = useState(null);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      const visited = await AsyncStorage.getItem('appVisited');

      if (visited === null) {
        setFirstLaunch(true);
        await AsyncStorage.setItem('appVisited', 'yes');
      } else {
        setFirstLaunch(false);
      }
    } catch (error) {
      Alert.alert('Error checking launch status');
    }
  };

  return (
    <Page title="11. First Launch Welcome">
      {firstLaunch === null ? (
        <T>Checking application status...</T>
      ) : firstLaunch ? (
        <View style={s.card}>
          <T>Welcome! This is your first visit.</T>
        </View>
      ) : (
        <View style={s.card}>
          <T>Welcome Back! You have already opened this app.</T>
        </View>
      )}
    </Page>
  );
}

// 12. Write text into a file using Expo FileSystem.
function P12() {
  const [textValue, setTextValue] = useState('');
  const [message, setMessage] = useState('');

  const saveFile = async () => {
    if (!textValue.trim()) {
      Alert.alert('Enter some text');
      return;
    }

    try {
      const FileSystem = require('expo-file-system/legacy');
      const fileUri = FileSystem.documentDirectory + 'student_notes.txt';

      await FileSystem.writeAsStringAsync(fileUri, textValue);
      setMessage('Text saved in student_notes.txt');
    } catch (error) {
      setMessage('File saving failed. Check Expo FileSystem setup.');
    }
  };

  return (
    <Page title="12. Write Text into File">
      <TextInput
        style={s.input}
        placeholder="Enter text to save"
        multiline
        value={textValue}
        onChangeText={setTextValue}
      />
      <B title="Save to File" onPress={saveFile} />
      <T>{message}</T>
    </Page>
  );
}

// 13. Read text from a stored file.
function P13() {
  const [fileText, setFileText] = useState('');

  const readFile = async () => {
    try {
      const FileSystem = require('expo-file-system/legacy');
      const fileUri = FileSystem.documentDirectory + 'student_notes.txt';

      const data = await FileSystem.readAsStringAsync(fileUri);
      setFileText(data);
    } catch (error) {
      Alert.alert('File not found', 'Please save text using Practical 12 first.');
    }
  };

  return (
    <Page title="13. Read Text from File">
      <B title="Read Stored File" onPress={readFile} />
      <View style={s.card}>
        <T>{fileText || 'No file content loaded.'}</T>
      </View>
    </Page>
  );
}
// 14. Save Student object as JSON in AsyncStorage.
function P14() {
  const [name, setName] = useState('Aman');
  const [roll, setRoll] = useState('101');
  const [course, setCourse] = useState('BCA');
  const [student, setStudent] = useState(null);

  const saveStudent = async () => {
    try {
      const data = { name, roll, course };
      await AsyncStorage.setItem('studentJSON', JSON.stringify(data));
      setStudent(data);
      Alert.alert('Student Saved Successfully');
    } catch (error) {
      Alert.alert('Error saving student');
    }
  };

  const loadStudent = async () => {
    try {
      const data = await AsyncStorage.getItem('studentJSON');
      setStudent(data ? JSON.parse(data) : null);
    } catch (error) {
      Alert.alert('Error loading student');
    }
  };

  return (
    <Page title="14. Student JSON Storage">
      <TextInput style={s.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={s.input} placeholder="Roll Number" value={roll} onChangeText={setRoll} />
      <TextInput style={s.input} placeholder="Course" value={course} onChangeText={setCourse} />
      <B title="Save Student" onPress={saveStudent} />
      <B title="Load Student" onPress={loadStudent} />

      {student && (
        <View style={s.card}>
          <T>Name: {student.name}</T>
          <T>Roll: {student.roll}</T>
          <T>Course: {student.course}</T>
        </View>
      )}
    </Page>
  );
}

// 15. To-Do application with persistent task storage.
function P15() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await AsyncStorage.getItem('todoTasks');
      if (data) setTasks(JSON.parse(data));
    } catch (error) {
      Alert.alert('Error loading tasks');
    }
  };

  const saveTasks = async (list) => {
    try {
      await AsyncStorage.setItem('todoTasks', JSON.stringify(list));
      setTasks(list);
    } catch (error) {
      Alert.alert('Error saving tasks');
    }
  };

  const addTask = () => {
    if (!task.trim()) {
      Alert.alert('Enter a task');
      return;
    }

    const list = [
      ...tasks,
      { id: Date.now().toString(), title: task.trim() }
    ];

    saveTasks(list);
    setTask('');
  };

  const deleteTask = id => {
    saveTasks(tasks.filter(item => item.id !== id));
  };

  return (
    <Page title="15. To-Do Application">
      <TextInput
        style={s.input}
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
      />
      <B title="Add Task" onPress={addTask} />
      <B title="Load Saved Tasks" onPress={loadTasks} />

      {tasks.map(item => (
        <View style={s.card} key={item.id}>
          <T>{item.title}</T>
          <B title="Delete Task" onPress={() => deleteTask(item.id)} />
        </View>
      ))}
    </Page>
  );
}

// 16. Notes application using a JSON file.
function P16() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  const saveNotes = async (list) => {
    try {
      const FileSystem = require('expo-file-system/legacy');
      const fileUri = FileSystem.documentDirectory + 'notes.json';

      await FileSystem.writeAsStringAsync(
        fileUri,
        JSON.stringify(list)
      );

      setNotes(list);
      Alert.alert('Notes saved successfully');
    } catch (error) {
      Alert.alert('Error saving notes', 'Check Expo FileSystem setup.');
    }
  };

  const loadNotes = async () => {
    try {
      const FileSystem = require('expo-file-system/legacy');
      const fileUri = FileSystem.documentDirectory + 'notes.json';

      const info = await FileSystem.getInfoAsync(fileUri);

      if (!info.exists) {
        setNotes([]);
        return;
      }

      const data = await FileSystem.readAsStringAsync(fileUri);
      setNotes(JSON.parse(data));
    } catch (error) {
      Alert.alert('Error loading notes');
    }
  };

  const addNote = () => {
    if (!note.trim()) {
      Alert.alert('Enter a note');
      return;
    }

    saveNotes([
      ...notes,
      { id: Date.now().toString(), text: note.trim() }
    ]);

    setNote('');
  };

  const deleteNote = id => {
    saveNotes(notes.filter(item => item.id !== id));
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <Page title="16. Notes Application">
      <TextInput
        style={s.input}
        placeholder="Write your note"
        multiline
        value={note}
        onChangeText={setNote}
      />

      <B title="Add and Save Note" onPress={addNote} />
      <B title="Load Notes" onPress={loadNotes} />

      {notes.map(item => (
        <View style={s.card} key={item.id}>
          <T>{item.text}</T>
          <B title="Delete Note" onPress={() => deleteNote(item.id)} />
        </View>
      ))}
    </Page>
  );
}

// 17. Student Profile Application with save, edit and clear.
function P17() {
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const saveProfile = async () => {
    if (!name.trim() || !roll.trim() || !course.trim() || !semester.trim()) {
      Alert.alert('Please fill all fields');
      return;
    }

    const data = {
      name: name.trim(),
      roll: roll.trim(),
      course: course.trim(),
      semester: semester.trim()
    };

    try {
      await AsyncStorage.setItem('studentProfile', JSON.stringify(data));
      setProfile(data);
      Alert.alert('Profile Saved Successfully');
    } catch (error) {
      Alert.alert('Error saving profile');
    }
  };

  const loadProfile = async () => {
    try {
      const data = await AsyncStorage.getItem('studentProfile');

      if (data) {
        const parsed = JSON.parse(data);
        setProfile(parsed);
        setName(parsed.name);
        setRoll(parsed.roll);
        setCourse(parsed.course);
        setSemester(parsed.semester);
      }
    } catch (error) {
      Alert.alert('Error loading profile');
    }
  };

  const editProfile = () => {
    setProfile(null);
  };

  const clearProfile = async () => {
    try {
      await AsyncStorage.removeItem('studentProfile');
      setProfile(null);
      setName('');
      setRoll('');
      setCourse('');
      setSemester('');
      Alert.alert('Profile Cleared');
    } catch (error) {
      Alert.alert('Error clearing profile');
    }
  };

  return (
    <Page title="17. Student Profile Application">
      <TextInput style={s.input} placeholder="Student Name" value={name} onChangeText={setName} />
      <TextInput style={s.input} placeholder="Roll Number" value={roll} onChangeText={setRoll} />
      <TextInput style={s.input} placeholder="Course" value={course} onChangeText={setCourse} />
      <TextInput style={s.input} placeholder="Semester" value={semester} onChangeText={setSemester} />

      <B title="Save Profile" onPress={saveProfile} />
      <B title="Load Profile" onPress={loadProfile} />

      {profile && (
        <View style={s.card}>
          <T>Student Name: {profile.name}</T>
          <T>Roll Number: {profile.roll}</T>
          <T>Course: {profile.course}</T>
          <T>Semester: {profile.semester}</T>
          <B title="Edit Profile" onPress={editProfile} />
          <B title="Clear Profile" onPress={clearProfile} />
        </View>
      )}
    </Page>
  );
}
