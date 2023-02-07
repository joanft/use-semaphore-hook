import * as React from 'react';
import { useCallback, useState } from 'react';
import { useSemaphore } from './useSemaphore';

export default function App() {
  const [bar, setBar] = useState(0);

  const foo = useCallback(async (n: number) => {
    const value = await new Promise<number>((res, rej) =>
      setTimeout(() => res(n), 1000)
    );
    console.log(value);
    setBar(value);
    return value;
  }, []);

  const fooSemaphore = useSemaphore(foo);
  return (
    <div>
      <button onClick={() => fooSemaphore(10)}>10 - {bar}</button>
      <button onClick={() => fooSemaphore(20)}>20 - {bar}</button>     
    </div>
  );
}
