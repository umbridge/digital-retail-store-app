class SessionStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = String(value);
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  }
  
global.sessionStorage = new SessionStorageMock();

const { default: authHeader } = require('./../services/auth-header.js');

describe("Auth header test when token is empty", () => {
    console.log(authHeader());
    test('Testing auth header when token is empty', () => {
      expect(authHeader()).toEqual({});
    });
   })

   

