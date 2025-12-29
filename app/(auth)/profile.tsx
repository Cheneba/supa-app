import { View, Text, Image, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';

const Page = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  return (
    <View>
      {image && <Image source={{ uri: image }} style={styles.avatar} />}
      {!image && <View style={styles.avatar} />}
      <Button title='Set Avatar Image' onPress={pickImage}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 200,
    height: 200,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    borderRadius: 100,
    margin: 40,
  },
})

export default Page