import React, {useEffect} from 'react';
import ChatLeftSidebar from "../dashboard/ChatLeftSidebar";
import UserChat from "../dashboard/UserChat";
import {useParams} from "react-router-dom";

const RoomIndex = () => {

    document.title = "Join Room"
    const { id } = useParams();
    console.log("=============== ROOM ID: ", id);
    useEffect(() => {

    }, []);


    return (
        <React.Fragment>
            <ChatLeftSidebar/>
            <UserChat roomID={id} />
        </React.Fragment>
    );
}

export default RoomIndex;
