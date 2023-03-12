import React, { useEffect, useRef } from 'react';
import XTerminal from './XTerminal';

function BuildTerminal({ url }) {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket(url);

    return () => {
      socketRef.current.close();
    }
  }, [url]);

  return (
    <div className="mt-4">
      <XTerminal
        onInput={(input) => socketRef.current.send(input)}
        onResize={(cols, rows) => socketRef.current.send(JSON.stringify({ cols, rows }))}
        onData={(data) => console.log(data)}
      />
    </div>
  );
}

export default BuildTerminal;
