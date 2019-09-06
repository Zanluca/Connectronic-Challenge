import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {getCategories} from '../services/categories'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: 30,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    paperLarge: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        height: 100
    },
}));

function DashBoard() {
    const classes = useStyles();
    getCategories()
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Paper className={classes.paperLarge}><Typography> Contrução </Typography></Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paperLarge}>Contrução</Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>Contrução</Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default DashBoard