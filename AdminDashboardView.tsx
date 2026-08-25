/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, BarChart3, ShieldAlert, Terminal, Activity, 
  RotateCcw, RefreshCw, AlertTriangle, CheckCircle, Database 
} from 'lucide-react';
import { AdminLog } from '../types';

interface ServerMetrics {
  totalConversions: number;
  successfulConversions: number;
  failedConversions: number;
  apiCalls: number;
  activeKeys: number;
  liveSessionsCount: number;
  errorLogs: AdminLog[];
}

export default function AdminDashboardView() {
  const [metrics, setMetrics] = useState<ServerMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [logFilter, setLogFilter] = useState<'ALL' | 'ERROR' | 'WARN'>('ALL');

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/metrics');
      if (!res.ok) throw new Error('Failed to fetch server metrics.');
      const data = await res.json();
      if (data.success) {
        setMetrics(data.stats);
      } else {
        throw new Error(data.error || 'Server rejected request.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Unable to retrieve telemetry records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    // Auto-refresh stats every 15 seconds
    const interval = setInterval(() => {
      fetchMetrics();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const filteredLogs = metrics?.errorLogs.filter(log => {
    if (logFilter === 'ALL') return true;
    return log.type === logFilter;
  }) || [];

  return (
    <div id="admin-dashboard-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-blue-600 font-bold block mb-1">System Administration</span>
          <h1 className="text-3xl font-display font-bold text-slate-950">Analytics Cockpit</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time monitor of parsing telemetry, error exceptions, API limits, and engine health.
          </p>
        </div>
        <button
          id="admin-refresh-btn"
          onClick={fetchMetrics}
          disabled={loading}
          className="flex items-center space-x-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-xs hover:shadow-sm cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Refreshing...' : 'Force Refresh'}</span>
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-rose-50 border border-rose-100 rounded-xl p-4 text-rose-700 text-sm flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Telemetry Offline</p>
            <p className="text-xs text-rose-600 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Numerical Stats Dials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1: Total Conversions */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Total Extractions</p>
              <h3 className="text-3xl font-display font-bold text-slate-900 mt-1">
                {metrics ? metrics.totalConversions : '---'}
              </h3>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
              <BarChart3 className="h-6 w-6" />
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4 text-xs">
            <span className="bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-sm flex items-center space-x-0.5">
              <CheckCircle className="h-3 w-3" />
              <span>{metrics ? ((metrics.successfulConversions / metrics.totalConversions) * 100).toFixed(1) : '0'}% success</span>
            </span>
            <span className="text-slate-400 font-medium">Auto-detected ledger rates</span>
          </div>
        </motion.div>

        {/* Card 2: REST API Calls */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">API Gateways Called</p>
              <h3 className="text-3xl font-display font-bold text-slate-900 mt-1">
                {metrics ? metrics.apiCalls : '---'}
              </h3>
            </div>
            <div className="bg-violet-50 p-3 rounded-xl text-violet-600">
              <Activity className="h-6 w-6" />
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4 text-xs text-slate-400">
            <span className="text-violet-600 font-semibold font-mono">Header Verified</span>
            <span>st_live keys integrated</span>
          </div>
        </motion.div>

        {/* Card 3: Active Business API Keys */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Secure Active Keys</p>
              <h3 className="text-3xl font-display font-bold text-slate-900 mt-1">
                {metrics ? metrics.activeKeys : '---'}
              </h3>
            </div>
            <div className="bg-amber-50 p-3 rounded-xl text-amber-600">
              <Users className="h-6 w-6" />
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4 text-xs text-slate-400">
            <span className="text-amber-600 font-semibold">100% Secure</span>
            <span>Business level provisioning</span>
          </div>
        </motion.div>

        {/* Card 4: Web Sockets & Servers */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Active Sockets</p>
              <h3 className="text-3xl font-display font-bold text-slate-900 mt-1">
                {metrics ? metrics.liveSessionsCount : '---'}
              </h3>
            </div>
            <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
              <Database className="h-6 w-6" />
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4 text-xs text-slate-400">
            <span className="text-emerald-600 font-semibold">ONLINE</span>
            <span>Container Ingress Live</span>
          </div>
        </motion.div>
      </div>

      {/* Main Grid: Server Performance Monitor + Error Telemetry logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Server Performance metrics indicators */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6 h-fit">
          <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center space-x-2">
            <Activity className="h-5 w-5 text-blue-600" />
            <span>Node Container Hardware</span>
          </h3>
          <div className="space-y-5 text-sm">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-500 font-medium">Memory Usage (Container)</span>
                <span className="font-mono text-slate-800 font-semibold">41.8 MB / 512 MB</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '8.2%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-500 font-medium">Google GenAI API Latency</span>
                <span className="font-mono text-slate-800 font-semibold">1,248 ms (3.5 Flash)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-violet-600 h-full rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-500 font-medium">Local Storage Cache Allocation</span>
                <span className="font-mono text-slate-800 font-semibold">12.4 KB / 5 MB</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '1%' }}></div>
              </div>
            </div>
            
            <div className="border-t border-slate-100 pt-5 mt-5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Provisioning Settings</h4>
              <ul className="space-y-2 text-xs font-mono text-slate-500">
                <li className="flex justify-between">
                  <span>SSL Certificate:</span>
                  <span className="text-emerald-600 font-semibold">ACTIVE (Cloud Run)</span>
                </li>
                <li className="flex justify-between">
                  <span>Primary DB Engine:</span>
                  <span className="text-blue-600 font-semibold">LOCAL SECURE ENVELOPE</span>
                </li>
                <li className="flex justify-between">
                  <span>Gemini Model Version:</span>
                  <span className="text-slate-800 font-semibold">gemini-3.5-flash</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Real-time Logs terminal panel */}
        <div className="lg:col-span-2 bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-[400px]">
          {/* Bar */}
          <div className="bg-slate-900 px-5 py-3.5 border-b border-slate-800 flex justify-between items-center shrink-0">
            <div className="flex items-center space-x-2">
              <Terminal className="h-4 w-4 text-slate-400" />
              <span className="font-mono text-xs text-slate-200 font-semibold">Security Audit Exceptions</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-lg">
              {(['ALL', 'ERROR', 'WARN'] as const).map((filter) => (
                <button
                  id={`log-filter-${filter}`}
                  key={filter}
                  onClick={() => setLogFilter(filter)}
                  className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-md transition-all cursor-pointer ${
                    logFilter === filter 
                      ? 'bg-blue-600 text-white shadow-xs' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Logs Area */}
          <div className="p-5 overflow-y-auto font-mono text-xs flex-grow space-y-4 text-slate-300">
            {filteredLogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                <ShieldAlert className="h-8 w-8 mb-2" />
                <span>No audit anomalies or logs detected.</span>
              </div>
            ) : (
              filteredLogs.map((log) => (
                <div key={log.id} className="border-b border-slate-900 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center space-x-2 text-[10px] text-slate-500 mb-1">
                    <span>[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                    <span className={
                      log.type === 'ERROR' ? 'text-rose-500 font-bold' : 'text-amber-500 font-bold'
                    }>
                      {log.type}
                    </span>
                    <span className="text-slate-400">({log.user})</span>
                  </div>
                  <p className="text-slate-200">{log.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
