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
        <Text style={styles.qty}>{value.courseFeeType.studyTripFee}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Tuition Fee</Text>
        <Text style={styles.qty}>{value.courseFeeType.tuitionFee}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Laboratory/Computer Fee</Text>
        <Text style={styles.qty}>{value.courseFeeType.laboratory}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Delay Fee</Text>
        <Text style={styles.qty}>{value.feeInfo.delayFee}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Security Fee</Text>
        <Text style={styles.qty}>{value.courseFeeType.securityFee}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Hostel Fee</Text>
        <Text style={styles.qty}>{value.courseFeeType.hostelFee}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Other Charges</Text>
        <Text style={styles.qty}>{value.courseFeeType.otherCharges}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Entrance Fees</Text>
        <Text style={styles.qty}>{value.courseFeeType.entranceFees}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Central Library Fee</Text>
        <Text style={styles.qty}>{value.courseFeeType.centralLibraryFee}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Student Smart Card Fee</Text>
        <Text style={styles.qty}>
          {value.courseFeeType.studentSmartCardFee}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Sports and Cultural Program Fee</Text>
        <Text style={styles.qty}>
          {value.courseFeeType.sportsAndCulturalProgramFee}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Student Welfare Fee</Text>
        <Text style={styles.qty}>{value.courseFeeType.studentWelfareFee}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Development Fee</Text>
        <Text style={styles.qty}>{value.courseFeeType.developmentFee}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Student Academic Guide</Text>
        <Text style={styles.qty}>
          {value.courseFeeType.studentAcademicGuide}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Examination Fee</Text>
        <Text style={styles.qty}>{value.courseFeeType.examinationFee}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Energy Charges</Text>
        <Text style={styles.qty}>{value.courseFeeType.energyCharges}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Internet Fee</Text>
        <Text style={styles.qty}>{value.courseFeeType.internetFee}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Total Fee</Text>
        <Text style={styles.qty}>{value.feeInfo.totalFee}</Text>
      </View>
    </>
  );
};

export default InvoiceTableBody;
