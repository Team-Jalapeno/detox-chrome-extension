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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: 326,
    height: 414,
  },
});

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

  // useEffect(() => {
  //   chrome.browserAction.setBadgeText({ text: count.toString() });
  // }, [count]);

  // useEffect(() => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //     setCurrentURL(tabs[0].url);
  //   });
  // }, []);

  const sliderOnChange = (event: object, value: number | number[]) => {
    console.log(event, value);
    setSliderValue(value);
  };

  const filtersOnChange = (event: { target: { name: string, checked: boolean } }) => {
    setFilters({ ...filters, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <Typography gutterBottom>
        What do you want to hide?
      </Typography>
      <Slider value={sliderValue} onChange={sliderOnChange} aria-labelledby="continuous-slider" />
      <Typography gutterBottom>
        What do you want to filter?
      </Typography>

      <FormControl component="fieldset">
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={filters.text} onChange={filtersOnChange} name="text" />}
            label="Text"
          />
          <FormControlLabel
            control={<Switch checked={filters.images} onChange={filtersOnChange} name="images" />}
            label="Images"
          />
          <FormControlLabel
            control={<Switch checked={filters.videos} onChange={filtersOnChange} name="videos" />}
            label="Videos"
          />
        </FormGroup>
        <FormHelperText>Built with ♥ by Team</FormHelperText>
      </FormControl>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('root'),
);
