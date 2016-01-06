var Board = React.createClass({
  
  loadBoard: function(){
    this.props.toggleBoard(this.props.id);
  },


  render: function(){
    return(<div className='col s4'>
            <div className='row'>
              <div className='card blue-grey darken-1'>
                <div className='card-content white-text' onClick={this.loadBoard}>
                  <span className='card-title'>{this.props.name}</span>
                </div>
                <div className='card-action'>
                  <a onClick={() => this.props.deleteBoard(this.props.id)}>Delete</a>
                </div>
              </div> 
            </div>           
          </div>);
  }

});