import React, { useState } from 'react';
import DashboardPage from '@/components/DashboardPage';
import CampaignsPage from '@/components/CampaignsPage';
import CampaignDashboard from '@/components/CampaignDashboard';

type View = 'painel' | 'campanhas' | 'campaign-dashboard';

const DashboardWrapper = () => {
  const [currentView, setCurrentView] = useState<View>('painel');
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);

  const handleTabChange = (view: View) => {
    setCurrentView(view);
    if (view !== 'campaign-dashboard') setSelectedCampaignId(null);
  };

  const handleCampaignClick = (campaignId: number) => {
    setSelectedCampaignId(campaignId);
    setCurrentView('campaign-dashboard');
  };

  const handleBackToCampaigns = () => {
    setCurrentView('campanhas');
    setSelectedCampaignId(null);
  };

  const handleBackToDashboard = () => {
    setCurrentView('painel');
    setSelectedCampaignId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Navigation Tabs */}
      {currentView !== 'campaign-dashboard' && (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
            <nav className="flex space-x-4 sm:space-x-8 min-w-max">
              <button
                onClick={() => handleTabChange('painel')}
                className={`py-4 px-2 sm:px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  currentView === 'painel'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Painel
              </button>
              <button
                onClick={() => handleTabChange('campanhas')}
                className={`py-4 px-2 sm:px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  currentView === 'campanhas'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Campanhas
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      {currentView === 'painel' && <DashboardPage onCampaignClick={handleCampaignClick} />}
      {currentView === 'campanhas' && <CampaignsPage onCampaignClick={handleCampaignClick} />}
      {currentView === 'campaign-dashboard' && selectedCampaignId && (
        <CampaignDashboard campaignId={selectedCampaignId} onBack={handleBackToCampaigns} />
      )}
    </div>
  );
};

export default DashboardWrapper;