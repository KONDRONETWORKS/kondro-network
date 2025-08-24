// src/emails/ContactEmail.tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
  submittedAt?: Date;
}

export const ContactEmail = ({
  name = 'John Doe',
  email = 'john.doe@example.com',
  message = 'Voici mon message de test...',
  submittedAt = new Date()
}: ContactEmailProps) => {
  const previewText = `Nouveau message de contact de ${name}`;
  
  // Formatage de date sécurisé
  const formattedDate = React.useMemo(() => {
    try {
      return submittedAt.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return new Date().toLocaleDateString('fr-FR');
    }
  }, [submittedAt]);

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header avec logo */}
          <Section style={header}>
            <Heading style={headerTitle}>ITExperts4Africa</Heading>
            <Text style={headerSubtitle}>Nouveau message de contact</Text>
          </Section>

          {/* Contenu principal */}
          <Section style={content}>
            <Heading style={h1}>Nouveau message reçu</Heading>
            
            <Text style={text}>
              Vous avez reçu un nouveau message depuis le formulaire de contact du site web.
            </Text>

            {/* Informations du contact */}
            <Section style={contactInfo}>
              <Heading style={h2}>Informations du contact</Heading>
              
              <Section style={infoRow}>
                <Text style={infoLabel}>Nom :</Text>
                <Text style={infoValue}>{name}</Text>
              </Section>
              
              <Section style={infoRow}>
                <Text style={infoLabel}>Email :</Text>
                <Link href={`mailto:${email}`} style={emailLink}>
                  {email}
                </Link>
              </Section>
              
              <Section style={infoRow}>
                <Text style={infoLabel}>Date :</Text>
                <Text style={infoValue}>
                  {formattedDate}
                </Text>
              </Section>
            </Section>

            <Hr style={hr} />

            {/* Message */}
            <Section style={messageSection}>
              <Heading style={h2}>Message</Heading>
              <Section style={messageBorder}>
                <Text style={messageText}>
                  {message.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < message.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </Text>
              </Section>
            </Section>

            <Hr style={hr} />

            {/* Actions */}
            <Section style={buttonContainer}>
              <Button href={`mailto:${email}?subject=Re: Votre message sur ITExperts4Africa`} style={button}>
                Répondre directement
              </Button>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Ce message a été envoyé depuis le formulaire de contact de{' '}
              <Link href="https://itexperts4africa.com" style={footerLink}>
                ITExperts4Africa
              </Link>
            </Text>
            <Text style={footerContact}>
              📞 +225 01 23 45 67 89 | 📧 info@kondronetworks.com
            </Text>
            <Text style={footerAddress}>
              📍 Abidjan, Cocody, II Plateaux - Côte d'Ivoire
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactEmail;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  borderRadius: '8px',
  margin: '40px auto',
  padding: '0',
  width: '600px',
  maxWidth: '100%',
};

const header = {
  backgroundColor: '#1e40af', // Bleu ITExperts4Africa
  padding: '30px 40px',
  textAlign: 'center' as const,
  borderRadius: '8px 8px 0 0',
};

const headerTitle = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 10px 0',
};

const headerSubtitle = {
  color: '#5dbbe9', // Jaune ITExperts4Africa
  fontSize: '16px',
  fontWeight: '500',
  margin: '0',
};

const content = {
  padding: '40px',
};

const h1 = {
  color: '#1e40af',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 20px 0',
};

const h2 = {
  color: '#1e40af',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 15px 0',
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 20px 0',
};

const contactInfo = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '6px',
  padding: '20px',
  margin: '20px 0',
};

const infoRow = {
  display: 'flex',
  alignItems: 'center',
  margin: '0 0 10px 0',
};

const infoLabel = {
  color: '#6b7280',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 15px 0 0',
  minWidth: '60px',
};

const infoValue = {
  color: '#1f2937',
  fontSize: '14px',
  margin: '0',
};

const emailLink = {
  color: '#1e40af',
  fontSize: '14px',
  textDecoration: 'underline',
};

const messageSection = {
  margin: '30px 0',
};

const messageBorder = {
  border: '2px solid #5dbbe9',
  borderLeft: '4px solid #5dbbe9',
  borderRadius: '6px',
  padding: '20px',
  backgroundColor: '#fffbeb',
};

const messageText = {
  color: '#1f2937',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const button = {
  backgroundColor: '#1e40af',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  margin: '0',
};

const hr = {
  borderColor: '#e2e8f0',
  margin: '30px 0',
};

const footer = {
  backgroundColor: '#f8fafc',
  padding: '20px 40px',
  textAlign: 'center' as const,
  borderRadius: '0 0 8px 8px',
  borderTop: '1px solid #e2e8f0',
};

const footerText = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0 0 10px 0',
};

const footerLink = {
  color: '#1e40af',
  textDecoration: 'underline',
};

const footerContact = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0 0 5px 0',
};

const footerAddress = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0',
};