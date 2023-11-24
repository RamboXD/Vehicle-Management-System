import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

const Driver = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex bg-blue-500">
        <Text className="text-slate-400 text-base">Driver Page</Text>
      </View>
    </SafeAreaView>
  );
};

export default Driver;