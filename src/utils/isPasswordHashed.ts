export const isPasswordHashed = (password: string) => {
  return (
    (password.startsWith("$2a$") ||
      password.startsWith("$2b$") ||
      password.startsWith("$2y$")) &&
    password.length === 60
  );
};
