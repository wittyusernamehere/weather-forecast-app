import { Component } from 'react';

import styles from './error-boundary.module.css';

class ErrorBoundary extends Component {
	constructor() {
		super();
		this.state = { hasErrored: false };
	}

	static getDerivedStateFromError(error) {
		//process the error
		return { hasErrored: true };
	}

	componentDidCatch(error, info) {
		console.log(error);
	}

	render() {
		if (this.state.hasErrored) {
			return (
				<div className={styles.wrapper}>
					<img
						className={styles.img}
						src='https://i.imgur.com/yW2W9SC.png'
						alt=''
					/>
					<div>Sorry this page is broken.</div>
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
