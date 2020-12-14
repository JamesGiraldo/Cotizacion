import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import colors from '../utils/colors'

export default function ResultCalculation(props) {
    const { capital, interest, months, total, errorMessage } = props;

    return (
        <>
            <View style={styles.content}>
                { total && (
                    <View style={styles.boxResult}>
                        <Text style={styles.title}>RESUMEN</Text>                        
                        <DataResult title="Cantidad solicitada: " value={`${capital} $`} />                        
                        <DataResult title="Interes %: " value={`${interest} %`} />                        
                        <DataResult title="Plazos: " value={`${months} meses`} />    
                        <DataResult title="Pago mensual: " value={`${total.monthlyFee} $`} />
                        <DataResult title="Total a pagar: " value={`${total.totalPayable} $`} />                                                                    
                    </View>                     
                )}
                <View>
                    <Text style={styles.error} >{errorMessage}</Text>
                </View>
            </View>
        </>
    )
}

function DataResult(props) {
    const { title, value } = props;
    return(
        <View style={styles.value}>
            <Text>{title}</Text>
            <Text>{value}</Text>
        </View>     
    )
}

const styles = StyleSheet.create({
    boxResult: {
        padding: 30
    },
    title:{
        fontSize: 25,
        marginTop: -10,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20
    },
    value:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    content:{        
        marginHorizontal: 40        
    },
    error:{
        textAlign: 'center',
        color: 'red',
        fontWeight: 'bold',
        fontSize: 20
    }
})