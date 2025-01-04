import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { DailyProductionSummary, StocksWithDetails } from "../../types/db"; // Ensure this import is correct based on your project structure
import { COMPANY } from "../../constants/COMPANY";
import { LOGO } from "../../assets/images";
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

interface DailyProductionDocProps {
  morningShift: DailyProductionSummary[];
  nightShift: DailyProductionSummary[];
  totalQuantityProduced: number;
  stockRecord: StocksWithDetails[];
  date: string;
}

const DailyProductionDoc: React.FC<DailyProductionDocProps> = ({
  morningShift,
  nightShift,
  stockRecord,
  totalQuantityProduced,
  date,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark Logo */}
        <Image src={LOGO} style={styles.watermark} />
        <View style={styles.topWaybillNumber}>
          <Text>{date}</Text>
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
            {COMPANY.name} Daily Production Report
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
            <View style={styles.verticalTable}>
              <View style={styles.verticalRow}>
                <Text style={styles.label}>Total Production for the day:</Text>
                <Text style={styles.label}>
                  {formatNumber(totalQuantityProduced * 500)} pieces
                </Text>
                <Text style={styles.label}>
                  {formatNumber(totalQuantityProduced)} bales
                </Text>
              </View>
            </View>
          </View>
          {/* Vertical Grouped Table */}
          <Text
            style={{
              fontSize: 12, // Larger size for heading
              fontWeight: "bold", // Bold for emphasis
              textTransform: "uppercase", // Uppercase for consistent styling
            }}
          >
            Morning Shift
          </Text>
          <View style={styles.section1}>
            <View style={styles.verticalTable}>
              <View style={styles.verticalRow}>
                <Text style={styles.label}>SN:</Text>
                <Text style={styles.label}>Product:</Text>
                <Text style={styles.label}>quantity:</Text>
                <Text style={styles.label}>Converted Quantity:</Text>
              </View>
              {morningShift.map((shift, index) => (
                <View key={index} style={styles.verticalRow}>
                  <Text style={styles.label}>{index + 1}</Text>
                  <Text style={styles.label}>{shift.product_info.name}</Text>
                  <Text style={styles.label}>
                    {formatNumber(shift.total_quantity_produced)}{" "}
                    {shift.product_info.unit}
                  </Text>
                  <Text style={styles.label}>
                    {formatNumber(shift.total_quantity_produced / 500)}
                    bales
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <Text
            style={{
              fontSize: 12, // Larger size for heading
              fontWeight: "bold", // Bold for emphasis
              textTransform: "uppercase", // Uppercase for consistent styling
            }}
          >
            Night Shift
          </Text>
          <View style={styles.section1}>
            <View style={styles.verticalTable}>
              <View style={styles.verticalRow}>
                <Text style={styles.label}>SN:</Text>
                <Text style={styles.label}>Product:</Text>
                <Text style={styles.label}>quantity:</Text>
                <Text style={styles.label}>Converted Quantity:</Text>
              </View>
              {nightShift.map((shift, index) => (
                <View key={index} style={styles.verticalRow}>
                  <Text style={styles.label}>{index + 1}</Text>
                  <Text style={styles.label}>{shift.product_info.name}</Text>
                  <Text style={styles.label}>
                    {formatNumber(shift.total_quantity_produced)}{" "}
                    {shift.product_info.unit}
                  </Text>
                  <Text style={styles.label}>
                    {formatNumber(shift.total_quantity_produced / 500)}
                    bales
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <Text
            style={{
              fontSize: 12, // Larger size for heading
              fontWeight: "bold", // Bold for emphasis
              textTransform: "uppercase", // Uppercase for consistent styling
            }}
          >
            Current Stock Record
          </Text>
          <View style={styles.section1}>
            <View style={styles.verticalTable}>
              <View style={styles.verticalRow}>
                <Text style={styles.label}>SN:</Text>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.label}>quantity:</Text>
                <Text style={styles.label}>Warehouse:</Text>
              </View>
              {stockRecord.map((record, index) => (
                <View key={index} style={styles.verticalRow}>
                  <Text style={styles.label}>{index + 1}</Text>
                  <Text style={styles.label}>{record.item}</Text>
                  <Text style={styles.label}>
                    {record.balance ? formatNumber(record.balance) : "NA"}{" "}
                    {record.item_info.unit}
                  </Text>
                  <Text style={styles.label}>{record.warehouse}</Text>
                </View>
              ))}
            </View>
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

export default DailyProductionDoc;
