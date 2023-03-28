import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

function Map({ navigation }) {
  const [coords, setCoords] = useState();

  const region = useMemo(
    () => ({
      latitude: 37.78,
      longitude: -122.43,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }),
    [coords]
  );

  const savePickedLocation = useCallback(() => {
    if (!coords) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location - by tapping on the map - first"
      );
      return;
    }

    navigation.navigate("AddPlace", { pickedLocation: coords });
  }, [navigation, coords]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          color={tintColor}
          size={24}
          onPress={savePickedLocation}
        />
      ),
    });
  }, [navigation, savePickedLocation]);

  function selectLocationHandler(event) {
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;

    setCoords({ latitude, longitude });
  }

  return (
    <MapView
      style={styles.mapContainer}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {coords && <Marker title="Pick location" coordinate={coords} />}
    </MapView>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
});

export default Map;
