// BCA303P - Mobile Application Development
// Lab Sheet 2 - React Native JavaScript

import React, {useState} from 'react';
import {
  SafeAreaView, View, Text, Image, ScrollView, TextInput,
  TouchableOpacity, StyleSheet, Alert
} from 'react-native';

const ACTIVE_PRACTICAL = 1;

const styles = StyleSheet.create({
  page: {flex: 1, padding: 20, backgroundColor: '#f5f7fb'},
  center: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  heading: {fontSize: 24, fontWeight: 'bold', marginBottom: 16},
  text: {fontSize: 18, marginVertical: 6},
  card: {backgroundColor: 'white', padding: 18, marginVertical: 8,
    borderRadius: 12, elevation: 3},
  row: {flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-around'},
  field: {borderWidth: 1, borderColor: '#999', borderRadius: 8,
    padding: 12, marginVertical: 8, backgroundColor: 'white'},
  button: {backgroundColor: '#2563eb', padding: 13,
    borderRadius: 8, marginVertical: 6, alignItems: 'center'},
  buttonText: {color: 'white', fontWeight: 'bold'},
  image: {width: 180, height: 140, borderRadius: 10, margin: 10},
});

function Page({title, children}) {
  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.heading}>{title}</Text>
      <ScrollView>{children}</ScrollView>
    </SafeAreaView>
  );
}

function Label({children}) {
  return <Text style={styles.text}>{children}</Text>;
}

function Action({title, onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

// 1. Hello Flutter
function Practical1() {
  return (
    <View style={styles.center}>
      <Text style={{fontSize: 30}}>Hello Flutter</Text>
    </View>
  );
}

// 2. Student Details
function Practical2() {
  return (
    <Page title="Student Details">
      <Label>Name: Your Name</Label>
      <Label>Course: BCA</Label>
      <Label>Semester: Your Semester</Label>
      <Label>College: Your College Name</Label>
    </Page>
  );
}

// 3. Text Styles
function Practical3() {
  return (
    <Page title="Text Styles">
      <Text style={{fontWeight: 'bold', fontSize: 20}}>Bold Text</Text>
      <Text style={{fontStyle: 'italic'}}>Italic Text</Text>
      <Text style={{fontSize: 30}}>Large Text</Text>
      <Text style={{fontSize: 12}}>Small Text</Text>
      <Text style={{textAlign: 'center'}}>Centered Text</Text>
      <Text style={{textAlign: 'right'}}>Right Aligned Text</Text>
    </Page>
  );
}

// 4. Display Image
function Practical4() {
  return (
    <Page title="Image Component">
      <Image
        style={styles.image}
        source={{uri: 'https://picsum.photos/400/300'}}
        resizeMode="cover"
      />
    </Page>
  );
}

// 5. Display Icons
function Practical5() {
  return (
    <Page title="Icon Demonstration">
      <View style={styles.row}>
        <Text style={{fontSize: 42}}>⌂</Text>
        <Text style={{fontSize: 42}}>♥</Text>
        <Text style={{fontSize: 42}}>★</Text>
        <Text style={{fontSize: 42}}>●</Text>
      </View>
    </Page>
  );
}
// 6. Text, Image and Icon
function Practical6() {
  return (
    <Page title="Text, Image and Icon">
      <Text style={styles.text}>Welcome to Mobile Application Development</Text>
      <Image
        style={styles.image}
        source={{uri: 'https://picsum.photos/300/200'}}
      />
      <Text style={{fontSize: 42, textAlign: 'center'}}>★</Text>
    </Page>
  );
}

// 7. Container / View
function Practical7() {
  return (
    <Page title="Container Widget">
      <View style={{
        height: 180, width: '90%', margin: 20, padding: 24,
        backgroundColor: '#bfdbfe', borderWidth: 2,
        borderColor: '#2563eb', borderRadius: 16,
        justifyContent: 'center', alignItems: 'center'
      }}>
        <Text style={styles.text}>Customized Container</Text>
      </View>
    </Page>
  );
}

// 8. Horizontal Row
function Practical8() {
  return (
    <Page title="Row Widget">
      <View style={styles.row}>
        <Label>One</Label>
        <Label>Two</Label>
        <Label>Three</Label>
      </View>
    </Page>
  );
}

// 9. Vertical Column
function Practical9() {
  return (
    <Page title="Column Widget">
      <View style={{alignItems: 'center'}}>
        <Label>First</Label>
        <Label>Second</Label>
        <Label>Third</Label>
      </View>
    </Page>
  );
}

// 10. Submit, Reset and Cancel Buttons
function Practical10() {
  const [message, setMessage] = useState('Choose an action');

  return (
    <Page title="Button Actions">
      <Label>{message}</Label>

      <Action title="Submit"
        onPress={() => setMessage('Submitted successfully')} />

      <Action title="Reset"
        onPress={() => setMessage('Form reset')} />

      <Action title="Cancel"
        onPress={() => setMessage('Cancelled')} />
    </Page>
  );
}

// 11. Student Profile Card
function Practical11() {
  return (
    <Page title="Student Profile Card">
      <View style={styles.card}>
        <Text style={{fontSize: 54, textAlign: 'center'}}>👤</Text>
        <Text style={[styles.heading, {textAlign: 'center'}]}>
          Your Name
        </Text>
        <Label>BCA Student</Label>
        <Label>College: ABC College</Label>
        <Label>Email: student@example.com</Label>
      </View>
    </Page>
  );
}
// 12. Business Card
function Practical12() {
  return (
    <Page title="Business Card">
      <View style={styles.card}>
        <Text style={{fontSize: 48, textAlign: 'center'}}>👤</Text>
        <Text style={[styles.heading, {textAlign: 'center'}]}>
          Your Name
        </Text>
        <Label>Phone: +91 00000 00000</Label>
        <Label>Email: you@example.com</Label>
      </View>
    </Page>
  );
}

// 13. Login Screen
function Practical13() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Page title="Login Screen">
      <Text style={{fontSize: 48, textAlign: 'center'}}>🔐</Text>

      <TextInput
        style={styles.field}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.field}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Action
        title="Login"
        onPress={() => Alert.alert('Login', `Welcome ${username}`)}
      />
    </Page>
  );
}

// 14. Registration Screen
function Practical14() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Page title="Registration">
      <TextInput
        style={styles.field}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.field}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.field}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Action
        title="Register"
        onPress={() => Alert.alert('Registration', `Registered: ${name}`)}
      />
    </Page>
  );
}

// 15. College Home Screen
function Practical15() {
  return (
    <Page title="ABC College Home">
      <Text style={{fontSize: 60, textAlign: 'center'}}>🎓</Text>

      <Text style={[styles.heading, {textAlign: 'center'}]}>
        ABC College
      </Text>

      <Action title="Courses"
        onPress={() => Alert.alert('Courses')} />

      <Action title="Admissions"
        onPress={() => Alert.alert('Admissions')} />

      <Action title="Contact Us"
        onPress={() => Alert.alert('Contact Us')} />
    </Page>
  );
}

// 16. Multiple Products using Cards
function Practical16() {
  const products = ['Laptop', 'Headphones', 'Smartphone'];

  return (
    <Page title="Product List">
      {products.map(item => (
        <View key={item} style={styles.card}>
          <Label>🛍️ {item}</Label>
        </View>
      ))}
    </Page>
  );
}
// 17. Student Information Card
function Practical17() {
  return (
    <Page title="Student Information">
      <View style={styles.card}>
        <Text style={styles.heading}>Student Details</Text>
        <Label>Name: Your Name</Label>
        <Label>Roll Number: 101</Label>
        <Label>Course: BCA</Label>
        <Label>Semester: Your Semester</Label>
      </View>
    </Page>
  );
}

// 18. Padding and Margin
function Practical18() {
  return (
    <Page title="Padding and Margin">
      <View style={{margin: 30, backgroundColor: '#fed7aa'}}>
        <View style={{padding: 28}}>
          <Text style={styles.text}>
            Outer spacing is margin; inner spacing is padding.
          </Text>
        </View>
      </View>
    </Page>
  );
}

// 19. Center and Alignment
function Practical19() {
  return (
    <Page title="Alignment">
      <View style={{
        height: 180, justifyContent: 'center',
        alignItems: 'center', backgroundColor: '#dbeafe'
      }}>
        <Label>Centered Widget</Label>
      </View>

      <View style={{
        height: 180, justifyContent: 'flex-end',
        alignItems: 'flex-end', backgroundColor: '#dcfce7',
        padding: 12
      }}>
        <Label>Bottom Right</Label>
      </View>
    </Page>
  );
}

// 20. Food Menu Screen
function Practical20() {
  const foods = ['Pizza', 'Burger', 'Sandwich'];

  return (
    <Page title="Food Menu">
      {foods.map(food => (
        <View key={food} style={styles.card}>
          <Label>🍽️ {food}</Label>
          <Action
            title="Order"
            onPress={() => Alert.alert('Order', `${food} selected`)}
          />
        </View>
      ))}
    </Page>
  );
}

// 21. Simple Calculator
function Practical21() {
  const [display, setDisplay] = useState('0');
  const [stored, setStored] = useState(null);
  const [operator, setOperator] = useState(null);

  function press(key) {
    if (key === 'C') {
      setDisplay('0');
      setStored(null);
      setOperator(null);
      return;
    }

    if (['+', '-', '×', '÷'].includes(key)) {
      setStored(Number(display));
      setOperator(key);
      setDisplay('0');
      return;
    }

    if (key === '=') {
      const a = stored ?? 0;
      const b = Number(display);
      let result = b;

      if (operator === '+') result = a + b;
      if (operator === '-') result = a - b;
      if (operator === '×') result = a * b;
      if (operator === '÷') result = b === 0 ? 'Error' : a / b;

      setDisplay(String(result));
      setStored(null);
      setOperator(null);
      return;
    }

    setDisplay(display === '0' ? key : display + key);
  }

  const keys = [
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '-',
    'C', '0', '=', '+'
  ];

  return (
    <Page title="Calculator">
      <Text style={{fontSize: 36, textAlign: 'right', padding: 18}}>
        {display}
      </Text>

      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {keys.map(key => (
          <TouchableOpacity
            key={key}
            onPress={() => press(key)}
            style={[styles.button, {width: '22%', margin: '1%'}]}
          >
            <Text style={styles.buttonText}>{key}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Page>
  );
}
// 22. Weather Information Screen
function Practical22() {
  return (
    <Page title="Weather Information">
      <View style={styles.card}>
        <Text style={{fontSize: 55, textAlign: 'center'}}>☀️</Text>
        <Text style={styles.heading}>Agra</Text>
        <Text style={{fontSize: 38, textAlign: 'center'}}>32°C</Text>
        <Label>Sunny</Label>
        <Label>Humidity: 45%</Label>
        <Label>Wind: 12 km/h</Label>
      </View>
    </Page>
  );
}

// 23. Shopping Product Screen
function Practical23() {
  const products = [
    {name: 'Headphones', price: '₹999', emoji: '🎧'},
    {name: 'Smart Watch', price: '₹1,999', emoji: '⌚'},
    {name: 'Shoes', price: '₹1,499', emoji: '👟'}
  ];

  return (
    <Page title="Shopping Products">
      {products.map(product => (
        <View key={product.name} style={styles.card}>
          <Text style={{fontSize: 40, textAlign: 'center'}}>
            {product.emoji}
          </Text>
          <Label>{product.name}</Label>
          <Label>{product.price}</Label>
          <Action
            title="Add to Cart"
            onPress={() => Alert.alert('Cart', `${product.name} added`)}
          />
        </View>
      ))}
    </Page>
  );
}

// 24. Student Dashboard
function Practical24() {
  return (
    <Page title="Student Dashboard">
      <View style={styles.card}>
        <Text style={styles.heading}>Welcome, Student!</Text>
        <Label>Attendance: 85%</Label>
        <Label>Assignments: 8 Completed</Label>
        <Label>Upcoming Exams: 2</Label>
      </View>

      <View style={styles.card}>
        <Label>My Courses</Label>
        <Label>• Mobile Application Development</Label>
        <Label>• Database Management</Label>
        <Label>• Software Engineering</Label>
      </View>
    </Page>
  );
}

// 25. Personal Profile Screen
function Practical25() {
  return (
    <Page title="Personal Profile">
      <View style={styles.card}>
        <Text style={{fontSize: 65, textAlign: 'center'}}>👤</Text>
        <Text style={styles.heading}>Your Name</Text>
        <Label>Student | BCA</Label>
        <Label>Email: student@example.com</Label>
        <Label>Location: India</Label>
        <Action
          title="Edit Profile"
          onPress={() => Alert.alert('Profile', 'Edit Profile clicked')}
        />
      </View>
    </Page>
  );
}

// Select which practical to display (1 to 25).
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
  16: Practical16,
  17: Practical17,
  18: Practical18,
  19: Practical19,
  20: Practical20,
  21: Practical21,
  22: Practical22,
  23: Practical23,
  24: Practical24,
  25: Practical25
};

export default function App() {
  const SelectedPractical = practicals[ACTIVE_PRACTICAL] || Practical1;
  return <SelectedPractical />;
}

