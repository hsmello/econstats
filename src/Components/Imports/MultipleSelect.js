import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 320,
        maxWidth: 500,
    },
    chips: {
        display: 'flex', 
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const MenuProps = {
    PaperProps: {
        style: {
            width: 250,
        },
    },
};

export default function MyMultipleSelect(props) {
    const classes = useStyles();
    // const theme = useTheme();

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">{props.label}</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={props.value}
                    onChange={(e) => props.handleChange(e)}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {props.options}
                </Select>
            </FormControl>
        </div>
    );
}