import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { Booking, User } from '@/lib/mockData';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { format } from 'date-fns';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333'
  },
  companyInfo: {
    fontSize: 10,
    color: '#666666',
    textAlign: 'right'
  },
  section: {
    margin: 10,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5
  },
  label: {
    width: 100,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666666'
  },
  value: {
    fontSize: 10,
    color: '#000000'
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 20,
    marginBottom: 20
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row"
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
    padding: 5
  },
  total: {
    marginTop: 10,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 8,
    textAlign: 'center',
    color: '#999999',
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
    paddingTop: 10
  }
});

interface InvoiceProps {
  booking: Booking;
  user: User;
  invoiceNumber: string;
}

// PDF Document Component
const InvoiceDocument = ({ booking, user, invoiceNumber }: InvoiceProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>INVOICE</Text>
          <Text style={{ fontSize: 10, marginTop: 5 }}>#{invoiceNumber}</Text>
        </View>
        <View style={styles.companyInfo}>
          <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Sristi BrainArk</Text>
          <Text>123, Gandhi Puram</Text>
          <Text>Coimbatore, TN, India</Text>
          <Text>GSTIN: 33ABCDE1234F1Z5</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Bill To:</Text>
          <Text style={styles.value}>{user.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Student:</Text>
          <Text style={styles.value}>{user.profile?.studentName || "N/A"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{format(new Date(), 'PPP')}</Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCol, width: '50%', backgroundColor: '#f0f0f0' }}>
            <Text style={styles.tableCell}>Description</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '20%', backgroundColor: '#f0f0f0' }}>
            <Text style={styles.tableCell}>Type</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '30%', backgroundColor: '#f0f0f0' }}>
            <Text style={styles.tableCell}>Amount (INR)</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCol, width: '50%' }}>
            <Text style={styles.tableCell}>Genetic Brain Profiling Session</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '20%' }}>
            <Text style={styles.tableCell}>{booking.reportType || "Child"}</Text>
          </View>
          <View style={{ ...styles.tableCol, width: '30%' }}>
            <Text style={styles.tableCell}>₹{booking.amount}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.total}>Total Paid: ₹{booking.amount}</Text>
        <Text style={{ fontSize: 10, textAlign: 'right', color: '#666', marginTop: 5 }}>
          (Inclusive of 18% GST)
        </Text>
      </View>

      <View style={styles.footer}>
        <Text>Thank you for choosing Sristi BrainArk. This is a computer-generated invoice.</Text>
        <Text>For any queries, contact support@sristibrainark.com</Text>
      </View>
    </Page>
  </Document>
);

// Download Button Component
export const DownloadInvoiceButton = ({ booking, user }: { booking: Booking, user: User }) => {
  const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
  
  return (
    <PDFDownloadLink
      document={<InvoiceDocument booking={booking} user={user} invoiceNumber={invoiceNumber} />}
      fileName={`invoice-${invoiceNumber}.pdf`}
    >
      {/* @ts-ignore - render props types are tricky with this library */}
      {({ blob, url, loading, error }) => (
        <Button variant="outline" disabled={loading} className="gap-2 w-full sm:w-auto">
          <Download className="w-4 h-4" />
          {loading ? 'Generating Invoice...' : 'Download Invoice'}
        </Button>
      )}
    </PDFDownloadLink>
  );
};
