export type UsersAndRoles = ({
  roles: ({
    role: {
      name: string;
    };
  } & {
    userId: string;
    roleId: string;
  })[];
} & {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
  country: string;
  createdDate: Date;
  isVerified: boolean;
})[];
