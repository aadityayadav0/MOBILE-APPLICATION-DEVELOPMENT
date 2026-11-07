// BCA303P - Mobile Application Development
// LAB SHEET 5: Lists, Grids and Dynamic User Interface
// React Native JavaScript Implementation

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native';

const ACTIVE_PRACTICAL = 1;

const s = StyleSheet.create({
  page: { flex: 1, padding: 16, backgroundColor: '#f4f6f9' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#222' },
  text: { fontSize: 16, color: '#333', marginVertical: 6 },
  card: { backgroundColor: 'white', padding: 14, marginVertical: 6, borderRadius: 8 },
  button: { backgroundColor: '#2563eb', padding: 12, marginVertical: 5, borderRadius: 7 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  input: { backgroundColor: 'white', borderWidth: 1, borderColor: '#aaa', padding: 11, marginVertical: 8, borderRadius: 7 },
  divider: { height: 1, backgroundColor: '#ccc', marginVertical: 5 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridBox: { width: '31%', height: 90, backgroundColor: '#dbeafe', marginVertical: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 8 }
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

// 1. Display five items using a list.
function P1() {
  const items = ['Apple', 'Banana', 'Mango', 'Orange', 'Grapes'];

  return (
    <Page title="1. List of Five Items">
      {items.map((item, index) => (
        <View style={s.card} key={index}>
          <T>{item}</T>
        </View>
      ))}
    </Page>
  );
}

// 2. Display items with icon, title and subtitle.
function P2() {
  const items = [
    { icon: '📚', title: 'Books', subtitle: 'Study materials' },
    { icon: '🎓', title: 'College', subtitle: 'Education center' },
    { icon: '💻', title: 'Computer', subtitle: 'Technology' },
    { icon: '📱', title: 'Mobile', subtitle: 'Communication' }
  ];

  return (
    <Page title="2. List with Icon and Subtitle">
      {items.map((item, index) => (
        <View style={s.card} key={index}>
          <T>{item.icon}  {item.title}</T>
          <Text style={{ color: '#666', marginLeft: 35 }}>
            {item.subtitle}
          </Text>
        </View>
      ))}
    </Page>
  );
}

// 3. Display numbers from 1 to 100.
function P3() {
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <Page title="3. Numbers from 1 to 100">
      {numbers.map(number => (
        <View style={s.card} key={number}>
          <T>{number}</T>
        </View>
      ))}
    </Page>
  );
}

// 4. Display names stored in a JavaScript array.
function P4() {
  const names = ['Aman', 'Priya', 'Rahul', 'Neha', 'Rohit', 'Anjali'];

  return (
    <Page title="4. List of Names">
      {names.map((name, index) => (
        <View style={s.card} key={index}>
          <T>{name}</T>
        </View>
      ))}
    </Page>
  );
}

// 5. Display items separated by dividers.
function P5() {
  const items = ['Home', 'About', 'Services', 'Contact', 'Settings'];

  return (
    <Page title="5. List with Dividers">
      {items.map((item, index) => (
        <View key={index}>
          <View style={s.card}>
            <T>{item}</T>
          </View>
          {index !== items.length - 1 && <View style={s.divider} />}
        </View>
      ))}
    </Page>
  );
}
// 6. Display a horizontally scrolling list.
function P6() {
  const items = ['Apple', 'Banana', 'Mango', 'Orange', 'Grapes'];

  return (
    <Page title="6. Horizontal Scrolling List">
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        {items.map((item, index) => (
          <View
            key={index}
            style={[s.card, { width: 130, height: 100, justifyContent: 'center' }]}
          >
            <T>{item}</T>
          </View>
        ))}
      </ScrollView>
    </Page>
  );
}

// 7. Display a grid of icons.
function P7() {
  const icons = ['🏠', '📚', '🎓', '💻', '📱', '⚽', '🎵', '🚗', '🌍'];

  return (
    <Page title="7. Grid of Icons">
      <View style={s.grid}>
        {icons.map((icon, index) => (
          <View style={s.gridBox} key={index}>
            <Text style={{ fontSize: 30 }}>{icon}</Text>
          </View>
        ))}
      </View>
    </Page>
  );
}

// 8. Display colored boxes in a grid.
function P8() {
  const colors = [
    '#ef4444', '#22c55e', '#3b82f6',
    '#eab308', '#a855f7', '#ec4899',
    '#14b8a6', '#f97316', '#64748b'
  ];

  return (
    <Page title="8. Grid of Colored Boxes">
      <View style={s.grid}>
        {colors.map((color, index) => (
          <View
            key={index}
            style={[s.gridBox, { backgroundColor: color }]}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Box {index + 1}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  );
}

// 9. Display products using a model class.
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

function P9() {
  const products = [
    new Product('Notebook', 50),
    new Product('Pen', 10),
    new Product('School Bag', 500),
    new Product('Water Bottle', 120),
    new Product('Pencil Box', 80)
  ];

  return (
    <Page title="9. Product List">
      {products.map((product, index) => (
        <View style={s.card} key={index}>
          <T>{product.name}</T>
          <T>Price: ₹{product.price}</T>
        </View>
      ))}
    </Page>
  );
}

// 10. Demonstrate Stateless and Stateful components.
function StatelessMessage() {
  return <T>This is a Stateless Component.</T>;
}

function StatefulCounter() {
  const [count, setCount] = useState(0);

  return (
    <View style={s.card}>
      <T>Stateful Counter: {count}</T>
      <B title="Increase" onPress={() => setCount(count + 1)} />
    </View>
  );
}

function P10() {
  return (
    <Page title="10. Stateless and Stateful">
      <StatelessMessage />
      <StatefulCounter />
    </Page>
  );
}
// 11. Counter that increases using state.
function P11() {
  const [count, setCount] = useState(0);

  return (
    <Page title="11. Increment Counter">
      <T>Counter Value: {count}</T>
      <B title="Increase Counter" onPress={() => setCount(count + 1)} />
    </Page>
  );
}

// 12. Increment, Decrement and Reset counter.
function P12() {
  const [count, setCount] = useState(0);

  return (
    <Page title="12. Counter Operations">
      <T>Counter: {count}</T>
      <B title="Increment (+)" onPress={() => setCount(count + 1)} />
      <B
        title="Decrement (-)"
        onPress={() => setCount(count - 1)}
      />
      <B title="Reset" onPress={() => setCount(0)} />
    </Page>
  );
}

// 13. Add a new item using TextInput and button.
function P13() {
  const [items, setItems] = useState(['Apple', 'Banana']);
  const [value, setValue] = useState('');

  const addItem = () => {
    if (!value.trim()) {
      Alert.alert('Please enter an item');
      return;
    }
    setItems([...items, value.trim()]);
    setValue('');
  };

  return (
    <Page title="13. Add New List Item">
      <TextInput
        style={s.input}
        placeholder="Enter new item"
        value={value}
        onChangeText={setValue}
      />
      <B title="Add Item" onPress={addItem} />
      {items.map((item, index) => (
        <View style={s.card} key={index}>
          <T>{item}</T>
        </View>
      ))}
    </Page>
  );
}

// 14. Delete an item by pressing its delete button.
function P14() {
  const [items, setItems] = useState([
    'Apple', 'Banana', 'Mango', 'Orange'
  ]);

  const deleteItem = index => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <Page title="14. Delete List Item">
      {items.map((item, index) => (
        <View
          style={[s.card, { flexDirection: 'row', alignItems: 'center' }]}
          key={index}
        >
          <View style={{ flex: 1 }}>
            <T>{item}</T>
          </View>
          <B title="Delete" onPress={() => deleteItem(index)} />
        </View>
      ))}
      {items.length === 0 && <T>No items available.</T>}
    </Page>
  );
}

// 15. Remove list items by swiping.
function P15() {
  const [items, setItems] = useState([
    'Apple', 'Banana', 'Mango', 'Orange'
  ]);

  const deleteItem = index => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <Page title="15. Swipe to Delete">
      <T>Press the Remove button to dismiss an item.</T>
      {items.map((item, index) => (
        <View
          style={[s.card, { flexDirection: 'row', alignItems: 'center' }]}
          key={index}
        >
          <View style={{ flex: 1 }}>
            <T>{item}</T>
          </View>
          <B title="Remove" onPress={() => deleteItem(index)} />
        </View>
      ))}
      {items.length === 0 && <T>All items removed.</T>}
    </Page>
  );
}
// 16. Filter a list of names using search input.
function P16() {
  const names = [
    'Aman', 'Priya', 'Rahul', 'Neha',
    'Rohit', 'Anjali', 'Karan', 'Pooja'
  ];

  const [search, setSearch] = useState('');

  const filteredNames = names.filter(name =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Page title="16. Search and Filter Names">
      <TextInput
        style={s.input}
        placeholder="Search name..."
        value={search}
        onChangeText={setSearch}
      />

      {filteredNames.map((name, index) => (
        <View style={s.card} key={index}>
          <T>{name}</T>
        </View>
      ))}

      {filteredNames.length === 0 && <T>No names found.</T>}
    </Page>
  );
}

// 17. Student Record List Application.
// Add student, search by name and delete student.
function P17() {
  const [students, setStudents] = useState([
    { id: '1', name: 'Aman', roll: '101', course: 'BCA' },
    { id: '2', name: 'Priya', roll: '102', course: 'BBA' },
    { id: '3', name: 'Rahul', roll: '103', course: 'BCA' }
  ]);

  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [course, setCourse] = useState('');
  const [search, setSearch] = useState('');

  const addStudent = () => {
    if (!name.trim() || !roll.trim() || !course.trim()) {
      Alert.alert('Please fill all student details');
      return;
    }

    setStudents([
      ...students,
      {
        id: Date.now().toString(),
        name: name.trim(),
        roll: roll.trim(),
        course: course.trim()
      }
    ]);

    setName('');
    setRoll('');
    setCourse('');
  };

  const deleteStudent = id => {
    setStudents(students.filter(student => student.id !== id));
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Page title="17. Student Record List Application">
      <TextInput
        style={s.input}
        placeholder="Student Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={s.input}
        placeholder="Roll Number"
        value={roll}
        onChangeText={setRoll}
      />

      <TextInput
        style={s.input}
        placeholder="Course"
        value={course}
        onChangeText={setCourse}
      />

      <B title="Add Student" onPress={addStudent} />

      <TextInput
        style={s.input}
        placeholder="Search student by name"
        value={search}
        onChangeText={setSearch}
      />

      <T>Total Students: {students.length}</T>

      {filteredStudents.map(student => (
        <View style={s.card} key={student.id}>
          <T>Name: {student.name}</T>
          <T>Roll Number: {student.roll}</T>
          <T>Course: {student.course}</T>
          <B
            title="Delete Student"
            onPress={() => deleteStudent(student.id)}
          />
        </View>
      ))}

      {filteredStudents.length === 0 && (
        <T>No student records found.</T>
      )}
    </Page>
  );
}

