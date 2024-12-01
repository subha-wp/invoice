/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { Invoice } from "@/types";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
      fontWeight: 300,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
      fontWeight: 500,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
    fontFamily: "Roboto",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottom: "1 solid #e0e0e0",
    paddingBottom: 10,
  },
  leftHeader: {
    flexDirection: "column",
  },
  rightHeader: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  logo: {
    width: 90,
    height: 90,
    objectFit: "contain",
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 5,
    color: "#1a237e",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 5,
    color: "#3f51b5",
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
  },
  clientInfo: {
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: 20,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#f5f5f5",
    padding: 5,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCell: {
    fontSize: 10,
  },
  total: {
    marginTop: 20,
    textAlign: "right",
    fontSize: 14,
    fontWeight: 700,
    color: "#1a237e",
  },
  paymentDetails: {
    fontSize: 10,
    marginBottom: 3,
    borderBottom: "1 solid #e0e0e0",
  },
  paymentInfo: {
    marginTop: 30,
    borderTop: "1 solid #e0e0e0",
    paddingTop: 10,
  },
  bankDetails: {
    marginTop: 10,
    border: "1 solid #e0e0e0",
    padding: 10,
    borderRadius: 4,
    alignSelf: "flex-start",
    maxWidth: "60%",
  },
  signature: {
    marginTop: 50,
    borderTop: "1 solid #000000",
    width: 200,
    textAlign: "center",
    fontSize: 10,
    alignSelf: "flex-end",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: "#1a237e",
    marginBottom: 5,
  },
  invoiceNumber: {
    fontSize: 16,
    fontWeight: 500,
    color: "#3f51b5",
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 5,
    color: "#1a237e",
  },
  tableHeader: {
    backgroundColor: "#f5f5f5",
  },
  subtotalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  subtotalText: {
    fontSize: 12,
    fontWeight: 500,
    marginRight: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: 5,
  },
  totalText: {
    fontSize: 14,
    fontWeight: 700,
    marginRight: 10,
  },
});

export function InvoicePDF({ invoice }: { invoice: Invoice }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            {invoice.business?.logoUrl && (
              <Image style={styles.logo} src={invoice.business.logoUrl} />
            )}
            <Text style={styles.text}>{invoice.business?.name}</Text>
            <Text style={styles.text}>{invoice.business?.address}</Text>
            <Text style={styles.text}>{invoice.business?.email}</Text>
            <Text style={styles.text}>{invoice.business?.phone}</Text>
          </View>
          <View style={styles.rightHeader}>
            <Text style={styles.cardTitle}>Invoice</Text>
            <Text style={styles.invoiceNumber}>#{invoice.number}</Text>
            <Text style={styles.text}>
              Date: {new Date().toLocaleDateString()}
            </Text>
            <Text style={styles.text}>
              Due Date: {new Date(invoice.dueDate).toLocaleDateString()}
            </Text>
          </View>
        </View>

        <View style={styles.clientInfo}>
          <Text style={styles.sectionTitle}>Bill To</Text>
          <Text style={[styles.text, { fontWeight: 500 }]}>
            {invoice.clientName}
          </Text>
          <Text style={styles.text}>{invoice.clientEmail}</Text>
          {invoice.clientAddress && (
            <Text style={styles.text}>{invoice.clientAddress}</Text>
          )}
          {invoice.additionalAddress && (
            <Text style={styles.text}>{invoice.additionalAddress}</Text>
          )}
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.tableColHeader}>
              <Text style={[styles.tableCell, { fontWeight: 700 }]}>Item</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={[styles.tableCell, { fontWeight: 700 }]}>
                Quantity
              </Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={[styles.tableCell, { fontWeight: 700 }]}>Price</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={[styles.tableCell, { fontWeight: 700 }]}>Total</Text>
            </View>
          </View>

          {invoice.items?.map((item) => (
            <View style={styles.tableRow} key={item.id}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.product.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.quantity}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {"\u20B9"}
                  {item.product.price.toFixed(2)}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {"\u20B9"}
                  {(item.quantity * item.product.price).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.subtotalRow}>
          <Text style={styles.subtotalText}>Subtotal:</Text>
          <Text style={styles.subtotalText}>
            {"\u20B9"}
            {invoice.total.toFixed(2)}
          </Text>
        </View>
        <View style={styles.subtotalRow}>
          <Text style={styles.subtotalText}>Tax:</Text>
          <Text style={styles.subtotalText}>{"\u20B9"}0.00</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalText}>
            {"\u20B9"}
            {invoice.total.toFixed(2)}
          </Text>
        </View>

        {invoice.business?.bankName && (
          <View style={styles.paymentInfo}>
            <Text style={styles.sectionTitle}>Payment Details</Text>
            <View style={styles.bankDetails}>
              <Text style={styles.text}>
                Bank Name: {invoice.business.bankName}
              </Text>
              <Text style={styles.text}>
                Account No: {invoice.business.accountNo}
              </Text>
              <Text style={styles.text}>
                IFSC Code: {invoice.business.ifscCode}
              </Text>
              {invoice.business.upiId && (
                <Text style={styles.text}>
                  UPI ID: {invoice.business.upiId}
                </Text>
              )}
            </View>
          </View>
        )}

        <View style={styles.signature}>
          <Text>Authorized Signature</Text>
        </View>
      </Page>
    </Document>
  );
}
