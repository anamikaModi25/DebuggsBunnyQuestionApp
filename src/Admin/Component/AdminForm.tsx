import { FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import MyButton from '../../MaterialUI/MyButton';
// import { API, Question } from '../IntroPage/State/state';
import axios from 'axios';
import { API } from '../../Config/config';
import { Question } from '../State/state';
import { History } from 'history';

interface Props {
    // submitted: (submitSuccess: boolean) => void;
    history: History;
}

interface State {
    question: string;
    indOption: string;
    options: string[];
    quizName: string;
    startDate: string;
    endDate: string;
    totalQuestions: number;
    questionList: Question;
    questionListArray: Question[];
    questionCount: number;
}

var optionsArray: string[] = [];
var questionArray: any = [];

export default class AdminForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            question: '',
            indOption: '',
            options: [],
            quizName: '',
            startDate: '',
            endDate: '',
            totalQuestions: 0,
            questionList: {
                ques: '',
                options: []
            },
            questionListArray: [],
            questionCount: 0
        };
    }

    handelTotalque = (value: number) => {
        if (value > 1) {
            this.setState({ totalQuestions: value })
        } else if (value === 1) {
            this.setState({ totalQuestions: value })
            alert("Total number of question should be greater then 1")
        } else {
            this.setState({ totalQuestions: value })
        }
    }
    render() {
        let { options, indOption, questionListArray, totalQuestions } = this.state;
        return (
            <>
                <form>
                    <FormControl className="w-100 mb-4">
                        <TextField id="name" type="text" label="Name of the quiz" onChange={(e) => this.setState({ quizName: e.currentTarget.value })} required color="secondary" />
                    </FormControl>

                    <FormControl className="w-45 mr-5">
                        <TextField id="name" type="date" label="Start Date" onChange={(e) => this.setState({ startDate: e.currentTarget.value })} required color="secondary" InputLabelProps={{ shrink: true }} />
                    </FormControl>

                    <FormControl className="w-45">
                        <TextField id="name" type="date" label="End Date" onChange={(e) => this.setState({ endDate: e.currentTarget.value })} required color="secondary" InputLabelProps={{ shrink: true }} />
                    </FormControl>

                    <FormControl className="w-100 my-4">
                        <TextField id="name" type="number" label="Total Questions" onChange={(e) => this.handelTotalque(parseInt(e.currentTarget.value, 10))} value={totalQuestions} required color="secondary" />
                    </FormControl>

                    <FormControl className="w-100 mb-4">
                        <TextField id="name" type="text" label="Enter the question" onChange={(e) => this.setState({ question: e.currentTarget.value })} color="secondary" />
                    </FormControl>
                    <FormControl className="w-50 mr-4 mb-4">
                        <TextField id="name" type="text" label="Enter Option" onChange={(e) => this.setState({ indOption: e.currentTarget.value })} color="secondary" />
                    </FormControl>
                    <FormControl className="w-25">
                        <i className="fa fa-plus" id="plus-icon" aria-hidden="true" onClick={() => this.addOpt()} />
                    </FormControl>
                    <FormControl className="w-50">
                        <ul id="question-list">
                            {options.map((opt: string, i: number) =>
                                <li>{opt}</li>
                            )}
                        </ul>
                    </FormControl>
                    <FormControl className="w-100">
                        {this.switchButton()}
                    </FormControl>
                </form>
                {questionListArray.length > 0 && <div className="row">
                        <div className="col-md-12 mt-5">
                            <TableContainer >
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Questions</TableCell>
                                            <TableCell align="right">Options</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {questionListArray.map((data, i) => (
                                            <TableRow key={i}>
                                                <TableCell scope="row">
                                                    {data.ques}
                                                </TableCell>
                                                <TableCell align="right">{data.options.join(', ')}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>}
            </>
        );
    }
    switchButton() {
        let { totalQuestions, questionCount, quizName, question } = this.state;
        if (questionCount === totalQuestions) {
            if (quizName === '') {
                return (
                    <MyButton color="red" type="button" disabled className="t-2">Please fill mandatory fields</MyButton>
                )
            } else {
                return (
                    <MyButton color="blue" className="mt-2" onClick={() => this.submitQuiz()}>Create Quiz</MyButton>
                )
            }
        }
        else if (totalQuestions > 1 && question !== '') {
            return (
                <MyButton color="blue" type="button" onClick={() => this.addQues()} disabled={optionsArray.length > 0 ? false: true}>Add Questions</MyButton>
            )
        } else {
            return (
                <div />
            )
        }
    }

    addOpt() {
        let { indOption } = this.state;
        optionsArray.push(indOption);
        this.setState({ options: optionsArray });
    }

    addQues() {
        let { question, questionCount } = this.state;
        let quesArray: Question = {
            ques: '',
            options: []
        };
        quesArray = {
            ques: question,
            options: optionsArray
        };
        questionArray.push(quesArray);
        this.setState({ questionList: quesArray, questionCount: questionCount + 1, questionListArray: questionArray, options: [] });
        optionsArray = [];
    }

    submitQuiz() {
        let { question, quizName, startDate, endDate, totalQuestions, questionListArray } = this.state;
        if (question.length > 0) {
            let payload = {
                quizName: quizName,
                startDate: startDate,
                endDate: endDate,
                totalQues: totalQuestions,
                question: questionListArray
            }
            axios.post(API + '/question/add', payload);
            setTimeout(() => { this.props.history.push('/users') }, 3000);
        }
    }
}