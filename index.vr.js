import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Image,
  Sound,
  VrButton,
  StyleSheet,
  Animated,
} from 'react-vr';

export default class star_wars_intro_vr extends React.Component {
  constructor() {
    super();
    this.state = {
      z: 0,
      status: 'play',
      isPlaying: true,
    };

    this.animateLogo();

    this.restart = this.restart.bind(this);
    this.stop = this.stop.bind(this);
  }

  animateLogo() {
    setInterval(() => {
      this.setState((prevState) => ({
        z: prevState.z - 0.01,
      }))
    }, 1);
  }

  restart() {
    this.setState({
      status: 'stop'
    });

    setTimeout(() => {
      this.setState({
        status: 'play',
        z: 0.3
      })
    }, 10)
  }

  stop() {
    this.setState({
      isPlaying: false,
    })
  }

  render() {
    return (
      <View
        style={ this.style }
      >
        <Pano source={asset('stars.jpg')} />
        <View
          style={ this.style }
        >
          <Player isPlaying={ this.state.isPlaying }>
            <Theme
              status={ this.state.status }
            />
            <Logo zPosition={ this.state.z } />
          </Player>
          <Restart onClick={ this.restart } />
          <Stop onClick={ this.stop }/>
        </View>
      </View>
    );
  }
};

const Player = ({ isPlaying, children }) => {
  const toReturn = (
    isPlaying
      ? <View>
          { children }
        </View>
      : <View />
  );

  return toReturn
};

const Theme = ({ status }) => {
  return status === 'stop' ? null :
    <Sound
      source={ asset('theme.mp3') }
      volume={ 10 }
    />
};

const buttonStyle = StyleSheet.create({
  VrButton: {
    // width: 1,
    transform: [{translate: [-4, 2, -3]}]
  },
  Text: {
    fontSize: 0.2
  }
});

const Restart = ({ onClick }) => (
  <VrButton
    style={ buttonStyle.VrButton }
    onClick={ onClick }
  >
    <Text style={ buttonStyle.Text }>
      Restart
    </Text>
  </VrButton>
);

const Stop = ({ onClick }) => (
  <VrButton
    style={{ transform: [{translate: [-4, 0, -3]}] }}
    onClick={ onClick }
  >
    <Text style={ buttonStyle.Text }>
      Stop
    </Text>
  </VrButton>
);

class Logo extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     fadeAnim: new Animated.Value(0),
  //   }
  // }
  //
  // componentDidMount() {
  //   Animated.timing(
  //     this.state.fadeAnim,
  //     { toValue: 1 },
  //   ).start();
  // }

  render() {
    return <LogoImage zPosition={ this.props.zPosition } />
  }
};

const LogoImage = ({ zPosition }) => (
  <Image
    style={{
      width: 1,
      height: 1,
      transform: [
        { translate: [-0.5, 0.5, zPosition] },
        { rotateZ: -0.8 }
      ]
    }}
    source={asset('logo.png')}
  />
)

const CenteredText = ({ children }) => (
  <Text
    style={{
      textAlign: 'center',
      color: '#ff6',
      fontFamily: '"Times New Roman", Georgia, Serif;',
    }}
  >
    { children }
  </Text>
);

const Crawler = ({ position }) => (
  <View style={{
    ...position,
  }}>
    {
      introText.map(line => {
        return <CenteredText key={line}>{ line }</CenteredText>
      })
    }
  </View>
);

const introText = [
  'It is a period of civil war.',
  'Rebel spaceships, striking from a hidden base,'
];

AppRegistry.registerComponent('star_wars_intro_vr', () => star_wars_intro_vr);
