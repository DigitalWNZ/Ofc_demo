import { useEffect, useState, useCallback } from 'react';
import type { ContextResponse, SearchResult, FileResponse } from '../types';
import { getFileContent } from '../utils/api';

interface ContextDetailProps {
  context: ContextResponse;
  entry: SearchResult;
  onClose: () => void;
}

export default function ContextDetail({ context, entry, onClose }: ContextDetailProps) {
  const [rawExpanded, setRawExpanded] = useState(false);
  const [fileData, setFileData] = useState<FileResponse | null>(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const isFile = entry.kind === 'file';

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (!isFile) return;
    setFileLoading(true);
    setFileError(null);
    getFileContent(entry.entry_name)
      .then(setFileData)
      .catch(() => setFileError('Failed to load document content.'))
      .finally(() => setFileLoading(false));
  }, [isFile, entry.entry_name]);

  const parsed = context.context_parsed;
  const hasSchema = parsed?.columns && parsed.columns.length > 0;

  return (
    <div className="context-panel" role="dialog" aria-label="Entry details">
      {/* Header */}
      <div className="context-panel-header">
        <div className="context-panel-title-group">
          <h2 className="context-panel-name">{context.display_name || context.entry_name}</h2>
          <div className="context-panel-chips">
            {entry.system && (
              <span className={`label-chip system-${entry.system}`}>{entry.system}</span>
            )}
            {entry.kind && (
              <span className={`label-chip kind-${entry.kind}`}>{entry.kind}</span>
            )}
          </div>
        </div>
        <button
          className="context-close-btn"
          onClick={onClose}
          aria-label="Close panel"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="context-panel-body">
        {/* Overview Section */}
        {parsed && (
          <div className="context-section">
            <h3 className="context-section-title">Overview</h3>
            <div className="context-kv-list">
              {parsed.system && (
                <div className="context-kv-row">
                  <span className="context-kv-key">System</span>
                  <span className="context-kv-value">{String(parsed.system)}</span>
                </div>
              )}
              {parsed.fully_qualified_name && (
                <div className="context-kv-row">
                  <span className="context-kv-key">Fully Qualified Name</span>
                  <span className="context-kv-value mono">
                    {String(parsed.fully_qualified_name)}
                  </span>
                </div>
              )}
              {parsed.parent && (
                <div className="context-kv-row">
                  <span className="context-kv-key">Parent</span>
                  <span className="context-kv-value mono">{String(parsed.parent)}</span>
                </div>
              )}
              {parsed.description && (
                <div className="context-kv-row">
                  <span className="context-kv-key">Description</span>
                  <span className="context-kv-value">{String(parsed.description)}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Metadata Badges Section */}
        {parsed && (parsed.owner || parsed.grain || parsed.database || parsed.schema || parsed.primary_keys || parsed.partitions || parsed.timestamp_column) && (
          <div className="context-section">
            <h3 className="context-section-title">Metadata</h3>
            <div className="context-badges">
              {parsed.owner && (
                <span className="context-badge">
                  <span className="context-badge-label">Owner:</span> {String(parsed.owner)}
                </span>
              )}
              {parsed.grain && (
                <span className="context-badge">
                  <span className="context-badge-label">Grain:</span> {String(parsed.grain)}
                </span>
              )}
              {parsed.database && (
                <span className="context-badge">
                  <span className="context-badge-label">Database:</span> {String(parsed.database)}
                </span>
              )}
              {parsed.schema && (
                <span className="context-badge">
                  <span className="context-badge-label">Schema:</span> {String(parsed.schema)}
                </span>
              )}
              {parsed.primary_keys && (
                <span className="context-badge">
                  <span className="context-badge-label">Primary Keys:</span>{' '}
                  {Array.isArray(parsed.primary_keys) ? (parsed.primary_keys as string[]).join(', ') : String(parsed.primary_keys)}
                </span>
              )}
              {parsed.partitions && (
                <span className="context-badge">
                  <span className="context-badge-label">Partitions:</span>{' '}
                  {Array.isArray(parsed.partitions) ? (parsed.partitions as string[]).join(', ') : String(parsed.partitions)}
                </span>
              )}
              {parsed.timestamp_column && (
                <span className="context-badge">
                  <span className="context-badge-label">Timestamp:</span> {String(parsed.timestamp_column)}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Schema Section */}
        {hasSchema && parsed?.columns && (
          <div className="context-section">
            <h3 className="context-section-title">
              Schema ({parsed.columns.length} column{parsed.columns.length !== 1 ? 's' : ''})
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="schema-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {parsed.columns.map((col) => (
                    <tr key={col.name}>
                      <td className="schema-col-name">{col.name}</td>
                      <td className="schema-col-type">{col.type}</td>
                      <td className="schema-col-desc">
                        {col.description || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Source Document Section (file entries only) */}
        {isFile && (
          <div className="context-section">
            <h3 className="context-section-title">
              <svg className="context-section-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM6 20V4h5v5h5v11H6z" />
              </svg>
              Source Document
            </h3>
            {fileData?.source_file_id && (
              <div className="file-meta">
                <span className="context-badge">
                  <span className="context-badge-label">Source File ID:</span> {fileData.source_file_id}
                </span>
              </div>
            )}
            {fileLoading && (
              <div className="file-loading">Loading document…</div>
            )}
            {fileError && (
              <div className="file-error">{fileError}</div>
            )}
            {fileData && !fileLoading && (
              <div className="file-content">
                <pre className="file-content-pre">{fileData.content}</pre>
              </div>
            )}
          </div>
        )}

        {/* Raw Context Section */}
        {context.context_raw && (
          <div className="context-section">
            <button
              className="raw-context-toggle"
              onClick={() => setRawExpanded(!rawExpanded)}
            >
              <svg
                className={`raw-context-chevron ${rawExpanded ? 'open' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              Raw Context
            </button>
            {rawExpanded && (
              <div className="raw-context-content">
                <pre className="raw-context-pre">{context.context_raw}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
