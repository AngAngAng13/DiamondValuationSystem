/* eslint-disable no-undef */
// auth.test.js
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { auth } from "../firebaseSetup";
import fs from "fs";
import path from "path";

let testEnv;
let testData;
let missingPassword;
let weakPassword;
let sameEmail;
let wrongPassword;
beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: "demo-project-1234",
  });

  // Load the JSON data
  missingPassword = JSON.parse(fs.readFileSync(path.resolve(__dirname, "Data/User_Missing_password.json")));
  testData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "Data/User.json")));
  weakPassword = JSON.parse(fs.readFileSync(path.resolve(__dirname, "Data/User_Weak_password.json")));
  sameEmail = JSON.parse(fs.readFileSync(path.resolve(__dirname, "Data/Same_Email.json")));
  wrongPassword = JSON.parse(fs.readFileSync(path.resolve(__dirname, "Data/User_Wrong_password.json")));
});

afterAll(async () => {
  await testEnv.cleanup();
});

describe("Firebase Auth Tests", () => {
  it("should sign up users", async () => {
    for (const user of testData) {
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
      expect(userCredential.user.email).toBe(user.email);
    }
  });

  it("should not sign up a user with the same email", async () => {
    

    for (const user of sameEmail) {
      try {
        await createUserWithEmailAndPassword(auth, user.email, user.password);  
      } catch (error) {
        expect(error.code).toBe("auth/email-already-in-use");
      }
    }
  });

  it("should not sign up a user with missing password", async () => {
    for (const user of missingPassword) {
      try {
        await createUserWithEmailAndPassword(auth, user.email, user.password);
      } catch (error) {
        expect(error.code).toBe("auth/missing-password");
      }
    }
  });
  it("should not sign up a user with weak password", async () => {
    for (const user of weakPassword) {
      try {
        await createUserWithEmailAndPassword(auth, user.email, user.password);
      } catch (error) {
        expect(error.code).toBe("auth/weak-password");
      }
    }
  });
  it("should sign in  user", async () => {
    for (const user of testData) {
      const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
      expect(userCredential.user.email).toBe(user.email);
    }
  });
  it("should not sign in a user with wrong password", async () => {
    for (const user of wrongPassword) {
      try {
        await signInWithEmailAndPassword(auth, user.email, user.password);
      } catch (error) {
        expect(error.code).toBe("auth/wrong-password");
      }
    }
  });
  it("should not sign in with the same email", async () => {
    for (const user of sameEmail) {
      try {
        await signInWithEmailAndPassword(auth, user.email, user.password);
      } catch (error) {
        expect(error.code).toBe("auth/email-already-in-use");
      }
    }
  });
  it("should sign out a user", async () => {
    await signOut(auth);
    expect(auth.currentUser).toBe(null);
  });
});
