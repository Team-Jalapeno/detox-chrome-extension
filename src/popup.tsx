import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Slider,
  Typography,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Switch,
  Divider,
  Grid,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: 326,
    height: 414,
  },
  grid: {
    padding: 20,
  },
});

const StyledSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 2,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 2,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 23,
    height: 23,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[200],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }: any) => (
  <Switch
    focusVisibleClassName={classes.focusVisible}
    disableRipple
    classes={{
      root: classes.root,
      switchBase: classes.switchBase,
      thumb: classes.thumb,
      track: classes.track,
      checked: classes.checked,
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));

const Popup = () => {
  const classes = useStyles();
  const [sliderValue, setSliderValue] = useState<number | number[]>(50);
  const [filters, setFilters] = useState<{
    text: boolean,
    images: boolean,
    videos: boolean,
  }>({
    text: false,
    images: false,
    videos: false,
  });

  const sliderOnChange = (event: object, value: number | number[]) => {
    setSliderValue(value);
  };

  const filtersOnChange = (event: { target: { name: string, checked: boolean } }) => {
    setFilters({ ...filters, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        spacing={2}
        className={classes.grid}
      >
        <Grid item xs={12}>
          <Typography gutterBottom>
            What do you want to hide?
          </Typography>
          <Slider value={sliderValue} onChange={sliderOnChange} aria-labelledby="continuous-slider" />
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            What do you want to filter?
          </Typography>

          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={<StyledSwitch checked={filters.text} onChange={filtersOnChange} name="text" />}
                label="Text"
              />
              <FormControlLabel
                control={<StyledSwitch checked={filters.images} onChange={filtersOnChange} name="images" />}
                label="Images"
              />
              <FormControlLabel
                control={<StyledSwitch checked={filters.videos} onChange={filtersOnChange} name="videos" />}
                label="Videos"
              />
            </FormGroup>
            <FormHelperText>Built with ♥ by Team</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('root'),
);
