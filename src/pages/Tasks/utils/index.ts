import { User } from '@/interfaces';

const distinctUsers = (users: User[]): Partial<User>[] =>
  users?.reduce((list: Partial<User>[], currentUser: User) => {
    if (list.find(user => user.id === currentUser.id)) {
      return list;
    }
    list.push({
      id: currentUser.id,
      name: currentUser.name,
    });

    return list;
  }, []);

export const generateUsersMap = (users: User[]): Map<number, string> => {
  const distinct = distinctUsers(users);
  const userMap = new Map();

  distinct?.forEach(user => {
    userMap.set(user.id, user.name);
  });

  return userMap;
};
