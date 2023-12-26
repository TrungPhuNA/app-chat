import React, { useState } from 'react';
import { Button, Input, Row, Col, UncontrolledTooltip, ButtonDropdown, DropdownToggle, DropdownMenu, Label, Form } from "reactstrap";
import EmojiPicker from 'emoji-picker-react';

function ChatInput(props) {
    const [textMessage, settextMessage] = useState("");
    const [isOpen, setisOpen] = useState(false);
    const [file, setfile] = useState({
        name: "",
        size: ""
    });
    const [fileImage, setfileImage] = useState("")

    const toggle = () => setisOpen(!isOpen);

    //function for text input value change
    const handleChange = e => {
        settextMessage(e.target.value);
    }

    const onEmojiClick = (event) => {
        settextMessage(textMessage + event.emoji);
    };

    //function for file input change
    const handleFileChange = e => {
        if (e.target.files.length !== 0)
            setfile({
                name: e.target.files[0].name,
                size: e.target.files[0].size,
            })
    }

    //function for image input change
    const handleImageChange = e => {
        if (e.target.files.length !== 0)
            setfileImage(URL.createObjectURL(e.target.files[0]))
    }

    //function for send data to onaddMessage function(in userChat/index.js component)
    const onaddMessage = (e, textMessage) => {
        e.preventDefault();
        //if text value is not emptry then call onaddMessage function
        if (textMessage !== "") {
            props.onaddMessage(textMessage, "textMessage");
            settextMessage("");
        }

        //if file input value is not empty then call onaddMessage function
        if (file.name !== "") {
            props.onaddMessage(file, "fileMessage");
            setfile({
                name: "",
                size: ""
            })
        }

        //if image input value is not empty then call onaddMessage function
        if (fileImage !== "") {
            props.onaddMessage(fileImage, "imageMessage");
            setfileImage("")
        }
    }

    return (
        <React.Fragment>
            <div className="chat-input-section p-3 p-lg-4 border-top mb-0 ">
                <Form onSubmit={(e) => onaddMessage(e, textMessage)} >
                    <Row className='g-0'>
                        <Col>
                            <div>
                                <Input type="text" value={textMessage} onChange={handleChange} className="form-control form-control-lg bg-light border-light" placeholder="Enter Message..." />
                            </div>
                        </Col>
                        <Col xs="auto">
                            <div className="chat-input-links ms-md-2">
                                <ul className="list-inline mb-0 ms-0">
                                    <li className="list-inline-item">
                                        <Button type="submit" color="primary" className="font-size-16 btn-lg chat-send waves-effect waves-light">
                                            <i className="ri-send-plane-2-fill"></i>
                                        </Button>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </React.Fragment>
    );
}

export default ChatInput;
