import React, { createContext, useContext } from 'react';

interface IssueContextType {
  tasks: Task[];
}

const IssueContext = createContext<IssueContextType | undefined>(undefined);

export const IssueProvider: React.FC<{
  tasks: Task[];
  children: React.ReactNode;
}> = ({ tasks, children }) => {
  return (
    <IssueContext.Provider value={{ tasks }}>{children}</IssueContext.Provider>
  );
};

export const useIssueContext = () => {
  const context = useContext(IssueContext);
  if (!context) {
    throw new Error('useIssueContext must be used within an IssueProvider');
  }
  return context;
};
