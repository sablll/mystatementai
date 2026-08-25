/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code, Key, Eye, EyeOff, Trash2, Plus, 
  Copy, Check, PlayCircle, Terminal, HelpCircle 
} from 'lucide-react';
import { ApiKey } from '../types';

export default function DeveloperApiView() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [keyName, setKeyName] = useState('');
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [visibleKeyId, setVisibleKeyId] = useState<string | null>(null);
  
  // Playground state
  const [selectedKey, setSelectedKey] = useState('');
  const [playgroundText, setPlaygroundText] = useState(`Date,Description,Withdrawal,Deposit,Balance
2026-06-15,STARBUCKS COFFEE,450.00,,5200.00
2026-06-16,PAYROLL CORP DIRECT DEPOSIT,,120000.00,125200.00`);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    // Load existing keys from localStorage
    const storedKeys = localStorage.getItem('st_api_keys');
    if (storedKeys) {
      setKeys(JSON.parse(storedKeys));
    } else {
      // Seed a default demo key
      const demoKeys: ApiKey[] = [
        {
          id: 'k-1',
          name: 'Primary SaaS Production',
          key: 'st_live_9a8f4c20e118903bde5fcd22',
          createdAt: new Date(Date.now() - 3600000 * 24 * 5).toLocaleDateString(),
          usageCount: 42
        }
      ];
      localStorage.setItem('st_api_keys', JSON.stringify(demoKeys));
      setKeys(demoKeys);
    }
  }, []);

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyName.trim()) return;

    // Generate random mock secure API token
    const randomHex = Array.from({ length: 24 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    
    const newKey: ApiKey = {
      id: `k-${Date.now()}`,
      name: keyName.trim(),
      key: `st_live_${randomHex}`,
      createdAt: new Date().toLocaleDateString(),
      usageCount: 0
    };

    const updated = [...keys, newKey];
    setKeys(updated);
    localStorage.setItem('st_api_keys', JSON.stringify(updated));
    setKeyName('');
  };

  const handleDeleteKey = (id: string) => {
    const updated = keys.filter(k => k.id !== id);
    setKeys(updated);
    localStorage.setItem('st_api_keys', JSON.stringify(updated));
    if (selectedKey === keys.find(k => k.id === id)?.key) {
      setSelectedKey('');
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleTriggerPlayground = async () => {
    if (!selectedKey) {
      setApiError('Please select or generate a valid x-api-key to run test queries.');
      return;
    }
    setApiError('');
    setApiLoading(true);
    setApiResponse(null);

    try {
      const res = await fetch('/api/v2/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': selectedKey
        },
        body: JSON.stringify({
          textData: playgroundText,
          fileName: 'playground_test.csv'
        })
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Gateway returned an HTTP authorization/parsing failure.');
      }
      setApiResponse(result);

      // Increment usage count of the selected key locally
      const updatedKeys = keys.map(k => {
        if (k.key === selectedKey) {
          return { ...k, usageCount: k.usageCount + 1 };
        }
        return k;
      });
      setKeys(updatedKeys);
      localStorage.setItem('st_api_keys', JSON.stringify(updatedKeys));

    } catch (err: any) {
      console.error(err);
      setApiError(err.message || 'API request rejected.');
    } finally {
      setApiLoading(false);
    }
  };

  return (
    <div id="developer-api-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <span className="text-xs uppercase font-mono tracking-widest text-blue-600 font-bold block mb-1">Developer API Gateway</span>
        <h1 className="text-3xl font-display font-bold text-slate-950">Secure REST API Integration</h1>
        <p className="text-sm text-slate-500 mt-1">
          Integrate StatementAI directly into your ERP, CRM, accountancy software (QuickBooks, Xero), or custom databases.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column: API documentation and Key manager */}
        <div className="space-y-8">
          {/* Section: API Key Provisioning */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center space-x-2">
              <Key className="h-5 w-5 text-blue-600" />
              <span>Token Key Provisioner</span>
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Create cryptographically secure business credentials starting with <code className="bg-slate-50 border border-slate-100 text-blue-600 px-1 py-0.5 rounded-sm">st_live_</code>. Keep them strictly confidential.
            </p>

            <form onSubmit={handleCreateKey} className="flex gap-3 mb-6">
              <input
                id="api-key-name"
                type="text"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                placeholder="Key label, e.g. Billing App Integration"
                className="flex-grow px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-blue-500"
                required
              />
              <button
                id="generate-api-key-btn"
                type="submit"
                className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl text-sm cursor-pointer transition-all shrink-0"
              >
                <Plus className="h-4.5 w-4.5" />
                <span>Create Key</span>
              </button>
            </form>

            {/* Key List */}
            <div className="space-y-4">
              {keys.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl text-slate-400 text-xs">
                  No active keys provisioned. Add one above.
                </div>
              ) : (
                keys.map((k) => {
                  const isVisible = visibleKeyId === k.id;
                  const isCopied = copiedKeyId === k.id;
                  const displayKey = isVisible ? k.key : `${k.key.substring(0, 10)}••••••••••••••••••••••••`;

                  return (
                    <div key={k.id} className="border border-slate-100 p-4 rounded-xl bg-slate-50/50 text-sm flex justify-between items-center">
                      <div className="space-y-1">
                        <span className="font-bold text-slate-800 block text-xs">{k.name}</span>
                        <code className="text-xs font-mono text-slate-500 bg-white px-2 py-0.5 border border-slate-100 rounded-md inline-block">{displayKey}</code>
                        <div className="flex items-center space-x-3 text-[10px] text-slate-400 mt-1 font-mono">
                          <span>Created: {k.createdAt}</span>
                          <span>•</span>
                          <span className="text-blue-600 font-semibold">Calls: {k.usageCount}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1.5 shrink-0 ml-3">
                        <button
                          id={`toggle-key-visibility-${k.id}`}
                          onClick={() => setVisibleKeyId(isVisible ? null : k.id)}
                          className="p-1.5 hover:bg-slate-200/60 text-slate-500 rounded-lg transition-colors cursor-pointer"
                          title={isVisible ? "Hide Key" : "Show Key"}
                        >
                          {isVisible ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                        </button>
                        <button
                          id={`copy-key-${k.id}`}
                          onClick={() => handleCopy(k.key, k.id)}
                          className="p-1.5 hover:bg-slate-200/60 text-slate-500 rounded-lg transition-colors cursor-pointer"
                          title="Copy Key"
                        >
                          {isCopied ? <Check className="h-4.5 w-4.5 text-emerald-600" /> : <Copy className="h-4.5 w-4.5" />}
                        </button>
                        <button
                          id={`revoke-key-${k.id}`}
                          onClick={() => handleDeleteKey(k.id)}
                          className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors cursor-pointer"
                          title="Revoke Key"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Endpoint Documentation */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Code className="h-5 w-5 text-blue-600" />
              <span>Endpoint Reference</span>
            </h2>
            <div className="space-y-3 font-mono text-xs">
              <div>
                <span className="text-slate-400">METHOD & ROUTE</span>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-sm">POST</span>
                  <span className="text-slate-800 font-semibold select-all">/api/v2/convert</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400">HEADERS</span>
                <table className="w-full text-left mt-1 text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 text-[10px]">
                      <th className="pb-1">Header</th>
                      <th className="pb-1">Type</th>
                      <th className="pb-1">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-50">
                      <td className="py-1 font-semibold">x-api-key</td>
                      <td className="py-1">string</td>
                      <td className="py-1 text-blue-600">st_live_... (Your Token)</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-semibold">Content-Type</td>
                      <td className="py-1">string</td>
                      <td className="py-1">application/json</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Playground Sandbox */}
        <div className="space-y-6 flex flex-col h-full">
          <div className="bg-slate-900 text-slate-200 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-800 shrink-0">
              <div className="flex items-center space-x-2">
                <PlayCircle className="h-5 w-5 text-emerald-500 animate-pulse" />
                <h3 className="text-base font-bold text-white">Live Playground Arena</h3>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">Sandbox Mode</span>
            </div>

            {/* Select API Key */}
            <div className="mb-4 shrink-0">
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5">Select Authentication Key</label>
              <select
                id="playground-key-select"
                value={selectedKey}
                onChange={(e) => {
                  setSelectedKey(e.target.value);
                  setApiError('');
                }}
                className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-3 py-2 text-xs font-mono focus:outline-hidden focus:border-blue-500 cursor-pointer"
              >
                <option value="">-- Choose Key --</option>
                {keys.map(k => (
                  <option key={k.id} value={k.key}>{k.name} ({k.key.substring(0, 12)}...)</option>
                ))}
              </select>
            </div>

            {/* Pasted text statement */}
            <div className="mb-4 flex flex-col flex-grow min-h-[140px]">
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5 shrink-0">CSV / Raw Text Stream Payload</label>
              <textarea
                id="playground-payload-input"
                value={playgroundText}
                onChange={(e) => setPlaygroundText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-lg p-3 text-xs font-mono focus:outline-hidden focus:border-blue-500 flex-grow"
                rows={5}
              />
            </div>

            <button
              id="playground-send-btn"
              onClick={handleTriggerPlayground}
              disabled={apiLoading}
              className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-md hover:shadow-lg shadow-emerald-500/10 cursor-pointer transition-all mb-4 shrink-0"
            >
              <Terminal className="h-4.5 w-4.5" />
              <span>{apiLoading ? 'Executing Conversion Request...' : 'Trigger API Request'}</span>
            </button>

            {apiError && (
              <div className="text-xs bg-rose-950/40 border border-rose-900 text-rose-300 px-3 py-2.5 rounded-xl mb-4 shrink-0">
                {apiError}
              </div>
            )}

            {/* Response console */}
            <div className="flex-grow flex flex-col overflow-hidden max-h-[300px]">
              <span className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5 shrink-0">Parsed Response Header</span>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs overflow-auto flex-grow max-h-[260px] text-slate-300 select-all">
                {apiResponse ? (
                  <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                    <HelpCircle className="h-6 w-6 mb-2" />
                    <span>Response JSON results will stream here.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
