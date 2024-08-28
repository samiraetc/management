type User = {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  full_name: string;
  email: string;
  image?: string
};

type CreateUser = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
};

type EditUser = {
  first_name?: string;
  last_name?: string;
  username?: string;
  position?: string;
  image?: string;
};
