const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 12000;

// Create a simple HTML page with API testing functionality
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard API Test</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        h1 { color: #333; }
        .container { max-width: 800px; margin: 0 auto; }
        .card { background: #f9f9f9; border: 1px solid #ddd; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
        button { background: #4CAF50; color: white; border: none; padding: 10px 15px; cursor: pointer; margin: 5px; border-radius: 4px; }
        button:hover { background: #45a049; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto; }
        input, select { padding: 8px; margin: 5px 0; width: 100%; box-sizing: border-box; }
        .response { margin-top: 10px; border: 1px solid #ddd; padding: 10px; background: #f4f4f4; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Admin Dashboard API Test</h1>
        
        <div class="card">
            <h2>Server Information</h2>
            <p>Backend URL: <span id="backendUrl">http://localhost:12000</span></p>
            <p>Frontend URL: <span id="frontendUrl">https://work-2-krobgjjrimhyoywn.prod-runtime.all-hands.dev</span></p>
            <button onclick="testBackendConnection()">Test Backend Connection</button>
            <button onclick="testAlternativeBackend()">Test Alternative Backend URL</button>
            <div id="connectionResult" class="response"></div>
        </div>

        <div class="card">
            <h2>Authentication</h2>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" value="admin@materialize.com">
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" value="admin">
            </div>
            <button onclick="login()">Login</button>
            <button onclick="register()">Register</button>
            <div id="authResult" class="response"></div>
        </div>

        <div class="card">
            <h2>API Endpoints</h2>
            <select id="endpoint">
                <option value="/api/users">Users</option>
                <option value="/api/products">Products</option>
                <option value="/api/orders">Orders</option>
                <option value="/api/categories">Categories</option>
                <option value="/api/health">Health Check</option>
            </select>
            <button onclick="fetchData()">Fetch Data</button>
            <div id="apiResult" class="response"></div>
        </div>
    </div>

    <script>
        // Default backend URL
        let backendUrl = 'http://localhost:12000';
        
        // Update displayed URLs
        document.getElementById('backendUrl').textContent = backendUrl;
        document.getElementById('frontendUrl').textContent = window.location.origin;
        
        // Test backend connection
        async function testBackendConnection() {
            const resultDiv = document.getElementById('connectionResult');
            resultDiv.innerHTML = 'Testing connection...';
            
            try {
                const response = await fetch(backendUrl + '/api/health', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                const data = await response.json();
                resultDiv.innerHTML = 'Connection successful: ' + JSON.stringify(data);
            } catch (error) {
                resultDiv.innerHTML = 'Connection failed: ' + error.message;
            }
        }
        
        // Test alternative backend URL
        async function testAlternativeBackend() {
            const alternativeUrl = 'https://work-1-krobgjjrimhyoywn.prod-runtime.all-hands.dev:12000';
            const resultDiv = document.getElementById('connectionResult');
            resultDiv.innerHTML = 'Testing alternative connection to ' + alternativeUrl + '...';
            
            try {
                const response = await fetch(alternativeUrl + '/api/health', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                const data = await response.json();
                resultDiv.innerHTML = 'Alternative connection successful: ' + JSON.stringify(data);
                backendUrl = alternativeUrl;
                document.getElementById('backendUrl').textContent = backendUrl;
            } catch (error) {
                resultDiv.innerHTML = 'Alternative connection failed: ' + error.message;
            }
        }
        
        // Login function
        async function login() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const resultDiv = document.getElementById('authResult');
            
            resultDiv.innerHTML = 'Logging in...';
            
            try {
                const response = await fetch(backendUrl + '/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    resultDiv.innerHTML = 'Login successful! Token: ' + data.token;
                } else {
                    resultDiv.innerHTML = 'Login failed: ' + data.message;
                }
            } catch (error) {
                resultDiv.innerHTML = 'Login error: ' + error.message;
            }
        }
        
        // Register function
        async function register() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const resultDiv = document.getElementById('authResult');
            
            resultDiv.innerHTML = 'Registering...';
            
            try {
                const response = await fetch(backendUrl + '/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        email, 
                        password,
                        name: 'New User',
                        role: 'user'
                    })
                });
                
                const data = await response.json();
                resultDiv.innerHTML = 'Registration result: ' + JSON.stringify(data);
            } catch (error) {
                resultDiv.innerHTML = 'Registration error: ' + error.message;
            }
        }
        
        // Fetch data from API
        async function fetchData() {
            const endpoint = document.getElementById('endpoint').value;
            const resultDiv = document.getElementById('apiResult');
            const token = localStorage.getItem('token');
            
            resultDiv.innerHTML = 'Fetching data from ' + endpoint + '...';
            
            try {
                const headers = {
                    'Content-Type': 'application/json'
                };
                
                if (token) {
                    headers['Authorization'] = 'Bearer ' + token;
                }
                
                const response = await fetch(backendUrl + endpoint, {
                    method: 'GET',
                    headers: headers
                });
                
                const data = await response.json();
                resultDiv.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
            } catch (error) {
                resultDiv.innerHTML = 'Error fetching data: ' + error.message;
            }
        }
    </script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Set content type
  res.setHeader('Content-Type', 'text/html');
  
  // Always serve our HTML content
  res.writeHead(200);
  res.end(html);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
  console.log(`Access URL: https://work-2-krobgjjrimhyoywn.prod-runtime.all-hands.dev`);
});