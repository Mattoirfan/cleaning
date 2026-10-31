import React, { useState, useEffect } from 'react';
import {
  Lock,
  LogOut,
  Search,
  Filter,
  Download,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle,
  AlertCircle,
  X,
  RefreshCw,
  Eye,
} from 'lucide-react';
import { BRAND_CONFIG, SERVICES_CATALOG } from '../../config/brand';

export interface CustomerEnquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceId: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  preferredDate: string;
  preferredTime: string;
  address: string;
  zipCode: string;
  message?: string;
  status: 'New' | 'Contacted' | 'Quoted' | 'Scheduled' | 'Completed' | 'Cancelled';
  createdAt: string;
  internalNotes?: string;
}

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>([]);
  const [isLoadingEnquiries, setIsLoadingEnquiries] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState<CustomerEnquiry | null>(null);
  const [adminToken, setAdminToken] = useState<string>('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Check existing session token
  useEffect(() => {
    const savedToken = sessionStorage.getItem('purenest_admin_token');
    if (savedToken) {
      setAdminToken(savedToken);
      setIsAuthenticated(true);
      fetchEnquiries(savedToken);
    }
  }, [isOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      let token = '';

      // Try Node.js endpoint
      try {
        const res = await fetch('/api/admin/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ passcode }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          token = data.token;
        }
      } catch (nodeErr) {
        // Node endpoint not running
      }

      // Static hosting fallback check
      if (!token && passcode === 'purenest2026') {
        token = 'static_staff_session_' + Date.now();
      }

      if (!token) {
        throw new Error('Incorrect administrator passcode.');
      }

      sessionStorage.setItem('purenest_admin_token', token);
      setAdminToken(token);
      setIsAuthenticated(true);
      fetchEnquiries(token);
    } catch (err: any) {
      setLoginError(err.message || 'Authentication failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('purenest_admin_token');
    setAdminToken('');
    setIsAuthenticated(false);
    setEnquiries([]);
    setSelectedEnquiry(null);
  };

  const fetchEnquiries = async (token = adminToken) => {
    setIsLoadingEnquiries(true);
    try {
      let loaded = false;

      // 1. Try Node.js backend
      try {
        const res = await fetch('/api/enquiries', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.enquiries) {
            setEnquiries(data.enquiries);
            loaded = true;
          }
        }
      } catch (err) {
        // Node backend not reachable
      }

      // 2. Fallback to client localStorage enquiries
      if (!loaded) {
        const local = JSON.parse(localStorage.getItem('purenest_local_enquiries') || '[]');
        setEnquiries(local);
      }
    } catch (err) {
      console.error('Error fetching enquiries', err);
    } finally {
      setIsLoadingEnquiries(false);
    }
  };

  const handleUpdateStatus = async (enquiryId: string, newStatus: CustomerEnquiry['status']) => {
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`/api/enquiries/${enquiryId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.enquiry) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === enquiryId ? data.enquiry : item))
        );
        if (selectedEnquiry?.id === enquiryId) {
          setSelectedEnquiry(data.enquiry);
        }
      }
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleExportCSV = () => {
    if (!enquiries.length) return;
    const headers = ['ID', 'Date Submitted', 'Customer Name', 'Email', 'Phone', 'Service', 'Property', 'Preferred Date', 'Status', 'Address'];
    const rows = enquiries.map((e) => [
      e.id,
      new Date(e.createdAt).toLocaleDateString(),
      `"${e.fullName.replace(/"/g, '""')}"`,
      e.email,
      e.phone,
      e.serviceId,
      e.propertyType,
      e.preferredDate,
      e.status,
      `"${(e.address || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `purenest_enquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  // Filter enquiries
  const filteredEnquiries = enquiries.filter((item) => {
    const matchesSearch =
      item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.address && item.address.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalCount = enquiries.length;
  const newCount = enquiries.filter((e) => e.status === 'New').length;
  const scheduledCount = enquiries.filter((e) => e.status === 'Scheduled').length;
  const completedCount = enquiries.filter((e) => e.status === 'Completed').length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight">PureNest Staff & Dispatch Portal</h2>
              <span className="text-[11px] text-teal-400">Internal Enquiries & Routing</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!isAuthenticated ? (
          /* LOGIN SCREEN */
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full my-auto text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 mx-auto flex items-center justify-center border border-teal-200">
              <Lock className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">Authorized Personnel Login</h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your staff access passcode to manage customer bookings.
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs text-left flex items-start gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter Passcode (Default: purenest2026)"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-center text-slate-900 tracking-wider focus:outline-none focus:ring-2 focus:ring-teal-500"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                {isLoggingIn ? 'Verifying Credentials...' : 'Unlock Staff Console'}
              </button>

              <div className="text-[11px] text-slate-400">
                Staff demo passcode: <span className="font-mono font-bold text-teal-800">purenest2026</span>
              </div>
            </form>
          </div>
        ) : (
          /* DASHBOARD VIEW */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* KPI Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-slate-50 border-b border-slate-200">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Total Enquiries
                </span>
                <span className="text-2xl font-extrabold text-slate-900 font-mono">{totalCount}</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider block">
                  New / Unassigned
                </span>
                <span className="text-2xl font-extrabold text-teal-700 font-mono">{newCount}</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block">
                  Scheduled
                </span>
                <span className="text-2xl font-extrabold text-blue-700 font-mono">{scheduledCount}</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">
                  Completed
                </span>
                <span className="text-2xl font-extrabold text-emerald-700 font-mono">{completedCount}</span>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="p-4 px-6 bg-white border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, email, phone, or address..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Quoted">Quoted</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <button
                  onClick={() => fetchEnquiries()}
                  className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Refresh Enquiries"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingEnquiries ? 'animate-spin' : ''}`} />
                </button>

                <button
                  onClick={handleExportCSV}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Table Area */}
            <div className="flex-1 overflow-y-auto">
              {filteredEnquiries.length === 0 ? (
                <div className="text-center py-16 text-slate-400 text-xs">
                  {isLoadingEnquiries ? (
                    <div className="flex flex-col items-center gap-2">
                      <RefreshCw className="w-6 h-6 animate-spin text-teal-600" />
                      <span>Loading incoming dispatch enquiries...</span>
                    </div>
                  ) : (
                    <span>No enquiries matching current search or status filter.</span>
                  )}
                </div>
              ) : (
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 sticky top-0">
                    <tr>
                      <th className="py-2.5 px-4 font-semibold">Ref ID</th>
                      <th className="py-2.5 px-4 font-semibold">Customer</th>
                      <th className="py-2.5 px-4 font-semibold">Service Tier</th>
                      <th className="py-2.5 px-4 font-semibold">Target Date</th>
                      <th className="py-2.5 px-4 font-semibold">Status</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredEnquiries.map((enquiry) => {
                      const service = SERVICES_CATALOG.find((s) => s.id === enquiry.serviceId);
                      return (
                        <tr key={enquiry.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-mono font-medium text-teal-800">
                            {enquiry.id}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-slate-900">{enquiry.fullName}</div>
                            <div className="text-[11px] text-slate-500">{enquiry.phone} · {enquiry.email}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-medium text-slate-800">
                              {service ? service.name : enquiry.serviceId}
                            </span>
                            <div className="text-[11px] text-slate-400 capitalize">
                              {enquiry.propertyType} · {enquiry.bedrooms}b/{enquiry.bathrooms}ba
                            </div>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="font-medium text-slate-800">{enquiry.preferredDate}</div>
                            <div className="text-[11px] text-slate-400 capitalize">{enquiry.preferredTime}</div>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={enquiry.status}
                              onChange={(e) =>
                                handleUpdateStatus(enquiry.id, e.target.value as any)
                              }
                              className={`text-[11px] font-semibold py-1 px-2 rounded-md border cursor-pointer ${
                                enquiry.status === 'New'
                                  ? 'bg-teal-50 text-teal-800 border-teal-300'
                                  : enquiry.status === 'Scheduled'
                                  ? 'bg-blue-50 text-blue-800 border-blue-300'
                                  : enquiry.status === 'Completed'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : enquiry.status === 'Cancelled'
                                  ? 'bg-red-50 text-red-800 border-red-300'
                                  : 'bg-slate-50 text-slate-800 border-slate-300'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Quoted">Quoted</option>
                              <option value="Scheduled">Scheduled</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setSelectedEnquiry(enquiry)}
                              className="p-1.5 text-slate-500 hover:text-teal-700 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Detailed Inspection Drawer/Modal */}
            {selectedEnquiry && (
              <div className="p-6 bg-slate-900 text-white border-t border-slate-800 animate-in slide-in-from-bottom duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-teal-400">
                      {selectedEnquiry.id}
                    </span>
                    <span className="text-xs text-slate-400">
                      Submitted on {new Date(selectedEnquiry.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedEnquiry(null)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Close Details ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 uppercase tracking-wider text-[10px]">Client</span>
                    <div className="text-white font-semibold text-sm">{selectedEnquiry.fullName}</div>
                    <div className="text-slate-300">{selectedEnquiry.email}</div>
                    <div className="text-slate-300">{selectedEnquiry.phone}</div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 uppercase tracking-wider text-[10px]">Service & Location</span>
                    <div className="text-white font-semibold">{selectedEnquiry.serviceId}</div>
                    <div className="text-slate-300">{selectedEnquiry.address} (ZIP: {selectedEnquiry.zipCode || 'N/A'})</div>
                    <div className="text-slate-300 capitalize">
                      {selectedEnquiry.propertyType} · {selectedEnquiry.bedrooms} Beds / {selectedEnquiry.bathrooms} Baths
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 uppercase tracking-wider text-[10px]">Customer Notes</span>
                    <div className="p-2.5 rounded-lg bg-slate-800 text-slate-200 italic leading-relaxed">
                      {selectedEnquiry.message || 'No special notes provided.'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
