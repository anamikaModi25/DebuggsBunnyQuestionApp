import React, { PureComponent, ReactNode } from 'react';
import axios from 'axios';
import { API } from '../../Config/config';
import { Question, UserResponse } from '../../Admin/State/state';
import { Card, CardContent, FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import MyButton from '../../MaterialUI/MyButton';
import UserDetailsModal from './userDetailModal';
import { History } from 'history';

interface Props {
    match: any;
    history: History;
}
interface State {
    question: Question[];
    index: number;
    response: UserResponse[];
    isAns: boolean;
}

class AnserSheet extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            question: [],
            index: 0,
            response: [],
            isAns: false
        }
    }

    componentWillMount() {
        let { match } = this.props;
        console.log(match.params.id);
        axios.get(API + '/question/get', { params: { id: match.params.id } }).then(
            result => {
                let parsed = result.data;
                let data = JSON.parse(result.data);
                this.setState({ question: JSON.parse(data) })
            }
        ).catch(error => {
            //do nothing
        });
    }

    saveAns=(ques: string, opt: string)=>{
        console.log(ques, opt)
        let { response } = this.state;
        let ansSelection = response;
        if (ansSelection.length > 0) {
            let index = ansSelection.findIndex((el) => { return el.ques === ques });
            if (index > -1) {
                ansSelection[index].answer = opt;
            }
            else {
                ansSelection.push({
                    ques: ques,
                    answer: opt
                });
            }
        } else {
            ansSelection.push({
                ques: ques,
                answer: opt
            });
        }
        this.setState({ response: ansSelection, isAns: true });
    }

    next=(index: number)=>{
        this.setState({index: index, isAns: false})
    }
    submit=() =>{

    }
    render() {
        let { question, index, response, isAns } = this.state;
        return (
            <div className="row">
                <div className="col-md-12 col-12">
                    <h5 className="text-center" id="home-heading">{index + 1 } / {question.length} </h5>
            
                    {question.map((data, i) =>
                        i === index &&
                        <Card className='w-75 mx-auto mt-5'>
                            <CardContent>
                                <Typography className="my-3" variant="h6" color="textPrimary" component="h6">
                                   {i} {data.ques}
                                </Typography>
                                <div className="mx-4">
                                {data.options.map((opt, k) =>
                                           <div className="row form-check" key={k} >
                                           <label className="form-check-label">
                                               <input type="radio" className="form-check-input cursor-pointer" name="radio-btn" onClick={() => this.saveAns(data.ques, opt)} />
                                               <span className="ml-4">{opt}</span>
                                           </label>
                                       </div>
                                )}
                                </div>
                                <div className="mt-3 text-right">
                                    {question.length - 1 === i  ?
                                     <MyButton color="red" data-toggle="modal" data-target="#userDetailModal" disabled={!isAns} >
                                     Submit
                                     </MyButton>
                                     :
                                     <MyButton color="red" onClick={() => this.next(i + 1)} disabled={!isAns}>
                                     Next
                                     </MyButton>}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                    <UserDetailsModal userInfo={response} history={this.props.history} />
                </div>
            </div>
        )
    }
}

export default AnserSheet
