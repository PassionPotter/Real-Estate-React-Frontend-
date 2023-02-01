import {Component} from "react";

export default class Timer extends Component {
    constructor(props) {
        super();

        this.state = {
            leftTime:  props.timerToShow,
            timeInterval: 1000,
            days: props.days
        };
    }

    handleTime = () => {
        this.setState({
            leftTime: this.state.leftTime - this.state.timeInterval
        });
    }

    componentDidUpdate(){

        if(this.state.days && this.state.leftTime<=1000){
            this.setState({
                days: this.state.days-1,
                leftTime: 24 * 3600 * 1000-1
            })
        }
    }
    

    render() {
        setTimeout(this.handleTime, this.state.timeInterval);
        if (this.state.leftTime >= 0) {
            return (
                <div>
                    <button style={{width: 150, borderColor: "#03ffa4", backgroundColor:"black", color: "#03ffa4"}} className='d-font-bold d-text-24'>
                        {this.state.days>0 && (this.state.days>1?this.state.days+' days and':this.state.days+' day and')} {(new Date(this.state.leftTime)).toISOString().substr(11, 8)}
                    </button>
                </div>
            )
        } else {
            return <>
            </>
        }
    }
}