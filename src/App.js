import React, { Component } from 'react';
import TOC from "./components/TOC";
import Subject from "./components/Subject";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Control from "./components/Control";
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.max_content_id = 3;//UI에 관계없으므로 state로 하지 않음
		this.state = {
			mode: 'welcome',
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
	getReadContent(){
		for (let i = 0; i < this.state.contents.length; ++i) {
			let data = this.state.contents[i];
			if (data.id === this.state.selected_content_id) {
				return data;
			}
		}
	}
	getContent(){
		var _title, _desc, _article = null;
		if (this.state.mode === 'welcome') {
			_title = this.state.welcome.title;
			_desc = this.state.welcome.desc;
			_article = <ReadContent title={_title} desc={_desc} />;
		} else if (this.state.mode === 'read') {
			let _content = this.getReadContent();
			_article = <ReadContent title={_content.title} desc={_content.desc} />;
		} else if (this.state.mode === 'create') {
			_article = <CreateContent onSubmit={(_title, _desc) => {
						//add content to this.state.contents
						this.max_content_id = this.max_content_id + 1;
						var newContents = Array.from(this.state.contents);
						newContents.push({
							id:this.max_content_id,
							title:_title,
							desc:_desc
						});
						this.setState({
							contents:newContents,
							mode:'read',
							selected_content_id:this.max_content_id
						});
					}}/>;
		} else if (this.state.mode === 'update') {
			let _content = this.getReadContent();
			_article = <UpdateContent data={_content} onSubmit={(_id, _title, _desc) => {
						var _contents = Array.from(this.state.contents);
						for (let i = 0; i < _contents.length; ++i) {
							if(_contents[i].id === _id) {
								_contents[i] = {id:_id, title:_title, desc:_desc};
								break;
							}
						}
						this.setState({
							contents:_contents,
							mode:'read'
						});
					}}/>;
		}
		return _article;
	}
	render() {
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
						if (_mode === 'delete') {
							if(window.confirm('Really?')) {
								let _contents = Array.from(this.state.contents);
								for (let i = 0; i < _contents.length; ++i) {
									if(_contents[i].id === this.state.selected_content_id) {
										_contents.splice(i, 1);
										break;
									}
								}
									this.setState({
										mode:'welcome',
										contents:_contents
									});
									alert('deleted');
							}
						} else {
							this.setState({
								mode: _mode
							});
						}
					}} />
				{this.getContent()}
			</div>
		);
	}
}

export default App;