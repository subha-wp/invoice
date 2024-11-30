'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InvoicePDF } from '@/components/invoice-pdf'
import { MobileNav } from '@/components/mobile-nav'

export default function InvoiceDetail() {
  const { id } = useParams()
  const [invoice, setInvoice] = useState<any>(null)

  useEffect(() => {
    const fetchInvoice = async () => {
      const response = await fetch(`/api/invoices/${id}`)
      const data = await response.json()
      setInvoice(data)
    }
    fetchInvoice()
  }, [id])

  if (!invoice) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 pb-20">
      <h1 className="text-2xl font-bold my-4">Invoice Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>Invoice #{invoice.number}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Client: {invoice.clientName}</p>
          <p>Email: {invoice.clientEmail}</p>
          <p>Due Date: p>
          <p>Status: {invoice.status}</p>
          <p>Total: ${invoice.total.toFixed(2)}</p>
        </CardContent>
      </Card>
      <div className="mt-4">
        <PDFDownloadLink
          document={<InvoicePDF invoice={invoice} />}
          fileName={`invoice-${invoice.number}.pdf`}
        >
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : (
              <Button>Download PDF</Button>
            )
          }
        </PDFDownloadLink>
      </div>
      <MobileNav />
    </div>
  )
}

