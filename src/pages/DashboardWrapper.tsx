import React, { useState } from 'react';
import DashboardPage from '@/components/DashboardPage';
import CampaignsPage from '@/components/CampaignsPage';
import CampaignDashboard from '@/components/CampaignDashboard';

type View = 'painel' | 'campanhas' | 'configuracoes' | 'campaign-dashboard';

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      {currentView === 'painel' && <DashboardPage onCampaignClick={handleCampaignClick} />}
      {currentView === 'campanhas' && <CampaignsPage onCampaignClick={handleCampaignClick} />}
      {currentView === 'campaign-dashboard' && selectedCampaignId && (
        <CampaignDashboard campaignId={selectedCampaignId} onBack={handleBackToCampaigns} />
      )}
      {currentView === 'configuracoes' && (
        <div className="p-8 text-center text-gray-600">Página de Configurações em desenvolvimento...</div>
      )}
    </div>
  );
};

export default DashboardWrapper;