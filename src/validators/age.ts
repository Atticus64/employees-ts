const limitAge = async (age: number) => {
  if (age <= 18) {
    throw new Error("Range of age invalid too young to work");
  } else if (age >= 60) {
    throw new Error("Range of age invalid too old to work");
  }
};

export { limitAge };
