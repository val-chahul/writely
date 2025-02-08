declare module 'react-hot-toast' {
  interface ToastFunction {
    (message: string): void;
    (options: { type: 'success' | 'error'; message: string }): void;
    success(message: string): void;
    error(message: string): void;
  }

  export const toast: ToastFunction;

  export default toast;
}
