import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;

export default function BasicExample(moreprops) {
    const { value, setValue } = moreprops;
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    return (
        <SafeAreaView style={styles.root}>
            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFiledRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
    
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: { textAlign: 'center', fontSize: 30 },
    codeFiledRoot: { marginTop: 20 },
    cell: {
        width: 50,
        height: 60,
        borderRadius: 5,
        lineHeight: 52,
        fontSize: 30,
        borderWidth: 1,
        borderColor: '#DBDBDB',
        textAlign: 'center',
        fontFamily: 'Poppins_400Regular',
        color: '#262626',
        backgroundColor: '#FFFFFF'
    },
    focusCell: {
        borderColor: '#E5C0A6',
        color: '#E5C0A6'
    },
});
