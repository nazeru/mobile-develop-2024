//HapticTab.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

interface HapticTabProps extends BottomTabBarButtonProps {
    title: string;  
}

const HapticTab: React.FC<HapticTabProps> = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.tab}>
            <Text>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    tab: {
        padding: 10,
        alignItems: 'center',
    },
});

export default HapticTab;
