import React, { Component } from 'react';
import $ from "jquery"





export default class Pagination extends Component {

constructor(props) {
    super(props);
    this.state = {
    	items: [],
    	limit: 5,
      start: 0,
      end: 5,
      pageSize: 5,
    	count: 0,
      sw: false,

    };
    this.changeLimit = this.changeLimit.bind(this);
    this.changePage = this.changePage.bind(this);
    this.sortData = this.sortData.bind(this);
}



  componentDidMount() {
	fetch("https://jsonplaceholder.typicode.com/posts", {
	  	method: 'GET',
	  	headers: {
	    Accept: 'application/json',
	  	},
	},
	).then(response => {
  		if (response.ok) {
    		response.json().then(json => {
      			console.log(json);
      			this.setState({
             		items: json,
             		count: json.length
           		});
           		
    		});
  		}
	 });

  }


	
  changeLimit(e){
  	var limit = e.currentTarget.value;
  	this.setState(state => ({
        start: 0, 
      	end: limit,
        limit: limit,
        pageSize: limit
      }));
  }

  changePage(e){
    var pageId = e.currentTarget.value
    var start = pageId * this.state.pageSize - this.state.pageSize;
    var end = start + parseInt(this.state.pageSize);
    this.setState(state => ({
        start: start,
        end: end
      }));
  }
  sortData(e){
    
    switch(e.currentTarget.textContent){
      case "userId":
        var item = (this.state.sw)?this.state.items.sort(function (a, b) {return  b.userId - a.userId;}):this.state.items.sort(function (a, b) {return  a.userId - b.userId;})
        this.setState(state => ({
          items: item,
          sw: !this.state.sw
        }));
        break;


      case "id":
        var item = (this.state.sw)?this.state.items.sort(function (a, b) {return  b.id - a.id;}):this.state.items.sort(function (a, b) {return  a.id - b.id;})
        this.setState(state => ({
          items: item,
          sw: !this.state.sw
        }));
        break;


      case "title":
        var item = (this.state.sw)?this.state.items.sort(function (a, b) {return b.title.toString().localeCompare(a.title);}):this.state.items.sort(function (a, b) {return a.title.toString().localeCompare(b.title);})
        this.setState(state => ({
          items: item,
          sw: !this.state.sw
        }));
        break;


      case "body":
        var item = (this.state.sw)?this.state.items.sort(function (a, b) {return b.body.toString().localeCompare(a.body);}):this.state.items.sort(function (a, b) {return a.body.toString().localeCompare(b.body);})
        this.setState(state => ({
          items: item,
          sw: !this.state.sw
        }));
        break;
    }
  }



	render() {


		let pagesCount = this.state.count/this.state.limit;
		let pages = [];
		for(let i = 1; i <= pagesCount; i++){
			pages.push(i)
		}



        return (
        		<div class="main">
        			<div class="limit">
	        			<button class="limitButton" value="5" onClick={this.changeLimit}>5</button>
						<button class="limitButton" value="10" onClick={this.changeLimit}>10</button>
						<button class="limitButton" value="25" onClick={this.changeLimit}>25</button>
						<button class="limitButton" value="50" onClick={this.changeLimit}>50</button>
        			</div>
        			<table>
                <th onClick={this.sortData}>userId</th>
                <th onClick={this.sortData}>id</th>
                <th onClick={this.sortData}>title</th>
                <th onClick={this.sortData}>body</th>
        				<tbody>
        					{this.state.items.slice(this.state.start, this.state.end).map((items) => (
        						<tr>
        							{
        								Object.values(items).map((field) => 
        									<td>{field}</td>
        									)
        							}
        						</tr>))}
        				</tbody>
        			</table>
        			<div class="pages">
        				{pages.map(p => 
        					<button class="page" value={p} onClick={this.changePage}>{p}</button>
        				)}
        			</div>
        		</div>


  
        	);
    }
}