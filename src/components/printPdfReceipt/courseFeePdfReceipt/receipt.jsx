import React from "react";
import { InvoiceTableHeader, InvoiceTableBody } from "./index";
import {
  PDFDownloadLink,
  // PDFViewer,
  // BlobProvider,
  // ReactPDF,
  Document,
  Page,
  Text,
  StyleSheet,
  // Font,
  View
} from "@react-pdf/renderer";

// Font.register({
//   family: "Oswald",
//   src: " https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf"
// });

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "black"
  },
  title1: {
    fontSize: 16,
    textAlign: "center"
    // fontFamily: "Roboto"
  },
  title2: {
    fontSize: 16,
    textAlign: "center",
    // fontFamily: "Roboto",
    marginTop: 5
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40
  },
  subtitle: {
    fontSize: 12
    // fontFamily: "Roboto"
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify"
    // fontFamily: "Times-Roman"
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey"
  },
  heading1: {
    width: "40%",
    borderRightColor: "90e5fc",
    borderRightWidth: 1
  },
  heading2: {
    width: "40%",
    borderRightColor: "90e5fc",
    borderRightWidth: 1
  },
  view: {
    marginTop: 5
  },
  page: {
    // fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 40,
    paddingRight: 40,
    lineHeight: 1.5,
    flexDirection: "column"
  },
  // logo: {
  //   width: 74,
  //   height: 66,
  //   marginLeft: "auto",
  //   marginRight: "auto"
  // },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    // marginTop: 24,
    borderWidth: 2,
    borderColor: "#black"
  },
  note: {
    marginTop: 20,
    textAlign: "left"
  },
  footer: {
    marginTop: 60,
    flexDirection: "row",
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
    textAlign: "center"
  },
  f1: {
    width: "50%"
  },
  f2: {
    width: "50%"
  },
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
  },
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
  }
});

const Receipt = value => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title1}>
        Mahatma Gandhi Chitrakoot Gramodaya Vishwavidyalay Chitrakoot,
      </Text>
      <Text style={styles.title2}>Satna, Madhya Pradesh</Text>

      <View style={styles.view}>
        <Text style={styles.subtitle}>
          Date: {new Date(value.value.createdAt).toISOString().substring(0, 10)}
        </Text>

        <Text style={styles.subtitle}>
          {`Name: ${value.value.studentInfo.firstName} ${value.value.studentInfo.lastName}`}
        </Text>

        <Text style={styles.subtitle}>
          Father Name: {value.value.studentInfo.fatherName}
        </Text>

        <Text style={styles.subtitle}>
          Branch: {value.value.studentInfo.branch}
        </Text>

        <Text style={styles.subtitle}>Year: {value.value.feeInfo.year}</Text>

        <Text style={styles.subtitle}>
          Session: {value.value.studentInfo.admissionSession}
        </Text>

        <Text style={styles.subtitle}>Transaction ID: {value.value._id}</Text>
        <Text> </Text>
      </View>

      <View style={styles.tableContainer}>
        {/* <View style={styles.container}>
          <Text style={styles.description}>Annual Fee Details</Text>
          <Text style={styles.qty}>Rupees</Text>
        </View> */}
        <InvoiceTableHeader />
        <InvoiceTableBody value={value} />
      </View>

      <Text style={styles.note}>
        {"Submit:- M.G.C.G.V.V. Chitrakoot Fee Account Number 208"}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.f1}>
          Signature and seal of the head of department
        </Text>
        <Text style={styles.f2}>Student's signature</Text>
      </View>
    </Page>
  </Document>
);

const MyReceipt = props => (
  <>
    {/* {props.value ? (
    <PDFViewer height="600" width="100%">
      <Receipt value={props.value} />
    </PDFViewer>
  ) : null} */}

    {props.value ? (
      <PDFDownloadLink
        document={<Receipt value={props.value} />}
        fileName="courseFeeReceipt.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            <h2> Loading document...</h2>
          ) : (
            <button className="btn btn-outline-danger btn-block">
              {"Download Invoice Now"}
            </button>
          )
        }
      </PDFDownloadLink>
    ) : null}
  </>
);

export default MyReceipt;
