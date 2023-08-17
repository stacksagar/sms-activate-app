type User = {
  id: ID;
  name: string;
  email: string;
};

type Product = {
  id: ID;
  name: string;
  sizes: { [key: string]: number };
};
