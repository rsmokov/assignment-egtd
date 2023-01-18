import { User, UserAddress } from '@/interfaces';
import { generateUsersMap } from './';

describe('generateUsersMap', () => {
  const users: User[] = [
    {
      id: 1,
      name: 'User1',
      username: 'user1',
      email: 'testmail@example.com',
      address: {} as UserAddress,
      phone: '+3599999999',
    },
    {
      id: 1,
      name: 'User1',
      username: 'user1',
      email: 'testmail@example.com',
      address: {} as UserAddress,
      phone: '+3599999999',
    },
    {
      id: 2,
      name: 'User2',
      username: 'user2',
      email: 'testmail2@example.com',
      address: {} as UserAddress,
      phone: '+3599999993',
    },
  ];

  it('should generate map of 2 distinct users', () => {
    const result = generateUsersMap(users);

    expect(result.size).toEqual(2);
  });

  it('should can return user with id 2', () => {
    const result = generateUsersMap(users);

    expect(result.get(2)).toEqual(users[2].name);
  });
});
