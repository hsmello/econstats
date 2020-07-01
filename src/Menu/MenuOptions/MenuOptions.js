import React from 'react';
import './MenuOptions.css';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import PublicIcon from '@material-ui/icons/Public';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';

import { Link } from 'react-router-dom';

export default function MenuOptions() {

    return (
        <div>
            <List>
                <Link to='/' className='button_link'>
                    <ListItem button>
                        <ListItemIcon> <HomeIcon /></ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </ListItem>
                </Link>
                <Link to='/about' className='button_link'>
                    <ListItem button>
                        <ListItemIcon> <InfoIcon /></ListItemIcon>
                        <ListItemText>About</ListItemText>
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <List>
                <Link to='/country_analysis' className='button_link'>
                    <ListItem button>
                        <ListItemIcon> <PublicIcon /></ListItemIcon>
                        <ListItemText>By Country</ListItemText>
                    </ListItem>
                </Link>
            </List>

            <Divider />
            <List>
                <Link to='/gdp' className='button_link'>
                    <ListItem button>
                        <ListItemIcon> <TrendingUpIcon /></ListItemIcon>
                        <ListItemText>GDP</ListItemText>
                    </ListItem>
                </Link>
                <Link to='/inflation' className='button_link'>
                    <ListItem button>
                        <ListItemIcon> <LocalAtmIcon /></ListItemIcon>
                        <ListItemText>Inflation</ListItemText>
                    </ListItem>
                </Link>
            </List>
        </div >
    )
}