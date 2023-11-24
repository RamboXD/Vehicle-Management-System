import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

const Admin = () => {
  console.log("in admin page");
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex bg-blue-500">
        <Text className="text-slate-400 text-base">Admin Page</Text>
      </View>
    </SafeAreaView>
  );
};

export default Admin;
