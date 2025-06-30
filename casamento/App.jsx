import React, { useState } from 'react';

const App = () => {
  const pixKey = '00020126580014BR.GOV.BCB.PIX0136abcd1234efgh5678ijkl9012mnop5204000053039865407200.005802BR5920Leonardo e Poliana6009SAO PAULO61080540900062130515LUADEMLEONARDOPOLI6304ABCD'; // Substitua pelo Pix Copia e Cola real
  const whatsappNumber = '+5511999999999'; // Número da cerimonialista

  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const amountToDisplay = selectedAmount || customAmount;

  return (
    <div className="font-sans text-gray-800 scroll-smooth">
      {/* Header */}
      <header className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://source.unsplash.com/random/1080x1920?wedding)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-6xl text-white font-light tracking-widest mb-4 animate-fade-in">Leonardo & Poliana</h1>
          <p className="text-xl md:text-2xl text-white mb-6 animate-fade-in-delay">12 • Outubro • 2025</p>
          <a href="#mensagem" className="mt-4 inline-block bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full text-white border border-white hover:bg-opacity-40 transition">Saiba Mais ↓</a>
        </div>
      </header>

      {/* Mensagem de boas-vindas */}
      <section id="mensagem" className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-semibold mb-4">Bem-vindos!</h2>
        <p className="leading-relaxed max-w-2xl mx-auto">Estamos muito felizes em compartilhar este momento tão especial com você. Agradecemos de coração por fazer parte da nossa história e celebrar conosco o nosso amor.</p>
      </section>

      {/* Nossa História */}
      <section id="historia" className="py-16 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center mb-4">Nossa História</h2>
        <p className="leading-relaxed max-w-2xl mx-auto text-center">Tudo começou em 2015, quando nossos caminhos se cruzaram em uma festa de amigos em comum. Desde então, cada aventura e desafio nos aproximou ainda mais, culminando neste dia tão especial em que celebraremos nossa união.</p>
      </section>

      {/* Informações do Evento */}
      <section id="evento" className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-semibold text-center mb-8">Informações do Evento</h2>
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          <div>
            <h3 className="text-xl font-medium">Local</h3>
            <p>Espaço Primavera, Av. das Flores, 123 - São Paulo/SP</p>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Abrir no Google Maps</a>
          </div>
          <div>
            <h3 className="text-xl font-medium">Horário</h3>
            <p>Cerimônia às 16:00 • Recepção às 18:00</p>
          </div>
          <div>
            <h3 className="text-xl font-medium">Dress Code</h3>
            <p>Traje passeio completo (cores neutras sugeridas)</p>
          </div>
        </div>
      </section>

      {/* Presente */}
      <section id="presente" className="py-16 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center mb-8">Nosso Presente</h2>
        <p className="text-center max-w-2xl mx-auto mb-6">Sua presença já é o melhor presente! Mas, se desejar contribuir com a nossa lua de mel, sugerimos as cotas abaixo. Qualquer valor é muito bem-vindo. ❤️</p>

        {/* Valores sugeridos */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          {[200, 400, 600].map((value) => (
            <button
              key={value}
              onClick={() => setSelectedAmount(value)}
              className={`flex-1 px-6 py-4 rounded-lg border-2 transition focus:outline-none ${selectedAmount === value ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 hover:border-green-500'}`}
            >
              R$ {value}
            </button>
          ))}
        </div>

        {/* Outro valor */}
        <div className="max-w-sm mx-auto mb-8">
          <input
            type="number"
            min="1"
            placeholder="Outro valor"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount(null);
            }}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        {/* Exibir Pix */}
        {(amountToDisplay || amountToDisplay === 0) && (
          <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-medium mb-4">Cota de R$ {amountToDisplay}</h3>
            <p className="mb-4">Use o código PIX abaixo (Copia e Cola):</p>
            <div className="bg-gray-100 p-4 rounded-md break-all text-sm select-all mb-4">
              {pixKey}
            </div>
            <button onClick={handleCopyPix} className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition mb-2">{copied ? 'Copiado!' : 'Copiar código'}</button>
            <p className="text-sm mt-4">Após a transferência, envie o comprovante para nosso WhatsApp: <a href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{whatsappNumber}</a></p>
          </div>
        )}
      </section>

      {/* Rodapé */}
      <footer className="py-8 text-center text-sm bg-gray-800 text-gray-200 px-4">
        <p className="mb-2">Agradecemos pelo carinho e por fazer parte desse momento especial.</p>
        <p>Dúvidas? Entre em contato com nossa cerimonialista: <a href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`} className="underline">{whatsappNumber}</a></p>
      </footer>
    </div>
  );
};

export default App; 