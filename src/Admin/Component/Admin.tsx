import React from 'react'
import AdminForm from './AdminForm';
import { History } from 'history';

interface Props {
    history: History;
}
interface State {}

class Admin extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        let { history } = this.props;
        return (
            <div className='row'>
                <div className="col-md-12 co-12 text-center">
                    <h5 id="home-heading">Create Quiz!</h5>
                </div>
                <div className="col-md-6 col-12 mx-auto" id="admin-form">
                    <AdminForm  history={history}/>
                </div>
            </div>
        )
    }
}

export default Admin
