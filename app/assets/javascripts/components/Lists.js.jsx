var Lists = React.createClass({
  
  getInitialState: function() {
    return {lists: []}
  },

  componentDidMount: function() {
    this.fetchLists();
  },

  fetchLists: function() {
    var self = this;
    $.ajax({
      url: '/lists',
      type: 'GET',
      data: {id: this.props.boardId},
      success: function(data) {
        self.setState(data);
      }
    });
  },

  showAddForm: function(){
    this.setState({showAdd: !this.state.showAdd});
  },

  addListForm: function(){
    if(this.state.showAdd){
      return(<div>
               <form onSubmit={this.submitList} >
                 <div className='input-field'>
                   <input type='text' placeholder='List Name' autoFocus='true' ref='listName' />
                   <button type='submitn' className='waves-effect waves-light btn'>Add</button>
                 </div>
               </form>
              </div>);
    }
  },

  submitList: function(e){
    e.preventDefault();
    var self = this;
    $.ajax({
      url: '/lists',
      type: 'POST',
      data: {id: this.props.boardId, list: {name: this.refs.listName.value}},
      success: function(data){
        var lists = self.state.lists;
        lists.push(data);
        self.refs.listName.value = '';
        self.setState({lists: lists, showAdd: false});
      }
    });
  },

  displayLists: function(){
    var lists = [];
    for(var i = 0; i < this.state.lists.length; i++){
      var list = this.state.lists[i];
      var key = 'list-' + list.id;
      lists.push(<List key={key} id={list.id} name={list.name} />);
    }
    return lists;
  },

  render: function(){
    return(<div>
             <a className='waves-effect waves-light btn' onClick={this.props.toggleBoard}>Boards</a>
             <a className='waves-effect waves-light btn' onClick={this.showAddForm}>Add List</a>
             {this.addListForm()}
             <div className='row'>
               {this.displayLists()}
             </div>
           </div>);
  }
});