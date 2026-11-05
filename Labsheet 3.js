import React, {useState} from 'react';
import {
  View, Text, TextInput, Button, TouchableOpacity,
  ScrollView, Alert, Switch
} from 'react-native';

// Change this number from 1 to 25 to run another practical.
const ACTIVE_PRACTICAL = 1;

const styles = {
  page: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f1f5f9'
  },
  heading: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 18,
    color: '#1e293b'
  },
  text: {
    fontSize: 17,
    color: '#334155',
    marginVertical: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#94a3b8',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    backgroundColor: 'white',
    fontSize: 16
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginVertical: 8
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 13,
    borderRadius: 8,
    marginVertical: 6,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
};

function Page({title, children}) {
  return (
    <ScrollView style={styles.page}>
      <Text style={styles.heading}>{title}</Text>
      {children}
    </ScrollView>
  );
}

function Label({children}) {
  return <Text style={styles.text}>{children}</Text>;
}

function Field({placeholder, value, onChangeText, secureTextEntry, keyboardType}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
    />
  );
}

function Action({title, onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

// 1. Accept Student Name and Display It
function Practical1() {
  const [name, setName] = useState('');

  return (
    <Page title="Student Name">
      <Field placeholder="Enter student name"
        value={name} onChangeText={setName} />
      <Label>Student Name: {name || 'Not entered yet'}</Label>
    </Page>
  );
}

// 2. Add Two Numbers
function Practical2() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState('');

  return (
    <Page title="Addition of Two Numbers">
      <Field placeholder="Enter first number"
        value={a} onChangeText={setA} keyboardType="numeric" />
      <Field placeholder="Enter second number"
        value={b} onChangeText={setB} keyboardType="numeric" />
      <Action title="Calculate Sum" onPress={() => {
        if (a.trim() === '' || b.trim() === '') {
          Alert.alert('Error', 'Enter both numbers');
          return;
        }
        setResult(String(Number(a) + Number(b)));
      }} />
      <Label>Sum: {result}</Label>
    </Page>
  );
}

// 3. Arithmetic Operations
function Practical3() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState('');

  function calculate(op) {
    if (a.trim() === '' || b.trim() === '') {
      Alert.alert('Error', 'Enter both numbers');
      return;
    }

    const x = Number(a);
    const y = Number(b);
    let answer;

    if (op === '+') answer = x + y;
    if (op === '-') answer = x - y;
    if (op === '*') answer = x * y;
    if (op === '/') answer = y === 0 ? 'Cannot divide by zero' : x / y;

    setResult(String(answer));
  }

  return (
    <Page title="Arithmetic Calculator">
      <Field placeholder="First number" value={a}
        onChangeText={setA} keyboardType="numeric" />
      <Field placeholder="Second number" value={b}
        onChangeText={setB} keyboardType="numeric" />

      <Action title="Addition (+)" onPress={() => calculate('+')} />
      <Action title="Subtraction (-)" onPress={() => calculate('-')} />
      <Action title="Multiplication (*)" onPress={() => calculate('*')} />
      <Action title="Division (/)" onPress={() => calculate('/')} />

      <Label>Result: {result}</Label>
    </Page>
  );
}

// 4. Button Changes Displayed Text
function Practical4() {
  const [message, setMessage] = useState('Welcome!');

  return (
    <Page title="Change Text">
      <Label>{message}</Label>
      <Action title="Change Text"
        onPress={() => setMessage('Button Pressed Successfully!')} />
    </Page>
  );
}

// 5. Elevated Button and SnackBar Message
function Practical5() {
  return (
    <Page title="SnackBar Message">
      <Label>Press the button to display a message.</Label>
      <Action title="Show Message"
        onPress={() => Alert.alert('Message', 'Hello! Button pressed successfully.')} />
    </Page>
  );
}
// 6. Submit and Reset Form
function Practical6() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Page title="Simple Form">
      <Field placeholder="Enter name" value={name} onChangeText={setName} />
      <Field placeholder="Enter email" value={email} onChangeText={setEmail} />

      <Action title="Submit" onPress={() => {
        if (!name.trim() || !email.trim()) {
          Alert.alert('Error', 'Please fill all fields');
          return;
        }
        Alert.alert('Submitted', `Name: ${name}\nEmail: ${email}`);
      }} />

      <Action title="Reset" onPress={() => {
        setName('');
        setEmail('');
      }} />
    </Page>
  );
}

// 7. Student Name and Total Marks
function Practical7() {
  const [name, setName] = useState('');
  const [m1, setM1] = useState('');
  const [m2, setM2] = useState('');
  const [m3, setM3] = useState('');
  const [total, setTotal] = useState('');

  return (
    <Page title="Student Total Marks">
      <Field placeholder="Student name" value={name} onChangeText={setName} />
      <Field placeholder="Subject 1 marks" value={m1} onChangeText={setM1} keyboardType="numeric" />
      <Field placeholder="Subject 2 marks" value={m2} onChangeText={setM2} keyboardType="numeric" />
      <Field placeholder="Subject 3 marks" value={m3} onChangeText={setM3} keyboardType="numeric" />

      <Action title="Calculate Total" onPress={() => {
        if ([m1, m2, m3].some(v => v.trim() === '')) {
          Alert.alert('Error', 'Enter all subject marks');
          return;
        }
        setTotal(String(Number(m1) + Number(m2) + Number(m3)));
      }} />

      <Label>Student: {name}</Label>
      <Label>Total Marks: {total}</Label>
    </Page>
  );
}

// 8. Calculate Percentage
function Practical8() {
  const [m1, setM1] = useState('');
  const [m2, setM2] = useState('');
  const [m3, setM3] = useState('');
  const [percentage, setPercentage] = useState('');

  return (
    <Page title="Percentage Calculator">
      <Field placeholder="Subject 1 marks (out of 100)" value={m1} onChangeText={setM1} keyboardType="numeric" />
      <Field placeholder="Subject 2 marks (out of 100)" value={m2} onChangeText={setM2} keyboardType="numeric" />
      <Field placeholder="Subject 3 marks (out of 100)" value={m3} onChangeText={setM3} keyboardType="numeric" />

      <Action title="Calculate Percentage" onPress={() => {
        if ([m1, m2, m3].some(v => v.trim() === '')) {
          Alert.alert('Error', 'Enter all marks');
          return;
        }
        const values = [Number(m1), Number(m2), Number(m3)];
        if (values.some(v => !Number.isFinite(v) || v < 0 || v > 100)) {
          Alert.alert('Error', 'Marks must be between 0 and 100');
          return;
        }
        setPercentage(((values[0] + values[1] + values[2]) / 300 * 100).toFixed(2) + '%');
      }} />

      <Label>Percentage: {percentage}</Label>
    </Page>
  );
}

// 9. Check Even or Odd
function Practical9() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState('');

  return (
    <Page title="Even or Odd">
      <Field placeholder="Enter a number" value={number}
        onChangeText={setNumber} keyboardType="numeric" />

      <Action title="Check" onPress={() => {
        if (number.trim() === '' || !Number.isFinite(Number(number))) {
          Alert.alert('Error', 'Enter a valid number');
          return;
        }
        setResult(Number(number) % 2 === 0 ? 'Even Number' : 'Odd Number');
      }} />

      <Label>Result: {result}</Label>
    </Page>
  );
}

// 10. Positive, Negative or Zero
function Practical10() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState('');

  return (
    <Page title="Number Checker">
      <Field placeholder="Enter a number" value={number}
        onChangeText={setNumber} keyboardType="numeric" />

      <Action title="Check Number" onPress={() => {
        if (number.trim() === '' || !Number.isFinite(Number(number))) {
          Alert.alert('Error', 'Enter a valid number');
          return;
        }

        const n = Number(number);
        setResult(n > 0 ? 'Positive Number' : n < 0 ? 'Negative Number' : 'Zero');
      }} />

      <Label>Result: {result}</Label>
    </Page>
  );
}
// 11. Celsius to Fahrenheit Converter
function Practical11() {
  const [celsius, setCelsius] = useState('');
  const [result, setResult] = useState('');

  return (
    <Page title="Temperature Converter">
      <Field placeholder="Enter Celsius temperature"
        value={celsius} onChangeText={setCelsius} keyboardType="numeric" />

      <Action title="Convert to Fahrenheit" onPress={() => {
        if (celsius.trim() === '' || !Number.isFinite(Number(celsius))) {
          Alert.alert('Error', 'Enter a valid temperature');
          return;
        }
        setResult(((Number(celsius) * 9 / 5) + 32).toFixed(2) + ' °F');
      }} />

      <Label>Fahrenheit: {result}</Label>
    </Page>
  );
}

// 12. Area of Rectangle
function Practical12() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [area, setArea] = useState('');

  return (
    <Page title="Rectangle Area">
      <Field placeholder="Enter length" value={length}
        onChangeText={setLength} keyboardType="numeric" />
      <Field placeholder="Enter width" value={width}
        onChangeText={setWidth} keyboardType="numeric" />

      <Action title="Calculate Area" onPress={() => {
        if (length.trim() === '' || width.trim() === '') {
          Alert.alert('Error', 'Enter length and width');
          return;
        }
        setArea(String(Number(length) * Number(width)));
      }} />

      <Label>Area: {area}</Label>
    </Page>
  );
}

// 13. BMI Calculator
function Practical13() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');

  return (
    <Page title="BMI Calculator">
      <Field placeholder="Weight in kg" value={weight}
        onChangeText={setWeight} keyboardType="numeric" />
      <Field placeholder="Height in metres (e.g. 1.75)" value={height}
        onChangeText={setHeight} keyboardType="numeric" />

      <Action title="Calculate BMI" onPress={() => {
        const w = Number(weight);
        const h = Number(height);

        if (weight.trim() === '' || height.trim() === '' ||
            !Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) {
          Alert.alert('Error', 'Enter valid weight and height');
          return;
        }

        setBmi((w / (h * h)).toFixed(2));
      }} />

      <Label>BMI: {bmi}</Label>
    </Page>
  );
}

// 14. Terms and Conditions Checkbox
function Practical14() {
  const [agreed, setAgreed] = useState(false);

  return (
    <Page title="Terms and Conditions">
      <Label>Please accept the terms and conditions.</Label>

      <TouchableOpacity
        style={styles.card}
        onPress={() => setAgreed(!agreed)}
      >
        <Label>{agreed ? '☑' : '☐'} I agree to the terms and conditions</Label>
      </TouchableOpacity>

      <Label>Status: {agreed ? 'Accepted' : 'Not Accepted'}</Label>
    </Page>
  );
}

// 15. Select Student Gender Using Radio Buttons
function Practical15() {
  const [gender, setGender] = useState('Male');

  const options = ['Male', 'Female', 'Other'];

  return (
    <Page title="Select Gender">
      {options.map(option => (
        <TouchableOpacity
          key={option}
          style={styles.card}
          onPress={() => setGender(option)}
        >
          <Label>{gender === option ? '🔘' : '⚪'} {option}</Label>
        </TouchableOpacity>
      ))}

      <Label>Selected Gender: {gender}</Label>
    </Page>
  );
}
// 16. Select Course Using Radio Buttons
function Practical16() {
  const [course, setCourse] = useState('BCA');
  const courses = ['BCA', 'BBA', 'BSc'];

  return (
    <Page title="Select Course">
      {courses.map(item => (
        <TouchableOpacity key={item} style={styles.card}
          onPress={() => setCourse(item)}>
          <Label>{course === item ? '🔘' : '⚪'} {item}</Label>
        </TouchableOpacity>
      ))}
      <Label>Selected Course: {course}</Label>
    </Page>
  );
}

// 17. Select Semester Using Dropdown
function Practical17() {
  const [semester, setSemester] = useState('Semester 1');
  const semesters = [
    'Semester 1', 'Semester 2', 'Semester 3',
    'Semester 4', 'Semester 5', 'Semester 6'
  ];

  return (
    <Page title="Select Semester">
      <Label>Choose your semester:</Label>
      {semesters.map(item => (
        <TouchableOpacity key={item} style={styles.card}
          onPress={() => setSemester(item)}>
          <Label>{semester === item ? '✓ ' : ''}{item}</Label>
        </TouchableOpacity>
      ))}
      <Label>Selected: {semester}</Label>
    </Page>
  );
}

// 18. Select Department Using Dropdown
function Practical18() {
  const [department, setDepartment] = useState('Computer Science');
  const departments = [
    'Computer Science', 'Commerce', 'Management',
    'Mathematics', 'Physics'
  ];

  return (
    <Page title="Select Department">
      {departments.map(item => (
        <TouchableOpacity key={item} style={styles.card}
          onPress={() => setDepartment(item)}>
          <Label>{department === item ? '✓ ' : ''}{item}</Label>
        </TouchableOpacity>
      ))}
      <Label>Selected Department: {department}</Label>
    </Page>
  );
}

// 19. Switch Setting ON and OFF
function Practical19() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Page title="Settings Switch">
      <View style={styles.card}>
        <Label>Enable Notifications</Label>
        <Switch value={enabled} onValueChange={setEnabled} />
        <Label>Status: {enabled ? 'ON' : 'OFF'}</Label>
      </View>
    </Page>
  );
}

// 20. Checkbox, Radio, Dropdown and Switch
function Practical20() {
  const [agreed, setAgreed] = useState(false);
  const [gender, setGender] = useState('Male');
  const [course, setCourse] = useState('BCA');
  const [enabled, setEnabled] = useState(false);

  return (
    <Page title="Multiple Input Widgets">
      <Text style={styles.heading}>Checkbox</Text>
      <TouchableOpacity style={styles.card}
        onPress={() => setAgreed(!agreed)}>
        <Label>{agreed ? '☑' : '☐'} Accept Terms</Label>
      </TouchableOpacity>

      <Text style={styles.heading}>Radio Buttons</Text>
      {['Male', 'Female', 'Other'].map(item => (
        <TouchableOpacity key={item} style={styles.card}
          onPress={() => setGender(item)}>
          <Label>{gender === item ? '🔘' : '⚪'} {item}</Label>
        </TouchableOpacity>
      ))}

      <Text style={styles.heading}>Course Selection</Text>
      {['BCA', 'BBA', 'BSc'].map(item => (
        <TouchableOpacity key={item} style={styles.card}
          onPress={() => setCourse(item)}>
          <Label>{course === item ? '✓ ' : ''}{item}</Label>
        </TouchableOpacity>
      ))}

      <Text style={styles.heading}>Switch</Text>
      <View style={styles.card}>
        <Label>Enable Setting</Label>
        <Switch value={enabled} onValueChange={setEnabled} />
        <Label>{enabled ? 'ON' : 'OFF'}</Label>
      </View>

      <Action title="Submit" onPress={() => {
        Alert.alert(
          'Selected Details',
          `Terms: ${agreed ? 'Accepted' : 'Not accepted'}\nGender: ${gender}\nCourse: ${course}\nSetting: ${enabled ? 'ON' : 'OFF'}`
        );
      }} />
    </Page>
  );
}
// 21. Flutter Login Form UI
function Practical21() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Page title="Login Form">
      <Field placeholder="Username" value={username}
        onChangeText={setUsername} />
      <Field placeholder="Password" value={password}
        onChangeText={setPassword} secureTextEntry />

      <Action title="Login" onPress={() => {
        if (!username.trim() || !password.trim()) {
          Alert.alert('Error', 'Enter username and password');
          return;
        }
        Alert.alert('Login', `Welcome ${username}`);
      }} />

      <Action title="Reset" onPress={() => {
        setUsername('');
        setPassword('');
      }} />
    </Page>
  );
}

// 22. Registration Form
function Practical22() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('Male');
  const [course, setCourse] = useState('BCA');

  return (
    <Page title="Registration Form">
      <Field placeholder="Full Name" value={name}
        onChangeText={setName} />
      <Field placeholder="Email" value={email}
        onChangeText={setEmail} keyboardType="email-address" />
      <Field placeholder="Password" value={password}
        onChangeText={setPassword} secureTextEntry />

      <Label>Select Gender</Label>
      {['Male', 'Female', 'Other'].map(item => (
        <TouchableOpacity key={item} style={styles.card}
          onPress={() => setGender(item)}>
          <Label>{gender === item ? '🔘' : '⚪'} {item}</Label>
        </TouchableOpacity>
      ))}

      <Label>Select Course</Label>
      {['BCA', 'BBA', 'BSc'].map(item => (
        <TouchableOpacity key={item} style={styles.card}
          onPress={() => setCourse(item)}>
          <Label>{course === item ? '✓ ' : ''}{item}</Label>
        </TouchableOpacity>
      ))}

      <Action title="Register" onPress={() => {
        if (!name.trim() || !email.trim() || !password.trim()) {
          Alert.alert('Error', 'Please fill all fields');
          return;
        }
        Alert.alert(
          'Registration Successful',
          `Name: ${name}\nEmail: ${email}\nGender: ${gender}\nCourse: ${course}`
        );
      }} />
    </Page>
  );
}

// 23. Student Feedback Form
function Practical23() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('Excellent');
  const [feedback, setFeedback] = useState('');

  return (
    <Page title="Student Feedback Form">
      <Field placeholder="Enter your name" value={name}
        onChangeText={setName} />

      <Label>Select Rating</Label>
      {['Excellent', 'Good', 'Average', 'Poor'].map(item => (
        <TouchableOpacity key={item} style={styles.card}
          onPress={() => setRating(item)}>
          <Label>{rating === item ? '🔘' : '⚪'} {item}</Label>
        </TouchableOpacity>
      ))}

      <TextInput
        style={[styles.input, {height: 100, textAlignVertical: 'top'}]}
        placeholder="Write your feedback"
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />

      <Action title="Submit Feedback" onPress={() => {
        if (!name.trim() || !feedback.trim()) {
          Alert.alert('Error', 'Enter name and feedback');
          return;
        }
        Alert.alert(
          'Feedback Submitted',
          `Name: ${name}\nRating: ${rating}\nFeedback: ${feedback}`
        );
      }} />
    </Page>
  );
}

// 24. Simple Calculator
function Practical24() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState('');

  function calculate(operator) {
    if (a.trim() === '' || b.trim() === '') {
      Alert.alert('Error', 'Enter both numbers');
      return;
    }

    const x = Number(a);
    const y = Number(b);
    let answer;

    if (operator === '+') answer = x + y;
    if (operator === '-') answer = x - y;
    if (operator === '*') answer = x * y;
    if (operator === '/') {
      answer = y === 0 ? 'Cannot divide by zero' : x / y;
    }

    setResult(String(answer));
  }

  return (
    <Page title="Simple Calculator">
      <Field placeholder="First number" value={a}
        onChangeText={setA} keyboardType="numeric" />
      <Field placeholder="Second number" value={b}
        onChangeText={setB} keyboardType="numeric" />

      <Action title="Addition (+)" onPress={() => calculate('+')} />
      <Action title="Subtraction (-)" onPress={() => calculate('-')} />
      <Action title="Multiplication (*)" onPress={() => calculate('*')} />
      <Action title="Division (/)" onPress={() => calculate('/')} />

      <Label>Result: {result}</Label>
    </Page>
  );
}

// 25. Student Result Application
function Practical25() {
  const [name, setName] = useState('');
  const [m1, setM1] = useState('');
  const [m2, setM2] = useState('');
  const [m3, setM3] = useState('');
  const [result, setResult] = useState(null);

  function calculateResult() {
    if (!name.trim() || [m1, m2, m3].some(v => v.trim() === '')) {
      Alert.alert('Error', 'Please enter all details');
      return;
    }

    const marks = [Number(m1), Number(m2), Number(m3)];

    if (marks.some(v => !Number.isFinite(v) || v < 0 || v > 100)) {
      Alert.alert('Error', 'Each subject mark must be between 0 and 100');
      return;
    }

    const total = marks.reduce((sum, value) => sum + value, 0);
    const percentage = total / 3;
    const status = marks.every(value => value >= 33) ? 'Pass' : 'Fail';

    setResult({total, percentage, status});
  }

  return (
    <Page title="Student Result">
      <Field placeholder="Student Name" value={name}
        onChangeText={setName} />
      <Field placeholder="Subject 1 Marks" value={m1}
        onChangeText={setM1} keyboardType="numeric" />
      <Field placeholder="Subject 2 Marks" value={m2}
        onChangeText={setM2} keyboardType="numeric" />
      <Field placeholder="Subject 3 Marks" value={m3}
        onChangeText={setM3} keyboardType="numeric" />

      <Action title="Calculate Result" onPress={calculateResult} />

      {result && (
        <View style={styles.card}>
          <Text style={styles.heading}>Result Card</Text>
          <Label>Student: {name}</Label>
          <Label>Total Marks: {result.total}/300</Label>
          <Label>Percentage: {result.percentage.toFixed(2)}%</Label>
          <Label>Final Result: {result.status}</Label>
        </View>
      )}
    </Page>
  );
}

// Select a practical from 1 to 25.
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

