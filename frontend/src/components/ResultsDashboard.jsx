import React from 'react';
import { DownloadCloud, RotateCcw, Calendar, User, FileText, CheckCircle2 } from 'lucide-react';
import './ResultsDashboard.css';

const ResultsDashboard = ({ results, onReset }) => {
  const { decisions, actionItems } = results;

  const exportToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Add Decisions Section
    csvContent += "=== DECISIONS ===\n";
    decisions.forEach(decision => {
      csvContent += `"${decision.replace(/"/g, '""')}"\n`;
    });
    
    csvContent += "\n=== ACTION ITEMS ===\n";
    csvContent += "Who,What,By When\n";
    actionItems.forEach(item => {
      csvContent += `"${item.who}","${item.what.replace(/"/g, '""')}","${item.when}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "meeting_intelligence_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Intelligence Extracted</h2>
        <div className="actions">
          <button className="btn btn-secondary glass-panel" onClick={onReset}>
            <RotateCcw size={16} /> Process Another
          </button>
          <button className="btn btn-primary" onClick={exportToCSV}>
            <DownloadCloud size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Decisions Panel */}
        <div className="panel decisions-panel glass-panel">
          <div className="panel-header">
            <CheckCircle2 className="panel-icon text-success" />
            <h3>Key Decisions</h3>
          </div>
          <ul className="decisions-list">
            {decisions.map((decision, idx) => (
              <li key={idx} className="decision-item">
                <div className="bullet"></div>
                <p>{decision}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Items Panel */}
        <div className="panel action-items-panel glass-panel">
          <div className="panel-header">
            <FileText className="panel-icon text-accent" />
            <h3>Action Items</h3>
          </div>
          <div className="table-responsive">
            <table className="action-table">
              <thead>
                <tr>
                  <th>Who</th>
                  <th>What</th>
                  <th>By When</th>
                </tr>
              </thead>
              <tbody>
                {actionItems.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="avatar-cell">
                        <div className="avatar">{item.who.charAt(0)}</div>
                        <span>{item.who}</span>
                      </div>
                    </td>
                    <td className="what-cell">{item.what}</td>
                    <td>
                      <div className="date-cell">
                        <Calendar size={14} className="text-muted" />
                        <span>{item.when}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
