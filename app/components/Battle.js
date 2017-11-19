const React = require('react');
const Link = require('react-router-dom').Link;
const PlayerPreview = require('./PlayerPreview');

class PlayerInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState(function () {
            return {
                username: value
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.props.id, this.state.username)
    }

    render() {
        return (
            <form className='column' onSubmit={this.handleSubmit}>
                <label className='header' htmlFor="username">{this.props.label}</label>
                <input type="text"
                       id='username'
                       placeholder='Github Username'
                       value={this.state.username}
                       autoComplete='off'
                       onChange={this.handleChange} />
                <button className='button'
                        type='submit'
                        disabled={!this.state.username}>Submit</button>
            </form>
        )
    }

}

class Battle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerOneName: '',
            playerTwoName: '',
            playerOneImage: null,
            playerTwoImage: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    
    handleSubmit(id, username) {
        this.setState(function () {
            const newState = {};
            newState[id + 'Name'] = username;
            newState[id + 'Image'] = 'https://github.com/' + username + '.png?size200';
            return newState;
        })
    }

    handleReset(id) {
        this.setState(function () {
            const newState = {};
            newState[id + 'Name'] = '';
            newState[id + 'Image'] = null;
            return newState;
        })
    }

    render() {
        const match = this.props.match;
        const playerOneName = this.state.playerOneName;
        const playerTwoName = this.state.playerTwoName;
        const playerOneImage = this.state.playerOneImage;
        const playerTwoImage = this.state.playerTwoImage;

        return (
            <div>
               <div className='row'>
                   {!playerOneName &&
                        <PlayerInput
                            id='playerOne'
                            label='Player One'
                            onSubmit={this.handleSubmit}
                        />
                   }
                   {playerOneImage !== null &&
                       <PlayerPreview
                           avatar={playerOneImage}
                           username={playerOneName}>
                           <button
                               className='reset'
                               onClick={this.handleReset.bind(this, 'playerOne')}>
                                Reset
                           </button>
                       </PlayerPreview>}

                   {!playerTwoName &&
                       <PlayerInput
                           id='playerTwo'
                           label='Player Two'
                           onSubmit={this.handleSubmit}
                       />
                   }
                   {playerTwoImage !== null &&
                       <PlayerPreview
                           avatar={playerTwoImage}
                           username={playerTwoName}>
                           <button
                               className='reset'
                               onClick={this.handleReset.bind(this, 'playerTwo')}>
                                Reset
                           </button>
                       </PlayerPreview>}
               </div>
                {playerOneImage && playerTwoImage &&
                <Link className='button'
                      to={{
                          pathname: match.url + '/results',
                          search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
                      }}>
                    Battle
                </Link>}
            </div>
        )
    }
}

module.exports = Battle;