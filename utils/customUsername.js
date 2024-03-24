const customUsername = (email) => {
  const username = email.split("@")[0];

  return username;
};

export default customUsername;
