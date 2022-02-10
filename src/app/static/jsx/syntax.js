import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from '@mui/material/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import Skeleton from '@mui/material/Skeleton';
import cyan from "@material-ui/core/colors/cyan";

import json_parse from './json_parse';


export default function SyntaxApp({details}) {

  var page_details = json_parse(details);
	var opening_array = page_details.opening.split('\n');
	var start_array = page_details.definition.start.split('\n');
	var end_array = page_details.definition.end.split('\n');
	const typo_style = {
		whiteSpace: 'pre-wrap',
		marginBottom: '10px',
		marginLeft: '30px',
		marginRight: '30px'
	}

  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
	const [out_value, setOutput] = React.useState('');
	var text = '';
  const [helperText, setHelperText] = React.useState('Fun Fact: This is all done with simple regular expressions!');

	const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };
	const handleTextChange = (event) => {
		text = event.target.value;
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await fetch('/nlp/api/syntax', {
	    method: 'POST',
		  body: text,
			headers: {
	      'Content-Type': 'application/json'
		  }
	  });
		const myJson = await response.json();
		console.log(myJson);
		setOutput(myJson);
		return false;
	}
	// 			    event.preventDefault();

  //   if (value === 'best') {
  //     setHelperText('You got it!');
  //     setError(false);
  //   } else if (value === 'worst') {
  //     setHelperText('Sorry, wrong answer!');
  //     setError(true);
  //   } else {
  //     setHelperText('Please select an option.');
  //     setError(true);
  //   }

  return (
    <React.Fragment>
			<Grid
			  container
			  //spacing={0}
				sx={{ marginTop: 2, marginBottom: 2 }}
			  direction="column"
			  alignItems="center"
			  justifyContent="center"
			  style={{ minHeight: '100vh' }}>
				<Box sx={{ minWidth: 275, maxWidth: '80%' }}>
					<Card variant="outlined" style={{backgroundColor: cyan[50]}}>
						<CardContent>
							{opening_array.map(thing => (
								<Typography
									style={typo_style}
									color="textSecondary" >{thing}</Typography>
							))}
							<Typography variant="h6" style={{marginBottom: '10px'}} >Motivation | characters</Typography>
							<Typography style={typo_style} >{start_array[0]}</Typography>
							<Typography variant="h6" style={{marginBottom: '10px'}} >Motivation | words</Typography>
							<Typography style={typo_style} >{start_array[1]}</Typography>
							<ul>
								{page_details.definition.middle.map(lis => (
									<Typography style={typo_style} component="li"
										key={lis.key}>{lis.value}</Typography>
								))}
							</ul>
							<Typography variant="h6" style={{marginBottom: '10px'}} >Motivation | sentences and more</Typography>
							{end_array.map(thing => (
								<Typography style={typo_style} >{thing}</Typography>
							))}
						</CardContent>
					</Card>
				</Box>
				<Skeleton variant="rectangular" animation="wave"
					style={{ marginTop: '24px' }} width={'100%'} height={'16px'} />
		    <form onSubmit={handleSubmit}>
		      <FormControl sx={{ m: 3 }} error={error} variant="standard">
				    <FormLabel id="syntax-radios" style={{ justifyContent: "center" }} >
							Choose a structure class to extract
						</FormLabel>
						<div style={{ display: "flex" }}>
						  <RadioGroup
							  aria-labelledby="syntax-radios"
					      name="options"
						    value={value}
							  onChange={handleRadioChange} >
						    <FormControlLabel value="words" control={<Radio />} label="WORDS" />
							  <FormControlLabel value="quotes" control={<Radio />} label="QUOTES" />
								<FormControlLabel value="sentences" control={<Radio />} label="SENTENCES" />
						    <FormControlLabel value="questions" control={<Radio />} label="QUESTIONS" />
			          <FormControlLabel value="exclamations" control={<Radio />} label="EXCLAMATIONS" />
					      <FormControlLabel value="enclosure" control={<Radio />} label="ENCLOSURES" />
								<FormControlLabel value="numbers" control={<Radio />} label="NUMBERS" />
					      <FormControlLabel value="number_expressions" control={<Radio />} label="NUMBERS WITH CONTEXT" />
						  </RadioGroup>
							<TextareaAutosize
							  maxRows={10}
							  aria-label="text input"
							  defaultValue={page_details.definition.end}
								onChange={handleTextChange}
							  style={{ width: "60%", height: 'auto', margin: '16px', padding: '8px' }} />
						</div>
					  <FormHelperText>{helperText}</FormHelperText>
						<Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
				      Evaluate 😮
					  </Button>
				  </FormControl>
			  </form>
				<TextareaAutosize
				  maxRows={10}
					disabled
					value={out_value}
				  aria-label="text output"
				  style={{ width: "80%", margin: '20px', padding: '12px' }} />
				<Skeleton variant="rectangular" animation="wave"
					width={'100%'} height={'16px'} />
			</Grid>
    </React.Fragment>
  );
}