import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

import MenuOptions from '../MenuOptions/MenuOptions'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

export default function MySideDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false)

  function openCloseDrawer() {
      setOpen(!open)
  }

  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={openCloseDrawer}
      onKeyDown={openCloseDrawer}
    >
      <MenuOptions />
    </div>
  );

  return (
    <div>

        <React.Fragment>
            <Button onClick={openCloseDrawer}><MenuIcon style={{color: 'white', fontSize: '30px'}}/></Button>
            <SwipeableDrawer
                open={open}
                onClose={openCloseDrawer}
                onOpen={openCloseDrawer}
            >
                {list()}
            </SwipeableDrawer> 
        </React.Fragment>
    </div>
  );
}