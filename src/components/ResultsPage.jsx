import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import {Link} from 'react-router-dom';

class ResultsPage extends Component {
	constructor (props) {
    super(props);
    this.state = {
			meal: {}
		}
  }

	componentWillReceiveProps = (nextProps) => {
		this.setState({meal: nextProps.meal});
	}

	handleChange = name => event => {
		this.setState({[name]: event.target.value});
	}

	displayMealItems = () => {
		if(Object.keys(this.state.meal).length === 0 && this.state.meal.constructor === Object) return;

		return this.state.meal.items.map((item, idx) => 
			<div key={idx}>
				{item.name}
			</div>
		);
	}

  render() {
		
		console.log('results');
		console.log(this.state.meal);
		console.log(this.displayMealItems());
    return (
      <div className="ResultsPage-ct">
				<div className="ResultsPage-content">
					<h2>Munch time!! xD</h2>
					{this.displayMealItems()}
				</div>
      </div>
    );
  }
}

export default ResultsPage;