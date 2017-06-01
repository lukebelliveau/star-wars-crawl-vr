import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Image,
  Sound
} from 'react-vr';

export default class star_wars_intro_vr extends React.Component {
  constructor() {
    super();
    this.state = {
      z: 0,
      status: ''
    };

    setInterval(() => {
      this.setState((prevState) => ({
        z: prevState.z - 0.01,
      }))
    }, 1);
  }

  render() {
    return (
      <View>
        <Pano source={asset('stars.jpg')} />
        <Theme
          asset={ asset('theme.mp3') }
        />
        <Logo zPosition={ this.state.z }/>
      </View>
    );
  }
};

const Theme = ({ soundAsset, status }) => (
  <Sound
    source={ asset('theme.mp3') }
  />
);

const Logo = ({ zPosition }) => (
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
