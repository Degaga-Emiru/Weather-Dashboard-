const ErrorMessage = ({ message, language }) => {
    if (!message) return null;
  
    const translatedMessage = 
      message.includes('404') ? 
        (language === 'es' ? 'Ciudad no encontrada. Por favor, intente con otro nombre.' :
         language === 'fr' ? 'Ville non trouvée. Veuillez essayer un autre nom.' :
         language === 'de' ? 'Stadt nicht gefunden. Bitte versuchen Sie einen anderen Namen.' :
         'City not found. Please try a different name.') :
      message.includes('Network Error') ?
        (language === 'es' ? 'Error de red. Por favor, verifique su conexión a Internet.' :
         language === 'fr' ? 'Erreur réseau. Veuillez vérifier votre connexion Internet.' :
         language === 'de' ? 'Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung.' :
         'Network error. Please check your internet connection.') :
      message;
  
    return (
      <div className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-700 dark:text-red-100 p-4 mb-4 rounded">
        <p>{translatedMessage}</p>
      </div>
    );
  };
  
  export default ErrorMessage;