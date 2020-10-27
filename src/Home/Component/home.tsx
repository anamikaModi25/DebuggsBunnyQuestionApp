import React from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../../MaterialUI/MyButton';

interface Props { }
interface State { }

export default class Home extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12 text-center mt-5">
                    <h4 id="home-heading">Welcome! Who are you?</h4>
                    <div className="row">
                        <div className="col-md-3 col-8 mx-auto mt-4" id="home-page">
                            <div className="row">
                                <div className="col-md-6 cosl-6">
                                    <Link to='/admin'>
                                        <MyButton color="red" >
                                            Admin
                                       </MyButton>
                                    </Link>
                                </div>
                                <div className="col-md-6 col-6">
                                    <Link to="/user">
                                        <MyButton color="blue">User</MyButton>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
