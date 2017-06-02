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

const ROLL_PLOT = 9000;

export default class star_wars_intro_vr extends React.Component {
  constructor() {
    super();
    this.state = {
      logoZ: 0,
      status: 'play',
      isPlaying: true,
      crawlerY: -0.1,
      crawlerZ: -1.9,
    };

    this.crawlerStart = {
      y: 0,
      z: -2,
    };

    this.animateLogo();
    this.animateCrawler();

    this.restart = this.restart.bind(this);
    this.stop = this.stop.bind(this);
  }

  animateLogo() {
    setInterval(() => {
      this.setState((prevState) => ({
        logoZ: prevState.logoZ - 0.01,
      }))
    }, 1);
  }

  animateCrawler() {
    setInterval(() => {
      this.setState((prevState) => ({
        crawlerY: prevState.crawlerY + 0.001,
        crawlerZ: prevState.crawlerZ - 0.001,
      }))
    }, 1);
  }

  restart() {
    this.setState({
      status: 'stop',
      isPlaying: true,
    });

    setTimeout(() => {
      this.setState({
        status: 'play',
        logoZ: 0.3
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
      <View>
        <Pano source={asset('stars.jpg')} />
          <Player isPlaying={ this.state.isPlaying }>
            <Theme status={ this.state.status } />
            <Logo zPosition={ this.state.logoZ } />
            <Crawler yPosition={ this.state.crawlerY } zPosition={ this.state.crawlerZ }/>
          </Player>
          <Restart onClick={ this.restart } />
          <Stop onClick={ this.stop }/>
      </View>
    );
  }
};

const Crawler = ({ position, yPosition, zPosition }) => (
  <View style={{
    transform: [
      { translate: [-4.8, yPosition, zPosition ]},
      { rotateX: -50 },
      { rotateY: -0.8 },
      { rotateZ: -0.5 }
      ],
  }}>
    {
      introText.map(line => {
        return <CenteredText key={line}>{ line }</CenteredText>
      })
    }
  </View>
);

const CenteredText = ({ children }) => (
  <Text
    style={{
      textAlign: 'center',
      color: '#ff6',
      fontFamily: '"Times New Roman", Georgia, Serif;',
      fontWeight: 'bold',
      fontSize: 1,
    }}
  >
    { children }
  </Text>
);

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
  /*
  * **WORKAROUND** because I can't detect when the audio is loaded,
   * so playControl prop on sound breaks on 'play' when first mounted.
  * */
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
  constructor(props) {
    super(props);

    this.state = {
      fadeAnim: new Animated.Value(1),
    };

    setInterval(() => {
      Animated.timing(
        this.state.fadeAnim,
        { toValue: 0 },
      ).start();
    }, ROLL_PLOT)
  }

  render() {
    return(
      <Animated.View
        style={{opacity: this.state.fadeAnim}}
      >
        <LogoImage zPosition={ this.props.zPosition } />
      </Animated.View>
    )
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
);

const introText = [
  'It is a period of civil war.',
  'Rebel spaceships, striking',
  'from a hidden base, have',
  'won their first victory',
  'against the evil Galactic',
  'Empire.',
  '',
  'During the battle, rebel',
  'spies managed to steal',
  'secret plans to the Empire\'s',
  'ultimate weapon, the',
  'DEATH STAR, an armored',
  'space station with enough',
  'power to destroy an entire',
  'planet.',
  'Pursued by the Empire\'s',
  'sinister agents, Princess',
  'Leia races home aboard her',
  'starship, custodian of the',
  'stolen plans that can save',
  'her people and restore',
  'freedom to the galaxy....'
];

AppRegistry.registerComponent('star_wars_intro_vr', () => star_wars_intro_vr);
