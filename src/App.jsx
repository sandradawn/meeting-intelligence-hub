import { useState } from 'react';
import { Upload, FileText, CheckCircle, Clock, Server } from 'lucide-react';
import './App.css';
import FileUpload from './components/FileUpload';
import ResultsDashboard from './components/ResultsDashboard';

function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);

  const handleFileUpload = (fileContent) => {
    setIsProcessing(true);
    setResults(null);
    
    // Simulate API call for Mock feature
    setTimeout(() => {
      setResults({
        decisions: [
          "Migrate database to PostgreSQL by end of Q3.",
          "Hire 2 additional frontend engineers.",
          "Adopt Dark Mode as default for the new dashboard."
        ],
        actionItems: [
          { who: "Sarah", what: "Draft the job descriptions for frontend engineers", when: "Next Tuesday" },
          { who: "Mike", what: "Create a database migration schema plan", when: "End of the week" },
          { who: "Alex", what: "Setup Vite project with Tailwind/Vanilla CSS", when: "EOD tomorrow" }
        ]
      });
      setIsProcessing(false);
    }, 2500);
  };

  const handleReset = () => {
    setResults(null);
    setIsProcessing(false);
  };

  return (
    <div className="app-container">
      <header className="app-header glass-panel">
        <div className="logo-container">
          <Server className="brand-icon" size={28} />
          <h1>Meeting <span className="highlight">Intelligence</span> Hub</h1>
        </div>
        <nav>
          <button className="nav-btn active">Extractor</button>
          <button className="nav-btn">History</button>
        </nav>
      </header>
      
      <main className="app-main">
        <section className="hero-section">
          <h2>Stop Re-reading. <br/><span className="highlight">Start Executing.</span></h2>
          <p className="subtitle">Upload your meeting transcript to instantly extract decisions and action items.</p>
        </section>

        {!results && (
          <FileUpload onFileUpload={handleFileUpload} isProcessing={isProcessing} />
        )}

        {results && (
          <ResultsDashboard results={results} onReset={handleReset} />
        )}
      </main>
      
      <footer className="app-footer">
        <p>Built with ❤️ to kill the Double Work cycle</p>
      </footer>
    </div>
  );
}

export default App;
