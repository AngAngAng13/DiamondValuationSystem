import { initializeApp, cert, getApps, deleteApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { jest } from '@jest/globals';

// Mock firebase-admin
jest.mock('firebase-admin/app', () => ({
  initializeApp: jest.fn(),
  cert: jest.fn(),
  getApps: jest.fn(() => []),
  deleteApp: jest.fn(),
}));
jest.mock('firebase-admin/auth', () => ({
  getAuth: jest.fn(),
}));

import {
  getUsersRecord,
  getUserRecord,
  getUserRecord_ALL,
  createUserRecord,
  deleteUserRecord,
  updateUserRecord,
  setUserCustomClaim,
} from '../src/FireBase/adminRoute'; // replace with the actual path to your functions

describe('Admin functions', () => {
  const mockAuth = {
    listUsers: jest.fn(),
    getUser: jest.fn(),
    createUser: jest.fn(),
    deleteUser: jest.fn(),
    updateUser: jest.fn(),
    setCustomUserClaims: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Clear existing Firebase apps before initializing a new one
    const apps = getApps();
    if (apps.length > 0) {
      apps.forEach(app => deleteApp(app));
    }

    // Initialize Firebase app
    initializeApp({
      credential: cert('serect.json'),
    });

    // Mock getAuth to return the mockAuth object
    getAuth.mockReturnValue(mockAuth);
  });

  it('should get user records', async () => {
    const mockUsers = [
      {
        uid: '123',
        displayName: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '123456789',
        customClaims: { admin: true },
      },
    ];
    mockAuth.listUsers.mockResolvedValue({ users: mockUsers });

    const users = await getUsersRecord();

    expect(users).toEqual([
      {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123456789',
        access: 'admin',
      },
    ]);
  });

  it('should get a single user record', async () => {
    const mockUser = {
      uid: '123',
      displayName: 'John Doe',
      email: 'john@example.com',
      phoneNumber: '123456789',
      customClaims: { admin: true },
    };
    mockAuth.getUser.mockResolvedValue(mockUser);

    const user = await getUserRecord('123');

    expect(user).toEqual({
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123456789',
      access: true,
    });
  });

  it('should get all user records', async () => {
    const mockUsers = [
      {
        uid: '123',
        displayName: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '123456789',
      },
    ];
    mockAuth.listUsers.mockResolvedValue({ users: mockUsers });

    const users = await getUserRecord_ALL();

    expect(users).toEqual(mockUsers);
  });

  it('should create a user record', async () => {
    const mockUser = {
      uid: '123',
      email: 'john@example.com',
      phoneNumber: '123456789',
      displayName: 'John Doe',
      disabled: false,
    };
    mockAuth.createUser.mockResolvedValue(mockUser);

    const user = await createUserRecord({
      email: 'john@example.com',
      contact: '123456789',
      firstName: 'John',
      lastName: 'Doe',
    });

    expect(user).toEqual(mockUser);
  });

  it('should delete a user record', async () => {
    mockAuth.deleteUser.mockResolvedValue();

    const result = await deleteUserRecord('123');

    expect(result).toBe('User deleted');
  });

  it('should update a user record', async () => {
    const mockUser = {
      uid: '123',
      email: 'john@example.com',
      displayName: 'John Doe',
    };
    mockAuth.updateUser.mockResolvedValue(mockUser);

    const user = await updateUserRecord('123', { displayName: 'John Doe' });

    expect(user).toEqual(mockUser);
  });

  it('should set custom claims for a user', async () => {
    mockAuth.setCustomUserClaims.mockResolvedValue();

    const result = await setUserCustomClaim('123', { admin: true });

    expect(result).toBe('Custom claims set');
  });
});
