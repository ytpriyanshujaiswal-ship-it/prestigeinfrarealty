declare module 'bcryptjs' {
  interface BcryptJs {
    compare(plainText: string, hash: string): Promise<boolean>;
  }
  const bcrypt: BcryptJs;
  export default bcrypt;
}
