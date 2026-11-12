
/*
LAB SHEET 10
BCA303P - MOBILE APPLICATION DEVELOPMENT

Topic: Firebase Authentication and Cloud Firestore
Language: JavaScript (React Native + Expo)

SETUP:
1. Create a Firebase project at https://console.firebase.google.com
2. Enable Email/Password in Authentication > Sign-in method.
3. Create a Cloud Firestore database.
4. Register a Web App in Firebase project.
5. Copy Firebase config into firebaseConfig below.
6. Install packages:
   npx expo install firebase
   npx expo install @react-native-async-storage/async-storage

Run:
   npx expo start

Change ACTIVE_PRACTICAL from 1 to 15.
*/

import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { initializeApp, getApps } from 'firebase/app';

import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';

// Select practical number (1 to 15)
const ACTIVE_PRACTICAL = 1;

// Firebase configuration: replace with your own project details.
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

let auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  auth = getAuth(app);
}

const db = getFirestore(app);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f4f6f9',
  },
  heading: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 18,
    color: '#17365d',
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#234',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 7,
    padding: 12,
    marginBottom: 12,
  },
  card: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 8,
    marginVertical: 7,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
    color: '#222',
  },
  button: {
    marginVertical: 6,
  },
});

function Message({ children }) {
  return <Text style={styles.text}>{children}</Text>;
}

function Field({ placeholder, value, onChangeText, secureTextEntry }) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
    />
  );
}

// PRACTICAL 1: Connect React Native application to Firebase.
function Practical1() {
  return (
    <View style={styles.card}>
      <Text style={styles.subheading}>Practical 1: Firebase Connection</Text>
      <Message>Firebase Connected</Message>
      <Message>Project ID: {firebaseConfig.projectId}</Message>
    </View>
  );
}

// PRACTICAL 2: Register a new user using email and password.
function Practical2() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'User registered successfully!');
    } catch (error) {
      Alert.alert('Registration Error', error.message);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.subheading}>Practical 2: User Registration</Text>
      <Field placeholder="Enter email" value={email} onChangeText={setEmail} />
      <Field
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={register} />
    </View>
  );
}

// PRACTICAL 3: Login using signInWithEmailAndPassword().
function Practical3() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Login successful!');
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.subheading}>Practical 3: User Login</Text>
      <Field placeholder="Enter email" value={email} onChangeText={setEmail} />
      <Field
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={login} />
    </View>
  );
}

// PRACTICAL 4: Display logged-in user's email and Logout button.
function Practical4() {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Success', 'Logged out successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.subheading}>Practical 4: Home Screen</Text>
      {user ? (
        <>
          <Message>Logged-in Email: {user.email}</Message>
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <Message>No user is currently logged in.</Message>
      )}
    </View>
  );
}

// PRACTICAL 5: Display authentication errors using Alert (SnackBar equivalent).
function Practical5() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Registration successful!');
    } catch (error) {
      Alert.alert('Authentication Error', error.message);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.subheading}>Practical 5: Authentication Errors</Text>
      <Field placeholder="Email" value={email} onChangeText={setEmail} />
      <Field
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register and Check Errors" onPress={register} />
    </View>
  );
}

// PRACTICAL 6: Reset password using sendPasswordResetEmail().
function Practical6() {
  const [email, setEmail] = useState('');

  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Password reset email sent!');
    } catch (error) {
      Alert.alert('Reset Error', error.message);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.subheading}>Practical 6: Password Reset</Text>
      <Field placeholder="Registered email" value={email} onChangeText={setEmail} />
      <Button title="Send Reset Email" onPress={resetPassword} />
    </View>
  );
}

// PRACTICAL 7: Automatically show Login or Home based on authStateChanges().
function Practical7() {
  const [user, setUser] = useState(auth.currentUser);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);
    });
    return unsubscribe;
  }, []);

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  if (checking) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.subheading}>Practical 7: Authentication State</Text>
      {user ? (
        <>
          <Message>Welcome {user.email}</Message>
          <Button title="Logout" onPress={() => signOut(auth)} />
        </>
      ) : (
        <>
          <Field placeholder="Email" value={email} onChangeText={setEmail} />
          <Field
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Login" onPress={login} />
        </>
      )}
    </View>
  );
}

// PRACTICAL 8: Add student record to Cloud Firestore.
function Practical8() {
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [course, setCourse] = useState('');

  const addStudent = async () => {
    try {
      await addDoc(collection(db, 'students'), {
        name,
        roll,
        course,
        createdAt: new Date().toISOString(),
      });

      Alert.alert('Success', 'Student record added!');
      setName('');
      setRoll('');
      setCourse('');
    } catch (error) {
      Alert.alert('Firestore Error', error.message);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.subheading}>Practical 8: Add Student Record</Text>
      <Field placeholder="Student Name" value={name} onChangeText={setName} />
      <Field placeholder="Roll Number" value={roll} onChangeText={setRoll} />
      <Field placeholder="Course" value={course} onChangeText={setCourse} />
      <Button title="Add Student" onPress={addStudent} />
    </View>
  );
}

// PRACTICAL 9: Display all student records in real time.
function Practical9() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'students'),
      (snapshot) => {
        setStudents(snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        })));
        setLoading(false);
      },
      (error) => {
        Alert.alert('Firestore Error', error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.subheading}>Practical 9: Real-Time Student Records</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        students.map((student) => (
          <View key={student.id} style={styles.card}>
            <Message>Name: {student.name}</Message>
            <Message>Roll: {student.roll}</Message>
            <Message>Course: {student.course}</Message>
          </View>
        ))
      )}
    </View>
  );
}

// PRACTICAL 10: Update an existing student record.
function Practical10() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [course, setCourse] = useState('');

  const updateStudent = async () => {
    try {
      await updateDoc(doc(db, 'students', id), {
        name,
        roll,
        course,
      });
      Alert.alert('Success', 'Student record updated!');
      setId('');
      setName('');
      setRoll('');
      setCourse('');
    } catch (error) {
      Alert.alert('Update Error', error.message);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.subheading}>Practical 10: Update Student</Text>
      <Field placeholder="Document ID" value={id} onChangeText={setId} />
      <Field placeholder="New Name" value={name} onChangeText={setName} />
      <Field placeholder="New Roll Number" value={roll} onChangeText={setRoll} />
      <Field placeholder="New Course" value={course} onChangeText={setCourse} />
      <Button title="Update Student" onPress={updateStudent} />
    </View>
  );
}

// PRACTICAL 11: Delete a student record.
function Practical11() {
  const [id, setId] = useState('');

  const removeStudent = async () => {
    try {
      await deleteDoc(doc(db, 'students', id));
      Alert.alert('Success', 'Student record deleted!');
      setId('');
    } catch (error) {
      Alert.alert('Delete Error', error.message);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.subheading}>Practical 11: Delete Student</Text>
      <Field
        placeholder="Enter student document ID"
        value={id}
        onChangeText={setId}
      />
      <Button title="Delete Student" onPress={removeStudent} />
    </View>
  );
}

// PRACTICAL 12: Display students of a selected course using where().
function Practical12() {
  const [course, setCourse] = useState('');
  const [students, setStudents] = useState([]);

  const searchStudents = async () => {
    try {
      const studentQuery = query(
        collection(db, 'students'),
        where('course', '==', course)
      );

      const snapshot = await getDocs(studentQuery);

      setStudents(snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      })));
    } catch (error) {
      Alert.alert('Search Error', error.message);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.subheading}>Practical 12: Course Filter</Text>
      <Field
        placeholder="Enter course name"
        value={course}
        onChangeText={setCourse}
      />
      <Button title="Search Students" onPress={searchStudents} />
      {students.map((student) => (
        <View key={student.id} style={styles.card}>
          <Message>{student.name} - {student.course}</Message>
        </View>
      ))}
    </View>
  );
}

// PRACTICAL 13: Display student records in ascending order of name.
function Practical13() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const studentQuery = query(
        collection(db, 'students'),
        orderBy('name', 'asc')
      );

      const snapshot = await getDocs(studentQuery);

      setStudents(snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      })));
    } catch (error) {
      Alert.alert('Sorting Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.subheading}>Practical 13: Sort Students by Name</Text>
      <Button title="Load Sorted Students" onPress={loadStudents} />
      {loading && <ActivityIndicator size="large" />}
      {students.map((student) => (
        <View key={student.id} style={styles.card}>
          <Message>{student.name} - {student.course}</Message>
        </View>
      ))}
    </View>
  );
}

// PRACTICAL 14: Notes application with add, view and delete features.
function Practical14() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      setNotes([]);
      setLoading(false);
      return;
    }

    const notesQuery = query(
      collection(db, 'notes'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(
      notesQuery,
      (snapshot) => {
        setNotes(snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        })));
        setLoading(false);
      },
      (error) => {
        Alert.alert('Notes Error', error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user?.uid]);

  const addNote = async () => {
    if (!user) {
      Alert.alert('Login Required', 'Please login first.');
      return;
    }

    if (!note.trim()) {
      Alert.alert('Error', 'Enter a note.');
      return;
    }

    try {
      await addDoc(collection(db, 'notes'), {
        text: note.trim(),
        userId: user.uid,
        createdAt: new Date().toISOString(),
      });
      setNote('');
    } catch (error) {
      Alert.alert('Add Note Error', error.message);
    }
  };

  const removeNote = async (id) => {
    try {
      await deleteDoc(doc(db, 'notes', id));
    } catch (error) {
      Alert.alert('Delete Note Error', error.message);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.subheading}>Practical 14: Firebase Notes App</Text>
      <Field placeholder="Write a note" value={note} onChangeText={setNote} />
      <Button title="Add Note" onPress={addNote} />
      {!user && <Message>Please login to manage your notes.</Message>}
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        notes.map((item) => (
          <View key={item.id} style={styles.card}>
            <Message>{item.text}</Message>
            <Button title="Delete Note" onPress={() => removeNote(item.id)} />
          </View>
        ))
      )}
    </View>
  );
}

// PRACTICAL 15: Student Management Application.
// Login + Add + View + Update + Delete student records.
function Practical15() {
  const [user, setUser] = useState(auth.currentUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [course, setCourse] = useState('');
  const [editId, setEditId] = useState('');

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) {
      setStudents([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = onSnapshot(
      collection(db, 'students'),
      (snapshot) => {
        setStudents(snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        })));
        setLoading(false);
      },
      (error) => {
        Alert.alert('Firestore Error', error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user?.uid]);

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Login successful!');
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created!');
    } catch (error) {
      Alert.alert('Registration Error', error.message);
    }
  };

  const saveStudent = async () => {
    if (!name.trim() || !roll.trim() || !course.trim()) {
      Alert.alert('Error', 'Please fill all student fields.');
      return;
    }

    try {
      if (editId) {
        await updateDoc(doc(db, 'students', editId), {
          name,
          roll,
          course,
        });
        Alert.alert('Success', 'Student updated!');
      } else {
        await addDoc(collection(db, 'students'), {
          name,
          roll,
          course,
          createdBy: user.uid,
          createdAt: new Date().toISOString(),
        });
        Alert.alert('Success', 'Student added!');
      }

      setName('');
      setRoll('');
      setCourse('');
      setEditId('');
    } catch (error) {
      Alert.alert('Save Error', error.message);
    }
  };

  const editStudent = (student) => {
    setEditId(student.id);
    setName(student.name || '');
    setRoll(student.roll || '');
    setCourse(student.course || '');
  };

  const removeStudent = async (id) => {
    try {
      await deleteDoc(doc(db, 'students', id));
      Alert.alert('Success', 'Student deleted!');
    } catch (error) {
      Alert.alert('Delete Error', error.message);
    }
  };

  if (!user) {
    return (
      <View style={styles.card}>
        <Text style={styles.subheading}>Practical 15: Student Management</Text>
        <Field placeholder="Email" value={email} onChangeText={setEmail} />
        <Field
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={login} />
        <View style={styles.button} />
        <Button title="Register New Account" onPress={register} />
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.subheading}>Practical 15: Student Management</Text>
      <Message>Logged in as: {user.email}</Message>
      <Button title="Logout" onPress={() => signOut(auth)} />

      <Text style={styles.subheading}>
        {editId ? 'Update Student' : 'Add Student'}
      </Text>

      <Field placeholder="Student Name" value={name} onChangeText={setName} />
      <Field placeholder="Roll Number" value={roll} onChangeText={setRoll} />
      <Field placeholder="Course" value={course} onChangeText={setCourse} />

      <Button
        title={editId ? 'Update Student' : 'Add Student'}
        onPress={saveStudent}
      />

      {editId !== '' && (
        <Button
          title="Cancel Edit"
          onPress={() => {
            setEditId('');
            setName('');
            setRoll('');
            setCourse('');
          }}
        />
      )}

      <Text style={styles.subheading}>Student Records</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        students.map((student) => (
          <View key={student.id} style={styles.card}>
            <Message>Name: {student.name}</Message>
            <Message>Roll: {student.roll}</Message>
            <Message>Course: {student.course}</Message>
            <Button title="Edit" onPress={() => editStudent(student)} />
            <Button
              title="Delete"
              color="red"
              onPress={() => removeStudent(student.id)}
            />
          </View>
        ))
      )}
    </View>
  );
}

// MAIN APPLICATION: Select practical using ACTIVE_PRACTICAL.
const practicals = {
  1: Practical1,
  2: Practical2,
  3: Practical3,
  4: Practical4,
  5: Practical5,
  6: Practical6,
  7: Practical7,
  8: Practical8,
  9: Practical9,
  10: Practical10,
  11: Practical11,
  12: Practical12,
  13: Practical13,
  14: Practical14,
  15: Practical15,
};

export default function App() {
  const SelectedPractical = practicals[ACTIVE_PRACTICAL] || Practical1;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>
        LAB SHEET 10{"\n"}
        Firebase Authentication and Firestore
      </Text>

      <Text style={styles.text}>
        Selected Practical: {ACTIVE_PRACTICAL}
      </Text>

      <SelectedPractical />
    </ScrollView>
  );
}
y

