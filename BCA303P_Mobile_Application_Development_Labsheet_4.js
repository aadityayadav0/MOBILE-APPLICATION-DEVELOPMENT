// BCA303P Mobile Application Development
// LAB SHEET 4: Flutter Navigation and Multi-Screen Applications
// React Native JavaScript equivalent (Expo)
// Change ACTIVE_PRACTICAL (1-25) to select a program.

import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, Alert
} from 'react-native';

const ACTIVE_PRACTICAL = 1;

const s = StyleSheet.create({
  page: { flex: 1, padding: 18, backgroundColor: '#f5f7fb' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#172554', marginBottom: 16 },
  text: { fontSize: 16, marginVertical: 7, color: '#1f2937' },
  input: { borderWidth: 1, borderColor: '#9ca3af', borderRadius: 8, padding: 11, marginVertical: 8, backgroundColor: '#fff' },
  btn: { backgroundColor: '#2563eb', padding: 12, borderRadius: 8, marginVertical: 6 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  row: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 8 },
  tab: { backgroundColor: '#dbeafe', padding: 10, borderRadius: 8, margin: 3 },
  card: { backgroundColor: '#fff', padding: 14, borderRadius: 9, marginVertical: 8 }
});

function Page({ title, children }) {
  return (
    <ScrollView style={s.page} contentContainerStyle={{ paddingBottom: 24 }}>
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
    <TouchableOpacity style={s.btn} onPress={onPress}>
      <Text style={s.btnText}>{title}</Text>
    </TouchableOpacity>
  );
}

function Menu({ items, onSelect, active }) {
  return (
    <View style={s.row}>
      {items.map(x => (
        <TouchableOpacity
          key={x}
          style={[s.tab, active === x && { borderWidth: 1, borderColor: '#2563eb' }]}
          onPress={() => onSelect(x)}
        >
          <Text>{x}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function Tabs({ items, active, onSelect }) {
  return <Menu items={items} active={active} onSelect={onSelect} />;
}

// 1. Two screens; button navigation.
function P1() {
  const [screen, set] = useState('First Screen');
  return (
    <Page title="1. Two Screens">
      {screen === 'First Screen' ? (
        <>
          <T>First Screen</T>
          <B title="Go to Second Screen" onPress={() => set('Second Screen')} />
        </>
      ) : (
        <>
          <T>Second Screen</T>
          <B title="Back" onPress={() => set('First Screen')} />
        </>
      )}
    </Page>
  );
}

// 2. Home and About screens.
function P2() {
  const [screen, set] = useState('Home');
  return (
    <Page title="2. Home and About">
      <T>Current screen: {screen}</T>
      <B
        title={screen === 'Home' ? 'Open About' : 'Back to Home'}
        onPress={() => set(screen === 'Home' ? 'About' : 'Home')}
      />
      {screen === 'About' && <T>This is the About screen.</T>}
    </Page>
  );
}

// 3. Home, Profile and Settings.
function P3() {
  const [screen, set] = useState('Home');
  return (
    <Page title="3. Three Screens">
      <Tabs items={['Home', 'Profile', 'Settings']} active={screen} onSelect={set} />
      <T>{screen} Screen</T>
    </Page>
  );
}

// 4. Login navigates to Home.
function P4() {
  const [name, setName] = useState('');
  const [ok, setOk] = useState(false);
  return (
    <Page title="4. Login to Home">
      {!ok ? (
        <>
          <TextInput style={s.input} placeholder="Username" value={name} onChangeText={setName} />
          <B title="Login" onPress={() => name.trim() ? setOk(true) : Alert.alert('Enter username')} />
        </>
      ) : (
        <>
          <T>Welcome, {name}</T>
          <B title="Logout" onPress={() => setOk(false)} />
        </>
      )}
    </Page>
  );
}

// 5. Home opens Profile.
function P5() {
  const [profile, set] = useState(false);
  return (
    <Page title="5. Open Profile Screen">
      {profile ? (
        <>
          <T>Student Profile</T>
          <T>Name: Rahul Kumar</T>
          <T>Course: BCA</T>
          <B title="Back to Home" onPress={() => set(false)} />
        </>
      ) : (
        <>
          <T>Home Screen</T>
          <B title="Open Profile" onPress={() => set(true)} />
        </>
      )}
    </Page>
  );
}

// 6. Navigator.push equivalent.
function P6() {
  const [stack, set] = useState(['Home']);
  return (
    <Page title="6. Push Navigation">
      <T>Current: {stack[stack.length - 1]}</T>
      <B title="Navigator.push - Details" onPress={() => set([...stack, 'Details'])} />
      <B title="Open Settings" onPress={() => set([...stack, 'Settings'])} />
      <T>Stack: {stack.join(' → ')}</T>
      <B title="Reset Home" onPress={() => set(['Home'])} />
    </Page>
  );
}

// 7. Navigator.pop equivalent.
function P7() {
  const [second, set] = useState(false);
  return (
    <Page title="7. Pop Navigation">
      <T>{second ? 'Second Screen' : 'First Screen'}</T>
      {second
        ? <B title="Navigator.pop - Back" onPress={() => set(false)} />
        : <B title="Open Second Screen" onPress={() => set(true)} />}
    </Page>
  );
}

// 8. Forward and backward navigation.
function P8() {
  const [detail, set] = useState(false);
  return (
    <Page title="8. Home and Detail">
      {detail ? (
        <>
          <T>Detail Screen</T>
          <B title="Go Back" onPress={() => set(false)} />
        </>
      ) : (
        <>
          <T>Home Screen</T>
          <B title="View Details" onPress={() => set(true)} />
        </>
      )}
    </Page>
  );
}
// 9. Bottom navigation Home, Profile and Settings.
function P9() {
  const [tab, set] = useState('Home');
  return (
    <Page title="9. Bottom Navigation">
      <Tabs items={['Home', 'Profile', 'Settings']} active={tab} onSelect={set} />
      <T>Selected screen: {tab}</T>
    </Page>
  );
}

// 10. Switch between three different screens.
function P10() {
  const [tab, set] = useState('Home');
  const descriptions = {
    Home: 'Welcome Home',
    Profile: 'Your Profile',
    Settings: 'Application Settings'
  };
  return (
    <Page title="10. Switch Three Screens">
      <Tabs items={['Home', 'Profile', 'Settings']} active={tab} onSelect={set} />
      <T>{descriptions[tab]}</T>
    </Page>
  );
}

// 11. Drawer with Home, Profile, About and Settings.
function P11() {
  const [screen, set] = useState('Home');
  const [open, setOpen] = useState(false);
  return (
    <Page title="11. Navigation Drawer">
      <B title="☰ Open Drawer" onPress={() => setOpen(!open)} />
      {open && (
        <Tabs
          items={['Home', 'Profile', 'About', 'Settings']}
          onSelect={x => {
            setScreen(x);
            setOpen(false);
          }}
        />
      )}
      <T>Current screen: {screen}</T>
    </Page>
  );
}

// 12. Open different screens using drawer options.
function P12() {
  const [screen, set] = useState('Home');
  return (
    <Page title="12. Drawer Options">
      <T>Navigation Drawer</T>
      {['Home', 'Courses', 'Faculty', 'Contact'].map(x => (
        <B key={x} title={`Open ${x}`} onPress={() => set(x)} />
      ))}
      <T>Opened: {screen}</T>
    </Page>
  );
}

// 13. AppBar and drawer items with icons and text.
function P13() {
  const [screen, set] = useState('Home');
  const options = [
    ['⌂', 'Home'],
    ['👤', 'Profile'],
    ['ⓘ', 'About'],
    ['⚙', 'Settings']
  ];
  return (
    <Page title="13. AppBar and Drawer">
      <View style={s.card}>
        <T>☰  My Application</T>
      </View>
      {options.map(([icon, name]) => (
        <B
          key={name}
          title={`${icon}  ${name}`}
          onPress={() => set(name)}
        />
      ))}
      <T>Selected: {screen}</T>
    </Page>
  );
}

// 14. Home, Courses and Contact navigation.
function P14() {
  const [tab, set] = useState('Home');
  const descriptions = {
    Home: 'Welcome to college',
    Courses: 'BCA, BBA and BSc',
    Contact: 'Contact the college office'
  };
  return (
    <Page title="14. College Bottom Navigation">
      <Tabs items={['Home', 'Courses', 'Contact']} active={tab} onSelect={set} />
      <T>{descriptions[tab]}</T>
    </Page>
  );
}

// 15. Student Profile, Attendance and Result.
function P15() {
  const [screen, set] = useState('Home');
  return (
    <Page title="15. Student Sections">
      {['Student Profile', 'Attendance', 'Result'].map(x => (
        <B key={x} title={x} onPress={() => set(x)} />
      ))}
      <T>Current: {screen}</T>
      {screen === 'Student Profile' && <T>Name: Aman Sharma | Course: BCA</T>}
      {screen === 'Attendance' && <T>Attendance: 85%</T>}
      {screen === 'Result' && <T>Result: Pass</T>}
    </Page>
  );
}

// 16. Pass student's name to second screen.
function P16() {
  const [name, setName] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <Page title="16. Pass Student Name">
      {!sent ? (
        <>
          <TextInput
            style={s.input}
            placeholder="Student name"
            value={name}
            onChangeText={setName}
          />
          <B title="Send" onPress={() => name.trim() && setSent(true)} />
        </>
      ) : (
        <>
          <T>Second Screen - Student Name: {name}</T>
          <B title="Back" onPress={() => setSent(false)} />
        </>
      )}
    </Page>
  );
}

// 17. Pass student's name and course to another screen.
function P17() {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('BCA');
  const [sent, setSent] = useState(false);

  return (
    <Page title="17. Pass Name and Course">
      {!sent ? (
        <>
          <TextInput
            style={s.input}
            placeholder="Student name"
            value={name}
            onChangeText={setName}
          />
          <T>Select course:</T>
          <Menu
            items={['BCA', 'BBA', 'BSc']}
            active={course}
            onSelect={setCourse}
          />
          <B title="Submit" onPress={() => name.trim() && setSent(true)} />
        </>
      ) : (
        <>
          <T>Name: {name}</T>
          <T>Course: {course}</T>
          <B title="Back" onPress={() => setSent(false)} />
        </>
      )}
    </Page>
  );
}

// 18. Submit student name and display on new screen.
function P18() {
  const [name, setName] = useState('');
  const [result, setResult] = useState('');

  return (
    <Page title="18. Submit Student Form">
      {!result ? (
        <>
          <TextInput
            style={s.input}
            placeholder="Enter student name"
            value={name}
            onChangeText={setName}
          />
          <B title="Submit" onPress={() => setResult(name.trim())} />
        </>
      ) : (
        <>
          <T>Submitted name: {result}</T>
          <B title="Back to Form" onPress={() => setResult('')} />
        </>
      )}
    </Page>
  );
}

// 19. Pass two numbers and display their sum.
function P19() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [sum, setSum] = useState(null);

  return (
    <Page title="19. Pass Two Numbers">
      {sum === null ? (
        <>
          <TextInput
            style={s.input}
            keyboardType="numeric"
            placeholder="First number"
            value={a}
            onChangeText={setA}
          />
          <TextInput
            style={s.input}
            keyboardType="numeric"
            placeholder="Second number"
            value={b}
            onChangeText={setB}
          />
          <B
            title="Calculate Sum"
            onPress={() => {
              if (
                a.trim() === '' ||
                b.trim() === '' ||
                !Number.isFinite(Number(a)) ||
                !Number.isFinite(Number(b))
              ) {
                Alert.alert('Enter valid numbers');
              } else {
                setSum(Number(a) + Number(b));
              }
            }}
          />
        </>
      ) : (
        <>
          <T>Second Screen - Sum: {sum}</T>
          <B title="Back" onPress={() => setSum(null)} />
        </>
      )}
    </Page>
  );
}

// 20. Pass product name and price to detail screen.
function P20() {
  const [name, setName] = useState('Notebook');
  const [price, setPrice] = useState('80');
  const [show, setShow] = useState(false);

  return (
    <Page title="20. Product Detail">
      {!show ? (
        <>
          <TextInput
            style={s.input}
            placeholder="Product name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={s.input}
            placeholder="Price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
          <B
            title="View Details"
            onPress={() => name.trim() && price.trim() && setShow(true)}
          />
        </>
      ) : (
        <>
          <T>Product: {name}</T>
          <T>Price: ₹{price}</T>
          <B title="Back" onPress={() => setShow(false)} />
        </>
      )}
    </Page>
  );
}

// 21. Student list and selected student detail.
function P21() {
  const list = [
    { name: 'Aman', course: 'BCA', roll: '101' },
    { name: 'Priya', course: 'BBA', roll: '102' },
    { name: 'Rahul', course: 'BCA', roll: '103' }
  ];
  const [student, setStudent] = useState(null);

  return (
    <Page title="21. Student List and Detail">
      {!student ? (
        <>
          {list.map(x => (
            <B
              key={x.roll}
              title={x.name}
              onPress={() => setStudent(x)}
            />
          ))}
        </>
      ) : (
        <>
          <T>Name: {student.name}</T>
          <T>Course: {student.course}</T>
          <T>Roll No: {student.roll}</T>
          <B title="Back to List" onPress={() => setStudent(null)} />
        </>
      )}
    </Page>
  );
}

// 22. Login, Home and Profile navigation.
function P22() {
  const [screen, setScreen] = useState('Login');
  const [name, setName] = useState('');

  return (
    <Page title="22. Login Home Profile">
      {screen === 'Login' ? (
        <>
          <TextInput
            style={s.input}
            placeholder="Username"
            value={name}
            onChangeText={setName}
          />
          <B
            title="Login"
            onPress={() =>
              name.trim()
                ? setScreen('Home')
                : Alert.alert('Enter username')
            }
          />
        </>
      ) : (
        <>
          <Tabs
            items={['Home', 'Profile']}
            active={screen}
            onSelect={setScreen}
          />
          <T>{screen} Screen</T>
          {screen === 'Profile' && <T>Logged in as: {name}</T>}
          <B title="Logout" onPress={() => setScreen('Login')} />
        </>
      )}
    </Page>
  );
}

// 23. College app with Home, Courses, Faculty and Contact.
function P23() {
  const [screen, set] = useState('Home');
  const descriptions = {
    Home: 'Welcome to ABC College',
    Courses: 'BCA, BBA, B.Com',
    Faculty: 'Computer Science and Management Faculty',
    Contact: 'Contact the college office'
  };

  return (
    <Page title="23. College Application">
      <Tabs
        items={['Home', 'Courses', 'Faculty', 'Contact']}
        active={screen}
        onSelect={set}
      />
      <View style={s.card}>
        <T>{screen}</T>
        <T>{descriptions[screen]}</T>
      </View>
    </Page>
  );
}

// 24. Shopping app with Home, Products, Cart and Profile.
function P24() {
  const [tab, set] = useState('Home');
  const [cart, setCart] = useState(0);

  return (
    <Page title="24. Shopping Application">
      <Tabs
        items={['Home', 'Products', 'Cart', 'Profile']}
        active={tab}
        onSelect={set}
      />
      <T>Current section: {tab}</T>

      {tab === 'Home' && <T>Welcome to shopping app.</T>}

      {tab === 'Products' && (
        <>
          <T>T-shirt - ₹499</T>
          <B title="Add to Cart" onPress={() => setCart(cart + 1)} />
        </>
      )}

      {tab === 'Cart' && <T>Items in cart: {cart}</T>}
      {tab === 'Profile' && <T>Customer Profile</T>}
    </Page>
  );
}

// 25. Student Management: Home, Profile, Attendance and Result.
function P25() {
  const [tab, set] = useState('Home');

  const data = {
    Home: 'Welcome to Student Management Application',
    'Student Profile': 'Name: Aditi Verma | Course: BCA | Roll No: 25',
    Attendance: 'Attendance: 90%',
    Result: 'Total: 420/500 | Percentage: 84% | Status: Pass'
  };

  return (
    <Page title="25. Student Management">
      <Tabs
        items={['Home', 'Student Profile', 'Attendance', 'Result']}
        active={tab}
        onSelect={set}
      />
      <View style={s.card}>
        <T>{tab}</T>
        <T>{data[tab]}</T>
      </View>
    </Page>
  );
}
// Select any practical from 1 to 25.
const practicals = {
  1: P1, 2: P2, 3: P3, 4: P4, 5: P5,
  6: P6, 7: P7, 8: P8, 9: P9, 10: P10,
  11: P11, 12: P12, 13: P13, 14: P14, 15: P15,
  16: P16, 17: P17, 18: P18, 19: P19, 20: P20,
  21: P21, 22: P22, 23: P23, 24: P24, 25: P25
};

export default function App() {
  const Selected = practicals[ACTIVE_PRACTICAL] || P1;
  return <Selected />;
}

