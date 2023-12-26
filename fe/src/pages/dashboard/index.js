import React, { Component } from 'react';
//Import Components
import ChatLeftSidebar from "./ChatLeftSidebar";
import UserChat from "./UserChat/index";

const Index = () => {
    return (
        <React.Fragment>
            <ChatLeftSidebar/>
            <UserChat />

        </React.Fragment>
    );
}

export default Index;
