import React, { useState, useEffect, useRef } from 'react';
import { DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown, Modal, ModalHeader, ModalBody, CardBody, Button, ModalFooter } from "reactstrap";
import { connect } from "react-redux";

import SimpleBar from "simplebar-react";

import withRouter from "../../../components/withRouter";

//Import Components
import UserProfileSidebar from "../../../components/UserProfileSidebar";
import UserHead from "./UserHead";
import ImageList from "./ImageList";
import ChatInput from "./ChatInput";
import FileList from "./FileList";

//actions
import { openUserSidebar, setFullUser } from "../../../redux/actions";

//Import Images
import avatar1 from "../../../assets/images/users/avatar-1.jpg";

//i18n
import { useTranslation } from 'react-i18next';
import {string} from "yup";
import {ApiFeRoomService} from "../../../services/fe/ApiFeRoomService";

function UserChat(props) {

    const ref = useRef();

    const [modal, setModal] = useState(false);
    const [roomID, setRoomID] = useState(null);

    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    //demo conversation messages
    //userType must be required
    const [allUsers] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    // const [chatMessages, setchatMessages] = useState(props.recentChatList[props.active_user].messages);

    const toggle = () => setModal(!modal);

    const addMessage = async (message, type) => {
        let d = new Date();
        var n = d.getSeconds();


        let messageObj = {
            room_id : roomID,
            user_id : "65891be8ae1197160461b6f5",
            message: message
        }

        let response = await ApiFeRoomService.createChat(roomID, messageObj);
        console.log('================= response:addMessage ', response);
        if (response.status === 200)
        {
            // setChatMessages(response?.data?.messages);
        }


        //add message object to chat
        // setChatMessages([...chatMessages, messageObj]);
        //
        // let copyallUsers = [...allUsers];
        // copyallUsers[props.active_user].messages = [...chatMessages, messageObj];
        // copyallUsers[props.active_user].isTyping = false;
        // props.setFullUser(copyallUsers);
        //
        // scrolltoBottom();
    }

    function scrolltoBottom() {
        if (ref.current.el) {
            ref.current.getScrollElement().scrollTop = ref.current.getScrollElement().scrollHeight;
        }
    }


    const deleteMessage = (id) => {
        let conversation = chatMessages;

        var filtered = conversation.filter(function (item) {
            return item.id !== id;
        });

        // setchatMessages(filtered);
    }

    const getMessageChat = async (roomID) => {
        let response = await ApiFeRoomService.getListMessage(roomID, []);
        console.log('================= response:getMessageChat ', response);
        if (response.status === 200)
        {
            setChatMessages(response?.data?.messages);
        }
    }


    useEffect(() => {
        console.log('=============== useEffect: ROOM ID: ', props.roomID);
        ref.current.recalculate();
        if (ref.current.el) {
            ref.current.getScrollElement().scrollTop = ref.current.getScrollElement().scrollHeight;
        }

        if (props.roomID)
        {
            setRoomID(props.roomID);
            getMessageChat(props.roomID).then(r => {});
        }
    }, [props.active_user, props.recentChatList]);


    return (
        <React.Fragment>
            <div className="user-chat w-100 overflow-hidden">

                <div className="d-lg-flex">

                    <div className={props.userSidebar ? "w-70 overflow-hidden position-relative" : "w-100 overflow-hidden position-relative"}>

                        {/* render user head */}
                        <UserHead  />

                        <SimpleBar
                            style={{ maxHeight: "100%" }}
                            ref={ref}
                            className="chat-conversation p-5 p-lg-4"
                            id="messages">
                            <ul className="list-unstyled mb-0">
                                { chatMessages.length > 0 ? (
                                    chatMessages.map((message,index) => {
                                        return (
                                            <li key={index} className={"sender" === "sender" ? "right" : ""}>
                                                <div className="conversation-list">
                                                    <div className="chat-avatar">
                                                        <img src={avatar1} alt="chatvia" />
                                                    </div>
                                                    <div className="user-chat-content">
                                                        <div className="ctext-wrap">
                                                            <div className="ctext-wrap-content">
                                                                {
                                                                    <p className="mb-0">{message.message}</p>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="conversation-name">{message.user?.name}</div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                ) : (
                                    <p>Chưa có cuộc hội thoại</p>
                                )}


                                {/*<li key="2" className={"sender" === "sender" ? "" : ""}>*/}
                                {/*    <div className="conversation-list">*/}
                                {/*        <div className="chat-avatar">*/}
                                {/*            <img src={avatar1} alt="chatvia" />*/}
                                {/*        </div>*/}
                                {/*        <div className="user-chat-content">*/}
                                {/*            <div className="ctext-wrap">*/}
                                {/*                <div className="ctext-wrap-content">*/}
                                {/*                    {*/}
                                {/*                        <p className="mb-0">Nội dung</p>*/}
                                {/*                    }*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*            <div className="conversation-name">Phú Phan</div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</li>*/}
                                {/*<li key={key} className={chat.userType === "sender" ? "right" : ""}>*/}
                                {/*    <div className="conversation-list">*/}
                                {/*        {*/}
                                {/*            //logic for display user name and profile only once, if current and last messaged sent by same receiver*/}
                                {/*            chatMessages[key + 1] ? chatMessages[key].userType === chatMessages[key + 1].userType ?*/}

                                {/*                    <div className="chat-avatar">*/}
                                {/*                        <div className="blank-div"></div>*/}
                                {/*                    </div>*/}
                                {/*                    :*/}
                                {/*                    <div className="chat-avatar">*/}
                                {/*                        {chat.userType === "sender" ? <img src={avatar1} alt="chatvia" /> :*/}
                                {/*                            props.recentChatList[props.active_user].profilePicture === "Null" ?*/}
                                {/*                                <div className="chat-user-img align-self-center me-3">*/}
                                {/*                                    <div className="avatar-xs">*/}
                                {/*                                                    <span className="avatar-title rounded-circle bg-primary-subtle text-primary">*/}
                                {/*                                                        {props.recentChatList[props.active_user].name.charAt(0)}*/}
                                {/*                                                    </span>*/}
                                {/*                                    </div>*/}
                                {/*                                </div>*/}
                                {/*                                : <img src={props.recentChatList[props.active_user].profilePicture} alt="chatvia" />*/}
                                {/*                        }*/}
                                {/*                    </div>*/}
                                {/*                : <div className="chat-avatar">*/}
                                {/*                    {chat.userType === "sender" ? <img src={avatar1} alt="chatvia" /> :*/}
                                {/*                        props.recentChatList[props.active_user].profilePicture === "Null" ?*/}
                                {/*                            <div className="chat-user-img align-self-center me-3">*/}
                                {/*                                <div className="avatar-xs">*/}
                                {/*                                                    <span className="avatar-title rounded-circle bg-primary-subtle text-primary">*/}
                                {/*                                                        {props.recentChatList[props.active_user].name.charAt(0)}*/}
                                {/*                                                    </span>*/}
                                {/*                                </div>*/}
                                {/*                            </div>*/}
                                {/*                            : <img src={props.recentChatList[props.active_user].profilePicture} alt="chatvia" />*/}
                                {/*                    }*/}
                                {/*                </div>*/}
                                {/*        }*/}


                                {/*        <div className="user-chat-content">*/}
                                {/*            <div className="ctext-wrap">*/}
                                {/*                <div className="ctext-wrap-content">*/}
                                {/*                    {*/}
                                {/*                        chat.message &&*/}
                                {/*                        <p className="mb-0">*/}
                                {/*                            {chat.message}*/}
                                {/*                        </p>*/}
                                {/*                    }*/}
                                {/*                    {*/}
                                {/*                        chat.imageMessage &&*/}
                                {/*                        // image list component*/}
                                {/*                        <ImageList images={chat.imageMessage} />*/}
                                {/*                    }*/}
                                {/*                    {*/}
                                {/*                        chat.fileMessage &&*/}
                                {/*                        //file input component*/}
                                {/*                        <FileList fileName={chat.fileMessage} fileSize={chat.size} />*/}
                                {/*                    }*/}
                                {/*                    {*/}
                                {/*                        chat.isTyping &&*/}
                                {/*                        <p className="mb-0">*/}
                                {/*                            typing*/}
                                {/*                            <span className="animate-typing">*/}
                                {/*                                                <span className="dot ms-1"></span>*/}
                                {/*                                                <span className="dot ms-1"></span>*/}
                                {/*                                                <span className="dot ms-1"></span>*/}
                                {/*                                            </span>*/}
                                {/*                        </p>*/}
                                {/*                    }*/}
                                {/*                    {*/}
                                {/*                        !chat.isTyping && <p className="chat-time mb-0"><i className="ri-time-line align-middle"></i> <span className="align-middle">{chat.time}</span></p>*/}
                                {/*                    }*/}
                                {/*                </div>*/}
                                {/*                {*/}
                                {/*                    !chat.isTyping &&*/}
                                {/*                    <UncontrolledDropdown className="align-self-start ms-1">*/}
                                {/*                        <DropdownToggle tag="a" className="text-muted">*/}
                                {/*                            <i className="ri-more-2-fill"></i>*/}
                                {/*                        </DropdownToggle>*/}
                                {/*                        <DropdownMenu>*/}
                                {/*                            <DropdownItem>{t('Copy')} <i className="ri-file-copy-line float-end text-muted"></i></DropdownItem>*/}
                                {/*                            <DropdownItem>{t('Save')} <i className="ri-save-line float-end text-muted"></i></DropdownItem>*/}
                                {/*                            <DropdownItem onClick={toggle}>Forward <i className="ri-chat-forward-line float-end text-muted"></i></DropdownItem>*/}
                                {/*                            <DropdownItem onClick={() => deleteMessage(chat.id)}>Delete <i className="ri-delete-bin-line float-end text-muted"></i></DropdownItem>*/}
                                {/*                        </DropdownMenu>*/}
                                {/*                    </UncontrolledDropdown>*/}
                                {/*                }*/}

                                {/*            </div>*/}
                                {/*            {*/}
                                {/*                chatMessages[key + 1] ?*/}
                                {/*                    chatMessages[key].userType === chatMessages[key + 1].userType ? null :*/}

                                {/*                        <div className="conversation-name">{chat.userType === "sender" ?*/}

                                {/*                            "Patricia Smith" : props.recentChatList[props.active_user].name}</div> :*/}

                                {/*                    <div className="conversation-name">{chat.userType === "sender" ?*/}

                                {/*                        "Admin" : props.recentChatList[props.active_user].name}</div>*/}
                                {/*            }*/}

                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</li>*/}
                            </ul>
                        </SimpleBar>
                        <ChatInput onaddMessage={addMessage} />
                    </div>

                    <UserProfileSidebar activeUser={[]} />

                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    const { active_user } = state.Chat;
    const { userSidebar } = state.Layout;
    return { active_user, userSidebar };
};

export default withRouter(connect(mapStateToProps, { openUserSidebar, setFullUser })(UserChat));

