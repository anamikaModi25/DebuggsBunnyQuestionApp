import React, { Component } from 'react';
import { UserResponse } from '../../Admin/State/state';
import { FormControl, TextField } from '@material-ui/core';
import MyButton from '../../MaterialUI/MyButton';
import { History } from 'history';

interface Props {
    userInfo: UserResponse[];
    history: History;
    // submitted: (submitSuccess: boolean) => void;
}

interface State {
    name: string;
    contact: string;
}

class UserDetailsModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            name: '',
            contact: ''
        }
    }

    render() {
        let { name, contact } = this.state;
        return (
            <div className="col-md-12">
                <div className="modal fade" id="userDetailModal" role="dialog" aria-labelledby="userDetailsModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h6 className="modal-title" id="userDetailsModalLabel">Almost Done ! Please fill the details below</h6>
                            </div>
                            <div className="modal-body">
                                <form>
                                <FormControl className="w-100 mb-4">
                                    <TextField id="name" type="text" label="Name" onChange={(e) => this.setState({ name: e.currentTarget.value  })} required color="secondary" />
                                </FormControl>
                                <FormControl className="w-100 mb-4">
                                    <TextField id="name" type="text" label="Contact" onChange={(e) => this.setState({ contact: e.currentTarget.value  })} required color="secondary" />
                                </FormControl>
                                   <div className="text-center">
                                   {(name.length > 0 && contact.length > 0) ? <MyButton color="blue" type="submit" data-dismiss="modal" onClick={() => this.saveUserInfo()}>Submit</MyButton>
                                    :
                                    <MyButton color="blue" disabled>
                                        Submit
                                    </MyButton>}
                                   </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    saveUserInfo() {
        let { name, contact } = this.state;
        localStorage.setItem("userName", name);
        localStorage.setItem("contact", contact);
        localStorage.setItem("response", JSON.stringify(this.props.userInfo));
        this.props.history.push('/done')
    }
}

export default UserDetailsModal;