import React from 'react';
import { Provider } from 'react-redux';
import { Stack } from 'expo-router';
import store from '../store'

export default function RootLayout() {
	return (
		<Provider store={store}>
			<Stack>
				<Stack.Screen name='index' options={{ headerShown: false }} />
			</Stack>
		</Provider>
	);
}
