import React, { useState } from 'react';
import { Screen, Mono, Btn } from "./UI.jsx";
import copy from '../copy.js';
import './CopyEditor.css';

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
        <div key={pathString} className="copy-editor-leaf">
          <Mono className="copy-editor-path">{pathString}</Mono>
          <textarea
            defaultValue={value}
            className="copy-editor-textarea base"
          />
        </div>
      );
    } else if (Array.isArray(value)) {
      return (
        <div key={pathString} className="copy-editor-node">
          <button
            onClick={() => toggleSection(pathString)}
            className="copy-editor-toggle"
          >
            <Mono className={`copy-editor-toggle-label${expandedSections.has(pathString) ? ' expanded' : ''}`}>
              {expandedSections.has(pathString) ? '▼' : '▶'} {key} [{value.length}]
            </Mono>
          </button>
          {expandedSections.has(pathString) && (
            <div className="copy-editor-children">
              {value.map((item, index) => (
                <div key={`${pathString}[${index}]`} className="copy-editor-array-item">
                  <Mono className="copy-editor-array-path">
                    {pathString}[{index}]
                  </Mono>
                  <textarea
                    defaultValue={item}
                    className="copy-editor-textarea array"
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
        <div key={pathString} className="copy-editor-node">
          <button
            onClick={() => toggleSection(pathString)}
            className="copy-editor-toggle"
          >
            <Mono className={`copy-editor-toggle-label${expandedSections.has(pathString) ? ' expanded' : ''}`}>
              {expandedSections.has(pathString) ? '▼' : '▶'} {key}
            </Mono>
          </button>
          {expandedSections.has(pathString) && (
            <div className="copy-editor-children">
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
      <div className="fu d1 copy-editor-header">
        <Mono>Copy Editor</Mono>
        <h2 className="onboarding-h2">
          Edit All Copy Strings
        </h2>
        <p className="copy-editor-description">
          Update text strings for localization. Changes will be saved directly to copy.js when supported, or copied to clipboard for manual updates.
        </p>
      </div>

      <div className="fu d2 copy-editor-search-wrap">
        <input
          type="text"
          placeholder="Search copy strings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="copy-editor-search"
        />
      </div>

      <div className="fu d3 copy-editor-scroll">
        {Object.entries(copy).map(([key, value]) => renderValue(key, value))}
      </div>

      <div className="fu d4 copy-editor-actions">
        <Btn onClick={exportCopy} className="copy-editor-action-btn">Save Changes</Btn>
        <Btn ghost onClick={() => go('home')} className="copy-editor-action-btn">Back to App</Btn>
      </div>
    </Screen>
  );
};

export default CopyEditor;