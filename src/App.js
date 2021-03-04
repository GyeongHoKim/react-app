import React, { Component } from 'react';
import TOC from "./components/TOC";
import Subject from "./components/Subject";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import Control from "./components/Control";
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: 'read',
			selected_content_id: 2,
			welcome:{title:'Welcome', desc:'Hello, React!'},
			subject: {title: "WEB", sub: "World Wide Web!"},
			contents: [
				{id:1, title:"HTML", desc:"HTML is for information"},
				{id:2, title:"CSS", desc:"CSS is for design"},
				{id:3, title:"JavaScript", desc:"JavaScript is for interactive"}
			]
		}
	}
	render() {
		var _title, _desc, _article = null;
		if (this.state.mode === 'welcome') {
			_title = this.state.welcome.title;
			_desc = this.state.welcome.desc;
			_article = <ReadContent title={_title} desc={_desc} />;
		} else if (this.state.mode === 'read') {
			for (let i = 0; i < this.state.contents.length; ++i) {
				let data = this.state.contents[i];
				if (data.id === this.state.selected_content_id) {
					_title = data.title;
					_desc = data.desc;
					break;
				}
			}
			_article = <ReadContent title={_title} desc={_desc} />;
		} else if (this.state.mode === 'create') {
			_article = <CreateContent />;
		}
		return (
			<div className="App">
				<Subject
					title={this.state.subject.title}
					sub={this.state.subject.sub} 
					onChangePage={() => {
						this.setState({mode: 'welcome'});
					}}
				/>
				<TOC
					onChangePage={(id) => {
						this.setState({
							mode: 'read',
							selected_content_id: Number(id)
						});
					}}
					data={this.state.contents}
				/>
				<Control onChangeMode={(_mode) => {
						this.setState({
							mode: _mode
						});
					}} />
				{_article}
			</div>
		);
	}
}

export default App;