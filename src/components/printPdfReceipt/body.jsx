import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#black",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
    textAlign: "center"
  },
  description: {
    width: "70%",
    // borderLeftColor: "#black",
    // borderLeftWidth: 1,
    borderRightColor: "#black"
    // borderRightWidth: 1
  },
  qty: {
    width: "30%",
    borderLeftColor: "#black",
    borderLeftWidth: 1
    // borderRightColor: "#black",
    // borderRightWidth: 1
  }
});

const InvoiceTableBody = () => (
  <>
    <View style={styles.row}>
      <Text style={styles.description}>Annual Fee Details</Text>
      <Text style={styles.qty}>Fee</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.description}>Annual Fee Details</Text>
      <Text style={styles.qty}>Rupees</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.description}>Annual Fee Details</Text>
      <Text style={styles.qty}>Rupees</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.description}>Annual Fee Details</Text>
      <Text style={styles.qty}>Rupees</Text>
    </View>
  </>
);

export default InvoiceTableBody;
