import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: "#black",
    borderTopColor: "#black",
    borderBottomWidth: 2,
    borderTopWidth: 1,
    alignItems: "center",
    height: 30,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1
  },
  description: {
    width: "70%",
    fontSize: 13,
    // borderLeftColor: "#black",
    // borderLeftWidth: 1,
    borderRightColor: "#black",
    borderRightWidth: 1
  },
  qty: {
    width: "30%",
    fontSize: 13
    // borderLeftColor: "#black",
    // borderLeftWidth: 1,
    // borderRightColor: "#black",
    // borderRightWidth: 1
  }
});

const InvoiceTableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.description}>Annual Fee Details</Text>
    <Text style={styles.qty}>Rupees</Text>
  </View>
);

export default InvoiceTableHeader;
