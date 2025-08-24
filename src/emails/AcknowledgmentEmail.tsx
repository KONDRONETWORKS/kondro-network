// src/emails/AcknowledgmentEmail.tsx
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

interface AcknowledgmentEmailProps {
  name: string;
  submittedAt?: Date;
}

export const AcknowledgmentEmail = ({
  name = 'John Doe',
  submittedAt = new Date()
}: AcknowledgmentEmailProps) => {
  const previewText = `Merci ${name}, nous avons bien reçu votre message !`;
  
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
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>ITExperts4Africa</Heading>
            <Text style={headerSubtitle}>Accusé de réception</Text>
          </Section>

          {/* Contenu principal */}
          <Section style={content}>
            <Heading style={h1}>Bonjour {name} ! 👋</Heading>
            
            <Text style={text}>
              Nous vous remercions pour votre message envoyé le{' '}
              <strong>{formattedDate}</strong>.
            </Text>

            <Text style={text}>
              Votre demande a été transmise à notre équipe et nous vous répondrons dans les plus brefs délais, 
              généralement sous <strong>24 heures ouvrées</strong>.
            </Text>

            {/* Section en cours de traitement */}
            <Section style={statusSection}>
              <Heading style={h2}>📋 Statut de votre demande</Heading>
              <Section style={statusBox}>
                <Text style={statusText}>
                  ✅ <strong>Reçue</strong> - Votre message a été enregistré<br />
                  🔄 <strong>En cours</strong> - Notre équipe examine votre demande<br />
                  ⏳ <strong>Réponse</strong> - Nous vous recontacterons bientôt
                </Text>
              </Section>
            </Section>

            {/* Informations de contact en urgence */}
            <Section style={urgentSection}>
              <Heading style={h2}>🚨 Besoin urgent ?</Heading>
              <Text style={text}>
                Si votre demande est urgente, n'hésitez pas à nous contacter directement :
              </Text>
              <Section style={contactBox}>
                <Text style={contactText}>
                  📞 <strong>Téléphone :</strong> +225 01 23 45 67 89<br />
                  📧 <strong>Email :</strong> info@kondronetworks.com<br />
                  ⏰ <strong>Horaires :</strong> Lun-Ven 8h30-18h00
                </Text>
              </Section>
            </Section>

            <Hr style={hr} />

            {/* Nos services */}
            <Section style={servicesSection}>
              <Heading style={h2}>💼 Nos domaines d'expertise</Heading>
              <Section style={servicesList}>
                <Text style={serviceItem}>🌐 <strong>Développement Web & Mobile</strong></Text>
                <Text style={serviceItem}>☁️ <strong>Solutions Cloud & Infrastructure</strong></Text>
                <Text style={serviceItem}>🔒 <strong>Cybersécurité</strong></Text>
                <Text style={serviceItem}>📊 <strong>Transformation Digitale</strong></Text>
                <Text style={serviceItem}>🛠️ <strong>Maintenance & Support</strong></Text>
              </Section>
            </Section>

            {/* Call to action */}
            <Section style={buttonContainer}>
              <Button href="https://itexperts4africa.com/services" style={button}>
                Découvrir nos services
              </Button>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Merci de faire confiance à{' '}
              <Link href="https://itexperts4africa.com" style={footerLink}>
                ITExperts4Africa
              </Link>
            </Text>
            <Text style={footerContact}>
              📍 Abidjan, Cocody, II Plateaux - Côte d'Ivoire
            </Text>
            <Text style={footerSocial}>
              Suivez-nous sur nos réseaux sociaux pour rester informé de nos actualités !
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default AcknowledgmentEmail;

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
  backgroundColor: '#1e40af',
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
  color: '#5dbbe9',
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

const statusSection = {
  margin: '30px 0',
};

const statusBox = {
  backgroundColor: '#ecfdf5',
  border: '1px solid #d1fae5',
  borderLeft: '4px solid #10b981',
  borderRadius: '6px',
  padding: '20px',
};

const statusText = {
  color: '#065f46',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0',
};

const urgentSection = {
  margin: '30px 0',
};

const contactBox = {
  backgroundColor: '#fef2f2',
  border: '1px solid #fecaca',
  borderLeft: '4px solid #ef4444',
  borderRadius: '6px',
  padding: '20px',
};

const contactText = {
  color: '#991b1b',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0',
};

const servicesSection = {
  margin: '30px 0',
};

const servicesList = {
  backgroundColor: '#f8fafc',
  borderRadius: '6px',
  padding: '20px',
};

const serviceItem = {
  color: '#1f2937',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 8px 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const button = {
  backgroundColor: '#5dbbe9',
  borderRadius: '6px',
  color: '#1e40af',
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
  margin: '0 0 10px 0',
};

const footerSocial = {
  color: '#6b7280',
  fontSize: '12px',
  margin: '0',
};