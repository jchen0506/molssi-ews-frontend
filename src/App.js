import React, { useState, useEffect } from 'react';
import './App.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import NavBar from './NavBar';
import Lecture from './Lecture';
import Quiz from './Quiz'
import InputForm from './InputForm';
import Result from './Result'

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'left',
	color: theme.palette.text.secondary,
}));

function App() {
	const markdownFilePath = './dft_tutorial.md';

	// State to store the Markdown content
	const [markdownContent, setMarkdownContent] = useState('');

	useEffect(() => {
		const fetchMarkdownContent = async () => {
			try {
				const response = await fetch(markdownFilePath);
				const text = await response.text();
				console.log(text)
				setMarkdownContent(text);
			} catch (error) {
				console.error(error);
			}
		};

		fetchMarkdownContent();
	}, []);

	const [formSubmitted, setFormSubmitted] = useState(false);

	const handlePostSuccess = () => {
		console.log("handlePostSuccess");
		setFormSubmitted(true);
	};

	return (
		<div className="App">
			<NavBar />
			<br />
			<br />
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					<Grid item xs={6} md={8}>
						<Item>
							<Lecture markdownContent={markdownContent} />
						</Item>
					</Grid>
					<Grid item xs={6} md={4}>
						<Item><Quiz /></Item>
					</Grid>
				</Grid>
			</Box>
			<br />
			<br />
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					<Grid item xs={6} md={6}>
						<Item>
							<InputForm onPostSuccess={handlePostSuccess} />
						</Item>
					</Grid>
					<Grid item xs={6} md={6}>
						<Item>Result
						</Item>
						<Item>
							{formSubmitted && <Result />}
						</Item>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
}

export default App;
