import React from 'react';
const StudentContext = React.createContext();
const StudentProvider = StudentContext.Provider;
const StudentConsumer = StudentContext.Consumer;
export { StudentConsumer, StudentProvider };