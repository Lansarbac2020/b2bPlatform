// export const getEnv = (key: string, defaultValue: string = ""): string => {
//     const value = process.env[key];
//     if (value === undefined) {
//       if (defaultValue) {
//         return defaultValue;
//       }
//       throw new Error(`Enviroment variable ${key} is not set`);
//     }
//     return value;
//   };
  export function getEnv(key: string, defaultValue?: string): string {
    const value = process.env[key];
    if (value === undefined || value === null || value === "") {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
  }
  