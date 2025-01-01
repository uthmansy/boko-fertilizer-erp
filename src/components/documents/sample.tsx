import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 5,
    textAlign: "center",
  },
  tableCellHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
  footer: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 10,
    color: "#888888",
  },
});

const Sample: React.FC = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Waybill</Text>
      </View>

      <View style={styles.section}>
        <Text style={{ fontWeight: "bold" }}>Sender:</Text>
        <Text>Company Name</Text>
        <Text>1234 Street Name</Text>
        <Text>City, State, ZIP</Text>
        <Text>Phone: (123) 456-7890</Text>
      </View>

      <View style={styles.section}>
        <Text style={{ fontWeight: "bold" }}>Receiver:</Text>
        <Text>Receiver Name</Text>
        <Text>5678 Another Street</Text>
        <Text>City, State, ZIP</Text>
        <Text>Phone: (987) 654-3210</Text>
      </View>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableCellHeader]}>
          <View style={styles.tableCol}>
            <Text>Item</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>Quantity</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>Weight (kg)</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>Price</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text>Item 1</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>10</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>5</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>$100</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text>Item 2</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>15</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>7</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>$150</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text>Item 3</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>5</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>3</Text>
          </View>
          <View style={styles.tableCol}>
            <Text>$50</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={{ fontWeight: "bold" }}>Total Weight:</Text>
        <Text>15 kg</Text>
      </View>

      <View style={styles.section}>
        <Text style={{ fontWeight: "bold" }}>Total Price:</Text>
        <Text>$300</Text>
      </View>

      <View style={styles.footer}>
        <Text>Thank you for your business!</Text>
      </View>
    </Page>
  </Document>
);

export default Sample;
