import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { PaymentAccounts, SalesAndPayments } from "../../types/db"; // Ensure this import is correct based on your project structure
import { COMPANY } from "../../constants/COMPANY";
import { ABJ_LOGO, LOGO } from "../../assets/images";
import { formatNumber } from "../../helpers/functions";

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    fontSize: 8,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
  },
  header: {
    textAlign: "center",
    marginBottom: 15,
    border: 1,
    borderColor: "#222222",
    padding: 10,
  },
  logo: {
    width: "auto",
    height: 80,
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
    width: "100%",
  },
  verticalRow: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "222222",
    paddingVertical: 0,
    width: "100%",
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

interface InvoiceDocProps {
  sale: SalesAndPayments;
  account: PaymentAccounts;
}

const InvoiceDoc: React.FC<InvoiceDocProps> = ({ account, sale }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark Logo */}
        {!sale.items[0].item_purchased.toLowerCase().startsWith("olam") && (
          <Image src={LOGO} style={styles.watermark} />
        )}

        <View style={styles.topWaybillNumber}>
          <Text>{`INV-${sale.order_number}`}</Text>
        </View>
        {/* Header Section */}
        {sale.items[0].item_purchased.toLowerCase().startsWith("olam") ? (
          <View
            style={{
              border: 1,
              display: "flex",
              flexDirection: "row",
              height: 150,
              marginBottom: 15,
            }}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image src={ABJ_LOGO} style={styles.logo} />
              <Text
                style={{
                  fontSize: 18, // Larger size for heading
                  fontWeight: "bold", // Bold for emphasis
                  textTransform: "uppercase", // Uppercase for consistent styling
                  textAlign: "right",
                  lineHeight: 0,
                }}
              >
                Invoice: {`INV-${sale.order_number}`}
              </Text>
            </View>
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
        ) : (
          <View
            style={{
              border: 1,
              display: "flex",
              flexDirection: "row",
              height: 120,
              marginBottom: 15,
            }}
          >
            <View
              style={{
                width: "30%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 15,
                backgroundColor: "#dddddd",
              }}
            >
              <Image src={LOGO} style={styles.logo} />
            </View>
            <View
              style={{
                width: "70%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 48, // Larger size for heading
                  fontWeight: "bold", // Bold for emphasis
                  textTransform: "uppercase", // Uppercase for consistent styling
                  textAlign: "right",
                  lineHeight: 0,
                }}
              >
                Invoice
              </Text>
            </View>
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
        )}

        <View style={{ borderColor: "#222222", borderWidth: 1, padding: 20 }}>
          {/* Vertical Grouped Table */}
          <Text>Item Details</Text>
          <View style={styles.section1}>
            <View style={styles.horizontalTable}>
              <View style={styles.horizontalRow}>
                <Text style={styles.label}>SN</Text>
                <Text style={styles.label}>Item:</Text>
                <Text style={styles.label}>Quantity:</Text>
                <Text style={styles.label}>Price:</Text>
                <Text style={styles.label}>Total:</Text>
              </View>
              {sale.items.map((item, i) => (
                <View key={i} style={styles.horizontalRow}>
                  <Text style={styles.value}>{i + 1}</Text>
                  <Text style={styles.value}>{item.item_purchased}</Text>
                  <Text style={styles.value}>
                    {formatNumber(item.quantity)}
                  </Text>
                  <Text style={styles.value}>N{formatNumber(item.price)}</Text>
                  <Text style={styles.value}>
                    N{formatNumber(item.quantity * item.price)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <Text>Summary</Text>
          <View style={styles.section1}>
            <View style={styles.verticalTable}>
              <View style={styles.verticalRow}>
                <Text style={styles.label}>Total Price:</Text>
                <Text style={styles.label}>
                  N{sale.amount ? formatNumber(sale.amount) : "NA"}
                </Text>
              </View>
              <View style={styles.verticalRow}>
                <Text style={styles.label}>Total Paid:</Text>
                <Text style={styles.label}>N{formatNumber(sale.paid)}</Text>
              </View>
              <View style={styles.verticalRow}>
                <Text style={styles.label}>Total Balance (including VAT):</Text>
                <Text style={styles.label}>
                  N
                  {sale.payment_balance
                    ? formatNumber(sale.payment_balance)
                    : "NA"}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            padding: 10,
            border: 1,
            display: "flex",
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <View style={{ width: "50%" }}>
            <Text>Please make payment to:</Text>
            <Text>Bank Name: {account.bank_name}</Text>
            <Text>Account Name: {account.account_name}</Text>
            <Text>Account Number: {account.account_number} </Text>
          </View>
          <View style={{ width: "50%" }}>
            <Text>Billed To:</Text>
            <Text>Customer Name: {sale.customer_name}</Text>
            <Text>Customer Phone: {sale.customer_phone}</Text>
          </View>
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

export default InvoiceDoc;
