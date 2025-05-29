export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MANAGER = 'manager',
  GUEST = 'guest'
}

const rawUserData = [
  {
    username: 'John',
    password: 'beatles1',
    role: UserRole.USER
  },
  {
    username: 'Paul',
    password: 'beatles2',
    role: UserRole.ADMIN
  },
  {
    username: 'George',
    password: 'beatles3',
    role: UserRole.MANAGER,
    skip: true // will be skipped during testing
  },
  {
    username: 'Ringo',
    password: 'beatles4',
    role: UserRole.GUEST,
    skip: true // will be skipped during testing,
  },
]

export class UserProfile {
  constructor(public username: string, public password: string,
    public role: UserRole, public skip?: boolean) {
    this.username = username
    this.password = password
    this.role = role
    // optional property for excluding user from tests
    this.skip = skip
  }
  // procedurally synthesizes the storageState path for authentication later
  get storageState(): string {
    return `e2e/.auth/${this.username}.json`
  }
}

// list of unskipped test users which will be used to generate projects in the config
export const userProfiles: UserProfile[] = rawUserData
    .filter(user => !user.skip)
  .map(u => new UserProfile(u.username, u.password, u.role))
