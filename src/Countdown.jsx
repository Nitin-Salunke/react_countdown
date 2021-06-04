import React, {PureComponent} from 'react';
import './countdown.css';

class Countdown extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00'
    };
  }

  componentDidMount() {
    this.startCountdown(this.props.endTime);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  startCountdown = (endTime) => {
    this.myInterval = setInterval(() => {
      const now = new Date().getTime();

      const diff = endTime.getTime() - now;

      const days = Countdown.formatNumber(diff / (1000 * 60 * 60 * 24));
      const hours = Countdown.formatNumber((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Countdown.formatNumber((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Countdown.formatNumber((diff % (1000 * 60)) / 1000);

      if (diff > 0) {
        this.setState({
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds
        });
      }

    }, 1000)
  }

  static formatNumber = (number) => {
    number = Math.floor(number);
    return ('0' + number).slice(-2);
  }
  
  render () {
    const {days, hours, minutes, seconds} = this.state;
    return (
      <section className='countdownContainer'>
        <section className='days countdownElement'>
          <p className='countdownDigits'>{days}</p>
          <p className='countdownText'><small>Days</small></p>
        </section>

        <section><p className='countdownDigits'>:</p></section>

        <section className='hours countdownElement'>
          <p className='countdownDigits'>{hours}</p>
          <p className='countdownText'><small>Hours</small></p>
        </section>

        <section><p className='countdownDigits'>:</p></section>

        <section className='minutes countdownElement'>
          <p className='countdownDigits'>{minutes}</p>
          <p className='countdownText'><small>Minutes</small></p>
        </section>

        <section><p className='countdownDigits'>:</p></section>

        <section className='seconds countdownElement'>
          <p className='countdownDigits'>{seconds}</p>
          <p className='countdownText'><small>Seconds</small></p>
        </section>
      </section>
    )
  }
}

export default Countdown;
