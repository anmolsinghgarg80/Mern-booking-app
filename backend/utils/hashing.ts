import {hash, compare} from 'bcryptjs';

export const doHash = async (password: string, saltvalue:number) :Promise<String>  => {
  const result = await hash(password,saltvalue);
  return result;
};

export const doHashValidation = async (password: string, hashedvalue : string ) :Promise<boolean> => {
  const result = await compare(password , hashedvalue);
  return result;
}
