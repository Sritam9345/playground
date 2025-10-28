import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
};


export const comparePassword = async (enteredPassword: string , hashPassword:  string): Promise<boolean> =>{

   const isMatch = await bcrypt.compare(enteredPassword,hashPassword);

    return isMatch;
}