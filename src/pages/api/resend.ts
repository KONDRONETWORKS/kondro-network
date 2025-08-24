// src/pages/api/contact/resend.js
import { Resend } from 'resend';


const resend = new Resend(import.meta.env.RESEND_API_KEY);

resend.domains.create({name:'itexperts4africa.com',customReturnPath:'outbound'});

export async function POST({ request }:any) {
  try {
    // Récupération des données du formulaire
    const { name, email, message } = await request.json();

    // Validation basique
    if (!name || !email || !message) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Tous les champs sont requis'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Adresse email non valide'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Corps de l'email formaté
    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color:#5dbbe9; border-bottom: 2px solid #5dbbe9; padding-bottom: 10px;">
          NOUVEAU MESSAGE DE CONTACT - ITExperts4Africa
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <p><strong>De:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #5dbbe9;">
          <h3 style="color: #1e40af; margin-top: 0;">MESSAGE:</h3>
          <p style="line-height: 1.6; color: #374151;">${message.replace(/\n/g, '<br>')}</p>
        </div>
        
        <div style="background-color: #e5e7eb; padding: 15px; margin-top: 20px; border-radius: 8px;">
          <p style="margin: 0; font-size: 14px; color: #6b7280;">
            Ce message a été envoyé depuis le formulaire de contact du site ITExperts4Africa.<br>
            Veuillez répondre directement à l'adresse: <strong>${email}</strong>
          </p>
        </div>
      </div>
    `;

    // Envoi de l'email via Resend
    const { data, error } = await resend.emails.send({
      from: 'ITExperts4Africa <onboarding@resend.dev>', // Remplacez par votre domaine vérifié
      to: ['info@kondronetworks.com'], // Remplacez par votre vraie adresse
      subject: `[ITExperts4Africa] Nouveau message de contact de ${name}`,
      html: emailBody,
    });

    if (error) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer.'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }


    return new Response(JSON.stringify({
      success: true,
      message: 'Votre message a été envoyé avec succès ! Nous vous recontacterons bientôt.',
      data: data
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Erreur interne du serveur. Veuillez réessayer plus tard.'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}