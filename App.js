import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar, YellowBox, Button } from 'react-native';
import colors from './src/utils/colors';
import Form from "./src/components/Form";
import Footer from './src/components/Footer';
import ResultCalculation from './src/components/ResultCalculation';

YellowBox.ignoreWarnings(["Picker has been extracted"])

export default function App(){

  const [capital, setCapital] = useState(null);
  const [interest, setInterest] = useState(null);
  const [months, setMonths] = useState(null);
  const [total, setTotal] = useState(null);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect( () => {
    // if (capital && interest && months) {
    //   calculate();
    // }else{
    //   reset();
    // }

    if (capital && interest && months) calculate();
    else reset();

  }, [ capital, interest, months ])

  const calculate = () => {
    reset();
    if ( !capital ){
      setErrorMessage("Añadir la cantidad que quieras solicitar");
    } else if ( !interest ){
      setErrorMessage("Añadir el insteres del prestamo");
    } else if ( !months ){
      setErrorMessage("Selecciona los meses a pagar");
    } else {
      const i = interest / 100;
      const fee = capital / (( 1 - Math.pow(i + 1, -months)) / i);
      setTotal({
        monthlyFee: fee.toFixed(2).replace('.', ','),
        totalPayable: (fee * months).toFixed(2).replace('.', ',')
      });
    }
  }

  const reset = () => {
    setErrorMessage('');
    setTotal(null);
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.background}/>
        <Text style={styles.titleApp}> Cotizador de Prestamos</Text>
        <Form
          setCapital={setCapital}
          setInterest={setInterest}
          setMonths={setMonths}
        />
      </SafeAreaView>
      <ResultCalculation
        capital={capital}
        interest={interest}
        months={months}
        total={total}
        errorMessage={errorMessage}/>
      <Footer calculate={calculate} />
    </>
  );
}

// declarar css
const styles = StyleSheet.create({
  safeArea: {
    height: 290,
    alignItems: "center",
  },
  background:{
    backgroundColor: colors.PRIMARY_COLOR,
    height: 200,
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: -1,
    position: 'absolute'
  },
  titleApp: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15
  },
});
