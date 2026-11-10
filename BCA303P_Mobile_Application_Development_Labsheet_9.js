
/*
BCA303P - MOBILE APPLICATION DEVELOPMENT
LAB SHEET 9
FLUTTER REST API INTEGRATION AND JSON PARSING

JavaScript equivalent using React Native + Expo.

Run:
npx expo start

Change ACTIVE_PRACTICAL from 1 to 15.
*/

// IMPORTS
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Image,
  StyleSheet
} from 'react-native';

// SELECT PRACTICAL
const ACTIVE_PRACTICAL = 1;

// API URL
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// COMMON STYLES
const s = StyleSheet.create({
  page: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f6f9'
  },
  heading: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 14,
    color: '#172554'
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: '#222'
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    backgroundColor: 'white',
    padding: 11,
    borderRadius: 7,
    marginBottom: 12
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 7,
    marginVertical: 6,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  card: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 9,
    marginVertical: 7,
    elevation: 2
  }
});

// COMMON PAGE COMPONENT
function Page({title, children}) {
  return (
    <ScrollView style={s.page}>
      <Text style={s.heading}>{title}</Text>
      {children}
    </ScrollView>
  );
}

// COMMON TEXT COMPONENT
function T({children}) {
  return <Text style={s.text}>{children}</Text>;
}

// COMMON BUTTON COMPONENT
function B({title, onPress}) {
  return (
    <TouchableOpacity style={s.button} onPress={onPress}>
      <Text style={s.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

// PRACTICAL 1:
// Parse JSON Array into Student Objects using fromJson()

class Student {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static fromJson(json) {
    return new Student(
      json.id,
      json.name,
      json.email
    );
  }
}

function P1() {
  const [students, setStudents] = useState([]);

  function parseStudents() {
    const jsonData = `[
      {"id":1,"name":"Amit","email":"amit@example.com"},
      {"id":2,"name":"Rahul","email":"rahul@example.com"},
      {"id":3,"name":"Priya","email":"priya@example.com"}
    ]`;

    const parsedData = JSON.parse(jsonData);
    const studentObjects = parsedData.map(
      item => Student.fromJson(item)
    );

    setStudents(studentObjects);
  }

  return (
    <Page title="Practical 1: JSON Parsing">
      <B title="Parse Student JSON" onPress={parseStudents} />

      {students.map(student => (
        <View style={s.card} key={student.id}>
          <T>ID: {student.id}</T>
          <T>Name: {student.name}</T>
          <T>Email: {student.email}</T>
        </View>
      ))}
    </Page>
  );
}

// PRACTICAL 2:
// Demonstrate Future, Async and Await

function P2() {
  const [result, setResult] = useState('Press button to start');

  async function delayedFunction() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('Data received after 3 seconds!');
      }, 3000);
    });
  }

  async function startTask() {
    setResult('Loading...');

    try {
      const value = await delayedFunction();
      setResult(value);
    } catch (error) {
      setResult('Error: ' + error.message);
    }
  }

  return (
    <Page title="Practical 2: Future, Async and Await">
      <B title="Start Async Task" onPress={startTask} />
      <T>{result}</T>
    </Page>
  );
}

// PRACTICAL 3:
// Fetch Data from Public REST API using GET

function P3() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    setResponse('');

    try {
      const result = await fetch(`${BASE_URL}/posts/1`);
      const body = await result.text();
      setResponse(body);
    } catch (error) {
      setResponse('Network Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page title="Practical 3: Fetch API Response">
      <B title="Fetch API Data" onPress={fetchData} />

      {loading
        ? <ActivityIndicator size="large" />
        : <T>{response || 'API response will appear here.'}</T>
      }
    </Page>
  );
}

// PRACTICAL 4:
// Fetch Single Post and Display in Card

function P4() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchPost() {
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/posts/1`);

      if (!response.ok) {
        throw new Error('Unable to fetch post');
      }

      const data = await response.json();
      setPost(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page title="Practical 4: Single Post Card">
      <B title="Load Post" onPress={fetchPost} />

      {loading && <ActivityIndicator size="large" />}

      {post && (
        <View style={s.card}>
          <Text style={s.heading}>{post.title}</Text>
          <T>{post.body}</T>
          <T>Post ID: {post.id}</T>
        </View>
      )}
    </Page>
  );
}

// PRACTICAL 5:
// Display Circular Progress Indicator while Fetching API Data

function P5() {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);

  async function fetchPost() {
    setLoading(true);
    setPost(null);

    try {
      const response = await fetch(`${BASE_URL}/posts/1`);
      if (!response.ok) throw new Error('Failed to load data');
      const data = await response.json();
      setPost(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page title="Practical 5: Circular Progress Indicator">
      <B title="Fetch Data" onPress={fetchPost} />

      {loading && (
        <ActivityIndicator size="large" />
      )}

      {post && (
        <View style={s.card}>
          <T>{post.title}</T>
          <T>{post.body}</T>
        </View>
      )}
    </Page>
  );
}

// PRACTICAL 6:
// Display API Data using FutureBuilder Equivalent
// React Native equivalent: useEffect + loading state

function P6() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadData() {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${BASE_URL}/posts/2`);
      if (!response.ok) throw new Error('API request failed');
      const result = await response.json();
      setData(result);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Page title="Practical 6: FutureBuilder Equivalent">
      {loading && <ActivityIndicator size="large" />}

      {!!error && <T>Error: {error}</T>}

      {data && (
        <View style={s.card}>
          <T>Post ID: {data.id}</T>
          <T>Title: {data.title}</T>
          <T>{data.body}</T>
        </View>
      )}

      <B title="Reload Data" onPress={loadData} />
    </Page>
  );
}

// PRACTICAL 7:
// Fetch List of Posts and Display Titles

function P7() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadPosts() {
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/posts`);
      if (!response.ok) throw new Error('Failed to fetch posts');

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page title="Practical 7: Posts List">
      <B title="Load Posts" onPress={loadPosts} />

      {loading && <ActivityIndicator size="large" />}

      {posts.map(post => (
        <View style={s.card} key={post.id}>
          <T>{post.id}. {post.title}</T>
        </View>
      ))}
    </Page>
  );
}

// PRACTICAL 8:
// Fetch Users and Display Name, Email, ListTile Equivalent
// and CircleAvatar Equivalent

function P8() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadUsers() {
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/users`);
      if (!response.ok) throw new Error('Unable to fetch users');

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page title="Practical 8: Users List">
      <B title="Load Users" onPress={loadUsers} />

      {loading && <ActivityIndicator size="large" />}

      {users.map(user => (
        <View style={s.card} key={user.id}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              backgroundColor: '#2563eb',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 12
            }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                {user.name.charAt(0)}
              </Text>
            </View>

            <View style={{flex: 1}}>
              <T>{user.name}</T>
              <T>{user.email}</T>
            </View>
          </View>
        </View>
      ))}
    </Page>
  );
}

// PRACTICAL 9:
// Convert API Data into Objects using Model Class

class ApiUser {
  constructor(id, name, email, username) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.username = username;
  }

  static fromJson(json) {
    return new ApiUser(
      json.id,
      json.name,
      json.email,
      json.username
    );
  }
}

function P9() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadUsers() {
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/users`);
      if (!response.ok) throw new Error('API request failed');

      const jsonData = await response.json();
      const objects = jsonData.map(
        item => ApiUser.fromJson(item)
      );

      setUsers(objects);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page title="Practical 9: Model Class and JSON">
      <B title="Fetch Users" onPress={loadUsers} />

      {loading && <ActivityIndicator size="large" />}

      {users.map(user => (
        <View style={s.card} key={user.id}>
          <T>ID: {user.id}</T>
          <T>Name: {user.name}</T>
          <T>Username: {user.username}</T>
          <T>Email: {user.email}</T>
        </View>
      ))}
    </Page>
  );
}

// PRACTICAL 10:
// Handle API Errors and Display Retry Button

function P10() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchPosts() {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${BASE_URL}/posts`);

      if (!response.ok) {
        throw new Error('Invalid response status: ' + response.status);
      }

      const data = await response.json();
      setPosts(data.slice(0, 10));
    } catch (e) {
      setError('Network or API Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Page title="Practical 10: API Error Handling">
      {loading && <ActivityIndicator size="large" />}

      {!!error && (
        <View style={s.card}>
          <T>{error}</T>
          <B title="Retry" onPress={fetchPosts} />
        </View>
      )}

      {posts.map(post => (
        <View style={s.card} key={post.id}>
          <T>{post.title}</T>
        </View>
      ))}
    </Page>
  );
}

// PRACTICAL 11:
// User List and Complete User Detail Screen

function P11() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadUsers() {
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/users`);
      if (!response.ok) throw new Error('Failed to load users');

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  if (selectedUser) {
    return (
      <Page title="User Detail Screen">
        <View style={s.card}>
          <Text style={s.heading}>{selectedUser.name}</Text>
          <T>ID: {selectedUser.id}</T>
          <T>Username: {selectedUser.username}</T>
          <T>Email: {selectedUser.email}</T>
          <T>Phone: {selectedUser.phone}</T>
          <T>Website: {selectedUser.website}</T>
          <T>Company: {selectedUser.company.name}</T>
          <T>City: {selectedUser.address.city}</T>
          <T>Street: {selectedUser.address.street}</T>
        </View>

        <B title="Back to User List"
          onPress={() => setSelectedUser(null)} />
      </Page>
    );
  }

  return (
    <Page title="Practical 11: User List">
      {loading && <ActivityIndicator size="large" />}

      {users.map(user => (
        <TouchableOpacity
          key={user.id}
          style={s.card}
          onPress={() => setSelectedUser(user)}
        >
          <T>{user.name}</T>
          <T>{user.email}</T>
          <T>Tap to view complete details</T>
        </TouchableOpacity>
      ))}
    </Page>
  );
}

// PRACTICAL 12:
// Filter API Data using Search TextField

function P12() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  async function loadUsers() {
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/users`);
      if (!response.ok) throw new Error('Unable to load users');

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Page title="Practical 12: Search Users">
      <TextInput
        style={s.input}
        placeholder="Search user by name"
        value={search}
        onChangeText={setSearch}
      />

      {loading && <ActivityIndicator size="large" />}

      {filteredUsers.map(user => (
        <View style={s.card} key={user.id}>
          <T>{user.name}</T>
          <T>{user.email}</T>
        </View>
      ))}

      {!loading && filteredUsers.length === 0 && (
        <T>No matching users found.</T>
      )}
    </Page>
  );
}

// PRACTICAL 13:
// Reload API Data using Pull-to-Refresh

function P13() {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function loadPosts() {
    setRefreshing(true);

    try {
      const response = await fetch(`${BASE_URL}/posts`);

      if (!response.ok) {
        throw new Error('Unable to refresh posts');
      }

      const data = await response.json();
      setPosts(data.slice(0, 15));
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <ScrollView
      style={s.page}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={loadPosts}
        />
      }
    >
      <Text style={s.heading}>
        Practical 13: Pull to Refresh
      </Text>

      {posts.map(post => (
        <View style={s.card} key={post.id}>
          <T>{post.title}</T>
          <T>{post.body}</T>
        </View>
      ))}
    </ScrollView>
  );
}

// PRACTICAL 14:
// Send Data to REST API using POST

function P14() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function submitPost() {
    if (!title.trim() || !body.trim()) {
      Alert.alert('Validation Error', 'Fill all fields');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          body: body,
          userId: 1
        })
      });

      if (!response.ok) {
        throw new Error('POST request failed');
      }

      const data = await response.json();

      setMessage(
        'Post submitted successfully! New Post ID: ' + data.id
      );

      setTitle('');
      setBody('');
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page title="Practical 14: HTTP POST Request">
      <TextInput
        style={s.input}
        placeholder="Enter Post Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[s.input, {height: 110, textAlignVertical: 'top'}]}
        placeholder="Enter Post Body"
        multiline
        value={body}
        onChangeText={setBody}
      />

      <B title="Submit Post" onPress={submitPost} />

      {loading && <ActivityIndicator size="large" />}

      {!!message && <T>{message}</T>}
    </Page>
  );
}

// PRACTICAL 15:
// Product Store Application
// Fetch products, display Grid, Details, Loading and Errors

function P15() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadProducts() {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        'https://fakestoreapi.com/products'
      );

      if (!response.ok) {
        throw new Error('Unable to fetch products');
      }

      const data = await response.json();
      setProducts(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  if (selectedProduct) {
    return (
      <Page title="Product Details">
        <Image
          source={{uri: selectedProduct.image}}
          style={{
            width: '100%',
            height: 220,
            resizeMode: 'contain',
            backgroundColor: 'white'
          }}
        />

        <View style={s.card}>
          <Text style={s.heading}>
            {selectedProduct.title}
          </Text>

          <T>Price: ${selectedProduct.price}</T>
          <T>Category: {selectedProduct.category}</T>
          <T>Rating: {selectedProduct.rating.rate}</T>
          <T>Reviews: {selectedProduct.rating.count}</T>
          <T>Description: {selectedProduct.description}</T>
        </View>

        <B
          title="Back to Products"
          onPress={() => setSelectedProduct(null)}
        />
      </Page>
    );
  }

  return (
    <Page title="Practical 15: Product Store">
      <B title="Reload Products" onPress={loadProducts} />

      {loading && <ActivityIndicator size="large" />}

      {!!error && (
        <View style={s.card}>
          <T>Error: {error}</T>
          <B title="Retry" onPress={loadProducts} />
        </View>
      )}

      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      }}>
        {products.map(product => (
          <TouchableOpacity
            key={product.id}
            style={[s.card, {width: '48%'}]}
            onPress={() => setSelectedProduct(product)}
          >
            <Image
              source={{uri: product.image}}
              style={{
                width: '100%',
                height: 120,
                resizeMode: 'contain'
              }}
            />

            <Text
              numberOfLines={2}
              style={{fontWeight: 'bold', marginVertical: 7}}
            >
              {product.title}
            </Text>

            <T>${product.price}</T>
            <T>View Details</T>
          </TouchableOpacity>
        ))}
      </View>
    </Page>
  );
}

// MAIN APP CONFIGURATION

const practicals = {
  1: P1,
  2: P2,
  3: P3,
  4: P4,
  5: P5,
  6: P6,
  7: P7,
  8: P8,
  9: P9,
  10: P10,
  11: P11,
  12: P12,
  13: P13,
  14: P14,
  15: P15
};

export default function App() {
  const Practical = practicals[ACTIVE_PRACTICAL] || P1;

  return (
    <View style={{flex: 1}}>
      <Practical />
    </View>
  );
}

/*
PACKAGE / PROJECT SETUP

Create an Expo project if needed:
npx create-expo-app MyApp

Install dependencies:
npx expo install

Copy this code into App.js.

Run:
npx expo start

Change ACTIVE_PRACTICAL from 1 to 15
to run a particular practical.

NOTE:
This is a React Native JavaScript equivalent
of the Flutter practicals, not Dart Flutter code.
*/

