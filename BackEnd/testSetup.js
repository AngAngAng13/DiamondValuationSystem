import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { jest } from '@jest/globals';

// Mock firebase-admin
jest.mock('firebase-admin/app', () => ({
  initializeApp: jest.fn(),
  cert: jest.fn(),
}));
jest.mock('firebase-admin/auth', () => ({
  getAuth: jest.fn(() => ({
    listUsers: jest.fn(),
    getUser: jest.fn(),
    createUser: jest.fn(),
    deleteUser: jest.fn(),
    updateUser: jest.fn(),
    setCustomUserClaims: jest.fn(),
  })),
}));

import {
  getUsersRecord,
  getUserRecord,
  getUserRecord_ALL,
  createUserRecord,
  deleteUserRecord,
  updateUserRecord,
  setUserCustomClaim,
} from './yourFilePath'; // replace with the actual path to your functions

describe('Admin functions', () => {
  const app = initializeApp({
    credential: cert('serect.json'),
  });
  const auth = getAuth(app);

  beforeEach(() => {
    jest.clearAllMocks();
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
    auth.listUsers.mockResolvedValue({ users: mockUsers });

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
    auth.getUser.mockResolvedValue(mockUser);

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
    auth.listUsers.mockResolvedValue({ users: mockUsers });

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
    auth.createUser.mockResolvedValue(mockUser);

    const user = await createUserRecord({
      email: 'john@example.com',
      contact: '123456789',
      firstName: 'John',
      lastName: 'Doe',
    });

    expect(user).toEqual(mockUser);
  });

  it('should delete a user record', async () => {
    auth.deleteUser.mockResolvedValue();

    const result = await deleteUserRecord('123');

    expect(result).toBe('User deleted');
  });

  it('should update a user record', async () => {
    const mockUser = {
      uid: '123',
      email: 'john@example.com',
      displayName: 'John Doe',
    };
    auth.updateUser.mockResolvedValue(mockUser);

    const user = await updateUserRecord('123', { displayName: 'John Doe' });

    expect(user).toEqual(mockUser);
  });

  it('should set custom claims for a user', async () => {
    auth.setCustomUserClaims.mockResolvedValue();

    const result = await setUserCustomClaim('123', { admin: true });

    expect(result).toBe('Custom claims set');
  });
});
