import React, {Component, useEffect, useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip, Form, Label, Input, Collapse, CardHeader, CardBody, Alert, InputGroup, Card, Badge } from 'reactstrap';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { withTranslation } from 'react-i18next';

//simple bar
import SimpleBar from "simplebar-react";

//components
import SelectContact from "../../../components/SelectContact";

//actions
import { createGroup } from "../../../redux/actions";
import {ApiFeUserService} from "../../../services/fe/ApiFeUserService";
import {ApiFeRoomService} from "../../../services/fe/ApiFeRoomService";

const Groups = () => {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         modal: false,
    //         isOpenCollapse: false,
    //         groups: this.props.groups,
    //         selectedContact: [],
    //         isOpenAlert: false,
    //         message: "",
    //         groupName: "",
    //         groupDesc: ""
    //     }
    //     this.toggle = this.toggle.bind(this);
    //     this.toggleCollapse = this.toggleCollapse.bind(this);
    //     this.createGroup = this.createGroup.bind(this);
    //     this.handleCheck = this.handleCheck.bind(this);
    //     this.handleChangeGroupName = this.handleChangeGroupName.bind(this);
    //     this.handleChangeGroupDesc = this.handleChangeGroupDesc.bind(this);
    // }
    const [modal, showModal] = useState(false);
    const [message, setMessage] = useState('');
    const [groups, setGroups] = useState([]);
    const [nameGroup, setNameGroup] = useState(null);
    const [descGroup, setDescGroup] = useState(null);
    const toggle = () => {
        showModal(!modal);
    }
    //
    const toggleCollapse = () => {
        // this.setState({ isOpenCollapse: !this.state.isOpenCollapse });
    }
    //
    // componentDidUpdate(prevProps) {
    //     if (prevProps !== this.props) {
    //         this.setState({
    //             groups: this.props.groups
    //         });
    //     }
    // }

    const createGroup = async () => {
        let group = {
            name: nameGroup,
            description : descGroup
        }

        console.log('-------------- GROUP : ', group);

        let response = await ApiFeRoomService.create(group);
        console.log('-------------- response@create: ', response);
        if (response.status === 200)
        {
            showModal(!modal);
            setDescGroup('');
            setNameGroup('');
            await getListGroups();
            console.log("============= TẠO THÀNH CÔNG =========== ")
        }

        // if (this.state.selectedContact.length > 2) {
        //
        //     //call action for creating a group
        //     this.props.createGroup(obj);
        //     this.toggle();
        //
        // } else if (this.state.selectedContact.length === 1) {
        //     this.setState({ message: "Minimum 2 members required!!!", isOpenAlert: true });
        // } else {
        //     this.setState({ message: "Please Select Members!!!", isOpenAlert: true });
        // }
        // setTimeout(
        //     function () {
        //         this.setState({ isOpenAlert: false });
        //     }
        //         .bind(this),
        //     3000
        // );
    }

    const  handleCheck = (e, contactId) =>  {
        var selected = this.state.selectedContact;
        var obj;
        if (e.target.checked) {
            obj = {
                id: contactId,
                name: e.target.value
            };
            selected.push(obj);
            this.setState({ selectedContact: selected })
        }
    }

    const handleChangeGroupDesc = (e) =>  {
        setDescGroup(e.target.value);
    }

    const handleChangeGroupName = (e) =>  {
        setNameGroup(e.target.value);
    }

    const getListGroups = async () => {
        let response = await ApiFeRoomService.getDataList([]);
        if (response.status === 200)
        {
            setGroups(response?.data?.rooms);
        }
    }

    useEffect(() => {
        getListGroups().then(r => {});
    }, []);

    return (
        <React.Fragment>
            <div>
                <div className="p-4">
                    <div className="user-chat-nav float-end">
                        <div id="create-group">
                            {/* Button trigger modal */}
                            <Button onClick={toggle} type="button" color="link" className="text-decoration-none text-muted font-size-18 py-0">
                                <i className="ri-group-line me-1"></i>
                            </Button>
                        </div>
                        <UncontrolledTooltip target="create-group" placement="bottom">
                            Tạo nhóm
                        </UncontrolledTooltip>

                    </div>
                    <h4 className="mb-4">{('Groups')}</h4>

                    {/* Start add group Modal */}
                    <Modal isOpen={modal} centered toggle={toggle}>
                        <ModalHeader tag="h5" className="modal-title font-size-14" toggle={toggle}>{('Create New Group')}</ModalHeader>
                        <ModalBody className="p-4">
                            <Form>
                                <div className="mb-4">
                                    <Label className="form-label" htmlFor="addgroupname-input">{('Group Name')}</Label>
                                    <Input type="text" className="form-control" id="addgroupname-input"  onChange={(e) => handleChangeGroupName(e)} placeholder="Tên nhóm" />
                                </div>
                                <div>
                                    <Label className="form-label" htmlFor="addgroupdescription-input">Description</Label>
                                    <textarea className="form-control" id="addgroupdescription-input"  onChange={(e) => handleChangeGroupDesc(e)} rows="3" placeholder="Mô tả"></textarea>
                                </div>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" color="link" onClick={toggle}>{('Close')}</Button>
                            <Button type="button" color="primary" onClick={createGroup}>Tạo nhóm</Button>
                        </ModalFooter>
                    </Modal>
                    {/* End add group Modal */}

                    <div className="search-box chat-search-box">
                        <InputGroup size="lg" className="bg-light rounded-lg">
                            <Button color="link" className="text-decoration-none text-muted pr-1" type="button">
                                <i className="ri-search-line search-icon font-size-18"></i>
                            </Button>
                            <Input type="text" className="form-control bg-light" placeholder="Search groups..." />
                        </InputGroup>
                    </div>
                    {/* end search-box */}
                </div>

                {/* Start chat-group-list */}
                <SimpleBar style={{ maxHeight: "100%" }} className="p-4 chat-message-list chat-group-list">


                    <ul className="list-unstyled chat-list">
                        {
                            groups.map((group, key) =>
                                <li key={key} >
                                    <Link to={`/room/${group._id}`}>
                                        <div className="d-flex align-items-center">
                                            <div className="chat-user-img me-3 ms-0">
                                                <div className="avatar-xs">
                                                        <span className="avatar-title rounded-circle bg-primary-subtle text-primary">
                                                            {group.name.charAt(1)}
                                                        </span>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1 overflow-hidden">
                                                <h5 className="text-truncate font-size-14 mb-0">
                                                    {group.name}
                                                    {
                                                        group.unRead !== 0
                                                            ? <Badge color="none" pill className="badge-soft-danger float-end">
                                                                {
                                                                    group.unRead >= 20 ? group.unRead + "+" : group.unRead
                                                                }
                                                            </Badge>
                                                            : null
                                                    }

                                                    {
                                                        group.isNew && <Badge color="none" pill className="badge-soft-danger float-end">New</Badge>
                                                    }

                                                </h5>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </SimpleBar>
                {/* End chat-group-list */}
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    const { groups, active_user } = state.Chat;
    return { groups, active_user };
};

export default (connect(mapStateToProps, { createGroup })(withTranslation()(Groups)));
