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

// return the actual table data.
const InvoiceTableBody = props => {
  const { value } = props.value;

  return (
    <>
      <View style={styles.row}>
        <Text style={styles.description}>Back Fee</Text>
        <Text style={styles.qty}>{value.feeInfo.backFee.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.description}>Delay Fee</Text>
        <Text style={styles.qty}>{value.feeInfo.delayFee.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.description}>Examination Form Fee</Text>
        <Text style={styles.qty}>
          {value.backFeeType.examinationFormFee.toFixed(2)}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.description}>Other Charges</Text>
        <Text style={styles.qty}>
          {value.backFeeType.otherCharges.toFixed(2)}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.description}>Total Fee</Text>
        <Text style={styles.qty}>{value.feeInfo.totalFee.toFixed(2)} Rs.</Text>
      </View>
    </>
  );
};

export default InvoiceTableBody;
