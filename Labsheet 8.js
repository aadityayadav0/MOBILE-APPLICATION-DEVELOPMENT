
// BCA303P - Mobile Application Development
// LAB SHEET 8: Flutter SQLite Applications
// JavaScript / React Native Version

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
    database = await SQLite.openDatabaseAsync('labsheet8.db');
  }
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      amount REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed INTEGER DEFAULT 0
    );
  `);
  return database;
}

const s = StyleSheet.create({
  page: {flex: 1, padding: 18, backgroundColor: '#f3f4f6'},
  heading: {fontSize: 22, fontWeight: 'bold',
    color: '#172554', marginBottom: 15},
  text: {fontSize: 16, color: '#222', marginBottom: 8},
  input: {backgroundColor: 'white', borderWidth: 1,
    borderColor: '#aaa', borderRadius: 7,
    padding: 11, marginBottom: 10},
  btn: {backgroundColor: '#2563eb', padding: 13,
    borderRadius: 7, marginVertical: 5},
  btnText: {color: 'white', textAlign: 'center',
    fontWeight: 'bold'},
  card: {backgroundColor: 'white', padding: 12,
    marginVertical: 5, borderRadius: 7}
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

// PRACTICAL 1: Notes App - Insert and Display Notes
function P1() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);

  async function loadNotes() {
    const db = await getDB();
    const rows = await db.getAllAsync(
      'SELECT * FROM notes ORDER BY id DESC'
    );
    setNotes(rows);
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function addNote() {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Error', 'Enter title and content');
      return;
    }

    const db = await getDB();
    await db.runAsync(
      'INSERT INTO notes (title, content) VALUES (?, ?)',
      title, content
    );

    setTitle('');
    setContent('');
    loadNotes();
  }

  return (
    <Page title="Practical 1: SQLite Notes App">
      <TextInput style={s.input} placeholder="Note Title"
        value={title} onChangeText={setTitle} />
      <TextInput style={s.input} placeholder="Note Content"
        multiline value={content} onChangeText={setContent} />
      <B title="Add Note" onPress={addNote} />

      {notes.map(note => (
        <View style={s.card} key={note.id}>
          <T>Title: {note.title}</T>
          <T>Content: {note.content}</T>
        </View>
      ))}
    </Page>
  );
}

// PRACTICAL 2: Edit Existing Note
function P2() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);

  async function loadNotes() {
    const db = await getDB();
    setNotes(await db.getAllAsync('SELECT * FROM notes'));
  }

  useEffect(() => {
    loadNotes();
  }, []);

  function selectNote(note) {
    setEditId(note.id);
    setTitle(note.title);
    setContent(note.content);
  }

  async function saveNote() {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Error', 'Fill all fields');
      return;
    }

    const db = await getDB();

    if (editId) {
      await db.runAsync(
        'UPDATE notes SET title=?, content=? WHERE id=?',
        title, content, editId
      );
    } else {
      await db.runAsync(
        'INSERT INTO notes (title, content) VALUES (?, ?)',
        title, content
      );
    }

    setTitle('');
    setContent('');
    setEditId(null);
    loadNotes();
  }

  return (
    <Page title="Practical 2: Edit Notes">
      <TextInput style={s.input} placeholder="Note Title"
        value={title} onChangeText={setTitle} />
      <TextInput style={s.input} placeholder="Note Content"
        multiline value={content} onChangeText={setContent} />
      <B title={editId ? 'Update Note' : 'Add Note'}
        onPress={saveNote} />

      <T>Select a note to edit:</T>
      {notes.map(note => (
        <TouchableOpacity key={note.id}
          style={s.card} onPress={() => selectNote(note)}>
          <T>{note.title}</T>
          <T>{note.content}</T>
        </TouchableOpacity>
      ))}
    </Page>
  );
}

// PRACTICAL 3: Delete Note
function P3() {
  const [notes, setNotes] = useState([]);

  async function loadNotes() {
    const db = await getDB();
    setNotes(await db.getAllAsync('SELECT * FROM notes'));
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function deleteNote(id) {
    const db = await getDB();
    await db.runAsync('DELETE FROM notes WHERE id=?', id);
    loadNotes();
    Alert.alert('Success', 'Note deleted successfully!');
  }

  return (
    <Page title="Practical 3: Delete Notes">
      {notes.map(note => (
        <View style={s.card} key={note.id}>
          <T>{note.title}</T>
          <T>{note.content}</T>
          <B title="Delete Note"
            onPress={() => deleteNote(note.id)} />
        </View>
      ))}
    </Page>
  );
}

// PRACTICAL 4: Search Notes by Title
function P4() {
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState([]);

  async function searchNotes(value) {
    setSearch(value);
    const db = await getDB();
    const rows = await db.getAllAsync(
      'SELECT * FROM notes WHERE title LIKE ?',
      '%' + value + '%'
    );
    setNotes(rows);
  }

  return (
    <Page title="Practical 4: Search Notes">
      <TextInput style={s.input}
        placeholder="Search by note title"
        value={search} onChangeText={searchNotes} />

      {notes.map(note => (
        <View style={s.card} key={note.id}>
          <T>Title: {note.title}</T>
          <T>Content: {note.content}</T>
        </View>
      ))}
    </Page>
  );
}


// PRACTICAL 5: Contact Book - Add and Display Contacts
function P5() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [contacts, setContacts] = useState([]);

  async function loadContacts() {
    const db = await getDB();
    setContacts(await db.getAllAsync(
      'SELECT * FROM contacts ORDER BY id DESC'
    ));
  }

  useEffect(() => {
    loadContacts();
  }, []);

  async function addContact() {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Error', 'Enter name and phone number');
      return;
    }

    const db = await getDB();
    await db.runAsync(
      'INSERT INTO contacts (name, phone) VALUES (?, ?)',
      name, phone
    );

    setName('');
    setPhone('');
    loadContacts();
  }

  return (
    <Page title="Practical 5: Contact Book">
      <TextInput style={s.input} placeholder="Contact Name"
        value={name} onChangeText={setName} />
      <TextInput style={s.input} placeholder="Phone Number"
        keyboardType="phone-pad" value={phone}
        onChangeText={setPhone} />
      <B title="Save Contact" onPress={addContact} />

      {contacts.map(contact => (
        <View style={s.card} key={contact.id}>
          <T>Name: {contact.name}</T>
          <T>Phone: {contact.phone}</T>
        </View>
      ))}
    </Page>
  );
}

// PRACTICAL 6: Delete Contact After Confirmation
function P6() {
  const [contacts, setContacts] = useState([]);

  async function loadContacts() {
    const db = await getDB();
    setContacts(await db.getAllAsync('SELECT * FROM contacts'));
  }

  useEffect(() => {
    loadContacts();
  }, []);

  function confirmDelete(id) {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this contact?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const db = await getDB();
            await db.runAsync(
              'DELETE FROM contacts WHERE id=?', id
            );
            loadContacts();
            Alert.alert('Success', 'Contact deleted!');
          }
        }
      ]
    );
  }

  return (
    <Page title="Practical 6: Delete Contact">
      {contacts.map(contact => (
        <View style={s.card} key={contact.id}>
          <T>{contact.name}</T>
          <T>{contact.phone}</T>
          <B title="Delete Contact"
            onPress={() => confirmDelete(contact.id)} />
        </View>
      ))}
    </Page>
  );
}

// PRACTICAL 7: Search Contacts Using LIKE
function P7() {
  const [search, setSearch] = useState('');
  const [contacts, setContacts] = useState([]);

  async function searchContacts(value) {
    setSearch(value);
    const db = await getDB();
    const rows = await db.getAllAsync(
      'SELECT * FROM contacts WHERE name LIKE ?',
      '%' + value + '%'
    );
    setContacts(rows);
  }

  useEffect(() => {
    searchContacts('');
  }, []);

  return (
    <Page title="Practical 7: Search Contacts">
      <TextInput style={s.input}
        placeholder="Search contact by name"
        value={search} onChangeText={searchContacts} />

      {contacts.map(contact => (
        <View style={s.card} key={contact.id}>
          <T>Name: {contact.name}</T>
          <T>Phone: {contact.phone}</T>
        </View>
      ))}
    </Page>
  );
}


// PRACTICAL 8: Expense Tracker
function P8() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState([]);

  async function loadExpenses() {
    const db = await getDB();
    setExpenses(await db.getAllAsync(
      'SELECT * FROM expenses ORDER BY id DESC'
    ));
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  async function addExpense() {
    if (!title.trim() || !amount || Number(amount) <= 0) {
      Alert.alert('Error', 'Enter valid expense details');
      return;
    }

    const db = await getDB();
    await db.runAsync(
      'INSERT INTO expenses (title, amount) VALUES (?, ?)',
      title, Number(amount)
    );

    setTitle('');
    setAmount('');
    loadExpenses();
  }

  return (
    <Page title="Practical 8: Expense Tracker">
      <TextInput style={s.input} placeholder="Expense Title"
        value={title} onChangeText={setTitle} />
      <TextInput style={s.input} placeholder="Amount"
        keyboardType="decimal-pad" value={amount}
        onChangeText={setAmount} />
      <B title="Add Expense" onPress={addExpense} />

      {expenses.map(item => (
        <View style={s.card} key={item.id}>
          <T>{item.title}</T>
          <T>Amount: ₹{item.amount}</T>
        </View>
      ))}
    </Page>
  );
}

// PRACTICAL 9: Total Expense Using SUM()
function P9() {
  const [total, setTotal] = useState(0);
  const [expenses, setExpenses] = useState([]);

  async function calculateTotal() {
    const db = await getDB();
    const result = await db.getFirstAsync(
      'SELECT SUM(amount) AS total FROM expenses'
    );
    setTotal(result.total || 0);
    setExpenses(await db.getAllAsync('SELECT * FROM expenses'));
  }

  return (
    <Page title="Practical 9: Total Expense">
      <B title="Calculate Total" onPress={calculateTotal} />
      <Text style={s.heading}>Total: ₹{total}</Text>

      {expenses.map(item => (
        <View style={s.card} key={item.id}>
          <T>{item.title}: ₹{item.amount}</T>
        </View>
      ))}
    </Page>
  );
}

// PRACTICAL 10: To-Do App with Completed Checkbox
function P10() {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState([]);

  async function loadTasks() {
    const db = await getDB();
    setTasks(await db.getAllAsync('SELECT * FROM tasks'));
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function addTask() {
    if (!title.trim()) {
      Alert.alert('Error', 'Enter a task');
      return;
    }

    const db = await getDB();
    await db.runAsync(
      'INSERT INTO tasks (title, completed) VALUES (?, 0)',
      title
    );
    setTitle('');
    loadTasks();
  }

  async function toggleTask(task) {
    const db = await getDB();
    await db.runAsync(
      'UPDATE tasks SET completed=? WHERE id=?',
      task.completed ? 0 : 1, task.id
    );
    loadTasks();
  }

  return (
    <Page title="Practical 10: To-Do App">
      <TextInput style={s.input} placeholder="Enter Task"
        value={title} onChangeText={setTitle} />
      <B title="Add Task" onPress={addTask} />

      {tasks.map(task => (
        <View style={s.card} key={task.id}>
          <TouchableOpacity onPress={() => toggleTask(task)}>
            <Text style={s.text}>
              {task.completed ? '☑' : '☐'} {task.title}
              {task.completed ? ' (Completed)' : ''}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </Page>
  );
}

// PRACTICAL 11: User Registration Using SQLite
function P11() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function register() {
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert('Error', 'Fill all fields');
      return;
    }

    try {
      const db = await getDB();
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT,
          password TEXT
        );
      `);

      await db.runAsync(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        name, email, password
      );

      setMessage('Registration successful!');
      setName('');
      setEmail('');
      setPassword('');
    } catch (e) {
      setMessage(e.message);
    }
  }

  return (
    <Page title="Practical 11: User Registration">
      <TextInput style={s.input} placeholder="Full Name"
        value={name} onChangeText={setName} />
      <TextInput style={s.input} placeholder="Email"
        keyboardType="email-address" autoCapitalize="none"
        value={email} onChangeText={setEmail} />
      <TextInput style={s.input} placeholder="Password"
        secureTextEntry value={password}
        onChangeText={setPassword} />
      <B title="Register" onPress={register} />
      <T>{message}</T>
    </Page>
  );
}

// PRACTICAL 12: Login Using SQLite Database
function P12() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function login() {
    try {
      const db = await getDB();
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT,
          password TEXT
        );
      `);

      const user = await db.getFirstAsync(
        'SELECT * FROM users WHERE email=? AND password=?',
        email, password
      );

      setMessage(user
        ? 'Login successful! Welcome ' + user.name
        : 'Invalid email or password');
    } catch (e) {
      setMessage(e.message);
    }
  }

  return (
    <Page title="Practical 12: Login">
      <TextInput style={s.input} placeholder="Email"
        autoCapitalize="none" value={email}
        onChangeText={setEmail} />
      <TextInput style={s.input} placeholder="Password"
        secureTextEntry value={password}
        onChangeText={setPassword} />
      <B title="Login" onPress={login} />
      <T>{message}</T>
    </Page>
  );
}

// PRACTICAL 13: Form Validation Before Registration
function P13() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function submitForm() {
    if (!name.trim()) {
      setMessage('Name cannot be empty');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setMessage('Enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters');
      return;
    }

    try {
      const db = await getDB();
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS registrations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT,
          password TEXT
        );
      `);

      await db.runAsync(
        'INSERT INTO registrations (name, email, password) VALUES (?, ?, ?)',
        name, email, password
      );

      setMessage('Form validated and record saved!');
      setName('');
      setEmail('');
      setPassword('');
    } catch (e) {
      setMessage(e.message);
    }
  }

  return (
    <Page title="Practical 13: Form Validation">
      <TextInput style={s.input} placeholder="Name"
        value={name} onChangeText={setName} />
      <TextInput style={s.input} placeholder="Email"
        autoCapitalize="none" value={email}
        onChangeText={setEmail} />
      <TextInput style={s.input} placeholder="Password (minimum 6)"
        secureTextEntry value={password}
        onChangeText={setPassword} />
      <B title="Validate and Save" onPress={submitForm} />
      <T>{message}</T>
    </Page>
  );
}

// PRACTICAL 14: Student List and Add/Edit Student Screens
function P14() {
  const [screen, setScreen] = useState('list');
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [course, setCourse] = useState('');
  const [editId, setEditId] = useState(null);

  async function loadStudents() {
    const db = await getDB();
    setStudents(await db.getAllAsync('SELECT * FROM students'));
  }

  useEffect(() => {
    loadStudents();
  }, []);

  function openAdd() {
    setEditId(null);
    setName('');
    setRoll('');
    setCourse('');
    setScreen('form');
  }

  function openEdit(student) {
    setEditId(student.id);
    setName(student.name);
    setRoll(student.roll);
    setCourse(student.course);
    setScreen('form');
  }

  async function saveStudent() {
    if (!name.trim() || !roll.trim() || !course.trim()) {
      Alert.alert('Error', 'Fill all fields');
      return;
    }

    const db = await getDB();

    if (editId) {
      await db.runAsync(
        'UPDATE students SET name=?, roll=?, course=? WHERE id=?',
        name, roll, course, editId
      );
    } else {
      await db.runAsync(
        'INSERT INTO students (name, roll, course) VALUES (?, ?, ?)',
        name, roll, course
      );
    }

    setScreen('list');
    loadStudents();
  }

  if (screen === 'form') {
    return (
      <Page title="Add/Edit Student Screen">
        <TextInput style={s.input} placeholder="Student Name"
          value={name} onChangeText={setName} />
        <TextInput style={s.input} placeholder="Roll Number"
          value={roll} onChangeText={setRoll} />
        <TextInput style={s.input} placeholder="Course"
          value={course} onChangeText={setCourse} />
        <B title="Save Student" onPress={saveStudent} />
        <B title="Back to List" onPress={() => setScreen('list')} />
      </Page>
    );
  }

  return (
    <Page title="Practical 14: Student List">
      <B title="Add New Student" onPress={openAdd} />
      {students.map(student => (
        <TouchableOpacity key={student.id}
          style={s.card} onPress={() => openEdit(student)}>
          <T>{student.name} - {student.roll}</T>
          <T>{student.course}</T>
          <T>Tap to edit</T>
        </TouchableOpacity>
      ))}
    </Page>
  );
}

// Create Products Table
async function createProductsTable() {
  const db = await getDB();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL
    );
  `);
  return db;
}

// PRACTICAL 15: Product Inventory
function P15() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  async function loadProducts() {
    const db = await createProductsTable();
    setProducts(await db.getAllAsync('SELECT * FROM products'));
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function saveProduct() {
    if (!name.trim() || !quantity || !price ||
        Number(quantity) <= 0 || Number(price) < 0) {
      Alert.alert('Error', 'Enter valid product details');
      return;
    }

    const db = await createProductsTable();

    if (editId) {
      await db.runAsync(
        'UPDATE products SET name=?, quantity=?, price=? WHERE id=?',
        name, Number(quantity), Number(price), editId
      );
    } else {
      await db.runAsync(
        'INSERT INTO products (name, quantity, price) VALUES (?, ?, ?)',
        name, Number(quantity), Number(price)
      );
    }

    setName('');
    setQuantity('');
    setPrice('');
    setEditId(null);
    loadProducts();
  }

  function editProduct(product) {
    setEditId(product.id);
    setName(product.name);
    setQuantity(String(product.quantity));
    setPrice(String(product.price));
  }

  async function deleteProduct(id) {
    const db = await createProductsTable();
    await db.runAsync('DELETE FROM products WHERE id=?', id);
    loadProducts();
  }

  return (
    <Page title="Practical 15: Product Inventory">
      <TextInput style={s.input} placeholder="Product Name"
        value={name} onChangeText={setName} />
      <TextInput style={s.input} placeholder="Quantity"
        keyboardType="numeric" value={quantity}
        onChangeText={setQuantity} />
      <TextInput style={s.input} placeholder="Price"
        keyboardType="decimal-pad" value={price}
        onChangeText={setPrice} />
      <B title={editId ? 'Update Product' : 'Add Product'}
        onPress={saveProduct} />

      {products.map(product => (
        <View style={s.card} key={product.id}>
          <T>{product.name}</T>
          <T>Quantity: {product.quantity}</T>
          <T>Price: ₹{product.price}</T>
          <B title="Edit" onPress={() => editProduct(product)} />
          <B title="Delete" onPress={() => deleteProduct(product.id)} />
        </View>
      ))}
    </Page>
  );
}

// PRACTICAL 16: Shopping Cart
function P16() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [cart, setCart] = useState([]);

  async function loadCart() {
    const db = await getDB();
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price REAL
      );
    `);
    setCart(await db.getAllAsync('SELECT * FROM cart'));
  }

  useEffect(() => {
    loadCart();
  }, []);

  async function addItem() {
    if (!name.trim() || !price || Number(price) <= 0) {
      Alert.alert('Error', 'Enter valid item details');
      return;
    }

    const db = await getDB();
    await db.runAsync(
      'INSERT INTO cart (name, price) VALUES (?, ?)',
      name, Number(price)
    );
    setName('');
    setPrice('');
    loadCart();
  }

  async function removeItem(id) {
    const db = await getDB();
    await db.runAsync('DELETE FROM cart WHERE id=?', id);
    loadCart();
  }

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price), 0
  );

  return (
    <Page title="Practical 16: Shopping Cart">
      <TextInput style={s.input} placeholder="Item Name"
        value={name} onChangeText={setName} />
      <TextInput style={s.input} placeholder="Item Price"
        keyboardType="decimal-pad" value={price}
        onChangeText={setPrice} />
      <B title="Add to Cart" onPress={addItem} />

      {cart.map(item => (
        <View style={s.card} key={item.id}>
          <T>{item.name} - ₹{item.price}</T>
          <B title="Remove Item"
            onPress={() => removeItem(item.id)} />
        </View>
      ))}

      <Text style={s.heading}>Total Price: ₹{total.toFixed(2)}</Text>
    </Page>
  );
}

// PRACTICAL 17: Student Management Application
function P17() {
  const [screen, setScreen] = useState('home');
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [course, setCourse] = useState('');
  const [editId, setEditId] = useState(null);

  async function loadStudents() {
    const db = await getDB();
    setStudents(await db.getAllAsync('SELECT * FROM students'));
  }

  useEffect(() => {
    loadStudents();
  }, []);

  function openForm(student = null) {
    setEditId(student ? student.id : null);
    setName(student ? student.name : '');
    setRoll(student ? student.roll : '');
    setCourse(student ? student.course : '');
    setScreen('form');
  }

  async function saveStudent() {
    if (!name.trim() || !roll.trim() || !course.trim()) {
      Alert.alert('Validation Error', 'All fields are required');
      return;
    }

    const db = await getDB();

    if (editId) {
      await db.runAsync(
        'UPDATE students SET name=?, roll=?, course=? WHERE id=?',
        name, roll, course, editId
      );
    } else {
      await db.runAsync(
        'INSERT INTO students (name, roll, course) VALUES (?, ?, ?)',
        name, roll, course
      );
    }

    setScreen('list');
    loadStudents();
  }

  function confirmDelete(id) {
    Alert.alert('Confirm Delete', 'Delete this student?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const db = await getDB();
          await db.runAsync('DELETE FROM students WHERE id=?', id);
          loadStudents();
        }
      }
    ]);
  }

  if (screen === 'form') {
    return (
      <Page title="Add / Update Student">
        <TextInput style={s.input} placeholder="Name"
          value={name} onChangeText={setName} />
        <TextInput style={s.input} placeholder="Roll Number"
          value={roll} onChangeText={setRoll} />
        <TextInput style={s.input} placeholder="Course"
          value={course} onChangeText={setCourse} />
        <B title="Save Student" onPress={saveStudent} />
        <B title="Back Home" onPress={() => setScreen('home')} />
      </Page>
    );
  }

  if (screen === 'list') {
    return (
      <Page title="Student List">
        <B title="Add Student" onPress={() => openForm()} />
        <B title="Home" onPress={() => setScreen('home')} />
        {students.map(student => (
          <View style={s.card} key={student.id}>
            <T>Name: {student.name}</T>
            <T>Roll: {student.roll}</T>
            <T>Course: {student.course}</T>
            <B title="Update"
              onPress={() => openForm(student)} />
            <B title="Delete"
              onPress={() => confirmDelete(student.id)} />
          </View>
        ))}
      </Page>
    );
  }

  return (
    <Page title="Student Management Home">
      <T>Manage student records using SQLite.</T>
      <B title="Add Student" onPress={() => openForm()} />
      <B title="Student List" onPress={() => {
        loadStudents();
        setScreen('list');
      }} />
    </Page>
  );
}


