import React, { Component } from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {Link} from 'react-router-dom';
import constants from '../constants';
import Chart from 'chart.js';
import Grid from 'material-ui/Grid';
import {Doughnut} from 'react-chartjs-2';
import Slider from 'react-slick';

var globalCharts = [];

class ResultsPage extends Component {
	constructor (props) {
    super(props);
    this.state = {
			meal: {}
		}

		Chart.pluginService.register({
			beforeDraw: function (chart) {
				if (chart.config.options.elements.center) {
					//Get ctx from string
					var ctx = chart.chart.ctx;
					
					//Get options from the center object in options
					var centerConfig = chart.config.options.elements.center;
					var fontStyle = centerConfig.fontStyle || 'Arial';
					var txt = centerConfig.text;
					var color = centerConfig.color || '#000';
					var sidePadding = centerConfig.sidePadding || 20;
					var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
					//Start with a base font of 30px
					ctx.font = "30px " + fontStyle;
					
					//Get the width of the string and also the width of the element minus 10 to give it 5px side padding
					var stringWidth = ctx.measureText(txt).width;
					var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
	
					// Find out how much the font can grow in width.
					var widthRatio = elementWidth / stringWidth;
					var newFontSize = Math.floor(30 * widthRatio);
					var elementHeight = (chart.innerRadius * 2);
	
					// Pick a new font size so it will not be larger than the height of label.
					var fontSizeToUse = Math.min(newFontSize, elementHeight);
	
					//Set font settings to draw it correctly.
					ctx.textAlign = 'center';
					ctx.textBaseline = 'middle';
					var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
					var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
					ctx.font = fontSizeToUse+"px " + fontStyle;
					ctx.fillStyle = color;
					
					//Draw text in center
					ctx.fillText(txt, centerX, centerY);
				}
			}
		});
  }

	componentWillReceiveProps = (nextProps) => {
		this.setState({meal: nextProps.meal});
	}

	componentDidUpdate = () => {
		globalCharts.map((chart, idx) => {
			chart.destroy();
		});
		this.renderCharts();
		
	}

	handleChange = name => event => {
		this.setState({[name]: event.target.value});
	}

	displayMealItems = () => {
		if(Object.keys(this.state.meal).length === 0 && this.state.meal.constructor === Object) return;

		var sortedItems = this.state.meal.items.sort((a, b) => {
			return a.category > b.category;
		});

		var currCat = ""
		var categories = {};
		for (var idx = 0; idx < sortedItems.length; ++idx) {
			let keys = Object.keys(categories);
			if (!categories.hasOwnProperty(sortedItems[idx].category)) {
				categories[sortedItems[idx].category] = []
			}
			categories[sortedItems[idx].category].push(sortedItems[idx]);
		}

		let keys = Object.keys(categories);

		var itemCards = document.getElementsByClassName('item-card-chart');
		for(var idx = 0; idx < itemCards.length; ++idx){
			itemCards[idx].getContext('2d').clearRect(0, 0, itemCards[idx].width, itemCards[idx].height);
		}

		let mealTotal = {
			calories: this.state.meal.calorieTotal,
			protein: this.state.meal.proteinTotal,
			fats: this.state.meal.fatTotal,
			carbs: this.state.meal.carbTotal,
		}

		var settings = {
      dots: true,
      infinite: false,
			speed: 500,
			slidesToShow: 4,
			slidesToScroll: 4,
			responsive: [
				{
					breakpoint: 1375,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3
					}
				},
				{
					breakpoint: 925,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 675,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
    };

		return (	
			<div>
				<div className="meal-total">
						<div className="total-title">Summary</div>
						<div className="item-chart-total">
							<canvas width="150px" height="150px" id="total-chart" item={JSON.stringify(mealTotal)}></canvas>
							<div className="overview">
							{ Object.keys(categories).map((key) => {
								 return(
									 <div>
										 <h4>{constants.categoryMapping[key]}s</h4>
										 {categories[key].map((item) => {
											 return (<p>{item.name}</p>);
										 })}
									 </div>
								 	
								);
							 }) }
							</div>
						</div>
				</div>
				{ Object.keys(categories).map((key) => {
					return(
						<div className="item-cat">
							<div className="item-cat-name">{constants.categoryMapping[key]}s</div>
							<div className="item-list">
							<Slider {...settings}>
								{categories[key].map((item, idx) => {
									return(
										<div className="card-box">
											<Card className="item-card">
												<CardContent>
													<Typography className="item-card-name" title={item.name}>{item.name}</Typography>
													<div className="item-chart">
														<canvas width="150px" height="150px" className="item-card-chart" item={JSON.stringify(item)}></canvas>
													</div>
												</CardContent>
											</Card>
										</div>
									);
								})}
							</Slider>
						</div>
					</div>
					);
				})} 
			</div>);
	}

	renderCharts = () => {
		var config = {
			type: 'doughnut',
			data: {
				datasets: [{
					// data: [item.carbs, item.fats, item.protein],
					backgroundColor: constants.chartColors,
				}]
			},
			options: {
				elements: {
					center: {
						color: '#333', // Default is #000000
						fontStyle: 'Arial', // Default is Arial
						sidePadding: 20 // Defualt is 20 (as a percentage)
					}
				},
			}
		}

		var cb = {
			label: function(tooltipItems, data) {
				return data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] + 'g';
			}
		};

		var charts = [];
		var itemCards = document.getElementsByClassName('item-card-chart');
		for(var i = 0; i < itemCards.length; ++i){
			var item = JSON.parse(itemCards[i].getAttribute('item'));
			var tempConfig = JSON.parse(JSON.stringify(config));
			tempConfig.data.datasets[0].data = [item.carbs, item.fats, item.protein];
			tempConfig.options.elements.center.text = item.calories + " cals";
			tempConfig.options.tooltips = {
				callbacks: cb
			}

			let myChart = new Chart(itemCards[i], tempConfig);
			globalCharts.push(myChart);
		}


		var totalChartEle = document.getElementById('total-chart');
		var item = JSON.parse(totalChartEle.getAttribute('item'));
		var tempConfig = JSON.parse(JSON.stringify(config));
		
		tempConfig.data.labels = ["Carbs", "Fat", "Protein"];
		tempConfig.data.datasets[0].data = [item.carbs, item.fats, item.protein];
		tempConfig.options.elements.center.text = item.calories + " cals";
		tempConfig.options.elements.center.color = "#fff";
		tempConfig.options.legend = {
			labels: {
				fontColor: "#fff",
			}
		};
		tempConfig.options.tooltips = {
			callbacks: cb
		}

		let totalChart = new Chart(totalChartEle, tempConfig);
		globalCharts.push(totalChart);
	}

  render() {
		return (
      <div className="ResultsPage-ct">
				<div className="ResultsPage-content">
					{this.displayMealItems()}
				</div>
      </div>
    );
  }
}

export default ResultsPage;