import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import Navigation from './components/Navigation/Navigation.js';
import ContentList from './components/Content/ContentList.js';
// import components to parent node.
import {setSearchField} from './actions';

const mapStateToProps = state => {
  return {
    searchField:state.searchField
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    onSearchChange:(event) =>dispatch(setSearchField(event.target.value))   
  }
}

class App extends Component {
  constructor(){
    console.log('constructor')
    super();
    this.state = {
        content: [],
        optionValue: '',
        searchValue: '',
    }
  }  // Set the state of parent node.

  componentDidMount(){
    // console.log(this.props.store.getState());
    fetch('http://fcasb-react.getsandbox.com/v1/policy/cList')
    .then(response =>response.json())
    .then(data=>{this.setState({content:data});});
  } 

  // Get data by using Promising for asynchronous programming so that the process of getting data 
    // happens in the background and set the fetched data to state.

  setOptionValue = (e) => {
      this.setState({optionValue:e.target.value})
  } // Set the value of dropdown box to the state. 

    sortMethod = () =>{
        let arr = this.state.content;
        let critical = [];
        let _alert = [];
        let warning = [];
        let information = [];
        let result;
        arr.forEach(ele => {
            if(ele.severity === 'Critical'){
                critical.push(ele);
            }
            else if(ele.severity === 'Alert'){
                _alert.push(ele);
            }
            else if(ele.severity === 'Warning'){
                warning.push(ele);
            }
            else if(ele.severity === 'Information'){
                information.push(ele);
            }
        }) // Split data to different array by severity
        if(this.state.optionValue === 'severity_down'){
            result = critical.concat(_alert,warning,information);
        }  // Sort data by severity down
        else if(this.state.optionValue === 'severity_up'){
            result = information.concat(warning,_alert,critical);
        }  // Sort data by severity up
        else if(this.state.optionValue === 'name' || this.state.optionValue === ''){
            result = this.state.content.sort((a,b)=> {
                let first = a.name.toLowerCase();
                let second = b.name.toLowerCase();
                if(first<second){
                    return -1;
                }
                else if(first>second){
                    return 1;
                }
            })
        }  // Sort the data by name in the alphabetical order
        this.setState({content:result}); //Set the content equals to result
  }

    onSearchChange = (e) => {
        this.setState({searchValue:e.target.value});
    }  // Get the input value in search box and pass it to state.

  render() {
    console.log('render')
    const filteredList = this.state.content.filter(data=> {
        return data.name.toLowerCase().includes(this.state.searchValue.toLowerCase());
    }) // Filter the data by search value
    return(
      <div className='App'>
      <div>
          <Navigation sortMethod={this.sortMethod} setOptionValue={this.setOptionValue}
                      onSearchChange ={this.onSearchChange} />
          <ContentList content={filteredList}/>
      </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
