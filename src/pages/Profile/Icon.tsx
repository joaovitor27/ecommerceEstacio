// Icon.js
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Icon = ({ library, name, size, color }) => {

  const IconComponent = library === 'MaterialCommunityIcons' ? MaterialCommunityIcons : MaterialIcons;

  return <IconComponent name={name} size={size} color={color} />;
};

export default Icon;
