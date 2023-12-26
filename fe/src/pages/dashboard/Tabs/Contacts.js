import React, {useEffect, useState} from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip, Form, Label, Input, InputGroup, } from 'reactstrap';
import SimpleBar from "simplebar-react";
import {ApiFeUserService} from "../../../services/fe/ApiFeUserService";


const Contacts = () => {
    const [users, setUsers] = useState([]);
    const getListUsers = async () => {
        let response = await ApiFeUserService.getDataList([]);
        if (response.status === 200)
        {
            setUsers(response?.data?.users);
        }
        console.log('------------- getListUsers@response: ', response);
    }

    const clickToggle = () => {

    }
    useEffect(() => {
        getListUsers().then(r => {});
    }, []);
    return (
        <React.Fragment>
            <div>
                <div className="p-4">
                    <div className="user-chat-nav float-end">
                        <div id="add-contact">
                            {/* Button trigger modal */}
                            <Button type="button" color="link" onClick={clickToggle} className="text-decoration-none text-muted font-size-18 py-0">
                                <i className="ri-user-add-line"></i>
                            </Button>
                        </div>
                        <UncontrolledTooltip target="add-contact" placement="bottom">
                            Thêm mới liên hệ
                        </UncontrolledTooltip>
                    </div>
                    <h4 className="mb-4">Liên hệ</h4>
                    <div className="search-box chat-search-box">
                        <InputGroup size="lg" className="bg-light rounded-lg">
                            <Button color="link" className="text-decoration-none text-muted pr-1" type="button">
                                <i className="ri-search-line search-icon font-size-18"></i>
                            </Button>
                            <Input type="text" className="form-control bg-light " placeholder={('Search users..')} />
                        </InputGroup>
                    </div>
                    {/* End search-box */}
                </div>
                {/* end p-4 */}

                {/* Start contact lists */}
                <SimpleBar style={{ maxHeight: "100%" }} id="chat-room" className="p-4 chat-message-list chat-group-list">
                    { users && users.length > 0 ? (
                        users.map((contact, key) =>
                            <div key={key} className={key + 1 === 1 ? "" : "mt-3"}>
                                <ul className="list-unstyled contact-list">
                                    {
                                        <li key={key} >
                                            <div className="d-flex align-items-center">
                                                <div className="flex-grow-1">
                                                    <h5 className="font-size-14 m-0">{contact.name} 121</h5>
                                                </div>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle tag="a" className="text-muted">
                                                        <i className="ri-more-2-fill"></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu className="dropdown-menu-end">
                                                        <DropdownItem>{('Share')} <i className="ri-share-line float-end text-muted"></i></DropdownItem>
                                                        <DropdownItem>{('Block')} <i className="ri-forbid-line float-end text-muted"></i></DropdownItem>
                                                        <DropdownItem>{('Remove')} <i className="ri-delete-bin-line float-end text-muted"></i></DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </li>
                                    }
                                </ul>
                            </div>
                        )
                    ) : (
                        <>
                            <p>Đang loading</p>
                        </>
                    )}

                </SimpleBar>
                {/* end contact lists */}
            </div>
        </React.Fragment>
    );
}

// const mapStateToProps = (state) => {
//     const { contacts } = state.Chat;
//     return { contacts };
// };

export default Contacts;
// export default connect(mapStateToProps, null)(withTranslation()(Contacts));
