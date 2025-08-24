// src/types/email.ts

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
  submittedAt?: Date;
}

export interface AcknowledgmentTemplateProps {
  name: string;
  submittedAt?: Date;
}

export interface EmailResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    contactEmailId?: string;
    acknowledgmentEmailId?: string;
  };
}