import * as React from 'react';

interface ContactTemplateProps{
    firstName: string;
    email: string;
    message: string;

}

export const ContactEmail: React.FC<Readonly<ContactTemplateProps>> = ({
    firstName,
    email,
    message,

}) =>(
    <div>
        <h1>Un visiteur vient d'envoyer un formulaire :</h1>
        <h2 className='font-bold'>Details du message:</h2>
        <p>Email: {email}</p>
        <p>Nom d'utilisateur: {firstName}</p>
        <p>Message: {message}</p>
    </div>
);