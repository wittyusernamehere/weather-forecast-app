import React from 'react';

import styles from './App.module.css';

import axios from 'axios';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [],
			isLoading: true,
		};
	}

	async componentDidMount() {
		try {
			await this.setState({ isLoading: true });
			const response = await axios('/fetch');
			await console.log(response.data.list);
			this.setState({ data: response.data.list, isLoading: false });
		} catch (error) {
			alert(error.message);
		}
	}

	render() {
		const { data, isLoading } = this.state;
		return (
			<div className={styles.wrapper}>
				<div className={styles.title}>Helsinki 3-Hour Weather Forecast</div>
				{isLoading ? (
					<div className={styles.loadingtext}>Loading</div>
				) : (
					<div className={styles.flex}>
						{data.slice(0, 5).map((obj, index) => (
							<li key={index} className={styles.listitem}>
								<div className={styles.column}>
									<div className={styles.time}>{obj.dt_txt}</div>
									<div className={styles.temp}>{obj.main.temp}&nbsp; °C</div>
									<div className={styles.description}>
										{obj.weather[0].description}
									</div>
								</div>
							</li>
						))}
					</div>
				)}
			</div>
		);
	}
}

export default App;
