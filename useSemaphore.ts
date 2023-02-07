import { useCallback, useRef } from 'react';

export function useSemaphore<T extends (...args: any) => any>(fn: T) {
  const isExecuting = useRef<boolean>(false);

  return useCallback(
    async (...args: any) => {
      if (!isExecuting.current) {
        isExecuting.current = true;
        try {
          return await fn(...args);
        } catch (e) {
          throw e;
        } finally {
          isExecuting.current = false;
        }
      }
    },
    [fn]
  ) as T;
}
