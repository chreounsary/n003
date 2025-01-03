"use client";
const { Provider } = require("react-redux");


export const Providers = ({}) => {  
    return (
        <Provider store={store}>
        {children}
        </Provider>
    )
}
export default Providers;