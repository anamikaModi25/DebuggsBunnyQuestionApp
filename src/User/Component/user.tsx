import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import MyButton from '../../MaterialUI/MyButton'
import axios from 'axios';
import { API } from '../../Config/config';
import { QuizState } from '../../Admin/State/state';
import { Link } from 'react-router-dom';

interface Props { }
interface State {
    questions: QuizState[]
}

class User extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            questions: []
        }
    }

    componentWillMount() {
        axios.get(API + '/question').then(
            result => {
                let parsed = result.data as QuizState[];
                console.log(parsed)
                this.setState({ questions: parsed })
            }
        ).catch(error => {
            //do nothing
        });
    }
    render() {
        let { questions } = this.state;
        console.log(questions)
        return (
            <div className='row'>
                <div className="col-md-12 co-12 text-center">
                    <h5 id="home-heading">Select Quiz!</h5>
                </div>
                <div className="col-md-12 col-12 align-center">
                    <div className="row">
                        <div className="col-md-3 mt-3">
                            <Card className="w-100">
                                <CardContent>
                                    <Typography align="center" gutterBottom variant="h5" component="h2" id='home-heading'>
                                        Quiz 1
                                 </Typography>
                                    <Typography className="my-3" variant="subtitle1" align="center" color="textSecondary" component="p">
                                        Start Date: 22/04/2020
                              </Typography>
                                    <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                                        End Date: 22/12/2020
                              </Typography>
                                    <Typography className='text-center mt-4'>
                                        <MyButton color="blue">Take Quiz</MyButton>
                                    </Typography>
                                </CardContent>
                            </Card>
                            </div>
                            {questions.map((data, i) =>
                             <div className="col-md-3 mt-3" key={i}>
                                <Card className="w-100">
                                    <CardContent>
                                        <Typography align="center" gutterBottom variant="h5" component="h2" id='home-heading'>
                                            {data.quizName}
                                        </Typography>
                                        <Typography className="my-3" variant="subtitle1" align="center" color="textSecondary" component="p">
                                            Start Date: {data.startDate}
                                        </Typography>
                                        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                                            End Date: {data.endDate}
                                        </Typography>
                                        <Typography className='text-center mt-4'>
                                            <Link to={"/answer/" + data.id}><MyButton color="blue">Take Quiz</MyButton></Link>
                                        </Typography>
                                    </CardContent>
                                </Card>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        )
    }
}

export default User
