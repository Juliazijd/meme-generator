import React, {Component} from "react";

class MemeGenerator extends Component {
    constructor () {
        super();
        this.state = {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/4acd7j.png",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }
    componentDidMount () {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({ allMemeImgs: memes })
            })
    }
    handleSubmit(event) {
        event.preventDefault();
        const randomNumber = Math.floor(Math.random() * this.state.allMemeImgs.length);
        const randomMemeImage = this.state.allMemeImgs[randomNumber].url;
        this.setState({ randomImage: randomMemeImage })
    }
    render() {
        return (
            <div className="meme">
                <form className="meme-form" onSubmit={this.handleSubmit} >
                    <input 
                        type="text" 
                        name="topText" 
                        placeholder="top text" 
                        value={this.state.topText} 
                        onChange={this.handleChange}
                    />
                    <input type="text" 
                        name="bottomText" 
                        placeholder="bottom text" 
                        value={this.state.bottomText} 
                        onChange={this.handleChange}
                    />
                     <button>Generate</button>
                </form>
                <img src={this.state.randomImage} alt="Is there a problem?"></img>
                <h1 className="top">{this.state.topText}</h1>
                <h1 className="bottom">{this.state.bottomText}</h1>
            </div>
        )
    }
}

export default MemeGenerator;