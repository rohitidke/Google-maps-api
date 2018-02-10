import React from 'react';
import Paper from 'material-ui/Paper';
import ButtonElement from './SubmitSearch';

const ErrorMessage = () => {
    return (
        <div>
            <Paper>
                <h1> ERROR !! NO directions found </h1>
            </Paper>
        </div>

    );
}

export default ErrorMessage; 