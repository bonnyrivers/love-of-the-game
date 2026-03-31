import React, { useState } from 'react';
import { Screen, Mono, Btn } from "./UI";
import copy from '../copy.js';

// ══════════════════════════════════════════════════════════════════════════════
// COPY EDITOR — Hidden page for updating all copy strings
// ══════════════════════════════════════════════════════════════════════════════
const CopyEditor = ({ go }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState(new Set(['components']));

  const toggleSection = (section) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const renderValue = (key, value, path = []) => {
    const currentPath = [...path, key];
    const pathString = currentPath.join('.');

    if (typeof value === 'string') {
      return (
        <div key={pathString} style={{ marginBottom: 16, padding: '12px', background: 'var(--bg1)', border: '1px solid var(--line)' }}>
          <Mono style={{ display: 'block', marginBottom: 8, fontSize: 10, color: 'var(--soft)' }}>{pathString}</Mono>
          <textarea
            defaultValue={value}
            style={{
              width: '100%',
              minHeight: '60px',
              background: 'transparent',
              border: '1px solid var(--line2)',
              color: 'var(--text)',
              fontFamily: 'var(--serif)',
              fontSize: 14,
              fontStyle: 'italic',
              padding: '8px',
              outline: 'none',
              resize: 'vertical'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--soft)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--line2)'}
          />
        </div>
      );
    } else if (Array.isArray(value)) {
      return (
        <div key={pathString} style={{ marginBottom: 16 }}>
          <button
            onClick={() => toggleSection(pathString)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--mono)',
              fontSize: 12,
              color: 'var(--white)',
              padding: '8px 0',
              textAlign: 'left',
              width: '100%'
            }}
          >
            <Mono style={{ color: expandedSections.has(pathString) ? 'var(--soft)' : 'var(--dim)' }}>
              {expandedSections.has(pathString) ? '▼' : '▶'} {key} [{value.length}]
            </Mono>
          </button>
          {expandedSections.has(pathString) && (
            <div style={{ marginLeft: 20, marginTop: 8 }}>
              {value.map((item, index) => (
                <div key={`${pathString}[${index}]`} style={{ marginBottom: 8 }}>
                  <Mono style={{ fontSize: 10, color: 'var(--dim)', marginBottom: 4 }}>
                    {pathString}[{index}]
                  </Mono>
                  <textarea
                    defaultValue={item}
                    style={{
                      width: '100%',
                      minHeight: '40px',
                      background: 'transparent',
                      border: '1px solid var(--line2)',
                      color: 'var(--text)',
                      fontFamily: 'var(--serif)',
                      fontSize: 13,
                      fontStyle: 'italic',
                      padding: '6px',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--soft)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--line2)'}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      );
    } else if (typeof value === 'object' && value !== null) {
      const filteredEntries = Object.entries(value).filter(([k, v]) =>
        searchTerm === '' ||
        k.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (typeof v === 'string' && v.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      if (filteredEntries.length === 0) return null;

      return (
        <div key={pathString} style={{ marginBottom: 16 }}>
          <button
            onClick={() => toggleSection(pathString)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--mono)',
              fontSize: 12,
              color: 'var(--white)',
              padding: '8px 0',
              textAlign: 'left',
              width: '100%'
            }}
          >
            <Mono style={{ color: expandedSections.has(pathString) ? 'var(--soft)' : 'var(--dim)' }}>
              {expandedSections.has(pathString) ? '▼' : '▶'} {key}
            </Mono>
          </button>
          {expandedSections.has(pathString) && (
            <div style={{ marginLeft: 20, marginTop: 8 }}>
              {filteredEntries.map(([k, v]) => renderValue(k, v, currentPath))}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const exportCopy = async () => {
    const textAreas = document.querySelectorAll('textarea');
    let output = 'const copy = {\n';

    // Collect all changes
    const changes = {};
    textAreas.forEach(textarea => {
      const pathLabel = textarea.previousElementSibling?.textContent;
      if (pathLabel) {
        const pathParts = pathLabel.split('.');
        let current = changes;

        // Navigate to the nested property
        for (let i = 0; i < pathParts.length - 1; i++) {
          const part = pathParts[i];
          if (part.includes('[')) {
            // Handle array indices
            const [arrayName, indexStr] = part.split('[');
            const index = parseInt(indexStr.replace(']', ''));
            if (!current[arrayName]) current[arrayName] = [];
            while (current[arrayName].length <= index) {
              current[arrayName].push(null);
            }
            if (!current[arrayName][index] || typeof current[arrayName][index] !== 'object') {
              current[arrayName][index] = {};
            }
            current = current[arrayName][index];
          } else {
            if (!current[part]) current[part] = {};
            current = current[part];
          }
        }

        const lastPart = pathParts[pathParts.length - 1];
        if (lastPart.includes('[')) {
          const [arrayName, indexStr] = lastPart.split('[');
          const index = parseInt(indexStr.replace(']', ''));
          if (!current[arrayName]) current[arrayName] = [];
          while (current[arrayName].length <= index) {
            current[arrayName].push(null);
          }
          current[arrayName][index] = textarea.value;
        } else {
          current[lastPart] = textarea.value;
        }
      }
    });

    // Generate formatted JSON
    const formatValue = (value, indent = 0) => {
      const spaces = '  '.repeat(indent);
      if (typeof value === 'string') {
        return `"${value.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
      } else if (Array.isArray(value)) {
        if (value.length === 0) return '[]';
        return '[\n' + value.map(item => `${spaces}  ${formatValue(item, indent)}`).join(',\n') + `\n${spaces}]`;
      } else if (typeof value === 'object' && value !== null) {
        const entries = Object.entries(value);
        if (entries.length === 0) return '{}';
        return '{\n' + entries.map(([k, v]) => `${spaces}  "${k}": ${formatValue(v, indent + 1)}`).join(',\n') + `\n${spaces}}`;
      }
      return String(value);
    };

    output += formatValue(changes, 0);
    output += '\n};\n\nexport default copy;';

    // Try to write directly to file using File System Access API
    try {
      if ('showSaveFilePicker' in window) {
        const handle = await window.showSaveFilePicker({
          suggestedName: 'copy.js',
          types: [{
            description: 'JavaScript files',
            accept: {'text/javascript': ['.js']}
          }]
        });
        const writable = await handle.createWritable();
        await writable.write(output);
        await writable.close();
        alert('Copy file updated successfully!');
      } else {
        throw new Error('File System Access API not supported');
      }
    } catch (error) {
      console.error('Failed to save file directly:', error);
      // Fallback to clipboard
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(output);
        alert('File System Access API not supported. Updated copy copied to clipboard! Paste it into copy.js');
      } else {
        console.log(output);
        alert('File System Access API not supported. Updated copy logged to console. Copy and paste it into copy.js');
      }
    }
  };

  return (
    <Screen>
      <div className="fu d1" style={{ marginBottom: 24 }}>
        <Mono>Copy Editor</Mono>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: 34, fontStyle: "italic", fontWeight: 400, color: "var(--white)", margin: "14px 0 6px", lineHeight: 1.1 }}>
          Edit All Copy Strings
        </h2>
        <p style={{ fontFamily: "var(--serif)", fontSize: 14, color: "var(--mid)", fontStyle: "italic", lineHeight: 1.6 }}>
          Update text strings for localization. Changes will be saved directly to copy.js when supported, or copied to clipboard for manual updates.
        </p>
      </div>

      <div className="fu d2" style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search copy strings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            background: 'var(--bg1)',
            border: '1px solid var(--line)',
            color: 'var(--text)',
            fontFamily: 'var(--serif)',
            fontSize: 16,
            fontStyle: 'italic',
            padding: '12px 14px',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--soft)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--line)'}
        />
      </div>

      <div className="fu d3" style={{ flex: 1, overflowY: 'auto', marginBottom: 20 }}>
        {Object.entries(copy).map(([key, value]) => renderValue(key, value))}
      </div>

      <div className="fu d4" style={{ display: 'flex', gap: 12 }}>
        <Btn onClick={exportCopy} style={{ flex: 1 }}>Save Changes</Btn>
        <Btn ghost onClick={() => go('home')} style={{ flex: 1 }}>Back to App</Btn>
      </div>
    </Screen>
  );
};

export default CopyEditor;