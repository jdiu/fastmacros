import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import constants from '../constants';

var axios = require('axios');


class IntroPage extends Component {
	constructor (props) {
    super(props);
    this.state = {
			calories: "2000",
			macroDistribution: "maintenance"
		}
	}

	componentDidMount() {
		this.updateDistCanvas();
	}
	
	componentDidUpdate() {
		this.updateDistCanvas();
	}

	updateDistCanvas () {
		var distCanvas = document.getElementById('visualDist');
		var ctx = distCanvas.getContext("2d");
		if (this.state.macroDistribution === "maintenance") {
			// carbs: 40, protein: 40, fat: 20
			let width = distCanvas.width;
			let endX = [width * .4, width * .8, width];
			for (let idx = endX.length - 1; idx >= 0; --idx) {
				ctx.fillStyle = constants.chartColors[idx];
				ctx.fillRect(0, 0, endX[idx], distCanvas.height);
			}
		} else if (this.state.macroDistribution === "bodybuilding") {
			// carbs: 40, protein: 30, fat: 30
			let width = distCanvas.width;
			let endX = [width * .4, width * .7, width];
			for (let idx = endX.length - 1; idx >= 0; --idx) {
				ctx.fillStyle = constants.chartColors[idx];
				ctx.fillRect(0, 0, endX[idx], distCanvas.height);
			}
		} else {
			// carbs: 20, protein: 40, fat: 40
			let width = distCanvas.width;
			let endX = [width * .2, width * .6, width];
			for (let idx = endX.length - 1; idx >= 0; --idx) {
				ctx.fillStyle = constants.chartColors[idx];
				ctx.fillRect(0, 0, endX[idx], distCanvas.height);
			}
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
						aria-label="macroDist"
						name="macroDist1"
						value={this.state.macroDistribution}
						onChange={this.handleChange('macroDistribution')}
						row={true}
					>
						<FormControlLabel value="bodybuilding" control={<Radio />} label="Bodybuilding" />
						<FormControlLabel value="maintenance" control={<Radio />} label="Maintenance" />
						<FormControlLabel value="lowCarb" control={<Radio />} label="LowCarbs" />
					</RadioGroup>
				</div>
				<canvas id="visualDist" />
				<br/>
				<br/>
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