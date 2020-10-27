import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import MyButton from '../../MaterialUI/MyButton'

export default function SuccessComponent() {
    return (
        <div className="row">
            <div className="col-md-12 col-12 mt-5">
                <Card className="w-50 mx-auto">
                    <CardContent>
                        <Typography className="mt-5 mb-3" variant="h3" color="textPrimary" component="h1" align={"center"}>
                            Done
                        </Typography>
                        <Typography className="text-center">
                        <Link to="/user"><MyButton color="red">
                            Take Next Quiz
                        </MyButton></Link>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
