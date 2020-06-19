import React, { ErrorBoundary } from "react";
// import InvoiceTableHeader from "./header";
// import InvoiceTableBody from "./body";

import {
  // PDFDownloadLink,
  PDFViewer,
  // ReactPDF,
  Document,
  Page,
  Text,
  StyleSheet,
  Font
  // View
  // PDFRenderer
} from "@react-pdf/renderer";
// import InvoiceTableHeader from "./header";
// import InvoiceTableBody from "./body";

// export default function Receipt() {
const MyReceipt = () => (
  <Document>
    {/* style={styles.pppage} wrap={false} */}
    <Page size="A4">
      <Text>
        Mahatma Gandhi Chitrakoot Gramodaya Vishwavidyalay Chitrakoot,
      </Text>
      {/* <Text style={styles.title2}>Satna, Madhya Pradesh</Text>

        // <View style={styles.view}>
        //   <Text style={styles.subtitle}>Date: someThing </Text>
        //   <Text style={styles.subtitle}>Name: Jay Prakash Maurya</Text>
        //   <Text style={styles.subtitle}>Father Name: Father Maurya</Text>
        //   <Text style={styles.subtitle}>Branch: B.Tech I.T.</Text>
        //   <Text style={styles.subtitle}>Year: First Year</Text>
        //   <Text> </Text>
        // </View>

        // <View style={styles.tableContainer}>
        //   <InvoiceTableHeader />
        //   <InvoiceTableBody />
        // </View>

        // <Text style={styles.note}>
        //   {"Submit:- M.G.C.G.V.V. Chitrakoot Fee Account Number 208"}
        // </Text>

        // <View style={styles.footer}>
        //   <Text style={styles.f1}>
        //     Signature and seal of the head of department
        //   </Text>
        //   <Text style={styles.f2}>Student's signature</Text>
        // </View> */}
    </Page>
  </Document>
);

export default MyReceipt;
//   return (
//     // <PDFViewer>
//     <ErrorBoundary>
//       <PDFViewer>
//       <MyReceipt />
//       </PDFViewer>
//     </ErrorBoundary>
//     // </PDFViewer>
//   );
// }
