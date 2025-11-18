require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { registerUser } = require('../controllers/registerController');
const { loginUser } = require('../controllers/authController');

// Set JWT secrets
process.env.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'test-access-secret';
process.env.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'test-refresh-secret';
process.env.NODE_ENV = 'test';

async function testRegisterAndLogin() {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/devconnect';
        console.log('Connecting to MongoDB at:', mongoUri);
        
        await mongoose.connect(mongoUri);
        console.log('✓ Connected to MongoDB\n');

        // Delete any existing test user
        await User.deleteOne({ email: 'integration-test@example.com' });
        console.log('✓ Cleaned up old test user\n');

        // ========== TEST 1: REGISTRATION ==========
        console.log('=== TEST 1: REGISTRATION ===');
        
        const registerReq = {
            body: {
                email: 'integration-test@example.com',
                username: 'integrationtester',
                firstName: 'Integration',
                lastName: 'Tester',
                password: 'TestPassword123',
                confirmPassword: 'TestPassword123',
                role: 'user'
            }
        };

        const registerRes = {
            _status: 200,
            status(code) { this._status = code; return this; },
            json(payload) {
                console.log(`Response Status: ${this._status}`);
                console.log('Response Payload:', JSON.stringify(payload, null, 2));
                this._data = payload;
                return this;
            }
        };

        await registerUser(registerReq, registerRes);
        
        if (registerRes._status === 201) {
            console.log('✓ Registration successful!\n');
        } else {
            console.log('✗ Registration failed with status:', registerRes._status, '\n');
            return;
        }

        // ========== TEST 2: LOGIN ==========
        console.log('=== TEST 2: LOGIN ===');
        
        const loginReq = {
            body: {
                login: 'integration-test@example.com',  // login by email
                password: 'TestPassword123',
                persist: false
            }
        };

        const loginRes = {
            _status: 200,
            status(code) { this._status = code; return this; },
            json(payload) {
                console.log(`Response Status: ${this._status}`);
                console.log('Response Payload:', JSON.stringify(payload, null, 2));
                this._data = payload;
                return this;
            },
            cookie(name, value, opts) {
                console.log(`Cookie Set: ${name} (httpOnly: ${opts.httpOnly})`);
            }
        };

        await loginUser(loginReq, loginRes);
        
        if (loginRes._status === 200) {
            console.log('✓ Login successful!\n');
        } else {
            console.log('✗ Login failed with status:', loginRes._status, '\n');
            return;
        }

        // ========== TEST 3: LOGIN WITH USERNAME ==========
        console.log('=== TEST 3: LOGIN WITH USERNAME ===');
        
        const loginReq2 = {
            body: {
                login: 'integrationtester',  // login by username
                password: 'TestPassword123',
                persist: false
            }
        };

        const loginRes2 = {
            _status: 200,
            status(code) { this._status = code; return this; },
            json(payload) {
                console.log(`Response Status: ${this._status}`);
                console.log('Response Payload:', JSON.stringify(payload, null, 2));
                return this;
            },
            cookie(name, value, opts) {
                console.log(`Cookie Set: ${name}`);
            }
        };

        await loginUser(loginReq2, loginRes2);
        
        if (loginRes2._status === 200) {
            console.log('✓ Login by username successful!\n');
        } else {
            console.log('✗ Login by username failed!\n');
        }

        console.log('=== ALL TESTS COMPLETED ===');

    } catch (err) {
        console.error('Test error:', err.message);
    } finally {
        await mongoose.disconnect();
        console.log('\n✓ Disconnected from MongoDB');
    }
}

testRegisterAndLogin();
