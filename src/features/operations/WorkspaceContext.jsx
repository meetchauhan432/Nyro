import React, { createContext, useContext, useState } from 'react';
import { initialWorkspace, executeDemo } from './domain/demoWorkspace.js';
const Context = createContext(null);
export function WorkspaceProvider({ children }) {
    const [data, setData] = useState(initialWorkspace);
    const update = (key, fn) => setData(prev => ({ ...prev, [key]: fn(prev[key]) }));
    const transact = payload => { const result = executeDemo(data, payload); if (result.state)
        setData(result.state); return result; };
    return <Context.Provider value={{ data, update, transact }}>{children}</Context.Provider>;
}
export const useWorkspace = () => useContext(Context);
