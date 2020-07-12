import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#black",
    borderBottomWidth: 1,
    alignItems:"center",
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

const InvoiceTableBody = props => {
  const { value } = props.value;

  return (
    <>
      <View style={styles.row}>
        <Text style={styles.description}>Study Trip Fee</Text>
        <Text style={styles.qty}>{(value.courseFeeType.studyTripFee).toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Tuition Fee</Text>
        <Text style={styles.qty}>{(value.courseFeeType.tuitionFee).toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Laboratory/Computer Fee</Text>
        <Text style={styles.qty}>{(value.courseFeeType.laboratory).toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Delay Fee</Text>
        <Text style={styles.qty}>{(value.feeInfo.delayFee).toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Security Fee</Text>
        <Text style={styles.qty}>{(value.courseFeeType.securityFee).toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Hostel Fee</Text>
        <Text style={styles.qty}>{(value.courseFeeType.hostelFee).toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Other Charges</Text>
        <Text style={styles.qty}>{(value.courseFeeType.otherCharges).toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Entrance Fees</Text>
        <Text style={styles.qty}>{(value.courseFeeType.entranceFees).toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Central Library Fee</Text>
        <Text style={styles.qty}>{(value.courseFeeType.centralLibraryFee).toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Student Smart Card Fee</Text>
        <Text style={styles.qty}>
          {(value.courseFeeType.studentSmartCardFee).toFixed(2)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Sports and Cultural Program Fee</Text>
        <Text style={styles.qty}>
          {(value.courseFeeType.sportsAndCulturalProgramFee).toFixed(2)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Student Welfare Fee</Text>
        <Text style={styles.qty}>{(value.courseFeeType.studentWelfareFee).toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Development Fee</Text>
        <Text style={styles.qty}>{(value.courseFeeType.developmentFee).toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Student Academic Guide</Text>
        <Text style={styles.qty}>
          {(value.courseFeeType.studentAcademicGuide).toFixed(2)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Examination Fee</Text>
        <Text style={styles.qty}>{(value.courseFeeType.examinationFee).toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Energy Charges</Text>
        <Text style={styles.qty}>{(value.courseFeeType.energyCharges).toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Internet Fee</Text>
        <Text style={styles.qty}>{(value.courseFeeType.internetFee).toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Total Fee</Text>
        <Text style={styles.qty}>{(value.feeInfo.totalFee).toFixed(2)} Rs.</Text>
      </View>
    </>
  );
};

export default InvoiceTableBody;
