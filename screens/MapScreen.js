import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ onLocationSelected }) => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [marker, setMarker] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const handleRegionChange = newRegion => {
    setRegion(newRegion);
    setMarker({
      latitude: newRegion.latitude,
      longitude: newRegion.longitude,
    });
  };

  const handleMarkerDragEnd = event => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarker({ latitude, longitude });
    onLocationSelected({ latitude, longitude });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={handleRegionChange}
      >
        <Marker coordinate={marker} onDragEnd={handleMarkerDragEnd} draggable />
      </MapView>
      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>Selected location:</Text>
        <Text style={styles.addressText}>
          {marker.latitude}, {marker.longitude}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '80%',
  },
  addressContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    width: '80%',
    position: 'absolute',
    bottom: 24,
    alignItems: 'center',
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
  },
});

export default MapScreen;
