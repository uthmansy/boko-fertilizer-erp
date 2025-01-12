import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { COMPANY } from "../../constants/COMPANY";
import { LOGO } from "../../assets/images";
import { PurchasesAndPayments } from "../../types/db";
import { formatNumber } from "../../helpers/functions";

Font.register({
  family: "Roboto", // Use a font like Roboto that supports currency symbols
  src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu72xKOzY.woff2", // URL of font
});

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    fontSize: 8,
    lineHeight: 1.5,
    fontFamily: "Roboto",
  },
  header: {
    textAlign: "center",
    marginBottom: 15,
    border: 1,
    borderColor: "#222222",
    padding: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 7,
    alignSelf: "center", // Center the logo horizontally
  },
  section1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  storeTable: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "222222",
    marginBottom: 20,
    padding: 0,
  },
  verticalTable: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "222222",
    marginBottom: 20,
    padding: 0,
  },
  verticalRow: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "222222",
    paddingVertical: 0,
  },
  horizontalTable: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "222222",
    marginBottom: 20,
    padding: 0,
  },
  horizontalRow: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "222222",
    paddingVertical: 0,
  },
  label: {
    width: "40%",
    backgroundColor: "rgba(0, 100, 0, 0.1)",
    fontWeight: "bold",
    // textAlign: "center",
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  value: {
    width: "60%",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "222222",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    flex: 1,
    borderWidth: 1,
    borderColor: "222222",
    padding: 5,
  },
  tableCellHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCell: {
    textAlign: "center",
  },
  footer: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 10,
    color: "#888888",
  },
  // signatureStampContainer: {
  //   marginTop: 40,
  // },
  // signatureStamp: {
  //   display: "flex",
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   marginTop: 20,
  // },
  // signatureBox: {
  //   borderTopWidth: 1,
  //   borderTopColor: "#bfbfbf",
  //   width: "45%",
  //   textAlign: "center",
  //   paddingTop: 10,
  // },
  uppercase: {
    textTransform: "uppercase",
  },
  watermark: {
    position: "absolute",
    top: "25%",
    left: "15%",
    width: "85%",
    height: "auto",
    opacity: 0.15, // Set opacity to make it a watermark
    zIndex: -1, // Ensure the watermark is behind the content
  },
  topWaybillNumber: {
    position: "absolute",
    top: 40,
    right: 40,
  },
  signatureStampContainer: {
    flexDirection: "row", // Layout items in a row
    justifyContent: "space-between", // Add space between elements
    alignItems: "flex-start", // Align items at the top
    marginTop: 10,
  },
  officerSection: {
    width: "40%", // Each officer section takes 40% of the width
  },
  officerTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  officerName: {
    fontSize: 10,
    marginBottom: 30,
  },
  signatureStamp: {
    flexDirection: "row", // Signature and stamp side by side
    justifyContent: "space-between",
  },
  signatureBox: {
    borderTop: "1pt solid black", // Line for signature or stamp
    width: "70%",
    height: 30, // Adjust height for space
    justifyContent: "flex-end", // Push the text to the bottom
    // alignItems: "center",
    paddingTop: 8,
  },
  qrCodeContainer: {
    width: "20%", // QR code takes 20% of the width
    justifyContent: "center",
    alignItems: "center",
  },
  qrCodeImage: {
    width: 100,
    height: 100, // Adjust size for the QR code
  },
});

interface PurchaseRecordProps {
  data: PurchasesAndPayments;
  qrCodeDataUri: string;
}

const PurchaseRecord: React.FC<PurchaseRecordProps> = ({
  data,
  qrCodeDataUri,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark Logo */}
        <Image src={LOGO} style={styles.watermark} />
        <View style={styles.topWaybillNumber}>
          <Text>{data.order_number}</Text>
        </View>
        {/* Header Section */}
        <View style={styles.header}>
          {/* Add the logo here */}
          <Image src={LOGO} style={styles.logo} /> {/* Update this path */}
          <Text
            style={{
              fontSize: 18, // Larger size for heading
              fontWeight: "bold", // Bold for emphasis
              textTransform: "uppercase", // Uppercase for consistent styling
            }}
          >
            {COMPANY.name} Purchase Order
          </Text>
          <Text
            style={{
              fontSize: 12, // Smaller size for subheading
              fontWeight: "normal", // Less bold than the heading
              textTransform: "uppercase", // Uppercase for consistency
            }}
          >
            {COMPANY.address}
          </Text>
        </View>
        <View style={{ borderColor: "#222222", borderWidth: 1, padding: 20 }}>
          <View style={styles.section1}>
            <View style={styles.storeTable}>
              <View style={styles.verticalRow}>
                <Text style={styles.label}>Price:</Text>
                <Text style={styles.value}>
                  N{formatNumber(data.price) || ""}
                </Text>
              </View>
              <View style={styles.verticalRow}>
                <Text style={styles.label}>Paid:</Text>
                <Text style={styles.value}>
                  N{formatNumber(data.paid) || ""}
                </Text>
              </View>
              <View style={styles.verticalRow}>
                <Text style={styles.label}>Balance:</Text>
                <Text style={styles.value}>
                  N{formatNumber(data.price - data.paid) || ""}
                </Text>
              </View>
            </View>
            <View style={styles.verticalTable}>
              <View style={styles.verticalRow}>
                <Text style={styles.label}>Order Number:</Text>
                <Text style={styles.value}>{data.order_number}</Text>
              </View>
              <View style={styles.verticalRow}>
                <Text style={styles.label}>Seller:</Text>
                <Text style={styles.value}>{data.seller}</Text>
              </View>
              <View style={styles.verticalRow}>
                <Text style={styles.label}>Date Purchased:</Text>
                <Text style={styles.value}>{data.date}</Text>
              </View>
              <View style={styles.verticalRow}>
                <Text style={styles.label}>Item Purchased:</Text>
                <Text style={styles.value}>{data.item}</Text>
              </View>
              <View style={styles.verticalRow}>
                <Text style={styles.label}>Quantity:</Text>
                <Text style={styles.value}>
                  {data.quantity} {data.item_info.unit}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.horizontalTable}>
              <View style={styles.horizontalRow}>
                <Text style={styles.label}>SN</Text>
                <Text style={styles.label}>Account Number:</Text>
                <Text style={styles.label}>Account Name:</Text>
                <Text style={styles.label}>Bank Name:</Text>
                <Text style={styles.label}>Payment Mode:</Text>
                <Text style={styles.label}>Amount:</Text>
              </View>
              {data.payments.map((payment, i) => (
                <View key={i} style={styles.horizontalRow}>
                  <Text style={styles.value}>{i + 1}</Text>
                  <Text style={styles.value}>{payment.account_number}</Text>
                  <Text style={styles.value}>{payment.account_name}</Text>
                  <Text style={styles.value}>{payment.bank_name}</Text>
                  <Text style={styles.value}>{payment.payment_mode}</Text>
                  <Text style={styles.value}>
                    N{formatNumber(payment.amount)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          {/* QR Code Section */}
          {qrCodeDataUri !== "" && (
            <View style={styles.qrCodeContainer}>
              <Image style={styles.qrCodeImage} src={qrCodeDataUri} />
            </View>
          )}
        </View>
        <View
          style={{
            padding: 10,
            border: 1,
            borderColor: "#222222",
            marginTop: 10,
          }}
        >
          <Text style={{ textAlign: "center" }}>
            - This Document is a property of the above mentioned Company -
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PurchaseRecord;
