import React from "react";
import Swiper from "./components/swiper";
import './App.css';
function App() {
	const list = [
		{url: 'https://pic1.zhimg.com/v2-9dd98ed5bdf4ae3e388e3f2cb1b10bb9.jpg?source=6a64a727'},
		{url: 'https://pic4.zhimg.com/v2-a849a64b534266c06af183d8763287f7_720w.jpg?source=d6434cab'},
		{url: 'https://pic3.zhimg.com/v2-decc6534588b566a147c881168882eae_720w.png?source=d6434cab'},
	]
	return (
		<div className='test_container'>
			<Swiper list={list} pagination/>
		</div>
	);
}

export default App;