// global.d.ts
declare global {
    interface Window {
      snap: any; // or you can specify the exact type if you know it
    }
  }
  
  export {}; // This ensures the file is treated as a module