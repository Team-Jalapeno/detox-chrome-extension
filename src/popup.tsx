import React, { useState, useEffect } from 'react';
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
import { nanoid } from 'nanoid'


const useStyles = makeStyles({
  root: {
    width: 300,
    height: 414,
  },
  grid: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  logo: {
    width: 60,
  },
  center: {
    textAlign: 'center',
  },
  width100: {
    width: '100%',
  },
  logoFont: {
    fontFamily: '\'Pacifico\', cursive',
    marginTop: '-4px',
  },
});

const StyledSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

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

const Circle = ({ color }: { color: string }) => (
  <div style={{
    padding: 5,
    marginTop: 4,
    display: 'inline-block',
    backgroundColor: color,
    borderRadius: '50%',
    width: 2,
    height: 2,
  }}
  />
);

const marks = [
  {
    value: 0,
    label: <Circle color="green" />,
  },
  {
    value: 33.333,
    label: <Circle color="#f7d26d" />,
  },
  {
    value: 66.666,
    label: <Circle color="#e02d57" />,
  },
  {
    value: 99.999,
    label: <Circle color="red" />,
  },
];

const Popup = () => {
  const classes = useStyles();
  const [sliderValue, setSliderValue] = useState<number | number[]>(33.333);
  const [filters, setFilters] = useState<{
    text: boolean,
    images: boolean,
    videos: boolean,
  }>({
    text: false,
    images: false,
    videos: false,
  });
  const [config, setConfig] = useState<{
    userid: string
  }>({
    userid: ''
  });
  useEffect(() => {
    let uid = nanoid(16);
    chrome.storage.sync.get(['userid'], function (items) {
      console.log(items);

      //new user
      if (items.userid === undefined) {
        chrome.storage.sync.set({ userid: uid });
        console.log('generated new user id')
        setConfig({ userid: uid });
      }
      else {
        setConfig({ userid: items.userid })
      }
      console.log('read from config')
    });
  }, [])

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
          <Grid
            container
            spacing={1}
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <img src="/icon.png" alt="" className={classes.logo} />
            </Grid>
            <Grid item>
              <Typography variant="h4" className={classes.logoFont}>Detox</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} />

        <Grid item xs={12}>
          <Typography gutterBottom>
            Choose how you want your content filtered.
          </Typography>
          <StyledSlider
            value={sliderValue}
            onChange={sliderOnChange}
            step={33.333}
            max={99.999}
            aria-labelledby="continuous-slider"
            marks={marks}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>
            What kind of content do you want to filter?
          </Typography>

          <FormControl component="fieldset" className={classes.width100}>
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
            <FormHelperText className={classes.center}>Built with ♥ by Team</FormHelperText>
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
