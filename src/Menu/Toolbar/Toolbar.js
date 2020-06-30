import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import SideDrawer from '../SideDrawer/MySideDrawer';
import './Toolbar.css'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

export default function MyToolbar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <SideDrawer />
                    <Typography style={{marginLeft: '15px'}} variant="h6" color="inherit">
                        EconStats
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}