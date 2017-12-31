import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';

var axios = require('axios');


class IntroPage extends Component {
	constructor (props) {
    super(props);
    this.state = {
			calories: "2000",
			macroDistribution: "maintenance"
		}
  }

	handleChange = name => event => {
		this.setState({[name]: event.target.value});
	}

	genMeal = () => {
		var self = this;
		axios.get('http://localhost:3001/' + this.state.calories + '/' + this.state.macroDistribution, {
			headers: {
				'Access-Control-Allow-Origin': '*',
			}})
			.then(function(res){
				self.props.setInputVal('meal', res.data);
			})
			.catch(function(err){
				console.log(err);
			});
	}

  render() {
    return (
      <div className="IntroPage-ct">
		<div className="IntroPage-content">
			<h2>Enter your calorie goal and select a macro nutrient distribution.</h2>
			<form>
				<TextField label="Calories" value={this.state.calories} onChange={this.handleChange('calories')} type="number" />
				<br/><br/>
				<div className="MacroOptions">
					<RadioGroup
						aria-label="gender"
						name="gender1"
						value={this.state.macroDistribution}
						onChange={this.handleChange('macroDistribution')}
						row={true}
					>
						<FormControlLabel value="bodybuilding" control={<Radio />} label="Bodybuilding" />
						<FormControlLabel value="maintenance" control={<Radio />} label="Maintenance" />
						<FormControlLabel value="lowCarb" control={<Radio />} label="LowCarbs" />
					</RadioGroup>
				</div>
				<br/><br/>
				<Button onClick={this.genMeal} raised>
					Next&nbsp;&nbsp;&nbsp;<i className="material-icons">arrow_forward</i>
				</Button>
			</form>
		</div>
      </div>
    );
  }
}

export default IntroPage;