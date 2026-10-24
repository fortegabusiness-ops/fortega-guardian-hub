import React from 'react'
import { Body, Container, Head, Heading, Html, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  email?: string
  phone?: string
  service?: string
  message?: string
}

const ContactNotification = ({ name, email, phone, service, message }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New contact request{name ? ` from ${name}` : ''}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New Contact Request</Heading>
        <Text style={row}><strong>Name:</strong> {name || '—'}</Text>
        <Text style={row}><strong>Email:</strong> {email || '—'}</Text>
        <Text style={row}><strong>Phone:</strong> {phone || '—'}</Text>
        <Text style={row}><strong>Service:</strong> {service || '—'}</Text>
        <Text style={row}><strong>Message:</strong></Text>
        <Text style={messageStyle}>{message || '—'}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactNotification,
  subject: (data: Record<string, any>) => `New contact request from ${data?.name || 'website visitor'}`,
  displayName: 'Contact form notification',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '416-555-0100',
    service: 'CCTV',
    message: 'We would like a quote for camera coverage at our storefront.',
  },
  to: 'info@fortega.ca',
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '20px 25px' }
const heading = { fontSize: '20px', margin: '0 0 12px' }
const row = { fontSize: '14px', lineHeight: '1.5', margin: '0 0 6px' }
const messageStyle = { fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-wrap' as const }
