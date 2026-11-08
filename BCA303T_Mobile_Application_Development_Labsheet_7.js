
// BCA303T - Mobile Application Development
// LAB SHEET 7: SQLite Database Basics (CRUD Operations)

import React, {useState, useEffect} from 'react';
import {
  View, Text, TextInput, ScrollView,
  TouchableOpacity, Alert, StyleSheet
} from 'react-native';
import * as SQLite from 'expo-sqlite';

const ACTIVE_PRACTICAL = 1;

let database;

async function getDB() {
  if (!database) {
    database = await SQLite.openDatabaseAsync('students.db');
  }
  return database;
}

async function createTable() {
  const db = await getDB();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      roll TEXT NOT NULL,
      course TEXT NOT NULL
    );
  `);
  return db;
}

const s = StyleSheet.create({
  page: {padding: 18, backgroundColor: '#f3f4f6', flex: 1},
  heading: {fontSize: 23, fontWeight: 'bold', marginBottom: 15, color: '#172554'},
  text: {fontSize: 16, marginBottom: 10, color: '#222'},
  input: {backgroundColor: 'white', borderWidth: 1, borderColor: '#aaa',
    borderRadius: 7, padding: 11, marginBottom: 10},
  btn: {backgroundColor: '#2563eb', padding: 13,
    borderRadius: 7, marginVertical: 5},
  btnText: {color: 'white', textAlign: 'center', fontWeight: 'bold'},
  card: {backgroundColor: 'white', padding: 12, marginVertical: 5,
    borderRadius: 7}
});

function Page({title, children}) {
  return (
    <ScrollView style={s.page}>
      <Text style={s.heading}>{title}</Text>
      {children}
    </ScrollView>
  );
}

function T({children}) {
  return <Text style={s.text}>{children}</Text>;
}

function B({title, onPress}) {
  return (
    <TouchableOpacity style={s.btn} onPress={onPress}>
      <Text style={s.btnText}>{title}</Text>
    </TouchableOpacity>
  );
}

// PRACTICAL 1: Create SQLite Database
function P1() {
  const [message, setMessage] = useState('Database not created yet');

  async function create() {
    try {
      await getDB();
      setMessage('SQLite Database created successfully!');
    } catch (e) {
      setMessage(e.message);
    }
  }

  return (
    <Page title="Practical 1: Create Database">
      <B title="Create Database" onPress={create} />
      <T>{message}</T>
    </Page>
  );
}

// PRACTICAL 2: Create Students Table
function P2() {
  const [message, setMessage] = useState('');

  async function create() {
    try {
      await createTable();
      setMessage('Students table created successfully!');
    } catch (e) {
      setMessage(e.message);
    }
  }

  return (
    <Page title="Practical 2: Create Students Table">
      <T>Table fields: id, name, roll number and course.</T>
      <B title="Create Table" onPress={create} />
      <T>{message}</T>
    </Page>
  );
}

// PRACTICAL 3: Insert Student Using insert()
function P3() {
  const [message, setMessage] = useState('');

  async function insertStudent() {
    try {
      const db = await createTable();
      const result = await db.runAsync(
        'INSERT INTO students (name, roll, course) VALUES (?, ?, ?)',
        'Rahul Sharma', '101', 'BCA'
      );
      setMessage('Student inserted. ID: ' + result.lastInsertRowId);
    } catch (e) {
      setMessage(e.message);
    }
  }

  return (
    <Page title="Practical 3: Insert Student">
      <T>Insert a sample student using the database insert operation.</T>
      <B title="Insert Student" onPress={insertStudent} />
      <T>{message}</T>
    </Page>
  );
}

// PRACTICAL 4: Insert Student Using TextFields
function P4() {
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [course, setCourse] = useState('');
  const [message, setMessage] = useState('');

  async function saveStudent() {
    if (!name || !roll || !course) {
      Alert.alert('Error', 'Please enter all details');
      return;
    }

    try {
      const db = await createTable();
      await db.runAsync(
        'INSERT INTO students (name, roll, course) VALUES (?, ?, ?)',
        name, roll, course
      );
      setMessage('Student saved successfully!');
      setName('');
      setRoll('');
      setCourse('');
    } catch (e) {
      setMessage(e.message);
    }
  }

  return (
    <Page title="Practical 4: Student Entry Form">
      <TextInput style={s.input} placeholder="Enter Name"
        value={name} onChangeText={setName} />
      <TextInput style={s.input} placeholder="Enter Roll Number"
        value={roll} onChangeText={setRoll} />
      <TextInput style={s.input} placeholder="Enter Course"
        value={course} onChangeText={setCourse} />
      <B title="Save Student" onPress={saveStudent} />
      <T>{message}</T>
    </Page>
  );
}


// PRACTICAL 5: Insert Student Using rawInsert()
function P5() {
  const [message, setMessage] = useState('');

  async function insertStudent() {
    try {
      const db = await createTable();
      await db.runAsync(
        "INSERT INTO students (name, roll, course) VALUES ('Amit Kumar', '102', 'BCA')"
      );
      setMessage('Student inserted using raw SQL!');
    } catch (e) {
      setMessage(e.message);
    }
  }

  return (
    <Page title="Practical 5: Raw Insert">
      <B title="Insert Student" onPress={insertStudent} />
      <T>{message}</T>
    </Page>
  );
}

// PRACTICAL 6: Display Records Using query()
function P6() {
  const [students, setStudents] = useState([]);

  async function loadStudents() {
    const db = await createTable();
    const rows = await db.getAllAsync('SELECT * FROM students');
    setStudents(rows);
  }

  return (
    <Page title="Practical 6: Display Students">
      <B title="Load Students" onPress={loadStudents} />
      {students.map(student => (
        <View style={s.card} key={student.id}>
          <T>ID: {student.id}</T>
          <T>Name: {student.name}</T>
          <T>Roll: {student.roll}</T>
          <T>Course: {student.course}</T>
        </View>
      ))}
    </Page>
  );
}

// PRACTICAL 7: Display Records Using rawQuery()
function P7() {
  const [students, setStudents] = useState([]);

  async function loadStudents() {
    const db = await createTable();
    const rows = await db.getAllAsync(
      'SELECT * FROM students ORDER BY id DESC'
    );
    setStudents(rows);
  }

  return (
    <Page title="Practical 7: Raw Query">
      <B title="Display Records" onPress={loadStudents} />
      {students.map(student => (
        <View style={s.card} key={student.id}>
          <T>{student.name} | {student.roll} | {student.course}</T>
        </View>
      ))}
    </Page>
  );
}

// PRACTICAL 8: Update Student Record
function P8() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  async function updateStudent() {
    if (!id || !name) {
      Alert.alert('Error', 'Enter student ID and new name');
      return;
    }

    try {
      const db = await createTable();
      const result = await db.runAsync(
        'UPDATE students SET name = ? WHERE id = ?',
        name, Number(id)
      );
      setMessage(
        result.changes > 0
          ? 'Student updated successfully!'
          : 'Student ID not found'
      );
    } catch (e) {
      setMessage(e.message);
    }
  }

  return (
    <Page title="Practical 8: Update Student">
      <TextInput style={s.input} placeholder="Student ID"
        keyboardType="numeric" value={id} onChangeText={setId} />
      <TextInput style={s.input} placeholder="New Name"
        value={name} onChangeText={setName} />
      <B title="Update Student" onPress={updateStudent} />
      <T>{message}</T>
    </Page>
  );
}


// PRACTICAL 9: Delete Student Using delete()
function P9() {
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');

  async function deleteStudent() {
    if (!id) {
      Alert.alert('Error', 'Enter student ID');
      return;
    }

    try {
      const db = await createTable();
      const result = await db.runAsync(
        'DELETE FROM students WHERE id = ?', Number(id)
      );
      setMessage(
        result.changes > 0 ? 'Student deleted!' : 'Student not found'
      );
    } catch (e) {
      setMessage(e.message);
    }
  }

  return (
    <Page title="Practical 9: Delete Student">
      <TextInput style={s.input} placeholder="Enter Student ID"
        keyboardType="numeric" value={id} onChangeText={setId} />
      <B title="Delete Student" onPress={deleteStudent} />
      <T>{message}</T>
    </Page>
  );
}

// PRACTICAL 10: Delete All Student Records
function P10() {
  const [message, setMessage] = useState('');

  async function clearAll() {
    Alert.alert('Confirm', 'Delete all student records?', [
      {text: 'Cancel'},
      {
        text: 'Clear All',
        onPress: async () => {
          try {
            const db = await createTable();
            await db.runAsync('DELETE FROM students');
            setMessage('All student records deleted!');
          } catch (e) {
            setMessage(e.message);
          }
        }
      }
    ]);
  }

  return (
    <Page title="Practical 10: Clear All Records">
      <B title="Clear All Students" onPress={clearAll} />
      <T>{message}</T>
    </Page>
  );
}

// PRACTICAL 11: Search Student by Roll Number
function P11() {
  const [roll, setRoll] = useState('');
  const [student, setStudent] = useState(null);

  async function searchStudent() {
    const db = await createTable();
    const result = await db.getFirstAsync(
      'SELECT * FROM students WHERE roll = ?', roll
    );
    setStudent(result || null);
    if (!result) Alert.alert('Result', 'Student not found');
  }

  return (
    <Page title="Practical 11: Search Student">
      <TextInput style={s.input} placeholder="Enter Roll Number"
        value={roll} onChangeText={setRoll} />
      <B title="Search" onPress={searchStudent} />
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

// PRACTICAL 12: Filter Students by Course
function P12() {
  const [course, setCourse] = useState('BCA');
  const [students, setStudents] = useState([]);

  async function filterStudents() {
    const db = await createTable();
    const rows = await db.getAllAsync(
      'SELECT * FROM students WHERE course = ?', course
    );
    setStudents(rows);
  }

  return (
    <Page title="Practical 12: Course Filter">
      <T>Select Course:</T>
      {['BCA', 'BBA', 'MCA', 'BTech'].map(item => (
        <B key={item} title={item}
          onPress={() => setCourse(item)} />
      ))}
      <T>Selected: {course}</T>
      <B title="Show Students" onPress={filterStudents} />
      {students.map(student => (
        <View style={s.card} key={student.id}>
          <T>{student.name} - {student.roll}</T>
        </View>
      ))}
    </Page>
  );
}

// PRACTICAL 13: Display Students in Ascending Name Order
function P13() {
  const [students, setStudents] = useState([]);

  async function loadStudents() {
    const db = await createTable();
    const rows = await db.getAllAsync(
      'SELECT * FROM students ORDER BY name ASC'
    );
    setStudents(rows);
  }

  return (
    <Page title="Practical 13: Sort by Name">
      <B title="Sort Students A to Z" onPress={loadStudents} />
      {students.map(student => (
        <View style={s.card} key={student.id}>
          <T>{student.name} - {student.roll}</T>
        </View>
      ))}
    </Page>
  );
}


// PRACTICAL 14: Display Total Number of Students
function P14() {
  const [count, setCount] = useState(0);

  async function getCount() {
    const db = await createTable();
    const result = await db.getFirstAsync(
      'SELECT COUNT(*) AS total FROM students'
    );
    setCount(result.total);
  }

  return (
    <Page title="Practical 14: Total Records">
      <B title="Count Students" onPress={getCount} />
      <Text style={s.heading}>Total Students: {count}</Text>
    </Page>
  );
}

// PRACTICAL 15: Student Model with toMap() and fromMap()
class Student {
  constructor(id, name, roll, course) {
    this.id = id;
    this.name = name;
    this.roll = roll;
    this.course = course;
  }

  toMap() {
    return {
      name: this.name,
      roll: this.roll,
      course: this.course
    };
  }

  static fromMap(map) {
    return new Student(
      map.id, map.name, map.roll, map.course
    );
  }
}

function P15() {
  const [message, setMessage] = useState('');

  async function saveStudent() {
    try {
      const db = await createTable();
      const student = new Student(
        null, 'Priya Singh', '105', 'BCA'
      );

      const result = await db.runAsync(
        'INSERT INTO students (name, roll, course) VALUES (?, ?, ?)',
        student.name, student.roll, student.course
      );

      const row = await db.getFirstAsync(
        'SELECT * FROM students WHERE id = ?',
        result.lastInsertRowId
      );

      const restored = Student.fromMap(row);
      setMessage(
        'Student restored: ' + restored.name +
        ', ' + restored.roll + ', ' + restored.course
      );
    } catch (e) {
      setMessage(e.message);
    }
  }

  return (
    <Page title="Practical 15: Student Model">
      <B title="Save and Retrieve Student" onPress={saveStudent} />
      <T>{message}</T>
    </Page>
  );
}

// PRACTICAL 16: DatabaseHelper Class
class DatabaseHelper {
  async open() {
    return await createTable();
  }

  async insert(student) {
    const db = await this.open();
    return await db.runAsync(
      'INSERT INTO students (name, roll, course) VALUES (?, ?, ?)',
      student.name, student.roll, student.course
    );
  }

  async read() {
    const db = await this.open();
    return await db.getAllAsync('SELECT * FROM students');
  }

  async update(id, student) {
    const db = await this.open();
    return await db.runAsync(
      'UPDATE students SET name=?, roll=?, course=? WHERE id=?',
      student.name, student.roll, student.course, id
    );
  }

  async delete(id) {
    const db = await this.open();
    return await db.runAsync(
      'DELETE FROM students WHERE id=?', id
    );
  }
}

function P16() {
  const [message, setMessage] = useState('');
  const helper = new DatabaseHelper();

  async function testHelper() {
    try {
      const rows = await helper.read();
      setMessage('DatabaseHelper working! Total records: ' + rows.length);
    } catch (e) {
      setMessage(e.message);
    }
  }

  return (
    <Page title="Practical 16: DatabaseHelper">
      <B title="Test DatabaseHelper" onPress={testHelper} />
      <T>{message}</T>
    </Page>
  );
}

// PRACTICAL 17: Student Record Management Application
function P17() {
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [course, setCourse] = useState('');
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);

  const helper = new DatabaseHelper();

  async function loadStudents() {
    const rows = await helper.read();
    setStudents(rows);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  async function saveStudent() {
    if (!name || !roll || !course) {
      Alert.alert('Error', 'Fill all fields');
      return;
    }

    try {
      if (editId) {
        await helper.update(editId, {name, roll, course});
      } else {
        await helper.insert({name, roll, course});
      }

      setName('');
      setRoll('');
      setCourse('');
      setEditId(null);
      loadStudents();
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  }

  function editStudent(student) {
    setEditId(student.id);
    setName(student.name);
    setRoll(student.roll);
    setCourse(student.course);
  }

  async function deleteStudent(id) {
    await helper.delete(id);
    loadStudents();
  }

  return (
    <Page title="Practical 17: Student Record Management">
      <TextInput style={s.input} placeholder="Student Name"
        value={name} onChangeText={setName} />
      <TextInput style={s.input} placeholder="Roll Number"
        value={roll} onChangeText={setRoll} />
      <TextInput style={s.input} placeholder="Course"
        value={course} onChangeText={setCourse} />

      <B title={editId ? 'Update Student' : 'Add Student'}
        onPress={saveStudent} />

      <B title="Refresh Records" onPress={loadStudents} />

      {students.map(student => (
        <View style={s.card} key={student.id}>
          <T>Name: {student.name}</T>
          <T>Roll: {student.roll}</T>
          <T>Course: {student.course}</T>
          <B title="Edit" onPress={() => editStudent(student)} />
          <B title="Delete" onPress={() => deleteStudent(student.id)} />
        </View>
      ))}
    </Page>
  );
}
