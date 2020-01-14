import bcryptjs from 'bcryptjs';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';

type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

// @ts-ignore
const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(),
  findOneOrFail: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let userRepositoryMock: MockType<Repository<UserEntity>>;

  const salt = bcryptjs.genSaltSync();
  const user = new UserEntity();
  user.id = '1';
  user.first_name = 'johnson';
  user.last_name = 'smith';
  user.email = 'user@test.com';
  user.password = bcryptjs.hashSync('password', salt);

  const mockRequest = (session: any, body: any) => ({
    session,
    body,
  });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, { provide: getRepositoryToken(UserEntity), useFactory: repositoryMockFactory }],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepositoryMock = module.get(getRepositoryToken(UserEntity));
  });

  it('should be server defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUserSession', () => {
    it('should return session', async () => {
      const userId = user.id;
      const req: any = mockRequest({ userId }, { query: [] });
      userRepositoryMock.findOneOrFail.mockReturnValue(user);
      const result = await authService.validateUserSession(req);
      expect(result.id).toBe(user.id);
    });

    it('should have null session', async () => {
      const req: any = mockRequest({}, { query: [] });
      userRepositoryMock.findOneOrFail.mockReturnValue(user);
      const result = await authService.validateUserSession(req);
      expect(result).toBeNull();
    });
  });

  describe('register', () => {
    const req: any = mockRequest({}, {});

    it('should succeed', async () => {
      const userResult = user;
      jest.spyOn(authService, 'register').mockImplementation(async () => userResult);

      const result = await authService.register(user, req);
      expect(result).toBe(user);
    });
  });

  describe('login', () => {
    const req: any = mockRequest({}, {});

    it('should succeed', async () => {
      const input = {
        email: 'user@test.com',
        password: 'password',
      };

      userRepositoryMock.findOneOrFail.mockReturnValue(user);
      try {
        const result = await authService.login(input, req);
        expect(result).toBe(user);
      } catch (error) {
        throw error;
      }
    });

    it('should fail', async () => {
      const input = {
        email: 'wrong@test.com',
        password: 'password',
      };

      userRepositoryMock.findOneOrFail.mockReturnValue(user);

      try {
        await authService.login(input, req);
      } catch (error) {
        expect(error).toThrow('Invalid email or password');
      }
    });
  });
});
